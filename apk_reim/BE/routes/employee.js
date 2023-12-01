// routes/employee.js
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database');

// Read all employee
router.get('/employee', (req, res) => {
  const query = `
    SELECT employee.*, department.name AS department_name
    FROM employee
    JOIN department ON employee.department_id = department.id;
  `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific employee
router.get('/employee/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Insert a employee
router.post('/employee', (req, res) => {
  const { name, nrp, department_id, username, email, password } = req.body;
  mysqlConnection.query('INSERT INTO employee (name, nrp, department_id, username, email, password) VALUES (?, ?, ?, ?, ?, ?)', [name, nrp, department_id, username, email, password], (err, rows, fields) => {
    if (!err) res.send('employee created successfully');
    else console.log(err);
  });
});

// Update a employee
router.patch('/employee/:id', (req, res) => {
  const { name, nrp, department_id, username, email, password } = req.body;
  mysqlConnection.query('UPDATE employee SET name = ?, nrp = ?, department_id = ?, username = ?, email = ?, password = ? WHERE id = ?', [name, nrp, department_id, username, email, password, req.params.id], (err, rows, fields) => {
    if (!err) res.send('employee updated successfully');
    else console.log(err);
  });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) res.send('employee deleted successfully');
    else console.log(err);
  });
});

module.exports = router;
