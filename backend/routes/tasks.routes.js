const express = require('express');
const db = require('../db');
const auth = require('../authMiddleware');

const router = express.Router();

// Get tasks
router.get('/', auth, (req, res) => {
  db.all(
    `SELECT * FROM tasks WHERE user_id = ?`,
    [req.userId],
    (err, rows) => {
      res.json(rows);
    }
  );
});

// Create task
router.post('/', auth, (req, res) => {
  const { title, description } = req.body;

  db.run(
    `INSERT INTO tasks (title, description, status, user_id)
     VALUES (?, ?, 'pending', ?)`,
    [title, description, req.userId],
    () => res.json({ message: 'Task created' })
  );
});

// Update task
router.put('/:id', auth, (req, res) => {
  const { status } = req.body;

  db.run(
    `UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?`,
    [status, req.params.id, req.userId],
    () => res.json({ message: 'Task updated' })
  );
});

// Delete task
router.delete('/:id', auth, (req, res) => {
  db.run(
    `DELETE FROM tasks WHERE id = ? AND user_id = ?`,
    [req.params.id, req.userId],
    () => res.json({ message: 'Task deleted' })
  );
});

module.exports = router;
