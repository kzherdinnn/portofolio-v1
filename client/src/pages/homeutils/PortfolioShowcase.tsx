import { useState } from "react";
import { FaCode, FaCertificate, FaLayerGroup } from "react-icons/fa";
import Animate from "../../utils/animations/Animate";
import Projects from "./Projects";
import TechStack from "./TechStack";
import Certificates from "./Certificates";
import ParticleNetwork from "../../components/ParticleNetwork";

function PortfolioShowcase() {
    const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "techstack">("projects");

    const tabs = [
        { id: "projects", label: "Projects", icon: FaCode },
        { id: "certificates", label: "Certificates", icon: FaCertificate },
        { id: "techstack", label: "Technology", icon: FaLayerGroup },
    ];

    return (
        <div className="w-full py-20 px-4 relative overflow-hidden">
            {/* Background Animation */}
            <ParticleNetwork />

            {/* Content */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <Animate delay={200} type="slideDown">
                        <h1 className="text-4xl lg:text-5xl font-bold neon-glow mb-4">
                            Portfolio Showcase
                        </h1>
                    </Animate>
                    <Animate delay={300} type="slideDown">
                        <p className="text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                            Explore my journey through projects, certifications, and technical expertise. Each
                            section represents a milestone in my continuous learning path.
                        </p>
                    </Animate>
                </div>

                {/* Tab Navigation - Simplified */}
                <Animate delay={400} type="slideUp">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`
                  relative flex-1 py-6 px-8 rounded-lg
                  transition-all duration-300 cursor-pointer
                  ${isActive
                                            ? 'bg-primary/10 border-2 border-primary/50'
                                            : 'bg-foreground/5 border-2 border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10'
                                        }
                `}
                                >
                                    {/* Content */}
                                    <div className="flex flex-col items-center gap-3">
                                        <Icon
                                            className={`
                      w-8 h-8 transition-all duration-300
                      ${isActive
                                                    ? 'text-primary'
                                                    : 'text-foreground/60'
                                                }
                    `}
                                        />

                                        <h3 className={`
                    text-lg font-semibold transition-all duration-300
                    ${isActive ? 'text-primary' : 'text-foreground/80'}
                  `}>
                                            {tab.label}
                                        </h3>
                                    </div>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-lg"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Animate>

                {/* Tab Content */}
                <div className="w-full">
                    {activeTab === "projects" && (
                        <Animate delay={100} type="slideUp">
                            <Projects />
                        </Animate>
                    )}

                    {activeTab === "certificates" && (
                        <Animate delay={100} type="slideUp">
                            <Certificates />
                        </Animate>
                    )}

                    {activeTab === "techstack" && (
                        <Animate delay={100} type="slideUp">
                            <TechStack />
                        </Animate>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PortfolioShowcase;
