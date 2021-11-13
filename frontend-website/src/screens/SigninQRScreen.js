import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { useDispatch, useSelector } from "react-redux";
import { signinQr } from "actions/userAction";
import { USER_SIGNINQR_RESET } from "constants/userConstants";

function SigninQR(props) {
  const [result, setResult] = useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const handleScan = (data) => {
    if (!data) return;
    setResult(data);
    // console.log(result);
  };
  useEffect(() => {
    dispatch(signinQr(result));
  }, [result, dispatch]);
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
      // dispatch({ type: USER_SIGNINQR_RESET });
    }
  }, [userInfo, props.history, redirect, dispatch]);
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: 500,
    width: 500
  };
  return (
    <div className="qrscanner">
      <QrReader
        delay={1000}
        // facingMode="environment"
        // chooseDeviceId={facingMode}
        style={previewStyle}

        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
}

export default SigninQR;
