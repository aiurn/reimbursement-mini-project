// app.js
const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const divisiRoutes = require('./routes/divisi');
const pegawaiRoutes = require('./routes/pegawai');
const reimbursementRoutes = require('./routes/reimbursement');
const tipePengajuanRoutes = require('./routes/tipe_pengajuan');

// Middleware untuk membaca JSON dari request
app.use(bodyParser.json());

// Menggunakan routes
app.use('/api', divisiRoutes);
app.use('/api', pegawaiRoutes);
app.use('/api', reimbursementRoutes);
app.use('/api', tipePengajuanRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

