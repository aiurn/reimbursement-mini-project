// routes/pegawai.js
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database');

// Read all pegawai
router.get('/pegawai', (req, res) => {
  mysqlConnection.query('SELECT * FROM pegawai', (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific pegawai
router.get('/pegawai/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM pegawai WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Insert a pegawai
router.post('/pegawai', (req, res) => {
  const { nrp, divisi_id } = req.body;
  mysqlConnection.query('INSERT INTO pegawai (nrp, divisi_id) VALUES (?, ?)', [nrp, divisi_id], (err, rows, fields) => {
    if (!err) res.send('Pegawai berhasil ditambahkan');
    else console.log(err);
  });
});

// Update a pegawai
router.put('/pegawai/:id', (req, res) => {
  const { nrp, divisi_id } = req.body;
  mysqlConnection.query('UPDATE pegawai SET nrp = ?, divisi_id = ? WHERE id = ?', [nrp, divisi_id, req.params.id], (err, rows, fields) => {
    if (!err) res.send('Pegawai berhasil diperbarui');
    else console.log(err);
  });
});

// Delete a pegawai
router.delete('/pegawai/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM pegawai WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send('Pegawai berhasil dihapus');
    else console.log(err);
  });
});

module.exports = router;
