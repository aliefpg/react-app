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
    SELECT id, nama, tempat_lahir, tanggal_lahir, hobi, no_hp, jenis_kelamin, no_hp_ortu, alamat, program_studi
    FROM data_siswa ORDER BY id DESC
  `, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


app.get("/api/program-studi", (req, res) => {
  db.query(`
    SELECT nisn, program_studi
    FROM data_sekolah
    ORDER BY nisn ASC
  `, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get("/api/kelas", (req, res) => {
  db.query(`
    SELECT kelas
    FROM data_sekolah
    ORDER BY kelas ASC
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
    (nama, tempat_lahir, tanggal_lahir, hobi, no_hp, jenis_kelamin, no_hp_ortu, alamat, program_studi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    data.program_studi
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Siswa berhasil ditambahkan", id: result.insertId });
  });
});

// GET sekolah
app.get("/api/sekolah", (req, res) => {
  db.query(`
    SELECT id, nis, nisn, program_studi, unit, kelas, status
    FROM data_sekolah ORDER BY id DESC
  `, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST sekolah
app.post("/api/sekolah", (req, res) => {
  const data = req.body;
  const sql = `
    INSERT INTO data_sekolah
    (nis, nisn, program_studi, unit, kelas, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [
    data.nis,
    data.nisn,
    data.program_studi,
    data.unit,
    data.kelas,
    data.status,
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Sekolah berhasil ditambahkan", id: result.insertId });
  });
});

// DELETE sekolah
app.delete("/api/sekolah/:id", (req, res) => {
  db.query("DELETE FROM data_sekolah WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Sekolah berhasil dihapus" });
  });
});


// UBAH STATUS SISWA JADI LULUS
app.post("/api/sekolah/luluskan", (req, res) => {
  const { nisList } = req.body;

  if (!Array.isArray(nisList) || nisList.length === 0) {
    return res.status(400).json({ message: "Daftar NIS tidak valid atau kosong." });
  }

  const placeholders = nisList.map(() => "?").join(", ");
  const sql = `UPDATE data_sekolah SET status = 'Lulus' WHERE nis IN (${placeholders})`;

  db.query(sql, nisList, (err, result) => {
    if (err) {
      console.error("Gagal update status:", err);
      return res.status(500).json({ message: "Gagal mengubah status siswa." });
    }

    res.json({ message: "Status siswa berhasil diubah ke 'Lulus'." });
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
