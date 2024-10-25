import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import "./signin.css";
// import { FcGoogle } from "react-icons/fc";
// import { signInWithGoogle } from './firebase';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  const Register = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:4000/api/user/signup", { userName, email, password, role });
      if (user) {
        alert("Congratualation..! Your Registraistion is  successfully Done.");
      } else {
        alert("Please fill valid details.");
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(user.token));
      navigate('/');
    } catch (error) {
      alert("This email is Already exist..!")
      navigate('/signup');
    }
  }


  // register using google a/c
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const SCOPES = 'profile email https://www.googleapis.com/auth/calendar.readonly';

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: clientId,
        scope: SCOPES
      })
    };
    gapi.load('client:auth2', start);
  })


  const handleLogin = (googleData) => {
    if (googleData) {
      setUserName(googleData.profileObj.name)
      setEmail(googleData.profileObj.email)
      handleShow()
    }
  }

  const handleFailure = (err) => {
    console.log("Login failed:", err)
  }


  return (
    <div className='form_body px-5 py-5'>
      <div className='col-6 mx-auto border border-secondary px-4 py-4 form'>
        <div className='d-flex justify-content-center mb-2'>
          <h1>Sign Up</h1>
        </div>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Your Name" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Your Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </Form.Group>

          <div className='text-center mb-3'>
            <Button variant="primary" className='col-6 mb-3' type="submit" onClick={(e) => Register(e)}>
              Register
            </Button>
            <div>
              <GoogleLogin
                clientId={clientId}
                buttonText="Register using Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
            </div>
          </div>
          <div className='d-flex justify-content-evenly'>
            <div><NavLink to={"/"}>SIgn In</NavLink></div>
          </div>
        </Form>

      </div>

      {/* form for Registraistion using google a/c */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup with Google</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Enter Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Role
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Role" name='role' value={role} onChange={(e) => setRole(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => Register(e)}>Register</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Signup
