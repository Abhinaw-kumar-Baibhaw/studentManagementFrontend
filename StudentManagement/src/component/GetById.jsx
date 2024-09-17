import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Optional: for Bootstrap styling

function GetById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit modes
  const [formValues, setFormValues] = useState({}); // To manage form input values

  const fetchDataById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/employee/${id}`);
      setData(response.data);
      setFormValues({
        ...response.data,
        addresses: response.data.addresses || [],
        mobiles: response.data.mobiles || []
      }); // Initialize form values
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDataById(id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues({
      ...data,
      addresses: data.addresses || [],
      mobiles: data.mobiles || []
    }); // Reset form values to the current data
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = formValues.addresses.map((address, i) =>
      i === index ? { ...address, [name]: value } : address
    );
    setFormValues(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleAddAddress = () => {
    setFormValues(prev => ({
      ...prev,
      addresses: [...prev.addresses, {
        streetName: '',
        city: '',
        district: '',
        state: '',
        country: '',
        zipcode: ''
      }]
    }));
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = formValues.addresses.filter((_, i) => i !== index);
    setFormValues(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleMobileChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMobiles = formValues.mobiles.map((mobile, i) =>
      i === index ? { ...mobile, [name]: value } : mobile
    );
    setFormValues(prev => ({
      ...prev,
      mobiles: updatedMobiles
    }));
  };

  const handleAddMobile = () => {
    setFormValues(prev => ({
      ...prev,
      mobiles: [...prev.mobiles, {
        mobileNumber: '',
        mobileType: ''
      }]
    }));
  };

  const handleRemoveMobile = (index) => {
    const updatedMobiles = formValues.mobiles.filter((_, i) => i !== index);
    setFormValues(prev => ({
      ...prev,
      mobiles: updatedMobiles
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/employee/${id}`, formValues);
      alert('Record updated successfully');
      fetchDataById(id); // Refresh data after update
      setIsEditing(false); // Close form
    } catch (err) {
      console.error('Error updating record:', err);
      alert('Failed to update record');
    }
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

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '16px',
    textAlign: 'left',
    fontWeight:'600'
  };

  useEffect(() => {
    if (id) {
      fetchDataById(id);
    } else {
      setData(null);
      setError(null);
    }
  }, [id]);

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
          {!isEditing ? (
            <div>
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

              <button className="btn btn-primary mt-3" onClick={handleEditClick}>Update</button><br /><br /><br />
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Student Details</h3>
              <table style={tableStyle} className="table table-bordered">
                <thead>
                  <tr>
                    <th style={cellStyle}>Field</th>
                    <th style={cellStyle}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={cellStyle}>Name</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formValues.name || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Email</td>
                    <td style={cellStyle}>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formValues.email || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Age</td>
                    <td style={cellStyle}>
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formValues.age || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Gender</td>
                    <td style={cellStyle}>
                      <select
                        name="gender"
                        className="form-control"
                        value={formValues.gender || ''}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Password</td>
                    <td style={cellStyle}>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formValues.password || ''}
                        onChange={handleFormChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Street Name</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="streetName"
                        className="form-control"
                        value={formValues.addresses[0]?.streetName || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>District</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="district"
                        className="form-control"
                        value={formValues.addresses[0]?.district || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>City</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formValues.addresses[0]?.city || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>State</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formValues.addresses[0]?.state || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Country</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={formValues.addresses[0]?.country || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>ZipCode</td>
                    <td style={cellStyle}>
                      <input
                        type="number"
                        name="zipcode"
                        className="form-control"
                        value={formValues.addresses[0]?.zipcode || ''}
                        onChange={(e) => handleAddressChange(0, e)} // Handle address input changes
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style={cellStyle}>Mobile Number</td>
                    <td style={cellStyle}>
                      <input
                        type="number"
                        name="mobileNumber"
                        className="form-control"
                        value={formValues.mobiles[0]?.mobileNumber || ''}
                        onChange={(e) => handleMobileChange(0, e)} // Handle mobile input changes
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Mobile Type</td>
                    <td style={cellStyle}>
                      <input
                        type="text"
                        name="mobileType"
                        className="form-control"
                        value={formValues.mobiles[0]?.mobileType || ''}
                        onChange={(e) => handleMobileChange(0, e)} // Handle mobile input changes
                        required
                      />
                    </td>
                  </tr>                 
                </tbody>
              </table>

              <button type="submit" className="btn btn-primary">Save Changes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>Cancel</button><br /><br /><br /><br /><br />
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default GetById;
