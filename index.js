const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET semua rumah sakit
app.get('/hospitals', async (req, res) => {
  const result = await pool.query('SELECT * FROM hospitals ORDER BY id');
  res.json(result.rows);
});

// GET detail rumah sakit
app.get('/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM hospitals WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// POST tambah rumah sakit
app.post('/hospitals', async (req, res) => {
  const { name, address, phone, type } = req.body;
  await pool.query(
    'INSERT INTO hospitals (name, address, phone, type) VALUES ($1, $2, $3, $4)',
    [name, address, phone, type]
  );
  res.send('Hospital added');
});

// PUT update rumah sakit
app.put('/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, type } = req.body;
  await pool.query(
    'UPDATE hospitals SET name = $1, address = $2, phone = $3, type = $4 WHERE id = $5',
    [name, address, phone, type, id]
  );
  res.send('Hospital updated');
});

// DELETE rumah sakit
app.delete('/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM hospitals WHERE id = $1', [id]);
  res.send('Hospital deleted');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
