const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all teachers
router.get('/', (req, res) => {
  db.query('SELECT * FROM teachers', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new teacher
router.post('/', (req, res) => {
  const { name, subject } = req.body;
  db.query('INSERT INTO teachers (name, subject) VALUES (?, ?)', [name, subject], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, subject });
  });
});

// Update teacher
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, subject } = req.body;
  db.query('UPDATE teachers SET name = ?, subject = ? WHERE id = ?', [name, subject, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Teacher updated successfully' });
  });
});

// Delete teacher
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM teachers WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Teacher deleted successfully' });
  });
});

module.exports = router;
