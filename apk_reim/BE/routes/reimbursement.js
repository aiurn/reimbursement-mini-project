// routes/reimbursement.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const mysqlConnection = require("../config/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(
      __dirname,
      "..",
      "public",
      "reimbursement_transaction"
    );
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Read all reimbursement
router.get("/reimbursement", (req, res) => {
  const query = `
    SELECT reimbursement.*, employee.name AS employee_name, type.name AS type_name
    FROM reimbursement
    JOIN employee ON reimbursement.employee_id = employee.id
    JOIN type ON reimbursement.type_id = type.id;
  `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

// Read a specific reimbursement
router.get("/reimbursement/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM reimbursement WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Insert a reimbursement
router.post("/reimbursement", upload.single("transaction_receipt"), (req, res) => {
    try {
      const { date, employee_id, type_id, amount, note, status, reason } =
        req.body;
      const transaction_receipt = req.file ? req.file.filename : null;

      mysqlConnection.query(
        "INSERT INTO reimbursement (date, employee_id, type_id, amount, transaction_receipt, note, status, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          date,
          employee_id,
          type_id,
          amount,
          transaction_receipt,
          note,
          status,
          reason,
        ],
        (err, rows, fields) => {
          if (!err) res.send("reimbursement created successfully");
          else console.log(err);
          // if (!err) {
          //   const finalImageURL = transaction_receipt
          //     ? `${req.protocol}://${req.get('host')}/reimbursement_transaction/${transaction_receipt}`
          //     : null;

          //   res.json({ status: 'success', image: finalImageURL });
          // } else {
          //   console.log(err);
          //   res.status(500).json({ status: 'error', message: 'Internal Server Error' });
          // }
        }
      );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
);

// Update a reimbursement
router.patch("/reimbursement/:id", upload.single("transaction_receipt"), (req, res) => {
    try {
      const { date, employee_id, type_id, amount, note, status, reason } =
        req.body;
      if (req.file) {
        const transaction_receipt = req.file.filename;
        mysqlConnection.query(
          "UPDATE reimbursement SET date = ?, employee_id = ?, type_id = ?, amount = ?, transaction_receipt = ?, note = ?, status = ?, reason = ? WHERE id = ?",
          [
            date,
            employee_id,
            type_id,
            amount,
            transaction_receipt,
            note,
            status,
            reason,
            req.params.id,
          ],
          (err, rows, fields) => {
            if (!err) res.send("Reimbursement updated successfully");
            else console.log(err);
          }
        );
      } else {
        mysqlConnection.query(
          "UPDATE reimbursement SET date = ?, employee_id = ?, type_id = ?, amount = ?, note = ?, status = ?, reason = ? WHERE id = ?",
          [
            date,
            employee_id,
            type_id,
            amount,
            note,
            status,
            reason,
            req.params.id,
          ],
          (err, rows, fields) => {
            if (!err) res.send("Reimbursement updated successfully");
            else console.log(err);
          }
        );
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
);

// Delete a reimbursement
router.delete("/reimbursement/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM reimbursement WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Reimbursement deleted successfully");
      else console.log(err);
    }
  );
});

router.patch("/reimbursement/approval/:id", upload.single("admin_proof"), (req, res) => {
  try {
    const { status, reason } = req.body;
    const admin_proof = req.file ? req.file.filename : null;

    mysqlConnection.query(
        "UPDATE reimbursement SET status=?, reason=?, admin_proof = ? WHERE id = ?",
        [
          status,
          reason,
          admin_proof,
          req.params.id,
        ],
        (err, rows, fields) => {
          if (!err) res.send("Approval successfully");
          else console.log(err);
        }
      );
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
})

module.exports = router;
