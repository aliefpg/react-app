import React, { useState, useEffect } from "react";
import "@/style/siswa.css";
import ModalTambahSiswa from "../modal/ModalTambahSiswa";

const SiswaPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [siswaList, setSiswaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
  });

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const fetchDataSiswa = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/siswa`);
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
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/siswa/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Data berhasil dihapus");
      fetchDataSiswa();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredSiswa = siswaList.filter((siswa) => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch = siswa.nama?.toLowerCase().includes(search);
    const matchesGender =
  !filter.jenis_kelamin || siswa.jenis_kelamin === filter.jenis_kelamin;


    return matchesSearch && matchesGender;
  });

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
        <div>
          <select name="jenis_kelamin" value={filter.jenis_kelamin} onChange={handleFilterChange}>
          <option value="">Semua</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredSiswa.length === 0 ? (
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
              {filteredSiswa.map((siswa) => (
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
