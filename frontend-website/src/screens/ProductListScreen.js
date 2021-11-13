import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  listProducts,
  deleteProduct
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET
} from "../constants/productConstants";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DeleteTwoTone } from '@ant-design/icons';
export default function ProductListScreen(props) {
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = product => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };


  const createHandler = () => {
    dispatch(createProduct());
  };

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
  return (
    <div className="profile_container">
       <ul className="profile_menu">
                  <li>
                    <b><Link to="/productlist">Danh Sách Sản Phẩm</Link></b>
                  </li>
                  <li>
                    <Link to="/orderlist">Danh Sách Đơn Hàng</Link>
                  </li>
                  <li>
                    <Link to="/qrscreen">QR Của Tôi</Link>
                  </li>
                  
                  
                </ul>
      <div style={{ width:'83%', marginLeft:'10px'}}>
      <div className="row">
        <b className="profile_title">Danh Sách Sản Phẩm</b>
        <button type="button" className="add_btn" onClick={createHandler}>
          Thêm Sản Phẩm
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Mã Sản Phẩm</th>
              <th>Tên Sản Phẩm</th>
              <th>Thể Loại</th>
              <th>NXB</th>
              <th>Giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td style={{fontSize:'12px'}}>{product._id}</td>
                <td style={{fontSize:'14px'}}>{product.name}</td>
                
                <td style={{fontSize:'14px'}}>{product.category}</td>
                <td style={{fontSize:'14px'}}>{product.brand}</td>
                <td style={{fontSize:'14px'}}>{numberWithCommas(product.price)}</td>
                <td>
                  <button
                    type="button"
                    className="edit_btn"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Chỉnh Sửa
                  </button>
                  
                  <DeleteTwoTone onClick={() => deleteHandler(product)} className="delete_icon" twoToneColor="red"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    
  );
}
