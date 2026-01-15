import Animate from "../../utils/animations/Animate";
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTailwindcss,
    SiReact,
    SiVite,
    SiNodedotjs,
    SiBootstrap,
    SiFirebase,
    SiMaterialdesign,
    SiVercel,
    SiTypescript,
    SiMongodb,
    SiExpress,
    SiGit,
    SiGithub
} from "react-icons/si";

function TechStack() {
    const techStack = [
        { name: "HTML", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS", icon: SiCss3, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
        { name: "Vite", icon: SiVite, color: "#646CFF" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Express", icon: SiExpress, color: "#000000" },
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#181717" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
        { name: "Material UI", icon: SiMaterialdesign, color: "#0081CB" },
    ];

    return (
        <div className="px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {techStack.map((tech, index) => {
                    const Icon = tech.icon;

                    return (
                        <Animate key={tech.name} delay={index * 50} type="slideUp">
                            <div className="group relative bg-foreground/5 border-2 border-foreground/10 rounded-lg p-6 hover:border-primary/50 hover:bg-foreground/10 transition-all duration-300 cursor-pointer">
                                {/* Icon */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <Icon
                                            className="w-16 h-16 transition-all duration-300 group-hover:scale-110"
                                            style={{ color: tech.color }}
                                        />
                                        {/* Glow effect on hover */}
                                        <div
                                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                                            style={{ backgroundColor: tech.color }}
                                        ></div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-sm font-semibold text-center text-foreground/80 group-hover:text-primary transition-colors duration-300">
                                        {tech.name}
                                    </h3>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            boxShadow: `0 0 20px ${tech.color}20`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </Animate>
                    );
                })}
            </div>
        </div>
    );
}

export default TechStack;
