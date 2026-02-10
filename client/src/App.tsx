import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/projectDetail";
import CertificateDetail from "./pages/CertificateDetail";
import Animate from "./utils/animations/Animate";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AppSpinner from "./utils/AppSpinner";
import { useEffect, useState } from "react";
import useImageLoader from "./hooks/appHooks";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComments from "./pages/AdminComments";
import MatrixRain from "./components/MatrixRain";
import CustomCursor from "./components/CustomCursor";
import Terminal from "./components/Terminal";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const selectedProject = localStorage.getItem("selectedProject");
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  function handleEmailClick() {
    const mailtoUrl =
      "mailto:kzherdin03@gmail.com?subject=Software Development Inquiry";
    window.open(mailtoUrl);
  }

  function handleOpenSocialLink(type: string) {
    switch (type) {
      case "GITHUB":
        window.open("https://github.com/kzherdinnn");
        break;
      case "LINKEDIN":
        window.open(
          "https://www.linkedin.com/in/kzherdinnn/"
        );
        break;
      case "INSTAGRAM":
        window.open(
          "https://www.instagram.com/kzherdinnn/"
        );
        break;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useImageLoader();

  return (
    <div className="relative cursor-default text-foreground scroll-smooth">
      <CustomCursor />
      <Terminal />


      {loading && <AppSpinner />}

      {(!selectedProject ||
        selectedProject === "null" ||
        location.pathname === "/") && (
          <div className="relative w-full h-full">
            {/* Matrix Rain Effect */}
            <MatrixRain />

            <div className="absolute h-[100vh] inset-0 z-[201]"></div>
            <div className="absolute h-full w-full min-h-[100vh] z-[200]">
              <img
                src="cover.jpg"
                className="object-cover h-full w-full"
                alt="Tech circuit background"
              />
            </div>


            {/* Social Links Sidebar */}
            <div className="fixed z-[999] bottom-24 flex-row justify-between w-full px-[2vw] hidden lg:flex">
              <div>
                <Animate delay={700}>
                  <div className="flex flex-row gap-6 rotate-90 items-center ml-[-12vw] justify-center">
                    <div className="text-center flex items-center justify-center gap-4">
                      <h3
                        onClick={() => handleOpenSocialLink("GITHUB")}
                        className="-rotate-90 flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
                      >
                        <FaGithub className="h-6 w-5" />
                      </h3>
                      <h3
                        onClick={() => handleOpenSocialLink("LINKEDIN")}
                        className="-rotate-90 flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
                      >
                        <CiLinkedin className="h-6 w-5" />
                      </h3>
                      <h3
                        onClick={() => handleOpenSocialLink("INSTAGRAM")}
                        className="-rotate-90 flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
                      >
                        <FaInstagram className="h-6 w-5" />
                      </h3>
                    </div>
                    <div className="w-[17vw] h-[1px] bg-[#02ffff]"></div>
                  </div>
                </Animate>
              </div>

              <div>
                <Animate delay={700}>
                  <div className="flex flex-row gap-6 rotate-90 items-center -mr-[11vw]">
                    <div
                      onClick={handleEmailClick}
                      className="text-xs cursor-pointer lg:hover:scale-105 lg:hover:text-primary"
                    >
                      kzherdin03@gmail.com
                    </div>
                    <div className="w-[10vw] h-[1px] bg-[#02ffff]"></div>
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        )}


      <div className="z-[998] absolute inset-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/certificate/:id" element={<CertificateDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/comments" element={<AdminComments />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}


export default App;
