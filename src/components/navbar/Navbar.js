import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem('user');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='navbar '>
      <Nav variant="pills" className='container' activeKey="/home">
        <div>
          <img className='logo_img' src='https://yt3.ggpht.com/a/AATXAJzJFDdwChDwra9BJKZ_alpqdZ6cp0fp76Edgw=s900-c-k-c0xffffffff-no-rj-mo' alt='logo' />
        </div>

        <div className='d-flex'>
          {
            auth ?
            <Nav.Item className='nav_tabs'>
              <Nav.Link className='link' href="/" onClick={logout} eventKey="">LogOut</Nav.Link>
            </Nav.Item>
          :<>
            <Nav.Item className='nav_tabs'>
              <Nav.Link className='link' href="/">Sign In</Nav.Link>
            </Nav.Item>
           
            <Nav.Item className='nav_tabs'>
              <Nav.Link className='link' href="/signup">Sign Up</Nav.Link>
            </Nav.Item>
            </>
          }
        </div>
      </Nav>
    </div>
  )
}

export default Navbar
