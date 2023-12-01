// routes/department.js
const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

// Read all department
router.get("/department", (req, res) => {
  mysqlConnection.query("SELECT * FROM department", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific department
router.get("/department/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM department WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Insert a department
router.post("/department", (req, res) => {
  const { name } = req.body;
  mysqlConnection.query(
    "INSERT INTO department (name) VALUES (?)",
    [name],
    (err, rows, fields) => {
      if (!err) res.send("Department created successfully");
      else console.log(err);
    }
  );
});

// Update a department
router.put("/department/:id", (req, res) => {
  const { name } = req.body;
  mysqlConnection.query(
    "UPDATE department SET name = ? WHERE id = ?",
    [name, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Department updated successfully");
      else console.log(err);
    }
  );
});

// Delete a department
router.delete("/department/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM department WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Department deleted successfully");
      else console.log(err);
    }
  );
});

module.exports = router;
