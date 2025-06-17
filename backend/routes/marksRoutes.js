const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT m.id, m.student_id, s.name AS student_name, s.class AS student_class,
           m.subject, m.marks, m.teacher_id, t.name AS teacher_name
    FROM marks m
    JOIN students s ON m.student_id = s.id
    JOIN teachers t ON m.teacher_id = t.id
    ORDER BY m.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// CREATE
router.post('/', (req, res) => {
  const { student_id, teacher_id, subject, marks } = req.body;
  const sql = 'INSERT INTO marks (student_id, teacher_id, subject, marks) VALUES (?, ?, ?, ?)';
  db.query(sql, [student_id, teacher_id, subject, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, student_id, teacher_id, subject, marks });
  });
});

// UPDATE 
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { student_id, teacher_id, subject, marks } = req.body;
  const sql = 'UPDATE marks SET student_id=?, teacher_id=?, subject=?, marks=? WHERE id=?';
  db.query(sql, [student_id, teacher_id, subject, marks, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Mark updated successfully' });
  });
});

// DELETE 
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM marks WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Mark deleted successfully' });
  });
});

module.exports = router;
