import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder, payOrder, deliverOrder } from "../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstans";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector(state => state.orderDetails);
  const { error, loading, order } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector(state => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      // console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
       if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  },  [dispatch, order, orderId, sdkReady, successPay, successDeliver]);
  const handleSuccessPayment = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div style={{marginTop:'1.5%', padding:'50px 300px 100px 300px'}}>
      <h1 style={{fontWeight:'700'}}> ????n H??ng S??? {order._id}</h1>
      <div className="">
        <div className="">
          <ul>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Th??ng Tin Kh??ch H??ng</h2>
                <p>
                  <strong> H??? V?? T??n: </strong> {order.shippingAddress.fullName}
                  <br />
                  <strong> S??? ??i???n Tho???i: </strong> {order.shippingAddress.phone}
                  <br />
                  <strong> ?????a Ch???: </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.country}
                  <br />
                  <strong> Email: </strong>
                  {order.shippingAddress.email}
                  <br />
                  <strong> M?? B??u ??i???n: </strong>{" "}
                  {order.shippingAddress.postalCode}
                  
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    ???? Giao T???i {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Ch??a ???????c Giao</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Thanh To??n</h2>
                <p>
                  <strong> Ph????ng Th???c Thanh To??n: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    ???? Thanh To??n {order.paidAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Ch??a Thanh To??n</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Chi Ti???t ????n H??ng</h2>
                <ul>
                  {order.orderItems.map(item => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          S??? L?????ng: {item.qty}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="">
            <ul>
              
              <li>
                <div className="row">
                  <strong>Th??nh Ti???n</strong>
                  <div>{order.itemsPrice}??</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <strong>Ph?? Giao H??ng</strong>
                  <div>{order.shippingPrice}??</div>
                </div>
              </li>
              <li>
                {/* <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div> */}
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>T???ng C???ng</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice}??</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger"> {errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={handleSuccessPayment}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Giao H??ng
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
