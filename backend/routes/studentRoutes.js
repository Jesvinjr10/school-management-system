const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new student
router.post('/', (req, res) => {
  const { name, class: className } = req.body;
  db.query('INSERT INTO students (name, class) VALUES (?, ?)', [name, className], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, class: className });
  });
});

// Update student
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, class: className } = req.body;
  db.query('UPDATE students SET name = ?, class = ? WHERE id = ?', [name, className, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Student updated' });
  });
});

// Delete student
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Student deleted' });
  });
});

module.exports = router;
