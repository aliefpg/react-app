import React from "react";
import "../../../style/pengaturan.css";
import { useNavigate } from "react-router-dom";

const PengaturanPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="pengaturan-container">
      <h1>Pengaturan</h1>
      <p>Silakan klik tombol di bawah untuk keluar.</p>

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default PengaturanPage;
