import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./signin.css";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';


const Signin = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const onTextChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const Login = async (e) => {
    e.preventDefault();
    try {
      let user = await axios.post("http://localhost:4000/api/user/signin", userLogin);

      if (user.data.token) {
        localStorage.setItem('user', JSON.stringify(user.data));
        localStorage.setItem('token', JSON.stringify(user.data.token));
        localStorage.setItem('role', JSON.stringify(user.data.role));
      }

    } catch (error) {
      alert("Please Enter valid Email & Password.");
      console.log(error);
    }
    navigate('/gallery');
  }

  // login with google 
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  })


  const handleLogin = (googleData) => {
    console.log(googleData.profileObj);
    let name = googleData.profileObj.name;
    let email = googleData.profileObj.email;
    console.log(name, email)
  }

  const handleFailure = (err) => {
    console.log("Login failed:", err)
  }

  return (
    <div className='form_body px-5 py-5'>
      <div className='col-6 mx-auto border border-secondary px-4 py-4 form'>
        <div className='d-flex justify-content-center mb-2'>
          <h1>Sign In</h1>
        </div>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => onTextChange(e)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => onTextChange(e)} />
          </Form.Group>
          <div className='text-center'>
            <Button variant="primary" className='col-6 mb-3' type="submit" onClick={(e) => Login(e)}>
              Log In
            </Button>
          </div>
          <div className='text-center'>
            <GoogleLogin
              className='mb-3'
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
            <div><NavLink to={"/signup"}>Create New Account</NavLink></div>
          </div>
        </Form>


      </div>
    </div>
  )
}

export default Signin
