import { useEffect, useRef, useState } from "react";
import { useUpdateProjectDetails } from "../hooks/appHooks";
import Animate from "../utils/animations/Animate";
import { ABOUT_ME, NAME } from "../utils/AppConstants";
import { useAppContext } from "../utils/AppContext";
import DownwArrow from "../utils/DownArraow";
import ExpertiseCard from "../utils/ExpertiseCard";
import NavBar from "../utils/NavBar";
import BottomNav from "./homeutils/BottomNav";
import Experience from "./homeutils/Experience";
import Projects from "./homeutils/Projects";
import ContactForm from "./homeutils/ContactForm";
import { api } from "../utils/api";

function Home() {
  const { updateProjectDetails } = useUpdateProjectDetails();
  const [expertise, setExpertise] = useState([]);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await api.getExpertise();
        setExpertise(response.data);
      } catch (error) {
        console.error("Failed to fetch expertise:", error);
      }
    };
    fetchExpertise();
  }, []);

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
              <h1 className="typewriter text-[40px] font-bold lg:text-[150px]">
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
                className="hover:lg:scale-110 hover:lg:bg-[#02ffff]/90 bg-[#02ffff] w-fit px-6 lg:px-12 lg:text-xl  cursor-pointer py-2 lg:py-3 flex items-center rounded-full text-black"
              >
                Hire Me
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
                dispatch({ type: "setScrollView", payload: "EXPERTISE" });
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
        <div
          ref={scrollView === "EXPERTISE" ? targetDivRef : null}
          className="mt-[20vh] font-bold w-full flex items-center justify-center text-4xl"
        >
          <Animate delay={250} type="slideLeft">
            <h1>My Expertise</h1>
          </Animate>
        </div>
        <div className="px-4 mt-[8vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center w-full gap-8">
            {expertise?.map((item, index) => (
              <ExpertiseCard
                key={index}
                icon={item?.icon as never}
                heading={item?.heading as never}
                headingContemt={item?.headingContemt as never}
                desc={item?.desc as never}
                delay={index * 100}
              />
            ))}
          </div>
          <Animate delay={300} type="blink">
            <div className="flex items-center w-full justify-center">
              <img
                alt="electrical design"
                src="bg_small.png" // Replace with relevant image
                className="opacity-30 -mt-10 lg:-mt-[20vh] lg:w-[30vw]"
              />
            </div>
          </Animate>
        </div>

        {/* Updated "My Work" section for electrical projects */}
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="px-4">
            <div
              ref={scrollView === "WORK" ? targetDivRef : null}
              className="flex lg:max-w-[30vw] flex-col gap-2"
            >
              <Animate delay={200} type="slideLeft">
                <h1 className="text-[60px] font-bold">
                  My
                  <br /> Projects
                </h1>
              </Animate>
              <Animate delay={300} type="slideLeft">
                <p className="">
                  I build full-stack web applications, develop AI/ML models,
                  and create mobile apps that solve real-world problems with
                  clean code and modern technologies.
                </p>
              </Animate>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:relative">
            <div className="flex items-end justify-between mt-[5vh] gap-5 ml-[10vw]">
              <div className="pl-6 pb-20">
                <Animate delay={500} type="slideLeft">
                  <div>
                    <img
                      src="rightsidearrow.png"
                      className="w-[30vw] lg:w-[8vw] lg:mb-[3vw] lg:-mr-[3vw]"
                    />
                  </div>
                </Animate>
              </div>
              <Animate delay={200} type="blink">
                <div className="relative">
                  <img
                    src="/fault_detection_system.png"
                    className="h-[41vh] lg:w-[13vw] p-2 lg:p-3 rounded-[30px]"
                  />
                </div>
              </Animate>
            </div>
            <div className="pl-5 pt-5 lg:absolute lg:left-0 lg:bottom-0">
              <div className="flex flex-col gap-2">
                <Animate delay={100} type="slideLeft">
                  <h3 className="text-xl font-semibold">Featured Project</h3>
                </Animate>
                <Animate delay={300} type="slideLeft">
                  <h3 className="text-3xl font-semibold">E-Commerce Platform</h3>
                </Animate>
              </div>
              <Animate delay={300} type="slideLeft">
                <div className="pt-2">
                  <button
                    onClick={() => updateProjectDetails("ECOMMERCE")}
                    className="rounded-sm bg-secondary px-5 h-fit w-fit py-2 text-foreground"
                  >
                    View Project
                  </button>
                </div>
              </Animate>
            </div>
          </div>
        </div>
        <div className="pb-[5vh]">
          <Projects />{" "}
          {/* Ensure Projects component shows Venky's electrical projects */}
        </div>
        <div ref={scrollView === "EXPERIENCE" ? targetDivRef : null}>
          <Experience />{" "}
          {/* Ensure Experience shows Venky's internships/research */}
        </div>
        <div ref={scrollView === "CONTACT" ? targetDivRef : null}>
          <ContactForm />
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default Home;
