/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Animate from "../../utils/animations/Animate";
import ProjectCard from "./ProjectCard";
import { useUpdateProjectDetails } from "../../hooks/appHooks";

function Projects() {
  const [selectedType, setSelectedType] = useState<
    "ALL" | "FULLSTACK" | "AI" | "MOBILE" | "BLOCKCHAIN"
  >("ALL");

  const { updateProjectDetails } = useUpdateProjectDetails();

  function handleCallBack(project: string) {
    updateProjectDetails(project);
  }

  return (
    <div className="mt-[10vh] px-4">
      <div className="text-xs flex flex-col gap-5 lg:items-center justify-center lg:gap-2 lg:flex-row hover:text-foreground/50">
        <div className="flex gap-3">
          <Animate type="slideDown" delay={200}>
            <div className="cursor-pointer flex items-center">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE" as any);
                  setTimeout(() => {
                    setSelectedType("ALL");
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                  6
                </div>
                <h3
                  className={`${selectedType === "ALL"
                      ? "scale-105 border-b border-primary text-primary"
                      : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary`}
                >
                  Filter by ALL
                </h3>
              </div>
              <div className="ml-4 lg:ml-2"> /</div>
            </div>
          </Animate>

          <Animate type="slideDown" delay={400}>
            <div className="cursor-pointer flex items-center gap-3">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE" as any);
                  setTimeout(() => {
                    setSelectedType("FULLSTACK");
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                  2
                </div>
                <h3
                  className={`${selectedType === "FULLSTACK"
                      ? "scale-105 border-b border-primary text-primary"
                      : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary`}
                >
                  Full-Stack
                </h3>
              </div>
              <div className="ml-4 lg:ml-2 hidden lg:block"> /</div>
            </div>
          </Animate>
        </div>

        <div className="flex gap-3">
          <Animate type="slideDown" delay={600}>
            <div className="cursor-pointer flex items-center">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE" as any);
                  setTimeout(() => {
                    setSelectedType("AI");
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                  2
                </div>
                <h3
                  className={`${selectedType === "AI"
                      ? "scale-105 border-b border-primary text-primary"
                      : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary`}
                >
                  AI/ML
                </h3>
              </div>
              <div className="ml-4 lg:ml-2"> /</div>
            </div>
          </Animate>
          <Animate type="slideDown" delay={800}>
            <div className="cursor-pointer flex items-center">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE" as any);
                  setTimeout(() => {
                    setSelectedType("MOBILE");
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                  1
                </div>
                <h3
                  className={`${selectedType === "MOBILE"
                      ? "scale-105 border-b border-primary text-primary"
                      : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary`}
                >
                  Mobile Dev
                </h3>
              </div>
              <div className="ml-4 lg:ml-2"> /</div>
            </div>
          </Animate>
        </div>

        <div className="flex">
          <Animate type="slideDown" delay={800}>
            <div className="cursor-pointer flex items-center">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE" as any);
                  setTimeout(() => {
                    setSelectedType("BLOCKCHAIN");
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                  1
                </div>
                <h3
                  className={`${selectedType === "BLOCKCHAIN"
                      ? "scale-105 border-b border-primary text-primary"
                      : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary`}
                >
                  Blockchain
                </h3>
              </div>
            </div>
          </Animate>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[5vh] pb-[5vh]">
        <div className="flex flex-col lg:flex-row gap-10 pt-[5vh]">
          {(selectedType === "FULLSTACK" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("ECOMMERCE");
                }}
                category="Full-Stack Development"
                title="E-Commerce Platform"
                image="/projects/ecommerce-home.png"
              />
            </Animate>
          )}

          {(selectedType === "FULLSTACK" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("SOCIAL_MEDIA");
                }}
                category="Full-Stack Development"
                title="Social Media Analytics"
                image="/projects/analytics-overview.png"
              />
            </Animate>
          )}

          {(selectedType === "AI" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("AI_CHATBOT");
                }}
                category="AI/Machine Learning"
                title="AI Customer Service Bot"
                image="/projects/chatbot-interface.png"
              />
            </Animate>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 pt-[5vh]">
          {(selectedType === "AI" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("IMAGE_CLASSIFIER");
                }}
                category="AI/Machine Learning"
                title="Medical Image Classifier"
                image="/projects/medical-upload.png"
              />
            </Animate>
          )}

          {(selectedType === "MOBILE" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("MOBILE_FITNESS");
                }}
                category="Mobile Development"
                title="Fitness Tracking App"
                image="/projects/fitness-dashboard.png"
              />
            </Animate>
          )}

          {(selectedType === "BLOCKCHAIN" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("BLOCKCHAIN_WALLET");
                }}
                category="Blockchain Development"
                title="Crypto Wallet App"
                image="/projects/wallet-dashboard.png"
              />
            </Animate>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;