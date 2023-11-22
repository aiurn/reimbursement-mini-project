   // routes/tipe_pengajuan.js
   const express = require('express');
   const router = express.Router();
   const mysqlConnection = require('../config/database');

   // Read all tipe_pengajuan
   router.get('/tipe_pengajuan', (req, res) => {
     mysqlConnection.query('SELECT * FROM tipe_pengajuan', (err, rows, fields) => {
       if (!err) res.send(rows);
       else console.log(err);
     });
   });

   // Read a specific tipe_pengajuan
   router.get('/tipe_pengajuan/:id', (req, res) => {
     mysqlConnection.query('SELECT * FROM tipe_pengajuan WHERE id = ?', [req.params.id], (err, rows, fields) => {
       if (!err) res.send(rows);
       else console.log(err);
     });
   });

   // Insert a tipe_pengajuan
   router.post('/tipe_pengajuan', (req, res) => {
     const { nama } = req.body;
     mysqlConnection.query('INSERT INTO tipe_pengajuan (nama) VALUES (?)', [nama], (err, rows, fields) => {
       if (!err) res.send('Tipe Pengajuan berhasil ditambahkan');
       else console.log(err);
     });
   });

   // Update a tipe_pengajuan
   router.put('/tipe_pengajuan/:id', (req, res) => {
     const { nama } = req.body;
     mysqlConnection.query('UPDATE tipe_pengajuan SET nama = ? WHERE id = ?', [nama, req.params.id], (err, rows, fields) => {
       if (!err) res.send('Tipe Pengajuan berhasil diperbarui');
       else console.log(err);
     });
   });

   // Delete a tipe_pengajuan
   router.delete('/tipe_pengajuan/:id', (req, res) => {
     mysqlConnection.query('DELETE FROM tipe_pengajuan WHERE id = ?', [req.params.id], (err, rows, fields) => {
       if (!err) res.send('Tipe Pengajuan berhasil dihapus');
       else console.log(err);
     });
   });

   module.exports = router;
