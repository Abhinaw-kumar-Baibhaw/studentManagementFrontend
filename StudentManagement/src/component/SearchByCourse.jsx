import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Student.css'; // Ensure this path is correct

function SearchByCourse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(''); // State for the input field
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from the server based on courseId
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = courseId
        ? `http://localhost:8080/employee/course/${courseId}`
        : 'http://localhost:8080/employee/getAllData';
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]); // Refetch data when courseId changes

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setSelectedStudent(null);
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value); // Update courseId on input change
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/employee/${selectedStudent.studentId}`, selectedStudent);
      alert('Record updated successfully');
      fetchData(); // Refresh data after update
      handleCloseForm(); // Close the form
    } catch (err) {
      console.error('Error updating record:', err);
      alert('Failed to update record');
    }
  };

  return (
    <div>
        <br />
        <div className="row"> <h2 className="text-primary">Student According to Course</h2></div>
        <br />
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group">
           <input
            type="text"
            className="form-control"
            placeholder="Enter Course ID"
            value={courseId}
            onChange={handleCourseChange}
          />
        </div>
      </div>

      {loading && (
        <div className="text-center mb-4">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Password</th>
                <th>Registered Date</th>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Course Fee</th>
                <th>Course Duration</th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Department Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <React.Fragment key={student.studentId}>
                  <tr>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>{student.password}</td>
                    <td>{formatDate(student.registerDate)}</td>
                    <td>{student.courses?.id || 'N/A'}</td>
                    <td>{student.courses?.courseName || 'N/A'}</td>
                    <td>{student.courses?.courseDescription || 'N/A'}</td>
                    <td>{student.courses?.courseFee || 'N/A'}</td>
                    <td>{student.courses?.duration || 'N/A'}</td>
                    <td>{student.courses?.departments && student.courses.departments.length > 0 ? student.courses.departments[0].id : 'N/A'}</td>
                    <td>{student.courses?.departments && student.courses.departments.length > 0 ? student.courses.departments[0].departmentName : 'N/A'}</td>
                    <td>{student.courses?.departments && student.courses.departments.length > 0 ? student.courses.departments[0].description : 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditClick(student)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                  {student.courses?.departments && student.courses.departments.length > 1 && student.courses.departments.slice(1).map((department, index) => (
                    <tr key={student.studentId + '-dept-' + index}>
                      <td colSpan="7"></td>
                      <td>{department.id}</td>
                      <td>{department.departmentName}</td>
                      <td>{department.description}</td>
                      <td colSpan="6"></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">No data available.</p>
      )}

      {isEditing && selectedStudent && (
        <div className="modal show" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Student</h5>
                <button type="button" className="close" onClick={handleCloseForm}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="studentId">ID:</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      className="form-control"
                      value={selectedStudent.studentId}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={selectedStudent.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  {/* Add more form fields here as needed */}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save changes</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchByCourse;
