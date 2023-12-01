// routes/type.js
const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

// Read all type
router.get("/type", (req, res) => {
  mysqlConnection.query("SELECT * FROM type", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific type
router.get("/type/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM type WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Insert a type
router.post("/type", (req, res) => {
  const { name } = req.body;
  mysqlConnection.query(
    "INSERT INTO type (name) VALUES (?)",
    [name],
    (err, rows, fields) => {
      if (!err) res.send("Type created successfully");
      else console.log(err);
    }
  );
});

// Update a type
router.put("/type/:id", (req, res) => {
  const { name } = req.body;
  mysqlConnection.query(
    "UPDATE type SET name = ? WHERE id = ?",
    [name, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Type updated successfully");
      else console.log(err);
    }
  );
});

// Delete a type
router.delete("/type/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM type WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Type deleted successfully");
      else console.log(err);
    }
  );
});

module.exports = router;
