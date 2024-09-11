import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/Student.css'; // Ensure this path is correct

function GetAll() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8080/employee/getAllData');
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <button onClick={fetchData} className="btn btn-primary mb-3">See All Data</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Password</th>
                <th>Registered Date</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Course Fee</th>
                <th>Course Duration</th>
                <th>Department Name</th>
                <th>Department Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.password}</td>
                  <td>{new Date(student.date).toLocaleDateString()}</td>
                  <td>{student.course?.courseName || 'N/A'}</td>
                  <td>{student.course?.courseDescription || 'N/A'}</td>
                  <td>{student.course?.courseFee || 'N/A'}</td>
                  <td>{student.course?.duration || 'N/A'}</td>
                  <td>{student.department?.departmentName || 'N/A'}</td>
                  <td>{student.department?.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default GetAll;
