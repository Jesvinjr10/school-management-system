import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeacherList.css';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({ name: '', subject: '' });

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers(searchQuery);
  }, [teachers, searchQuery]);

  const fetchTeachers = () => {
    axios.get(`${API_URL}/teachers`).then(res => {
      setTeachers(res.data);
      setFilteredTeachers(res.data);
    });
  };

  const filterTeachers = (query) => {
    if (!query) {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.subject.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTeachers(filtered);
    }
  };

  const openModal = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({ name: teacher.name, subject: teacher.subject });
    } else {
      setEditingTeacher(null);
      setFormData({ name: '', subject: '' });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({ name: '', subject: '' });
    setEditingTeacher(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.subject) return;

    const request = editingTeacher
      ? axios.put(`${API_URL}/teachers/${editingTeacher.id}`, formData)
      : axios.post(`${API_URL}/teachers`, formData);

    request.then(() => {
      fetchTeachers();
      closeModal();
    });
  };

  const deleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      axios.delete(`${API_URL}/teachers/${id}`).then(() => {
        setTeachers(teachers.filter(t => t.id !== id));
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3 header-bar">
        <h2 className="m-0 text-center text-md-start flex-grow-1">👨‍🏫 Teacher List</h2>

        <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 w-sm-auto" onClick={() => openModal()}>
            <i className="bi bi-plus-circle me-1"></i>Add Teacher
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2" onClick={() => openModal(t)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTeacher(t.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filteredTeachers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No matching teachers found.</td>
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
                <h5 className="modal-title">{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {editingTeacher ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
