import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

// Placeholder component
const EmptyPage = ({ title }) => <h1>{title}</h1>;
import KelasPage from "./admin/manajemen/kelas/kelasPage";
import SiswaPage from "./admin/manajemen/siswa/siswaPage";
import ProgramStudiPage from "./admin/manajemen/programstudi/ProgramStudiPage";
import SekolahPage from "./admin/manajemen/sekolah/sekolahPage";
import PengaturanPage from "./admin/setting/pengaturan";
import KelulusanPage from "./admin/akademik/lulus/KelulusanPage";

const AdminPage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<EmptyPage title="Dashboard" />} />
          <Route path="pembayaran" element={<EmptyPage title="Pembayaran Siswa" />} />
          <Route path="tagihan" element={<EmptyPage title="Kirim Tagihan" />} />
          <Route path="manajemen" element={<EmptyPage title="Manajemen Data" />} />
          <Route path="akademik" element={<EmptyPage title="Akademik" />} />
          <Route path="akademik/lulus" element={<KelulusanPage />} />
          <Route path="setting-pembayaran" element={<EmptyPage title="Setting Pembayaran" />} />
          <Route path="kas-bank" element={<EmptyPage title="Kas Bank" />} />
          <Route path="laporan-pembayaran" element={<EmptyPage title="Laporan Pembayaran" />} />
          <Route path="laporan-keuangan" element={<EmptyPage title="Laporan Keuangan" />} />
          <Route path="setting/pengaturan" element={<PengaturanPage />} />
          <Route path="manajemen/kelas" element={<KelasPage />} />
          <Route path ="manajemen/siswa" element={<SiswaPage />} />
          <Route path="manajemen/program-studi" element={<ProgramStudiPage />} />
          <Route path="manajemen/sekolah" element={<SekolahPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
