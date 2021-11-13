import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippiingAddress } from "../actions/cartActions";

function ShippingAddressScreen(props) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [email, setEmail] = useState(shippingAddress.email);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      saveShippiingAddress({ fullName, address, city, postalCode, country, email, phone })
    );
    props.history.push("/payment");
  };
  return (
    <div style={{marginTop:'1.5%'}}>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1> Thông Tin Mua Sắm</h1>
        </div>
        <div>
          <label htmlFor="fullName">Họ và Tên<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="fullname"
            placeholder="Nhập Họ Và Tên"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="email"
            placeholder="Nhập Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Số Điện Thoại<a style={{color:'red'}}>*</a></label>
          <input
            type="number"
            id="phone"
            placeholder="Nhập Số Điện Thoại"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Địa Chỉ<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="address"
            placeholder="Nhập Địa Chỉ"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Thành Phố<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="city"
            placeholder="Nhập Tên Thành Phố"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Mã Bưu Điện<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="postalCode"
            placeholder="Nhập Mã Bưu Điện"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Quốc Gia<a style={{color:'red'}}>*</a></label>
          <input
            type="text"
            id="country"
            placeholder="Nhập Tên Quốc Gia"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label></label>
          <button className="checkout_btn" type="submit">
            Tiếp Tục
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
