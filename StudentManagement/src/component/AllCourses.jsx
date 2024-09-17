import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/allCourses'); // Adjust endpoint as needed
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  const body1 = {
    fontWeight:'600'
  }

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>
      {error && <p className="text-danger">{error}</p>}
      {!error && courses.length === 0 && <p>No courses available</p>}
      {!error && courses.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Fee</th>
                <th>Duration (Years)</th>
                <th>Departments</th>
                <th>Department Description</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={body1}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseDescription}</td>
                  <td>{course.courseFee.toLocaleString()}</td>
                  <td>{course.duration}</td>
                  <td>
                    {/* Display department names */}
                    {course.departments.map((dept, idx) => (
                      <div key={dept.departmentName + idx}>
                        {idx > 0 && <br />} {/* Add a line break between department names */}
                        {dept.departmentName}
                      </div>
                    ))}
                  </td>
                  <td>
                    {/* Display department descriptions */}
                    {course.departments.map((dept, idx) => (
                      <div key={dept.description + idx}>
                        {idx > 0 && <br />} {/* Add a line break between department descriptions */}
                        {dept.description}
                      </div>
                    ))}
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllCourses;