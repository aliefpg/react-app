import React, { useState } from "react";

const ModalTambahSiswa = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("siswa");

  const [noHp, setNoHp] = useState("");
  const [noHpOrtu, setNoHpOrtu] = useState("");

  // Hanya izinkan angka
  const handleHpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNoHp(value);
    }
  };

  const handleHpOrtuChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNoHpOrtu(value);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="form-tabs">
          <button className={activeTab === "siswa" ? "active" : ""} onClick={() => setActiveTab("siswa")}>Data Siswa</button>
          <button className={activeTab === "sekolah" ? "active" : ""} onClick={() => setActiveTab("sekolah")}>Data Sekolah</button>
        </div>

        {activeTab === "siswa" && (
          <form className="form-content">
            <label>Nama Siswa</label>
            <input type="text" placeholder="Masukkan Nama Siswa" />

            <label>Tempat Lahir</label>
            <input type="text" placeholder="Masukkan Tempat Lahir" />

            <label>Tanggal Lahir</label>
            <input type="date" />

            <label>Hobi</label>
            <input type="text" placeholder="Masukkan Hobi" />

            <label>Nomor Handphone</label>
            <input
              type="text"
              value={noHp}
              onChange={handleHpChange}
              placeholder="Masukkan Nomor Handphone"
              inputMode="numeric"
            />

            <label>Jenis Kelamin</label>
            <select>
              <option>Belum Dipilih</option>
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>

            <label>Nomor Handphone Orang Tua</label>
            <input
              type="text"
              value={noHpOrtu}
              onChange={handleHpOrtuChange}
              placeholder="Masukkan Nomor Handphone Orang Tua"
              inputMode="numeric"
            />

            <label>Alamat</label>
            <textarea rows="3" placeholder="Masukkan Alamat" />

            <button type="submit" className="btn-submit">Tambah</button>
          </form>
        )}

        {activeTab === "sekolah" && (
          <div className="form-content"><p>Data Sekolah belum tersedia</p></div>
        )}

        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ModalTambahSiswa;
