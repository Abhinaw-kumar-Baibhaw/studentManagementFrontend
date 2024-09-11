import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Student.css';

function Student() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    date: '',
    gender: '',
    addresses: [{
      streetName: '',
      city: '',
      district: '',
      state: '',
      country: '',
      zipcode: '',
      addressType: ''
    }],
    mobiles: [{
      mobileNumber: '',
      mobileType: ''
    }]
  });

  const styles = {
    width: '106%',
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black'
  };


  const submit = {
    backgroundColor:'rgb(134 53 220);'
  }

  const remove = {
    backgroundColor:'#ff0000'
  }

  const handleChange = (e, index, section) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.section === 'address') {
      const updatedAddresses = formData.addresses.map((address, idx) => {
        if (index === idx) {
          return {
            ...address,
            [name]: type === 'checkbox' ? checked : value
          };
        }
        return address;
      });

      setFormData(prevState => ({
        ...prevState,
        addresses: updatedAddresses
      }));
    } else if (dataset.section === 'mobile') {
      const updatedMobiles = formData.mobiles.map((mobile, idx) => {
        if (index === idx) {
          return {
            ...mobile,
            [name]: value
          };
        }
        return mobile;
      });

      setFormData(prevState => ({
        ...prevState,
        mobiles: updatedMobiles
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleAddAddress = () => {
    setFormData(prevState => ({
      ...prevState,
      addresses: [...prevState.addresses, {
        streetName: '',
        city: '',
        district: '',
        state: '',
        country: '',
        zipcode: '',
        addressType: ''
      }]
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData(prevState => ({
      ...prevState,
      addresses: prevState.addresses.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddMobile = () => {
    setFormData(prevState => ({
      ...prevState,
      mobiles: [...prevState.mobiles, {
        mobileNumber: '',
        mobileType: ''
      }]
    }));
  };

  const handleRemoveMobile = (index) => {
    setFormData(prevState => ({
      ...prevState,
      mobiles: prevState.mobiles.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    try {
      const response = await fetch('http://localhost:8080/employee/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the form.');
    }

    setFormData({
      name: '',
      email: '',
      age: '',
      password: '',
      date: '',
      gender: '',
      addresses: [{
        streetName: '',
        city: '',
        district: '',
        state: '',
        country: '',
        zipcode: '',
        addressType: ''
      }],
      mobiles: [{
        mobileNumber: '',
        mobileType: ''
      }]
    });
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit} className="student-form">
          {/* Student Details */}
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  style={styles}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  style={styles}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                  style={styles}
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  style={styles}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  style={styles}
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-control"
                  style={styles}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <hr />
          <h3>Address Details</h3>
          <hr />
          {formData.addresses.map((address, index) => (
            <div key={index} className="address-section">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`streetName-${index}`}>Street Name:</label>
                    <input
                      type="text"
                      id={`streetName-${index}`}
                      name="streetName"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.streetName}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`city-${index}`}>City:</label>
                    <input
                      type="text"
                      id={`city-${index}`}
                      name="city"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.city}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`district-${index}`}>District:</label>
                    <input
                      type="text"
                      id={`district-${index}`}
                      name="district"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.district}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`state-${index}`}>State:</label>
                    <input
                      type="text"
                      id={`state-${index}`}
                      name="state"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.state}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`country-${index}`}>Country:</label>
                    <input
                      type="text"
                      id={`country-${index}`}
                      name="country"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.country}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`zipcode-${index}`}>Zipcode:</label>
                    <input
                      type="text"
                      id={`zipcode-${index}`}
                      name="zipcode"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.zipcode}
                      onChange={(e) => handleChange(e, index, 'address')}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor={`addressType-${index}`}>Address Type:</label>
                    <select
                      id={`addressType-${index}`}
                      name="addressType"
                      data-section="address"
                      className="form-control"
                      style={styles}
                      value={address.addressType}
                      onChange={(e) => handleChange(e, index, 'address')}
                    >
                      <option value="">Select Address Type</option>
                      <option value="PERMANENT">PERMANENT</option>
                      <option value="WORKING">WORKING</option>
                      <option value="OTHERS">OTHERS</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-danger mt-4"
                    onClick={() => handleRemoveAddress(index)}
                    style={remove}
                  >
                    Remove Address
                  </button>
                </div>
                <div className="col-md-4">
                <button
            type="button"
            className="btn btn-success mt-4"
            onClick={handleAddAddress}
            style={{width:'100%'}}
          >
            Add Address
          </button>
                </div>
              </div>
            </div>
          ))}

          

          {/* Mobile Details */}
          <hr />
          <h3>Mobile Details</h3>
          <hr />
          <br />
          {formData.mobiles.map((mobile, index) => (
            <div key={index} className="mobile-section">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor={`mobileNumber-${index}`}>Mobile Number:</label>
                    <input
                      type="text"
                      id={`mobileNumber-${index}`}
                      name="mobileNumber"
                      data-section="mobile"
                      className="form-control"
                      style={styles}
                      value={mobile.mobileNumber}
                      onChange={(e) => handleChange(e, index, 'mobile')}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor={`mobileType-${index}`}>Mobile Type:</label>
                    <select
                      id={`mobileType-${index}`}
                      name="mobileType"
                      data-section="mobile"
                      className="form-control"
                      style={styles}
                      value={mobile.mobileType}
                      onChange={(e) => handleChange(e, index, 'mobile')}
                    >
                      <option value="">Select Mobile Type</option>
                      <option value="PERSONAL">PERSONAL</option>
                      <option value="PARENT">PARENT</option>
                      <option value="FAMILY">FAMILY</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>
              </div>
             <div className="row">
             <div className="col-md-6">
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={() => handleRemoveMobile(index)}
                style={remove}
              >
                Remove Mobile
              </button>
              </div>
             <div className="col-md-6">
             <button
            type="button"
            className="btn btn-success mt-4"
            onClick={handleAddMobile}
            style={{ width: '50%' }}
          >
            Add Mobile
          </button>
             </div>
             </div>
            </div>
          ))}

         

          <button type="submit" className="btn btn-primary mt-4" style={submit}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Student;
