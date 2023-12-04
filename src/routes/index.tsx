import { Route, Routes } from "react-router-dom";
import { AboutPage, HomePage, SearchPage } from "@pages/index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
};

export default AppRoutes;
