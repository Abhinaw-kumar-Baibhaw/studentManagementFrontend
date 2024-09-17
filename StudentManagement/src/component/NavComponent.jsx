import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Student from './Student'; 
import GetAll from './GetAll';
import GetById from './GetById';
import DeleteById from './DeleteById';
import AllCourses from './AllCourses';
import SearchByCourse from './SearchByCourse';
import '../css/NavComponent.css'; // Custom CSS file for additional styling

function NavComponent() {
  return (
    <Router>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">STUDENT_MANAGEMENT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/registration">Register Student</Nav.Link>
              <Nav.Link as={Link} to="/showdetails">Student Details</Nav.Link>
              <Nav.Link as={Link} to="/getbyId">Show Details by Id</Nav.Link>
              <Nav.Link as={Link} to="/deletebyId">Delete by Id</Nav.Link>
              <Nav.Link as={Link} to="/allCourses">See Courses</Nav.Link>
              <Nav.Link as={Link} to="/showByCourse">ByCourse</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/showdetails" element={<GetAll />} />
          <Route path="/registration" element={<Student />} />
          <Route path="/getbyId" element={<GetById />} />
          <Route path="/deletebyId" element={<DeleteById />} />
          <Route path="/allCourses" element={<AllCourses />} />
          <Route path="/showByCourse" element={<SearchByCourse />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default NavComponent;
