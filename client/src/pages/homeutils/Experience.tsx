/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Animate from "../../utils/animations/Animate";
import { FaLocationDot } from "react-icons/fa6";
import { api } from "../../utils/api";

function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.getExperience();
        setExperience(response.data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };
    fetchExperience();
  }, []);

  return (
    <div>
      <div className="px-4 flex flex-col justify-center items-center mt-[5vh] w-full">
        <Animate delay={300} type="slideLeft">
          <div>
            <h2 className="text-4xl lg:text-[50px] font-semibold text-center neon-glow">
              Professional Experience
            </h2>
          </div>
        </Animate>

        {experience.map((exp: any, index: number) => (
          <div key={index} className="mt-[5vh] flex flex-col gap-4 lg:w-[70vw] w-full">
            <Animate delay={300 + (index * 100)} type="slideLeft">
              {/* Terminal Window Card */}
              <div className="holographic-card terminal-window group cursor-default overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                {/* Terminal Header */}
                <div className="terminal-header relative z-10">
                  <div className="terminal-dot red group-hover:shadow-glow-red transition-all duration-300"></div>
                  <div className="terminal-dot yellow group-hover:shadow-glow-yellow transition-all duration-300"></div>
                  <div className="terminal-dot green group-hover:shadow-glow-green transition-all duration-300"></div>
                </div>

                {/* Header Section with Role & Company */}
                <div
                  className="relative py-5 px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-primary/20 transition-all duration-300 group-hover:border-primary/40"
                  style={{
                    background: `linear-gradient(135deg, ${exp.backgroundColor || '#1d4ed8'}20 0%, ${exp.backgroundColor || '#1d4ed8'}10 100%)`
                  }}
                >
                  <div className="text-2xl font-bold text-primary glitch-effect">{exp.role}</div>
                  <div className="font-mono text-foreground/70 text-sm flex items-center gap-2">
                    <span className="text-primary/80">&lt;/&gt;</span>
                    <span>@ {exp.company}</span>
                    <span className="hidden lg:inline text-primary/50">|</span>
                    <span className="text-foreground/50">{exp.period}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 py-5 bg-background/60 backdrop-blur-sm flex flex-col gap-5">
                  {/* Logo and Location */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      {exp.logo && (
                        <div className="relative group/logo">
                          <img
                            src={exp.logo}
                            className="rounded-md w-32 h-20 object-cover border border-primary/20 transition-all duration-300 group-hover/logo:border-primary/50 group-hover/logo:scale-105"
                            alt={exp.company}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 rounded-md"></div>
                        </div>
                      )}
                      <div className="flex items-center text-foreground/80 gap-2 font-mono">
                        <FaLocationDot className="w-4 h-4 text-primary" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-foreground/80 leading-relaxed lg:max-w-[60vw]">
                    {exp.description}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-3">
                    {exp.skills?.map((skill: string, idx: number) => (
                      <div
                        key={idx}
                        className="group/skill relative w-fit h-fit py-2 px-5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-mono text-sm transition-all duration-300 hover:from-primary/30 hover:to-primary/20 hover:border-primary/50 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <span className="relative z-10">{skill}</span>
                        <div className="absolute inset-0 rounded-full bg-primary/0 group-hover/skill:bg-primary/5 transition-all duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-md" style={{
                    boxShadow: '0 0 20px rgba(2, 255, 255, 0.1), inset 0 0 20px rgba(2, 255, 255, 0.05)'
                  }}></div>
                </div>
              </div>
            </Animate>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;