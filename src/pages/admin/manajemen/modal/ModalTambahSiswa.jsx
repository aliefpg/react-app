import React, { useState } from "react";
import "../../../../style/modal.css";

const ModalTambahSiswa = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("siswa");

  // Data umum siswa
  const [formData, setFormData] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    hobi: "",
    no_hp: "",
    jenis_kelamin: "",
    no_hp_ortu: "",
    alamat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "no_hp" || name === "no_hp_ortu") && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message || "Data siswa berhasil ditambahkan!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data siswa.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="form-tabs">
          <button className={activeTab === "siswa" ? "active" : ""} onClick={() => setActiveTab("siswa")}>Data Siswa</button>
          <button className={activeTab === "sekolah" ? "active" : ""} onClick={() => setActiveTab("sekolah")}>Data Sekolah</button>
        </div>

        <form className="form-content" onSubmit={handleSubmit}>
          {activeTab === "siswa" && (
            <>
              <label>Nama Siswa</label>
              <input name="nama" type="text" value={formData.nama} onChange={handleChange} placeholder="Masukkan Nama Siswa" />

              <label>Tempat Lahir</label>
              <input name="tempat_lahir" type="text" value={formData.tempat_lahir} onChange={handleChange} placeholder="Masukkan Tempat Lahir" />

              <label>Tanggal Lahir</label>
              <input name="tanggal_lahir" type="date" value={formData.tanggal_lahir} onChange={handleChange} />

              <label>Hobi</label>
              <input name="hobi" type="text" value={formData.hobi} onChange={handleChange} placeholder="Masukkan Hobi" />

              <label>Nomor Handphone</label>
              <input name="no_hp" type="text" value={formData.no_hp} onChange={handleChange} placeholder="Masukkan Nomor HP" inputMode="numeric" />

              <label>Jenis Kelamin</label>
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                <option value="">Belum Dipilih</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>

              <label>Nomor Handphone Orang Tua</label>
              <input name="no_hp_ortu" type="text" value={formData.no_hp_ortu} onChange={handleChange} placeholder="Masukkan Nomor HP Ortu" inputMode="numeric" />

              <label>Alamat</label>
              <textarea name="alamat" rows="3" value={formData.alamat} onChange={handleChange} placeholder="Masukkan Alamat" />
            </>
          )}

          {activeTab === "sekolah" && (
            <>
              <label>NIS</label>
              <input name="nis" type="text" value={formData.nis} onChange={handleChange} placeholder="Masukkan NIS" />

              <label>NISN</label>
              <input name="nisn" type="text" value={formData.nisn} onChange={handleChange} placeholder="Masukkan NISN" />

              <label>Program Studi</label>
              <select name="program_studi" value={formData.program_studi} onChange={handleChange}>
                <option value="">Belum Dipilih</option>
                <option>IPA</option>
                <option>IPS</option>
                <option>Teknik</option>
              </select>

              <label>Unit</label>
              <select name="unit" value={formData.unit} onChange={handleChange}>
                <option value="">Belum Dipilih</option>
                <option>SMP</option>
                <option>SMA</option>
                <option>SMK</option>
              </select>

              <label>Kelas</label>
              <select name="kelas" value={formData.kelas} onChange={handleChange}>
                <option value="">Belum Dipilih</option>
                <option>10-A</option>
                <option>11-B</option>
                <option>12-C</option>
              </select>

              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">Belum Dipilih</option>
                <option>Aktif</option>
                <option>Tidak Aktif</option>
                <option>Tamat</option>
                <option>Pindah Sekolah</option>
                <option>Drop Out</option>
              </select>
            </>
          )}

          <button type="submit" className="btn-submit">Tambah</button>
        </form>

        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ModalTambahSiswa;
