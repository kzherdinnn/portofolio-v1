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
    const primaryColor = "#02ffff"; // Primary theme color
    const techStack = [
        // Full-Stack
        { name: "ReactJS", icon: SiReact, color: primaryColor, category: "Full-Stack" },
        { name: "Node.js", icon: SiNodedotjs, color: primaryColor, category: "Full-Stack" },
        { name: "TypeScript", icon: SiTypescript, color: primaryColor, category: "Full-Stack" },
        { name: "PostgreSQL", icon: SiPostgresql, color: primaryColor, category: "Full-Stack" },
        { name: "MongoDB", icon: SiMongodb, color: primaryColor, category: "Full-Stack" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: primaryColor, category: "Full-Stack" },

        // Data Science
        { name: "Python", icon: SiPython, color: primaryColor, category: "Data Science" },
        { name: "Pandas", icon: SiPandas, color: primaryColor, category: "Data Science" },
        { name: "NumPy", icon: SiNumpy, color: primaryColor, category: "Data Science" },
        { name: "Scikit-Learn", icon: SiScikitlearn, color: primaryColor, category: "Data Science" },

        // NLP
        { name: "Hugging Face", icon: SiHuggingface, color: primaryColor, category: "NLP" },
        { name: "PyTorch", icon: SiPytorch, color: primaryColor, category: "NLP" },
        { name: "TensorFlow", icon: SiTensorflow, color: primaryColor, category: "NLP" },

        // Mobile
        { name: "Flutter", icon: SiFlutter, color: primaryColor, category: "Mobile" },
        { name: "Kotlin", icon: SiKotlin, color: primaryColor, category: "Mobile" },

        // QA
        { name: "Selenium", icon: SiSelenium, color: primaryColor, category: "QA" },
        { name: "Cypress", icon: SiCypress, color: primaryColor, category: "QA" },
        { name: "Jest", icon: SiJest, color: primaryColor, category: "QA" },

        // Tools
        { name: "Git", icon: SiGit, color: primaryColor, category: "Tools" },
        { name: "GitHub", icon: SiGithub, color: primaryColor, category: "Tools" },
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
