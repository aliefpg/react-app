// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style/index.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi validasi (bisa kamu ganti ke backend nanti)
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true"); // Simpan status login
      navigate("/admin/dashboard"); // Arahkan ke halaman dashboard
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Kiri: Logo */}
        <div className="login-left">
          <img src={logo} alt="Logo Sekolah" className="logo-img" />
        </div>

        {/* Kanan: Form */}
        <div className="login-right">
          <div className="form-box">
            <h2 className="form-title">Welcome</h2>
            <p className="form-subtitle">Silahkan Login terlebih dahulu</p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Masukkan Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Checkbox toggle */}
              <div className="toggle-password">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />{" "}
                  Tampilkan Password
                </label>
              </div>

              {/* Tombol Login */}
              <div className="form-button">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
