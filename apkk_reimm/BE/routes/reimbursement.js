// routes/reimbursement.js
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database');

// Read all reimbursement
router.get('/reimbursement', (req, res) => {
  mysqlConnection.query('SELECT * FROM reimbursement', (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific reimbursement
router.get('/reimbursement/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM reimbursement WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Insert a reimbursement
router.post('/reimbursement', (req, res) => {
  const { tanggal, pegawai_id, tipe_pengajuan_id, jumlah, bukti_transaksi, keterangan, status, alasan } = req.body;
  mysqlConnection.query('INSERT INTO reimbursement (tanggal, pegawai_id, tipe_pengajuan_id, jumlah, bukti_transaksi, keterangan, status, alasan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [tanggal, pegawai_id, tipe_pengajuan_id, jumlah, bukti_transaksi, keterangan, status, alasan],
    (err, rows, fields) => {
      if (!err) res.send('Reimbursement berhasil ditambahkan');
      else console.log(err);
    });
});

// Update a reimbursement
router.put('/reimbursement/:id', (req, res) => {
  const { tanggal, pegawai_id, tipe_pengajuan_id, jumlah, bukti_transaksi, keterangan, status, alasan } = req.body;
  mysqlConnection.query('UPDATE reimbursement SET tanggal = ?, pegawai_id = ?, tipe_pengajuan_id = ?, jumlah = ?, bukti_transaksi = ?, keterangan = ?, status = ?, alasan = ? WHERE id = ?',
    [tanggal, pegawai_id, tipe_pengajuan_id, jumlah, bukti_transaksi, keterangan, status, alasan, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send('Reimbursement berhasil diperbarui');
      else console.log(err);
    });
});

// Delete a reimbursement
router.delete('/reimbursement/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM reimbursement WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send('Reimbursement berhasil dihapus');
    else console.log(err);
  });
});

module.exports = router;
