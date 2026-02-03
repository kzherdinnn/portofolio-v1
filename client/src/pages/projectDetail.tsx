import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import NavBar from "../utils/NavBar";
import Animate from "../utils/animations/Animate";
import { MdChevronRight } from "react-icons/md";
import { LuExternalLink, LuGithub, LuLayers, LuCode } from "react-icons/lu";
import BottomNav from "./homeutils/BottomNav";

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const response = await api.getProjects();
        // Fallback: find by slug or title if slug param is generic
        const found = response.data.find((p: any) => p.slug === slug || p.title.toLowerCase().replace(/\s+/g, '-') === slug);
        setProject(found);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#02ffff] font-mono animate-pulse">Initializing System...</div>;
  if (!project) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">Error: Project Data Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050511] text-white flex flex-col relative overflow-hidden font-mono selection:bg-[#02ffff] selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="binary-rain text-[#02ffff]/5 font-mono text-xs"></div>
      </div>

      <NavBar />

      <div className="flex-grow max-w-7xl mx-auto px-6 w-full mt-24 lg:mt-32 pb-20 relative z-10">

        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 py-2 rounded border border-gray-800 bg-black/50 hover:border-[#02ffff] text-gray-400 hover:text-[#02ffff] transition-all duration-300"
          >
            <span className="text-lg">‹</span> <span className="text-sm font-mono group-hover:tracking-widest transition-all">BACK</span>
          </button>
          <div className="flex items-center text-sm font-mono text-gray-500">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>~/projects</span>
            <MdChevronRight className="mx-2 text-[#02ffff]" />
            <span className="text-[#02ffff] neon-glow">{project.slug}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column: Info - Wrapped in Terminal Window */}
          <Animate type="slideRight" delay={100}>
            <div className="terminal-window bg-[#0a0a0a]/90 backdrop-blur-sm h-full flex flex-col">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <div className="ml-4 text-xs text-gray-500 font-mono">project_info.json</div>
              </div>
              <div className="p-8 flex-col flex gap-8">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 glitch-effect" data-text={project.title}>
                    {project.title}
                  </h1>
                  <div className="h-1 w-20 bg-[#02ffff] rounded-full shadow-[0_0_10px_#02ffff]"></div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg font-light border-l-2 border-gray-800 pl-4">
                  {project.description || "No description available."}
                </p>

                {/* Stats Boxes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111] border border-gray-800 p-4 rounded hover:border-[#02ffff]/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2 text-[#02ffff]">
                      <LuCode className="w-6 h-6 group-hover:animate-bounce" />
                      <span className="font-bold text-2xl font-mono">{project.technologies?.length || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Tech Stack</p>
                  </div>
                  <div className="bg-[#111] border border-gray-800 p-4 rounded hover:border-[#02ffff]/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2 text-purple-400">
                      <LuLayers className="w-6 h-6 group-hover:animate-spin-slow" />
                      <span className="font-bold text-2xl font-mono">{project.features?.length || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Features</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-auto pt-4">
                  {project.link && (
                    <a
                      href={project.link} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-[#02ffff]/10 border border-[#02ffff]/50 hover:bg-[#02ffff]/20 hover:border-[#02ffff] text-[#02ffff] py-3 rounded flex items-center justify-center gap-2 font-mono text-sm transition-all group shadow-[0_0_10px_rgba(2,255,255,0.1)] hover:shadow-[0_0_20px_rgba(2,255,255,0.3)]"
                    >
                      <LuExternalLink className="group-hover:translate-x-1 transition-transform" /> LIVE DEMO
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-white/5 border border-white/10 hover:border-white/30 text-white py-3 rounded flex items-center justify-center gap-2 font-mono text-sm transition-all group"
                    >
                      <LuGithub className="group-hover:rotate-12 transition-transform" /> SOURCE CODE
                    </a>
                  )}
                </div>

                {/* Technologies */}
                <div className="pt-6 border-t border-gray-800">
                  <h3 className="text-sm font-mono text-gray-500 mb-4 flex items-center gap-2">
                    <span className="text-[#02ffff]">&gt;</span> SYSTEM_DEPENDENCIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, i: number) => (
                      <span key={i} className="code-block px-3 py-1 bg-black text-xs text-[#02ffff] font-mono rounded-sm cursor-help">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Animate>

          {/* Right Column: Image & Features */}
          <div className="space-y-8">
            <Animate type="slideLeft" delay={200}>
              <div className="holographic-card rounded-lg overflow-hidden p-1 bg-black/50">
                <img src={project.image} alt={project.title} className="w-full h-auto object-cover rounded opacity-90 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Animate>

            <Animate type="slideLeft" delay={400}>
              <div className="terminal-window bg-[#0a0a0a]/90 backdrop-blur-sm">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <div className="ml-4 text-xs text-gray-500 font-mono">key_features.log</div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 font-mono text-sm">
                    {project.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 group hover:text-white transition-colors">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-none bg-[#02ffff] group-hover:shadow-[0_0_8px_#02ffff] transition-shadow"></span>
                        <span><span className="text-[#02ffff]/50 mr-2">[{i.toString().padStart(2, '0')}]</span>{feature}</span>
                      </li>
                    )) || <li className="text-gray-600 italic">No features listed.</li>}
                  </ul>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default ProjectDetail;
