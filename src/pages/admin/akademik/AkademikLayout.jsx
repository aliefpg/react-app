import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AkademikLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="siswa-container">
      <div className="siswa-header">
        <h1>Akademik</h1>
      </div>
      <div className="filter-grid">
        <Link className={pathname.includes("tahun-ajaran") ? "btn-active" : "btn-nav"} to="tahun-ajaran">Tahun Ajaran</Link>
        <Link className={pathname.includes("kenaikan-kelas") ? "btn-active" : "btn-nav"} to="kenaikan-kelas">Kenaikan Kelas</Link>
        <Link className={pathname.includes("alumni") ? "btn-active" : "btn-nav"} to="alumni">Alumni</Link>
        <Link className={pathname.includes("kelulusan") ? "btn-active" : "btn-nav"} to="kelulusan">Kelulusan</Link>
      </div>

      <div className="content-box">
        <Outlet />
      </div>
    </div>
  );
};

export default AkademikLayout;
