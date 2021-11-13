import React, { useEffect } from "react";
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Carousel } from "antd";
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import banner4 from "../img/banner4.jpg";
function HomeScreen(props) {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	const contentStyle = {
		height: "400px",
    width: "100vw",
		color: "#fff",
		textAlign: "center",
		background: "#364d79",
	};
  const home_title ={
    fontSize:"30px",
    fontWeight:"700",
    color:"#1464A6",
    textAlign:"center",
    paddingTop:"30px"
  }
	return (
		<div className="home_container">
			<div style={{ width: "100vw" }}>
				<Carousel autoplay>
					<div>
						<img src={banner1} style={contentStyle}/>
					</div>
					<div>
						<img src={banner2} style={contentStyle}/>
					</div>
					<div>
						<img src={banner3}style={contentStyle}/>
					</div>
				</Carousel>
			</div>
      <div style={home_title}>Sách Bán Chạy</div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant="danger"> {error} </MessageBox>
			) : (
				<div className="row center">
					{products.map((product) => (
						<Products key={product._id} product={product} />
					))}
				</div>
			)}
      <div className="home_paralax">
            <div className="paralax_slogan">
              <div className="paralax_title">MYBOOK</div>
              <div className="paralax_txt">Những quyển sách làm say mê ta đến tận tủy, chúng nói chuyện với ta, cho ta những lời khuyên và liên kết với ta bởi một tình thân thật sống động và nhịp nhàng. </div>
            </div>
      </div>
      <div style={home_title}>Sách Được Yêu Thích</div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant="danger"> {error} </MessageBox>
			) : (
				<div className="row center">
					{products.map((product) => (
						<Products key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}

export default HomeScreen;
