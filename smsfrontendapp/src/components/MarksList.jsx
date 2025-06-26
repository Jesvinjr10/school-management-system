import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function MarksList() {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMarkId, setEditingMarkId] = useState(null);
  const [form, setForm] = useState({ student_id: '', subject: '', marks: '', teacher_id: '' });
  const [search, setSearch] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${API_URL}/marks`).then(res => setMarks(res.data));
    axios.get(`${API_URL}/students`).then(res => setStudents(res.data));
    axios.get(`${API_URL}/teachers`).then(res => setTeachers(res.data));
  };

  const openModal = (mark = null) => {
    if (mark) {
      setForm({
        student_id: mark.student_id,
        subject: mark.subject,
        marks: mark.marks,
        teacher_id: mark.teacher_id,
      });
      setEditingMarkId(mark.id);
    } else {
      setForm({ student_id: '', subject: '', marks: '', teacher_id: '' });
      setEditingMarkId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    const url = editingMarkId
      ? `${API_URL}/marks/${editingMarkId}`
      : `${API_URL}/marks`;
    const method = editingMarkId ? axios.put : axios.post;

    method(url, form)
      .then(() => {
        fetchData();
        setShowModal(false);
      })
      .catch(err => console.error('Submit Error:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/marks/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(err => console.error('Delete Error:', err));
  };

  const filteredMarks = marks.filter((m) => {
    const query = search.toLowerCase();
    return (
      m.student_name?.toLowerCase().includes(query) ||
      m.student_class?.toLowerCase().includes(query) ||
      m.subject?.toLowerCase().includes(query) ||
      m.teacher_name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mt-5">
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h2 className="d-flex align-items-center">
            <i className="bi bi-journal-check me-2 text-primary fs-3"></i>
            <span className="fw-bold text-dark">Marks List</span>
          </h2>
        </Col>
        <Col md={4}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by student, subject, or teacher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={() => openModal()} className="w-100">
            <i className="bi bi-plus-circle-fill me-1"></i> Add
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.length > 0 ? (
              filteredMarks.map((m, i) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td>{m.student_id}</td>
                  <td>{m.student_name}</td>
                  <td>{m.student_class}</td>
                  <td>{m.subject}</td>
                  <td>{m.teacher_name}</td>
                  <td>{m.marks}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => openModal(m)} className="me-2">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(m.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8">No matching records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingMarkId ? 'Edit Marks' : 'Add Marks'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select value={form.student_id} onChange={e => setForm({ ...form, student_id: e.target.value })}>
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.class})</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                value={form.marks}
                onChange={e => setForm({ ...form, marks: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teacher</Form.Label>
              <Form.Select value={form.teacher_id} onChange={e => setForm({ ...form, teacher_id: e.target.value })}>
                <option value="">Select Teacher</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>{editingMarkId ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
