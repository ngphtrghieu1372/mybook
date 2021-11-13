import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
function Products(props) {
  const { product } = props;
  function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
  return (
    <Link to={`/products/${product._id}`}>
    <div key={product._id} className="card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="product_img"/>
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h1>{product.name}</h1>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">Giá : {numberWithCommas(product.price)} đ</div>
      </div>
    </div>
    </Link>
  );
}

export default Products;
