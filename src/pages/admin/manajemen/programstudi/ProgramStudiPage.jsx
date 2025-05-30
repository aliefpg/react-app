import React, { useEffect, useState } from "react";
import "@/style/siswa.css";

const ProgramStudiPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/program-studi")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  return (
    <div className="siswa-container">
      <div className="siswa-header">
        <h1>Daftar Program Studi</h1>
      </div>
      <div className="table-wrapper">
        <table className="siswa-table">
          <thead>
            <tr>
              <th>Nisn</th>
              <th>Program Studi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="2">Data belum tersedia</td></tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nisn}</td>
                  <td>{item.program_studi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramStudiPage;
