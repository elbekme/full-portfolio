import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./store/auth";
import RegisterPage from "./pages/RegisterPage";
import SkillsPage from "./pages/SkillsPage";
import AdminLayout from "./components/AdminLayout";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import PortfolioPage from "./pages/PortfolioPage";
import MessagePage from "./pages/MessagePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "client" ? (
              <AdminLayout />
              ) : (
                <Navigate to="/" />
                )
              }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="skills" element={<SkillsPage />}/>
          <Route path="education" element={<EducationPage />}/>
          <Route path="experience" element={<ExperiencePage />}/>
          <Route path="portfolio" element={<PortfolioPage />}/>
          <Route path="message" element={<MessagePage />}/>
        </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
