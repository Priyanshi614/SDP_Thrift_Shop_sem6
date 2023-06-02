import React from "react";
import { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/login.css"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: 0,
    password: "",
    password2: "",
  });

  const { name, email, mobile, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError) {
      console.log("errror");
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "light",
      })
    }

    if(isSuccess || user) {
      // redirect to home
      navigate("/")
    }

    dispatch(reset())

  }, [isError, isSuccess, message, user, dispatch]) 

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, password, password2);

    if (password !== password2) {
      toast.error("Passwords are not matching", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      const userData = {
        name,
        email,
        mobile,
        password,
      };
      dispatch(register(userData));
    }
  };

  function redirectToLogin() {
    navigate("/login")
  }
  return (
    <div className="center-div">
    <div className="formFlex ">
      {/* <div className="header"> {user} </div> */}
      <div>
          <img src='./img/register.svg' width={400} />
      </div>

      <div className="form">
        <div className="form-group">
          <form onSubmit={onSubmit}>
            {/* name */}
            <h2 className='login-title'>Register</h2>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />

            {/* email */}
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />

            {/* mobile number */}
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={onChange}
              placeholder="Enter your mobile number"
            />
            <small id="emailHelp" class="form-text text-muted m-3">Your Mobile Number</small>

            {/* password */}
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />

            {/* password2 */}
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Match your password"
            />

            {/* button */}
            <div className="form-group login-btn d-flex justify-content-between">
                <button className="btn btn-block register-btn-btn" onClick={redirectToLogin}>
                  Login
                </button>
                <button type="submit" className="btn btn-block login-btn-btn">
                  Register
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
