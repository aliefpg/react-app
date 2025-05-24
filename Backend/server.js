const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "siswa",
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to database 'siswa'");
});

// GET siswa
app.get("/api/siswa", (req, res) => {
  db.query(`
    SELECT id, nama, tempat_lahir, tanggal_lahir, hobi, no_hp, jenis_kelamin, no_hp_ortu, alamat
    FROM data_siswa ORDER BY id DESC
  `, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// DELETE siswa by ID
app.delete("/api/siswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM data_siswa WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Siswa berhasil dihapus" });
  });
});

// POST siswa
app.post("/api/siswa", (req, res) => {
  const data = req.body;
  const sql = `
    INSERT INTO data_siswa
    (nama, tempat_lahir, tanggal_lahir, hobi, no_hp, jenis_kelamin, no_hp_ortu, alamat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    data.nama,
    data.tempat_lahir,
    data.tanggal_lahir,
    data.hobi,
    data.no_hp,
    data.jenis_kelamin,
    data.no_hp_ortu,
    data.alamat,
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Siswa berhasil ditambahkan", id: result.insertId });
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
