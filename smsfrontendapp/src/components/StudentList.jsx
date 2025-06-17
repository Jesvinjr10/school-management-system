import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentList.css';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', class: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents(searchQuery);
  }, [students, searchQuery]);

  const fetchStudents = () => {
    axios.get('http://localhost:3001/students')
      .then(res => {
        setStudents(res.data);
        setFilteredStudents(res.data);
      });
  };

  const filterStudents = (query) => {
    if (!query) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.class.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const openModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({ name: student.name, class: student.class });
    } else {
      setEditingStudent(null);
      setFormData({ name: '', class: '' });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({ name: '', class: '' });
    setEditingStudent(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.class) return;

    const req = editingStudent
      ? axios.put(`http://localhost:3001/students/${editingStudent.id}`, formData)
      : axios.post('http://localhost:3001/students', formData);

    req.then(() => {
      fetchStudents();
      closeModal();
    });
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:3001/students/${id}`).then(() => {
        setStudents(students.filter(s => s.id !== id));
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="d-flex align-items-center">
          <i className="bi bi-people-fill me-2"></i> Student List
        </h2>
        <div className="d-flex flex-wrap gap-2">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => openModal()}>
            <i className="bi bi-plus-circle me-1"></i> Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2" onClick={() => openModal(s)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(s.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No matching students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModal}
        >
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingStudent ? 'Edit Student' : 'Add Student'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {editingStudent ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
