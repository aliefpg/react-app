import React, { useState } from "react";
import "../../../../style/modal.css";

const ModalTambahSekolah = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("sekolah");

  // Data umum siswa
  const [formData, setFormData] = useState({
    nis: "",
    nisn: "",
    program_studi: "",
    unit: "",
    kelas: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "nis" || name === "nisn") && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const isComplete = Object.values(formData).every((val) => typeof val === "number" ? val !== null && val !== "" : val.trim() !== "");
        if (!isComplete) {
          alert("Semua field wajib diisi!");
          return;
        }

    try {
      const res = await fetch("http://localhost:3001/api/sekolah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message || "Data sekolah berhasil ditambahkan!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data sekolah.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="form-tabs">
          <button className={activeTab === "sekolah" ? "active" : ""} onClick={() => setActiveTab("sekolah")}>Data Sekolah</button>
        </div>

        <form className="form-content" onSubmit={handleSubmit}>
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

export default ModalTambahSekolah;
