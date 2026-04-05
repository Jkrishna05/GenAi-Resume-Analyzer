import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import LoginPage from "../features/auth/pages/LoginPage";
import { Protected } from "../features/auth/components/Protected";
import HomePage from "../features/interview/pages/HomePage";
import ReportPage from "../features/interview/pages/ReportPage";
import HistoryPage from "../features/interview/pages/HistoryPage";

const AppRoutes = () => {
  return (
    <div className="bg-red-500">
    <Routes>
      <Route path="/" element={<Protected><HomePage /></Protected>} />
       {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/report/:id" element={<ReportPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
    </div>
  );
};

export default AppRoutes;