import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Student from './Student'; 
import GetAll from './GetAll';
import GetById from './GetById';

function NavComponent() {
  return (
    <Router>
      <div>
        <Navbar  expand="lg">
          <Navbar.Brand as={Link} to="/">STUDENT_MANAGEMENT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
              <Nav.Link as={Link} to="/showdetails">Student Details</Nav.Link>
              <Nav.Link as={Link} to="/getbyId">Show Details byId</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-4">
          <Routes>
            <Route path="/showdetails" element={<GetAll />} />
            <Route path="/registration" element={<Student />} />
            <Route path="/getbyId" element={<GetById />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default NavComponent;
