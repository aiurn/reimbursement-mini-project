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
  const { date, employee_id, type_id, amount, transaction_receipt, note, status, reason } = req.body;
  mysqlConnection.query('INSERT INTO reimbursement (date, employee_id, type_id, amount, transaction_receipt, note, status, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [date, employee_id, type_id, amount, transaction_receipt, note, status, reason],
    (err, rows, fields) => {
      if (!err) res.send('Reimbursement created successfully');
      else console.log(err);
    });
});

// Update a reimbursement
router.put('/reimbursement/:id', (req, res) => {
  const { date, employee_id, type_id, amount, transaction_receipt, note, status, reason } = req.body;
  mysqlConnection.query('UPDATE reimbursement SET date = ?, employee_id = ?, type_id = ?, amount = ?, transaction_receipt = ?, note = ?, status = ?, reason = ? WHERE id = ?',
    [date, employee_id, type_id, amount, transaction_receipt, note, status, reason, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send('Reimbursement updated successfully');
      else console.log(err);
    });
});

// Delete a reimbursement
router.delete('/reimbursement/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM reimbursement WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send('Reimbursement deleted successfully');
    else console.log(err);
  });
});

module.exports = router;
