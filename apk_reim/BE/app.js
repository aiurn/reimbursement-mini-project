// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 3306;
const bodyParser = require("body-parser");
const departmentRoutes = require("./routes/department");
const employeeRoutes = require("./routes/employee");
const reimbursementRoutes = require("./routes/reimbursement");
const typeRoutes = require("./routes/type");
// const FileUpload = require("express-fileupload") //cek lagi

app.use(cors({
  origin: 'http://localhost:3000',  // Atur origin sesuai dengan aplikasi React Anda
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware untuk membaca JSON dari request
app.use(bodyParser.json());

// app.use(FileUpload()); //cek lagi
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, "../public ")))

// Menggunakan routes
app.use("/api", departmentRoutes);
app.use("/api", employeeRoutes);
app.use("/api", reimbursementRoutes);
app.use("/api", typeRoutes);

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
