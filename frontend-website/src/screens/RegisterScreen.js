import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if(password!== confirmPassword){
      alert(" Password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1> Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="name"
            placeholder=" enter ur name"
            required
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            id="email"
            placeholder=" enter ur email"
            required
            onChange={e => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="inter ur password"
            required
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="confirmpassword"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {" "}
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
