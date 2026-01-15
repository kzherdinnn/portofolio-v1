import { LuMoveRight } from "react-icons/lu";
import { useState, useRef, MouseEvent } from "react";

interface ProjectCardInterface {
  image: string;
  title: string;
  category: string;
  callBack: () => void
}

function ProjectCard({ category, image, title, callBack }: ProjectCardInterface) {
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

    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onClick={callBack}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="project-card-3d holographic-card terminal-window lg:h-full relative rounded-md lg:w-[25vw] bg-background/40 group cursor-pointer scan-line-container overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateY(-10px)' : 'translateY(0)'}`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
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

      {/* Image Container with Overlays */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          className="w-[90vw] lg:h-[30vh] object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          alt={title}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Cyan Glow Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500 mix-blend-screen"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-1000"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 pt-6 lg:pt-2 pb-4 bg-opacity-10 rounded-b-md relative z-10">
        <div className="font-bold text-2xl glitch-effect group-hover:text-primary transition-colors duration-300">{title}</div>

        {/* Category - Fades out on hover */}
        <div className="flex items-center text-foreground/50 opacity-100 translate-y-3 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-0">
          {category}
        </div>

        {/* Call to Action - Slides up on hover */}
        <div className="flex items-center text-primary opacity-0 translate-y-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:-translate-y-6">
          <span className="flex items-center gap-2">
            <span className="text-primary/80 font-mono">&lt;/&gt;</span>
            <span className="font-semibold">View Project</span>
          </span>
          <LuMoveRight className="text-primary w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>

      {/* Floating Particles on Hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <div className="hover-particle particle-1"></div>
        <div className="hover-particle particle-2"></div>
        <div className="hover-particle particle-3"></div>
        <div className="hover-particle particle-4"></div>
      </div>
    </div>
  );
}

export default ProjectCard;
