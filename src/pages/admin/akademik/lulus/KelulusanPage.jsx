import React, { useEffect, useState } from "react";
import "@/style/kelulusan.css";

const KelulusanPage = () => {
  const [aktifList, setAktifList] = useState([]);
  const [lulusList, setLulusList] = useState([]);
  const [aktifSearchTerm, setAktifSearchTerm] = useState("");
  const [lulusSearchTerm, setLulusSearchTerm] = useState("");
  const [selectedNIS, setSelectedNIS] = useState([]);

  useEffect(() => {
    fetchDataSekolah();
  }, []);

  const fetchDataSekolah = () => {
    const API = import.meta.env.VITE_API_URL;
    fetch(`${API}/api/sekolah`)
      .then((res) => res.json())
      .then((data) => {
        const aktif = data.filter((item) => item.status === "Aktif");
        const lulus = data.filter((item) => item.status === "Lulus");
        setAktifList(aktif);
        setLulusList(lulus);
      })
      .catch((err) => console.error("Gagal ambil data sekolah:", err));
  };

  const handleCheckboxChange = (nis) => {
    setSelectedNIS((prev) =>
      prev.includes(nis) ? prev.filter((id) => id !== nis) : [...prev, nis]
    );
  };

  const handleLuluskan = () => {
    if (selectedNIS.length === 0) return alert("Pilih minimal satu siswa.");
    const API = import.meta.env.VITE_API_URL;
    fetch(`${API}/api/sekolah/luluskan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nisList: selectedNIS }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setSelectedNIS([]);
        fetchDataSekolah();
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal mengubah status.");
      });
  };

  // Filter berdasarkan pencarian
  const filteredAktif = aktifList.filter((siswa) =>
    siswa.nis.toString().includes(aktifSearchTerm.trim())
  );
  const filteredLulus = lulusList.filter((siswa) =>
    siswa.nis.toString().includes(lulusSearchTerm.trim())
  );

  return (
    <div className="siswa-container">
      <div className="kelulusan-header">
        <h1>Kelulusan Siswa</h1>
        <button className="btn-submit" onClick={handleLuluskan}>
          Luluskan
        </button>
      </div>

      <div className="kelulusan-wrapper">
        {/* Kolom Siswa Aktif */}
        <div className="kelulusan-column">
          <h2>Siswa Aktif</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari NIS siswa aktif..."
              value={aktifSearchTerm}
              onChange={(e) => setAktifSearchTerm(e.target.value)}
            />
          </div>
          <table className="siswa-table">
            <thead>
              <tr>
                <th></th>
                <th>NIS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAktif.length === 0 ? (
                <tr><td colSpan="3">Tidak ada siswa aktif</td></tr>
              ) : (
                filteredAktif.map((item) => (
                  <tr key={item.nis}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedNIS.includes(item.nis)}
                        onChange={() => handleCheckboxChange(item.nis)}
                      />
                    </td>
                    <td>{item.nis}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Kolom Siswa Lulus */}
        <div className="kelulusan-column">
          <h2>Siswa Lulus</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari NIS siswa lulus..."
              value={lulusSearchTerm}
              onChange={(e) => setLulusSearchTerm(e.target.value)}
            />
          </div>
          <table className="siswa-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLulus.length === 0 ? (
                <tr><td colSpan="2">Belum ada siswa lulus</td></tr>
              ) : (
                filteredLulus.map((item) => (
                  <tr key={item.nis}>
                    <td>{item.nis}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KelulusanPage;
