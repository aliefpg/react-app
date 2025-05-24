import React, { useState } from "react";
import "../../../style/admin.css";
import ModalTambahSiswa from "./ModalTambahSiswa"; // pastikan file ini ada

const SiswaPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="siswa-container">
      <div className="siswa-header">
        <h1>
          <span className="text-black">Siswa</span>{" "}
          <span className="font-light">List</span>
        </h1>
        <div className="btn-group">
          <button className="btn-tambah" onClick={() => setShowModal(true)}>➕ Tambah</button>
          <button className="btn-print">Print</button>
        </div>
      </div>

      {showModal && (
        <ModalTambahSiswa onClose={() => setShowModal(false)} />
      )}

      <div className="filter-grid">
        <div><label>Unit</label><select><option>Semua</option></select></div>
        <div><label>Program Studi</label><select><option>Semua</option></select></div>
        <div><label>Kelas</label><select><option>Semua</option></select></div>
        <div><label>Status Mahasiswa</label><select><option>Semua</option></select></div>
        <div><button className="btn-cari">Cari</button></div>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="empty-message">There are no records to display</div>
    </div>
  );
};

export default SiswaPage;
