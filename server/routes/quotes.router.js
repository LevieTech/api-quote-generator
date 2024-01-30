const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Read all quotes
router.get('/api/quotes', (req, res) => {
  pool.query('SELECT * FROM quotes', (err, result) => {
    if (err) {
      console.error('Error fetching quotes:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Create a new quote
router.post('/api/quotes', (req, res) => {
  const { content, author } = req.body;
  pool.query(
    'INSERT INTO quotes (content, author) VALUES ($1, $2) RETURNING *',
    [content, author],
    (err, result) => {
      if (err) {
        console.error('Error creating quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

// Update a quote by ID
router.put('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;
  pool.query(
    'UPDATE quotes SET content = $1, author = $2 WHERE id = $3 RETURNING *',
    [content, author, id],
    (err, result) => {
      if (err) {
        console.error('Error updating quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Quote not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

// Delete a quote by ID
router.delete('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    'DELETE FROM quotes WHERE id = $1 RETURNING *',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error deleting quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Quote not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

module.exports = router;
