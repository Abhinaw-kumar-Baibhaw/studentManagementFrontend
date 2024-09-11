import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Optional: for Bootstrap styling

function GetById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  const fetchDataById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/employee/${id}`);
      console.log("data :: ", response.data);
      setData(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Use the error message from the backend
      } else {
        setError('Failed to fetch data');
      }
      setData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '16px',
    textAlign: 'left',
  };

  useEffect(() => {
    if (id) {
      fetchDataById(id);
    }
  }, [id]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDataById(id);
  };

  // Format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container mt-4">
      <h2>Fetch Data by ID</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="id">Enter ID:</label>
          <input
            type="text"
            id="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && !data && <p className="text-danger">{error}</p>} {/* Show error only if no data is present */}
      {data && (
        <div>
          <h3>Student Details</h3>
          <table style={tableStyle} className="table table-bordered">
            <thead>
              <tr>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Age</th>
                <th style={cellStyle}>Gender</th>
                <th style={cellStyle}>Password</th>
                <th style={cellStyle}>Registered Date</th>
                <th style={cellStyle}>Verified</th>
                <th style={cellStyle}>Created At</th>
                <th style={cellStyle}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>{data.studentId}</td>
                <td style={cellStyle}>{data.name}</td>
                <td style={cellStyle}>{data.email}</td>
                <td style={cellStyle}>{data.age}</td>
                <td style={cellStyle}>{data.gender}</td>
                <td style={cellStyle}>{data.password}</td>
                <td style={cellStyle}>{formatDate(data.registerDate)}</td>
                <td style={cellStyle}>{data.verified ? 'Yes' : 'No'}</td>
                <td style={cellStyle}>{formatDate(data.createdAt)}</td>
                <td style={cellStyle}>{data.updatedAt ? formatDate(data.updatedAt) : 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <h5>Addresses</h5>
          {data.addresses && data.addresses.length > 0 ? (
            <table style={tableStyle} className="table table-bordered">
              <thead>
                <tr>
                  <th style={cellStyle}>Street Name</th>
                  <th style={cellStyle}>City</th>
                  <th style={cellStyle}>District</th>
                  <th style={cellStyle}>State</th>
                  <th style={cellStyle}>Country</th>
                  <th style={cellStyle}>Zipcode</th>
                  <th style={cellStyle}>Address Type</th>
                </tr>
              </thead>
              <tbody>
                {data.addresses.map((address) => (
                  <tr key={address.addressId}>
                    <td style={cellStyle}>{address.streetName}</td>
                    <td style={cellStyle}>{address.city}</td>
                    <td style={cellStyle}>{address.district}</td>
                    <td style={cellStyle}>{address.state}</td>
                    <td style={cellStyle}>{address.country}</td>
                    <td style={cellStyle}>{address.zipcode}</td>
                    <td style={cellStyle}>{address.addressType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No addresses available.</p>
          )}

          <h5>Mobiles</h5>
          {data.mobiles && data.mobiles.length > 0 ? (
            <table style={tableStyle} className="table table-bordered">
              <thead>
                <tr>
                  <th style={cellStyle}>Mobile Number</th>
                  <th style={cellStyle}>Mobile Type</th>
                </tr>
              </thead>
              <tbody>
                {data.mobiles.map((mobile) => (
                  <tr key={mobile.mobileId}>
                    <td style={cellStyle}>{mobile.mobileNumber}</td>
                    <td style={cellStyle}>{mobile.mobileType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No mobile details available.</p>
          )}

          <h3>Course Details</h3>
          <table style={tableStyle} className="table table-bordered">
            <thead>
              <tr>
                <th style={cellStyle}>Course Name</th>
                <th style={cellStyle}>Course Description</th>
                <th style={cellStyle}>Course Fee</th>
                <th style={cellStyle}>Created At</th>
                <th style={cellStyle}>Updated At</th>
                <th style={cellStyle}>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>{data.courses.courseName}</td>
                <td style={cellStyle}>{data.courses.courseDescription}</td>
                <td style={cellStyle}>{data.courses.courseFee}</td>
                <td style={cellStyle}>{formatDate(data.courses.createdAt)}</td>
                <td style={cellStyle}>{data.courses.updatedAt ? formatDate(data.courses.updatedAt) : 'N/A'}</td>
                <td style={cellStyle}>{data.courses.duration}</td>
              </tr>
            </tbody>
          </table>

          <h3>Departments</h3>
          {data.courses.departments && data.courses.departments.length > 0 ? (
            <table style={tableStyle} className="table table-bordered">
              <thead>
                <tr>
                  <th style={cellStyle}>Department Name</th>
                  <th style={cellStyle}>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.courses.departments.map((department) => (
                  <tr key={department.id}>
                    <td style={cellStyle}>{department.departmentName}</td>
                    <td style={cellStyle}>{department.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No departments available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default GetById;
