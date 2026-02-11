import Animate from "../../utils/animations/Animate";
import {
    SiTailwindcss,
    SiReact,
    SiNodedotjs,
    SiFlutter,
    SiKotlin,
    SiPython,
    SiScikitlearn,
    SiHuggingface,
    SiPytorch,
    SiTensorflow,
    SiSelenium,
    SiCypress,
    SiTypescript,
    SiMongodb,
    SiPostgresql,
    SiNumpy,
    SiPandas,
    SiGit,
    SiGithub,
    SiJest
} from "react-icons/si";

function TechStack() {
    const techStack = [
        // Full-Stack
        { name: "ReactJS", icon: SiReact, color: "#61DAFB", category: "Full-Stack" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "Full-Stack" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Full-Stack" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Full-Stack" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Full-Stack" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "Full-Stack" },

        // Data Science
        { name: "Python", icon: SiPython, color: "#3776AB", category: "Data Science" },
        { name: "Pandas", icon: SiPandas, color: "#150458", category: "Data Science" },
        { name: "NumPy", icon: SiNumpy, color: "#013243", category: "Data Science" },
        { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E", category: "Data Science" },

        // NLP
        { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", category: "NLP" },
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", category: "NLP" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", category: "NLP" },

        // Mobile
        { name: "Flutter", icon: SiFlutter, color: "#02569B", category: "Mobile" },
        { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", category: "Mobile" },

        // QA
        { name: "Selenium", icon: SiSelenium, color: "#43B02A", category: "QA" },
        { name: "Cypress", icon: SiCypress, color: "#17202C", category: "QA" },
        { name: "Jest", icon: SiJest, color: "#C21325", category: "QA" },

        // Tools
        { name: "Git", icon: SiGit, color: "#F05032", category: "Tools" },
        { name: "GitHub", icon: SiGithub, color: "#181717", category: "Tools" },
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
