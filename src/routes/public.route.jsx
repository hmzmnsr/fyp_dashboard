import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginpage/login.page";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
