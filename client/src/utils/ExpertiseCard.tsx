import { FaBolt, FaBrain, FaSolarPanel, FaAutoprefixer } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import Animate from "./animations/Animate";
import { useState, useRef, MouseEvent } from "react";

interface ExpertiseCardInterface {
  icon: "SUBSTATION" | "MATLAB" | "AI" | "RENEWABLE" | "POWER" | "CAD";
  heading: string;
  headingContemt: string;
  desc: string;
}

function ExpertiseCard({
  desc,
  heading,
  headingContemt,
  icon,
  delay,
}: ExpertiseCardInterface & { delay: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Icon color mapping
  const iconColors: Record<string, { main: string; glow: string; gradient: string }> = {
    SUBSTATION: { main: "#facc15", glow: "rgba(250, 204, 21, 0.5)", gradient: "from-yellow-400/20 to-yellow-400/5" },
    MATLAB: { main: "#f97316", glow: "rgba(249, 115, 22, 0.5)", gradient: "from-orange-500/20 to-orange-500/5" },
    AI: { main: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", gradient: "from-purple-500/20 to-purple-500/5" },
    RENEWABLE: { main: "#22c55e", glow: "rgba(34, 197, 94, 0.5)", gradient: "from-green-500/20 to-green-500/5" },
    POWER: { main: "#3b82f6", glow: "rgba(59, 130, 246, 0.5)", gradient: "from-blue-500/20 to-blue-500/5" },
    CAD: { main: "#ef4444", glow: "rgba(239, 68, 68, 0.5)", gradient: "from-red-500/20 to-red-500/5" },
  };

  // Default color if icon type not found
  const defaultColor = { main: "#02ffff", glow: "rgba(2, 255, 255, 0.5)", gradient: "from-primary/20 to-primary/5" };
  const currentColor = iconColors[icon] || defaultColor;

  const IconComponent =
    icon === "SUBSTATION" ? FaBolt :
      icon === "MATLAB" ? FaChartLine :
        icon === "AI" ? FaBrain :
          icon === "RENEWABLE" ? FaSolarPanel :
            icon === "POWER" ? GiElectric :
              FaAutoprefixer;

  return (
    <Animate delay={delay}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="expertise-card-3d holographic-card terminal-window group cursor-pointer overflow-hidden h-full"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateY(-10px)' : 'translateY(0)'}`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        }}
      >
        {/* Animated Glow Border */}
        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30">
          <div className="absolute inset-0 rounded-md animate-border-glow"></div>
        </div>

        {/* Terminal Header */}
        <div className="terminal-header relative z-10">
          <div className="terminal-dot red group-hover:shadow-glow-red transition-all duration-300"></div>
          <div className="terminal-dot yellow group-hover:shadow-glow-yellow transition-all duration-300"></div>
          <div className="terminal-dot green group-hover:shadow-glow-green transition-all duration-300"></div>
        </div>

        {/* Card Content */}
        <div className="px-8 py-10 relative z-10">
          {/* Icon and Header Section */}
          <div className="flex gap-6 items-start mb-6">
            {/* Animated Icon with Glow */}
            <div className="relative group/icon">
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${currentColor.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                style={{
                  boxShadow: isHovered ? `0 0 40px ${currentColor.glow}` : 'none'
                }}
              ></div>
              <div className="relative p-3 rounded-lg bg-gradient-to-br from-background/80 to-background/40 border border-foreground/10 group-hover:border-foreground/30 transition-all duration-300 group-hover:scale-110">
                <IconComponent
                  className="h-14 w-14 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{
                    color: currentColor.main,
                    filter: isHovered ? `drop-shadow(0 0 10px ${currentColor.glow})` : 'none'
                  }}
                />
              </div>

              {/* Floating Particles around Icon */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="icon-particle particle-1" style={{ background: currentColor.main }}></div>
                <div className="icon-particle particle-2" style={{ background: currentColor.main }}></div>
                <div className="icon-particle particle-3" style={{ background: currentColor.main }}></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="w-fit">
                <h2 className="text-2xl font-bold neon-glow transition-all duration-300 group-hover:text-primary">
                  {heading}
                </h2>
                <div
                  className="w-full h-[3px] rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-lg"
                  style={{
                    backgroundColor: currentColor.main,
                    boxShadow: isHovered ? `0 0 10px ${currentColor.glow}` : 'none',
                    width: isHovered ? '100%' : '60%'
                  }}
                ></div>
              </div>
              <h3 className="text-primary font-mono text-lg transition-all duration-300 group-hover:text-primary/80">
                {headingContemt}
              </h3>
            </div>
          </div>

          {/* Description Section with Code Brackets */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center h-full">
              <label className="text-2xl text-primary/60 group-hover:text-primary transition-colors duration-300">{`<>`}</label>
              <div className="w-[2px] flex-1 min-h-[120px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent group-hover:from-primary/60 group-hover:via-primary/30 transition-all duration-500"></div>
              <label className="text-2xl text-primary/60 group-hover:text-primary transition-colors duration-300">{`</>`}</label>
            </div>
            <div className="flex-1 pt-2">
              <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                {desc}
              </p>
            </div>
          </div>
        </div>

        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen`}
        ></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-1000"></div>
        </div>
      </div>
    </Animate>
  );
}

export default ExpertiseCard;