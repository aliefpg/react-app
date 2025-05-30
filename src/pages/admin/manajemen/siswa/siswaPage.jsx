import React, { useState, useEffect } from "react";
import "@/style/siswa.css";
import ModalTambahSiswa from "../modal/ModalTambahSiswa";

const SiswaPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [siswaList, setSiswaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const fetchDataSiswa = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/siswa");
      if (!res.ok) throw new Error("Gagal fetch data siswa");
      const data = await res.json();
      setSiswaList(data);
    } catch (err) {
      console.error("Error saat ambil data:", err);
    }
  };

  const handleTambahSelesai = () => {
    setShowModal(false);
    fetchDataSiswa();
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:3001/api/siswa/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message || "Data berhasil dihapus");
    fetchDataSiswa();
  } catch (err) {
    console.error("Gagal menghapus data:", err);
  }
};

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

      {showModal && <ModalTambahSiswa onClose={handleTambahSelesai} />}

      <div className="filter-grid">
        <div><label>Unit</label><select><option>Semua</option></select></div>
        <div><label>Program Studi</label><select><option>Semua</option></select></div>
        <div><label>Kelas</label><select><option>Semua</option></select></div>
        <div><label>Status Mahasiswa</label><select><option>Semua</option></select></div>
        <div><button className="btn-cari">Cari</button></div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {siswaList.length === 0 ? (
        <div className="empty-message">Tidak ada data siswa</div>
      ) : (
        <div className="table-container">
          <table className="siswa-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Hobi</th>
                <th>No HP</th>
                <th>Jenis Kelamin</th>
                <th>No HP Ortu</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(siswaList.filter((siswa) =>
                siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
              )).map((siswa) => (
                <tr key={siswa.id}>
                  <td>{siswa.nama}</td>
                  <td>{siswa.tempat_lahir}</td>
                  <td>{siswa.tanggal_lahir?.slice(0, 10)}</td>
                  <td>{siswa.hobi}</td>
                  <td>{siswa.no_hp}</td>
                  <td>{siswa.jenis_kelamin}</td>
                  <td>{siswa.no_hp_ortu}</td>
                  <td>{siswa.alamat}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(siswa.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SiswaPage;
