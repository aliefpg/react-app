import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/layout.css";

const AdminSidebar = () => {
  const [showManajemenSubmenu, setShowManajemenSubmenu] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/pembayaran">Pembayaran Siswa</Link></li>
        <li><Link to="/admin/tagihan">Kirim Tagihan</Link></li>

        {/* Dropdown Manajemen Data */}
        <li
onClick={() => setShowManajemenSubmenu(!showManajemenSubmenu)}
          className="has-submenu"
        >
          <span className="submenu-title">Manajemen Data ▾</span>
          {showManajemenSubmenu && (
            <ul className="submenu">
              <li><Link to="/admin/manajemen/kelas">Kelas</Link></li>
              <li><Link to="/admin/manajemen/program-studi">Program Studi</Link></li>
              <li><Link to="/admin/manajemen/siswa">Siswa</Link></li>
              <li><Link to="/admin/manajemen/sekolah">Sekolah</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/admin/akademik">Akademik</Link></li>
        <li><Link to="/admin/setting-pembayaran">Setting Pembayaran</Link></li>
        <li><Link to="/admin/kas-bank">Kas Bank</Link></li>
        <li><Link to="/admin/laporan-pembayaran">Laporan Pembayaran</Link></li>
        <li><Link to="/admin/laporan-keuangan">Laporan Keuangan</Link></li>
        <li><Link to="/admin/pengaturan">Pengaturan</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
