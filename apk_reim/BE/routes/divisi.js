// routes/divisi.js
const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/database");

// Read all divisi
router.get("/divisi", (req, res) => {
  mysqlConnection.query("SELECT * FROM divisi", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific divisi
router.get("/divisi/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM divisi WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Insert a divisi
router.post("/divisi", (req, res) => {
  const { nama } = req.body;
  mysqlConnection.query(
    "INSERT INTO divisi (nama) VALUES (?)",
    [nama],
    (err, rows, fields) => {
      if (!err) res.send("Divisi berhasil ditambahkan");
      else console.log(err);
    }
  );
});

// Update a divisi
router.put("/divisi/:id", (req, res) => {
  const { nama } = req.body;
  mysqlConnection.query(
    "UPDATE divisi SET nama = ? WHERE id = ?",
    [nama, req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Divisi berhasil diperbarui");
      else console.log(err);
    }
  );
});

// Delete a divisi
router.delete("/divisi/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM divisi WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Divisi berhasil dihapus");
      else console.log(err);
    }
  );
});

module.exports = router;
