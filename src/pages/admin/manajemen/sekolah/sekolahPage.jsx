import React, { useState, useEffect } from "react";
import "@/style/siswa.css";
import ModalTambahSekolah from "../modal/ModalTambahSekolah";

const SekolahPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [sekolahList, setSekolahList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // filter
  const [filter, setFilter] = useState({
    program_studi: "",
    unit: "",
    kelas: "",
    status: "",
  });

  useEffect(() => {
    fetchDataSekolah();
  }, []);

  const fetchDataSekolah = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/sekolah");
      if (!res.ok) throw new Error("Gagal fetch data sekolah");
      const data = await res.json();
      setSekolahList(data);
    } catch (err) {
      console.error("Error saat ambil data:", err);
    }
  };

  const handleTambahSelesai = () => {
    setShowModal(false);
    fetchDataSekolah();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/api/sekolah/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Data berhasil dihapus");
      fetchDataSekolah();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = sekolahList.filter((sekolah) => {
    const search = searchTerm.trim();
    const matchesSearch = sekolah.nis?.toString().includes(search);

    const matchesFilter =
      (filter.program_studi === "" || sekolah.program_studi === filter.program_studi) &&
      (filter.unit === "" || sekolah.unit === filter.unit) &&
      (filter.kelas === "" || sekolah.kelas === filter.kelas) &&
      (filter.status === "" || sekolah.status === filter.status);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="siswa-container">
      <div className="siswa-header">
        <h1>
          <span className="text-black">Sekolah</span>{" "}
          <span className="font-light">List</span>
        </h1>
        <div className="btn-group">
          <button className="btn-tambah" onClick={() => setShowModal(true)}>➕ Tambah</button>
          <button className="btn-print">Print</button>
        </div>
      </div>

      {showModal && <ModalTambahSekolah onClose={handleTambahSelesai} />}

      <div className="filter-grid">
        <div>
          <label>Program Studi</label>
          <select name="program_studi" value={filter.program_studi} onChange={handleFilterChange}>
            <option value="">Semua</option>
            <option>IPA</option>
            <option>IPS</option>
            <option>Teknik</option>
          </select>
        </div>
        <div>
          <label>Unit</label>
          <select name="unit" value={filter.unit} onChange={handleFilterChange}>
            <option value="">Semua</option>
            <option>SMP</option>
            <option>SMA</option>
            <option>SMK</option>
          </select>
        </div>
        <div>
          <label>Kelas</label>
          <select name="kelas" value={filter.kelas} onChange={handleFilterChange}>
            <option value="">Semua</option>
            <option>10-A</option>
            <option>11-B</option>
            <option>12-C</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={filter.status} onChange={handleFilterChange}>
            <option value="">Semua</option>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
            <option>Tamat</option>
            <option>Pindah Sekolah</option>
            <option>Drop Out</option>
          </select>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search NIS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="empty-message">Tidak ada data sekolah</div>
      ) : (
        <div className="table-container">
          <table className="siswa-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>NISN</th>
                <th>Program Studi</th>
                <th>Unit</th>
                <th>Kelas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((sekolah) => (
                <tr key={sekolah.id}>
                  <td>{sekolah.nis}</td>
                  <td>{sekolah.nisn}</td>
                  <td>{sekolah.program_studi}</td>
                  <td>{sekolah.unit}</td>
                  <td>{sekolah.kelas}</td>
                  <td>{sekolah.status}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(sekolah.id)}>
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

export default SekolahPage;
