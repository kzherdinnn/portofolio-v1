/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Animate from "../../utils/animations/Animate";
import ProjectCard from "./ProjectCard";
import { useUpdateProjectDetails } from "../../hooks/appHooks";
import { api } from "../../utils/api";

function Projects() {
  const [selectedType, setSelectedType] = useState<
    "ALL" | "FULLSTACK" | "AI" | "MOBILE" | "BLOCKCHAIN"
  >("ALL");

  const [projects, setProjects] = useState([]);
  const { updateProjectDetails } = useUpdateProjectDetails();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  function handleCallBack(project: string) {
    updateProjectDetails(project);
  }

  const filteredProjects = selectedType === "ALL"
    ? projects
    : projects.filter((p: any) => p.type === selectedType);

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
                  {projects.length}
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
                  {projects.filter((p: any) => p.type === "FULLSTACK").length}
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
                  {projects.filter((p: any) => p.type === "AI").length}
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
                  {projects.filter((p: any) => p.type === "MOBILE").length}
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
                  {projects.filter((p: any) => p.type === "BLOCKCHAIN").length}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-[5vh]">
          {filteredProjects.map((project: any, index: number) => (
            <Animate key={index} delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack(project.slug || "ECOMMERCE"); // Default or use project slug
                }}
                category={project.category}
                title={project.title}
                image={project.image}
              />
            </Animate>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;