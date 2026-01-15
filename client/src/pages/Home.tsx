import { useEffect, useRef } from "react";
import Animate from "../utils/animations/Animate";
import { ABOUT_ME, NAME } from "../utils/AppConstants";
import { useAppContext } from "../utils/AppContext";
import DownwArrow from "../utils/DownArraow";
import NavBar from "../utils/NavBar";
import BottomNav from "./homeutils/BottomNav";
import AboutMe from "./homeutils/AboutMe";
import Experience from "./homeutils/Experience";
import PortfolioShowcase from "./homeutils/PortfolioShowcase";
import ContactSection from "./homeutils/ContactSection";

function Home() {
  const { scrollView, dispatch } = useAppContext();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const temp = scrollView;
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch({ type: "setScrollView", payload: undefined });
    }
    localStorage.setItem("selectedProject", null as never);
    dispatch({ type: "setScrollView", payload: temp });
  }, [scrollView, targetDivRef]);

  function handleHireMeClick() {
    if (resumeRef?.current) {
      (resumeRef as any).current.click();
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="min-h-[100vh] flex flex-col">
        <NavBar />
        <div className="p-3 flex flex-col justify-between py-10 h-[85vh]">
          <div className="flex flex-col justify-center gap-3 mt-[25vh] lg:mt-[15vh] items-center">
            <Animate delay={450}>
              <h1 className="typewriter neon-glow text-[40px] font-bold lg:text-[150px]">
                {NAME.toUpperCase()}
              </h1>
            </Animate>
            <Animate delay={600}>
              <p className="w-[70vw] text-xl text-center lg:text-2xl lg:-mt-10">
                {ABOUT_ME}
              </p>
            </Animate>
          </div>
          <div className="flex justify-center w-full">
            <Animate delay={400}>
              <div
                onClick={handleHireMeClick}
                className="glitch-effect hover:lg:scale-110 hover:lg:bg-[#02ffff]/90 bg-[#02ffff] w-fit px-6 lg:px-12 lg:text-xl cursor-pointer py-2 lg:py-3 flex items-center rounded-full text-black font-bold"
              >
                &lt;/&gt; Hire Me
              </div>
            </Animate>
            <a
              href="Alex_Chen_Resume.pdf"
              download={true}
              ref={resumeRef}
              className="hidden"
            >
              Resume
            </a>
          </div>
          <Animate delay={750}>
            <div
              className="w-full flex items-center justify-center"
              onClick={() => {
                dispatch({ type: "setScrollView", payload: "ABOUT" });
                setTimeout(() => {
                  dispatch({ type: "setScrollView", payload: undefined });
                }, 400);
              }}
            >
              <DownwArrow />
            </div>
          </Animate>
        </div>
      </div>
      <div className="bg-black -mt-4 lg:-mt-0 w-full">
        {/* About Me section */}
        <div ref={scrollView === "ABOUT" ? targetDivRef : null}>
          <AboutMe />
        </div>

        {/* Portfolio Showcase section */}
        <div ref={scrollView === "WORK" ? targetDivRef : null}>
          <PortfolioShowcase />
        </div>
        <div ref={scrollView === "EXPERIENCE" ? targetDivRef : null}>
          <Experience />
        </div>
        <div ref={scrollView === "CONTACT" ? targetDivRef : null}>
          <ContactSection />
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default Home;
