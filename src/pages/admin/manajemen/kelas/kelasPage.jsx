import React, { useEffect, useState } from "react";
import "@/style/siswa.css";

const KelasPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    fetch(`${API}/api/kelas`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  return (
    <div className="siswa-container">
      <div className="siswa-header">
        <h1>Daftar kelas</h1>
      </div>
      <div className="table-wrapper">
        <table className="siswa-table">
          <thead>
            <tr>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="2">Data belum tersedia</td></tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.kelas}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelasPage;
