import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
	const dispatch = useDispatch();
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);
	const handleAddToCart = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return (
		<div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant="danger"> {error} </MessageBox>
			) : (
				<div>
					{/* <Link to="/">Back to result</Link> */}
					<div className="product_container">
						<div className="product_container_top">
							<div style={{ display: "flex" }}>
								<div className="detail_img">
									<img
										className="large"
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div className="detail_name">
									<ul>
										<li>
											<h1
												style={{
													fontWeight: "700",
													fontSize: "25px",
												}}
											>
												{product.name}
											</h1>
										</li>
										<li>
											<Rating
												rating={product.rating}
												numReviews={product.numReviews}
											/>
										</li>
										<li style={{fontSize:'20px'}}>Giá: <a style={{color:'red', fontWeight:'bold'}}>{numberWithCommas(product.price)}đ</a> </li>
										<li>
										<b>Thể Loại:</b> {product.category}
										</li>
										<li>
										<b>Nhà Xuất Bản:</b> {product.brand}
										</li>
                							
									</ul>
								</div>
							</div>

							<div className="detail_checkout_card">
								<ul style={{width:'100%'}}>
									<li>
										<div className="checkout_label">
											<div>Giá</div>
											<div className="price">
												{numberWithCommas(product.price)} đ
											</div>
										</div>
									</li>
									<li>
										<div className="row">
											<div>Tình Trạng</div>
											<div>
												{product.countInStock > 0 ? (
													<span className="success">
														Còn Hàng
													</span>
												) : (
													<span className="danger">
														Hết Hàng
													</span>
												)}
											</div>
										</div>
									</li>
									{product.countInStock > 0 && (
										<>
											<li>
												<div className="row">
													<div>Sô Lượng :</div>
													<div>
														<select
															value={qty}
															onChange={(e) =>
																setQty(
																	e.target
																		.value
																)
															}
														>
															{[
																...Array(
																	product.countInStock
																).keys(),
															].map((x) => (
																<option
																	key={x + 1}
																	value={
																		x + 1
																	}
																>
																	{x + 1}
																</option>
															))}
														</select>
													</div>
												</div>
											</li>
											<li style={{textAlign:'center'}}>
												<button
													className="signin_btn"
													onClick={handleAddToCart}
												>
													Thêm Vào Giỏ Hàng
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
						<div className="product_container_bottom">
							<div>
								<p className="profile_title">Mô tả:</p> <p>{product.description}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductScreen;
