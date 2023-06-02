import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import "../style/login.css"

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  // useEffect
  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "light",
      })
    }

    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [isSuccess, isError, message, navigate, user, dispatch])


  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, password, password2);
    const loginData = {
      email,
      password
    }
    // dispatch login
    dispatch(login(loginData))
  };

  function redirectToRegister() {
    navigate("/register")
  }
 
  return (
    <div className='center-div'>


      <div className='formFlex'>

        <div>
          <img src='./img/login.svg' width={400} />
        </div>

        <div className="form" >
          <div className="form-group">
            <form onSubmit={onSubmit}>

              <h2 className='login-title'>Login</h2>
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

              {/* button */}
              <div className="form-group login-btn d-flex justify-content-between">
                <button className="btn btn-block register-btn-btn" onClick={redirectToRegister}>
                  Register
                </button>
                <button type="submit" className="btn btn-block login-btn-btn">
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login