import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/layout.css";
import logo from "../assets/logo.png";

const AdminSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // manajemen | akademik | null
  const sidebarRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar-logo">
        <img src={logo} alt="logo admin" />
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard" onClick={handleLinkClick}>Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/pembayaran" onClick={handleLinkClick}>Pembayaran Siswa</Link>
        </li>
        <li>
          <Link to="/admin/tagihan" onClick={handleLinkClick}>Kirim Tagihan</Link>
        </li>

        {/* Dropdown Manajemen */}
        <li onClick={() => toggleDropdown("manajemen")} className="has-submenu">
          <span className="submenu-title">Manajemen Data ▾</span>
          {openDropdown === "manajemen" && (
            <ul className="submenu">
              <li><Link to="/admin/manajemen/kelas" onClick={handleLinkClick}>Kelas</Link></li>
              <li><Link to="/admin/manajemen/program-studi" onClick={handleLinkClick}>Program Studi</Link></li>
              <li><Link to="/admin/manajemen/siswa" onClick={handleLinkClick}>Siswa</Link></li>
              <li><Link to="/admin/manajemen/sekolah" onClick={handleLinkClick}>Sekolah</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown Akademik */}
        <li onClick={() => toggleDropdown("akademik")} className="has-submenu">
          <span className="submenu-title">Akademik ▾</span>
          {openDropdown === "akademik" && (
            <ul className="submenu">
              <li><Link to="/admin/akademik/tahun-ajaran" onClick={handleLinkClick}>Tahun Ajaran</Link></li>
              <li><Link to="/admin/akademik/kenaikan-kelas" onClick={handleLinkClick}>Kenaikan Kelas</Link></li>
              <li><Link to="/admin/akademik/alumni" onClick={handleLinkClick}>Alumni</Link></li>
              <li><Link to="/admin/akademik/lulus" onClick={handleLinkClick}>Kelulusan</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/admin/setting-pembayaran" onClick={handleLinkClick}>Setting Pembayaran</Link></li>
        <li><Link to="/admin/kas-bank" onClick={handleLinkClick}>Kas Bank</Link></li>
        <li><Link to="/admin/laporan-pembayaran" onClick={handleLinkClick}>Laporan Pembayaran</Link></li>
        <li><Link to="/admin/laporan-keuangan" onClick={handleLinkClick}>Laporan Keuangan</Link></li>
        <li><Link to="/admin/setting/pengaturan" onClick={handleLinkClick}>Pengaturan</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
