import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import QRScreen from "./screens/QRScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import SigninQRScreen from "screens/SigninQRScreen";
import {Dropdown, Menu} from "antd";
import { addToCart, removeCart } from "./actions/cartActions";
import {DeleteOutlined } from "@ant-design/icons";
import {ShoppingCartOutlined, QrcodeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from "./img/logo.png"
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  // console.log(userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo.result.name);
  // const userSigninGoogle = useSelector(state => state.userSigninGoogle);
  // const {userInfoGoogle} = userSigninGoogle;
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signout());
  };
  const handleRemoveCart = id => {
    dispatch(removeCart(id));
  };
  //dropdown
  const qrmenu = (
    <Menu>
      <Menu.Item> 
          <Link to="/signinqr">
              Quét QR
          </Link>
      </Menu.Item>
    </Menu>
  )
  const cart_review =(
    <div className="cart_review_container">
        <h1 style={{fontWeight:'700', fontSize:'22px'}}>GIỎ HÀNG</h1>
        {cartItems.length === 0 ? (
          <div>
            Giỏ Hàng Trống
          </div>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div style={{marginRight:'10px'}}>
                    <select
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product,Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{color:'red', marginRight:'10px', fontSize:'18px'}}>{item.price} đ</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCart(item.product)}                 
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div className="menu_section">
            <Link className="" to="/">
              <img src={logo} style={{height:'46px'}}/>
            </Link>
            <div className="menu_btn">
            <Link className="menu_btn" to="/">
              Trang Chủ
            </Link>
          </div>
          <div className="menu_btn">
            <Link className="menu_btn" to="/">
              Sản Phẩm
            </Link>
          </div>
          </div>
          
          <div>
            <Dropdown overlay={qrmenu}>
            <i style={{color:'#1464A6', fontSize:'25px'}}><QrcodeOutlined /></i>
            </Dropdown>
          <Dropdown overlay={cart_review}>
            <Link to="/cart">
              <span className="cartlogo">
                <i style={{color:'#1464A6', fontSize:'25px'}}><ShoppingCartOutlined /></i>
              </span>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </Dropdown>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"><UserOutlined /> Quản Lý Tài Khoản</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"><ShoppingCartOutlined /> Đơn Hàng Của Tôi</Link>
                  </li>
                  <li>
                    <Link to="/qrscreen"><QrcodeOutlined /> QR Của Tôi</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={handleSignOut}>
                    <LogoutOutlined /> Đăng Xuất
                    </Link>
                  </li>
                  {/* <li>
                    <QRCode
                      id="qrcode"
                      value={userInfo.token}
                      size={200}
                      level={"H"}
                      includeMargin={true}
                    />
                  </li> */}
                </ul>
              </div>
            ) : (
              <Link to="/signin">Đăng Nhập</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  {" "}
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Trang Chính</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Danh Sách Sản Phẩm</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Danh Sách Đơn Hàng</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Danh Sách Người Dùng</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          
          <Route path="/signinqr" component={SigninQRScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/qrscreen" component={QRScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center"></footer>
      </div>
    </Router>
  );
}

export default App;
