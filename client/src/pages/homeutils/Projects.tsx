/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Animate from "../../utils/animations/Animate";
import ProjectCard from "./ProjectCard";
import { api } from "../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [projectTypes, setProjectTypes] = useState<any[]>([]);

  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, typesRes] = await Promise.all([
          api.getProjects(),
          api.getProjectTypes()
        ]);
        setProjects(projectsRes.data);
        setProjectTypes(typesRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  function handleCallBack(slug: string) {
    if (slug) {
      navigate(`/project/${slug}`);
    }
  }

  // Safety check: ensure projects is an array
  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = selectedType === "ALL"
    ? safeProjects
    : safeProjects.filter((p: any) => p.type === selectedType);

  // Show only 3 projects initially, or all if showAll is true
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
  const hasMoreProjects = filteredProjects.length > 3;

  return (
    <div className="mt-[10vh] px-4">
      <div className="text-xs flex flex-wrap gap-5 items-center justify-center hover:text-foreground/50">

        {/* ALL Filter */}
        <Animate type="slideDown" delay={200}>
          <div className="cursor-pointer flex items-center">
            <div
              className="relative flex"
              onClick={() => {
                setSelectedType("NONE");
                setTimeout(() => {
                  setSelectedType("ALL");
                }, 100);
              }}
            >
              <div className="absolute -right-3 text-xs -top-3 text-secondary">
                {safeProjects.length}
              </div>
              <h3
                className={`${selectedType === "ALL"
                  ? "scale-105 border-b border-primary text-primary"
                  : "text-foreground/50"
                  } hover:border-b border-primary hover:scale-105 hover:text-primary transition-all duration-300`}
              >
                Filter SEMUA
              </h3>
            </div>
            <div className="ml-4 lg:ml-2"> /</div>
          </div>
        </Animate>

        {/* Dynamic Filters */}
        {projectTypes.map((type, index) => (
          <Animate key={type._id} type="slideDown" delay={200 + (index + 1) * 200}>
            <div className="cursor-pointer flex items-center">
              <div
                className="relative flex"
                onClick={() => {
                  setSelectedType("NONE");
                  setTimeout(() => {
                    setSelectedType(type.name);
                  }, 100);
                }}
              >
                <div className="absolute -right-3 text-xs -top-3 text-secondary">
                  {safeProjects.filter((p: any) => p.type === type.name).length}
                </div>
                <h3
                  className={`${selectedType === type.name
                    ? "scale-105 border-b border-primary text-primary"
                    : "text-foreground/50"
                    } hover:border-b border-primary hover:scale-105 hover:text-primary transition-all duration-300`}
                >
                  {type.label}
                </h3>
              </div>
              {/* Add separator if not likely the last item, though hard to know perfectly in flex wrap, conditional logic is okay */}
              {index < projectTypes.length - 1 && <div className="ml-4 lg:ml-2"> /</div>}
            </div>
          </Animate>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center mt-[5vh] pb-[5vh]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-[5vh]">
          {displayedProjects.map((project: any, index: number) => (
            <Animate key={index} delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack(project.slug || "ECOMMERCE");
                }}
                category={project.category}
                title={project.title}
                image={project.image}
                description={project.description}
                link={project.link}
              />
            </Animate>
          ))}
        </div>

        {/* See More / See Less Button */}
        {hasMoreProjects && (
          <Animate delay={400} type="slideUp">
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-10 flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border-2 border-primary/50 hover:border-primary text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {showAll ? (
                <>
                  <FaChevronUp className="w-4 h-4" />
                  Lihat Lebih Sedikit
                </>
              ) : (
                <>
                  <FaChevronDown className="w-4 h-4" />
                  Lihat Seterusnya ({filteredProjects.length - 3} proyek lagi)
                </>
              )}
            </button>
          </Animate>
        )}
      </div>
    </div>
  );
}

export default Projects;