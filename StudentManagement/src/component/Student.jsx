import React, { useState } from 'react';
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
    isVerified: 'false',
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
    }],
    courses: {
      id: '',
      name: '',
      courseDescription: '',
      courseFee: '',
      createdAt: '',
      updatedAt: '',
      duration: '',
      departments: []
    },
    departmentDto: {
      id: '',
      name: ''
    }
  });

  const [courseData, setCourseData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);

  const addressTypes = ["PERMANENT", "WORKING", "OTHERS"];
  const mobileTypes = ["PERSONAL", "PARENT", "FAMILY", "OTHERS"];

  const styles = {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black'
  };

  const floaat = {
    float:'right'
  }

  const floaat1 = {
    width: '85px',
    float:'right'
  }
  const addButton = {
    float:'right',
    width:'30%',
    backgroundColor:'gray',
    color:'black',
  }
  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    marginTop:'20px'
  };

  const addDiv = {
    marginBottom: '2%',
    marginTop:'2%',
    fontSize:'25px'
  }
  const addDiv1 = {
    marginBottom: '10%',
    marginTop:'2%',
    fontSize:'25px'
  }

  const submitStyle = {
    backgroundColor: 'rgb(134 53 220)',
    color: 'white'
  };

  const removeStyle = {
    backgroundColor: '#ff0000',
    color: 'white'
  };
 

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
    } else if (dataset.section === 'course') {
      // Handle course data update
      setFormData(prevState => {
        const updatedCourses = {
          ...prevState.courses,
          [name]: value
        };
  
        // Clear all course fields if the ID is empty
        if (name === 'id' && !value) {
          return {
            ...prevState,
            courses: {
              id: '',
              name: '',
              courseDescription: '',
              courseFee: '',
              duration: ''
            },
            departmentDto: {
              id: '',
              name: '',
              description: ''
            }
          };
        }
  
        return {
          ...prevState,
          courses: updatedCourses
        };
      });
  
      // Fetch course data if ID is provided
      if (name === 'id') {
        fetchCourseData(value);
      }
    } else if (dataset.section === 'department') {
      // Handle department data update
      setFormData(prevState => ({
        ...prevState,
        departmentDto: {
          ...prevState.departmentDto,
          [name]: value
        }
      }));
  
      // Fetch department data if ID is provided
      if (name === 'id') {
        fetchDepartmentData(value);
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  
  const fetchCourseData = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/course/${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      // Extract the first department if it exists
      const department = data.departments && data.departments[0] ? data.departments[0] : {};
  
      setCourseData(data);
      setFormData(prevState => ({
        ...prevState,
        courses: {
          ...prevState.courses,
          id: data.id || '',
          name: data.courseName || '',
          courseDescription: data.courseDescription || '',
          courseFee: data.courseFee || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
          duration: data.duration || '',
          departments: data.departments || []
        },
        departmentDto: {
          id: department.id || '',
          name: department.departmentName || '',
          description: department.description || ''
        }
      }));
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const fetchDepartmentData = async (departmentId) => {
    try {
      const response = await fetch(`http://localhost:8080/department/${departmentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDepartmentData(data);
      setFormData(prevState => ({
        ...prevState,
        departmentDto: {
          ...prevState.departmentDto,
          name: data.departmentName || ''
        }
      }));
    } catch (error) {
      console.error('Error fetching department data:', error);
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

    const formattedData = {
      name: formData.name,
      age: formData.age,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      isVerified: formData.isVerified,
      addresses: formData.addresses,
      mobiles: formData.mobiles,
      courses: formData.courses,
      departmentDto: formData.departmentDto
    };

    try {
      const response = await fetch('http://localhost:8080/employee/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
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
      isVerified: 'false',
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
      }],
      courses: {
        id: '',
        name: '',
        courseDescription: '',
        courseFee: '',
        createdAt: '',
        updatedAt: '',
        duration: '',
        departments: []
      },
      departmentDto: {
        id: '',
        name: '',
        description:''
      }
    });
    setCourseData(null);
    setDepartmentData(null);
    
  };

  return (
    <div className="container mt-4">
      <h2>Student Adm. Register Form</h2><hr className='thin'/>
      <form onSubmit={handleSubmit} className="student-form form-group">
       <div style={boxStyle}>
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
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="name">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="form-control"
                style={styles}
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="name">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                style={styles}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
       </div>

        {/* Addresses */}
        <div style={addDiv}> <label>Addresses:</label></div>
        <div style={boxStyle}>
        <div className="form-group">
          {formData.addresses.map((address, index) => (
            <div key={index} className="address-container">
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                </div>
              </div>
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
                  required
                >
                  <option value="">Select Type</option>
                  {addressTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {formData.addresses.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  style={removeStyle}
                  onClick={() => handleRemoveAddress(index)}
                >
                  Remove Address
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            style={floaat}
            className="btn btn-primary"
            onClick={handleAddAddress}
          >
           Add More
          </button>
        </div>
        </div>

        {/* Mobiles */}
        <div style={addDiv}><label>Mobiles:</label></div>
        <div style={boxStyle}>
        <div className="form-group">
         
         {formData.mobiles.map((mobile, index) => (
           <div key={index} className="mobile-container">
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
                     required
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
                     required
                   >
                     <option value="">Select Type</option>
                     {mobileTypes.map((type, idx) => (
                       <option key={idx} value={type}>{type}</option>
                     ))}
                   </select>
                 </div>
               </div>
             </div>
             {formData.mobiles.length > 1 && (
               <button
                 type="button"
                 className="btn btn-danger"
                 style={removeStyle}
                 onClick={() => handleRemoveMobile(index)}
               >
                 Remove Mobile
               </button>
             )}
           </div>
         ))}
         <button
           type="button"
           style={floaat}
           className="btn btn-primary"
           onClick={handleAddMobile}
         >
           Add More 
         </button>
       </div>
        </div>

        {/* Course Details */}
       <div className="row">
        <div className="col-6">
        <div style={addDiv1}><label htmlFor="">Course Details</label></div>
     <div style={boxStyle}>
     <div className="form-group">
        <label htmlFor="courseId">Course ID:&nbsp;&nbsp;</label>
        <label htmlFor="">(eg: 1, 2, 3, ...)</label>
        <input
          type="text"
          id="courseId"
          name="id"
          className="form-control"
          style={styles}
          value={formData.courses.id}
          onChange={(e) => handleChange(e, 'course')}
          data-section="course"
          required
        />
      </div>
      <div className="form-group">
       <div className="input-container">
       <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          name="name"
          className="form-control"
          style={styles}
          value={formData.courses.name}
          onChange={(e) => handleChange(e, 'course')}
          data-section="course"
          required
          readOnly
        />
         <span className="read-only-indicator" title="This field is read-only"></span>
       </div>
      </div>
      <div className="form-group">
        <div className="input-container">
        <label htmlFor="courseDescription">Course Description:</label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          className="form-control"
          style={styles}
          value={formData.courses.courseDescription}
          onChange={(e) => handleChange(e, 'course')}
          data-section="course"
          required
          readOnly
        />
         <span className="read-only-indicator" title="This field is read-only"></span>
        </div>

      </div>
      <div className="form-group">
       <div className="input-container">
       <label htmlFor="courseFee">Course Fee:</label>
        <input
          type="text"
          id="courseFee"
          name="courseFee"
          className="form-control"
          style={styles}
          value={formData.courses.courseFee}
          onChange={(e) => handleChange(e, 'course')}
          data-section="course"
          required
          readOnly
        />
                 <span className="read-only-indicator" title="This field is read-only"></span>
       </div>
      </div>
      <div className="form-group">
        <div className="input-container">
        <label htmlFor="courseDuration">Course Duration:</label>
        <input
          type="text"
          id="courseDuration"
          name="duration"
          className="form-control"
          style={styles}
          value={formData.courses.duration}
          onChange={(e) => handleChange(e, 'course')}
          data-section="course"
          required
          readOnly
        />
         <span className="read-only-indicator" title="This field is read-only"></span>
      </div>
        </div>
      </div>
        </div>

      <div className="col-6">
      <div style={addDiv1}><label htmlFor="">Department Details</label></div>
      <div style={boxStyle}>
      <div className="form-group">
        
       <div className="input-container">
       <label htmlFor="departmentId">Department ID:</label>
        <input
          type="text"
          id="departmentId"
          name="id"
          className="form-control"
          style={styles}
          value={formData.departmentDto.id}
          onChange={(e) => handleChange(e, 'department')}
          data-section="department"
          required
          readOnly
        />
         <span className="read-only-indicator" title="This field is read-only"></span>
      </div>
       </div>
      <div className="form-group">
  <label htmlFor="departmentName">Department Name:</label>
  <div className="input-container">
    <input
      type="text"
      id="departmentName"
      name="name"
      className="form-control"
      style={styles}
      value={formData.departmentDto.name}
      onChange={(e) => handleChange(e, 'department')}
      data-section="department"
      required
      readOnly
    />
    <span className="read-only-indicator" title="This field is read-only"></span>
  </div>
</div>

      <div className="form-group">
       <div className="input-container">
       <label htmlFor="departmentDescription">Description:</label>
        <input
          type="text"
          id="departmentDescription"
          name="description"
          className="form-control"
          style={styles}
          value={formData.departmentDto.description || ''}
          onChange={(e) => handleChange(e, 'department')}
          data-section="department"
          required
          readOnly
        />
         <span className="read-only-indicator" title="This field is read-only"></span>
      </div>
       </div>
     </div>
      </div>
     </div>
        
       
        <button type="submit"  className="btn btn-success" style={floaat}>
          Submit
        </button>
      </form>

    </div>
  );
};

export default Student;
