import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function DeleteById() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:8080/employee/${id}`);
      setMessage('Student deleted successfully');
    } catch (err) {
      setError(err.response ? err.response.data : 'Failed to delete student');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Student by ID</h2>
      <form onSubmit={handleDelete} className="mb-4">
        <div className="form-group">
          <label htmlFor="id">Student ID:</label>
          <input
            type="number"
            id="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Delete Student</button>
      </form>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default DeleteById;
