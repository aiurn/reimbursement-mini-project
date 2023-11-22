// config/database.js
const mysql = require('mysql');

// Konfigurasi koneksi ke database MySQL
const mysqlConnection = mysql.createConnection({
  host: '',
  user: 'root', // Sesuaikan dengan username MySQL Anda
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'mmb_mini_project', // Sesuaikan dengan nama database Anda
  multipleStatements: true
});

// Membuka koneksi ke database
mysqlConnection.connect((err) => {
  if (!err) {
    console.log('Koneksi ke database MySQL berhasil!');
  } else {
    console.error('Gagal terhubung ke database MySQL:\n', err);
  }
});

module.exports = mysqlConnection;
