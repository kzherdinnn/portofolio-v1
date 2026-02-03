import { LuMoveRight, LuExternalLink } from "react-icons/lu";
import { useState } from "react";

interface ProjectCardInterface {
  image: string;
  title: string;
  category: string;
  description?: string;
  link?: string;
  callBack: () => void
}

function ProjectCard({ category, image, title, description, link, callBack }: ProjectCardInterface) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={callBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="project-card relative rounded-xl bg-[#0f111a] border border-gray-800 hover:border-[#02ffff] transition-all duration-300 overflow-hidden group cursor-pointer lg:w-[25vw] flex flex-col h-full shadow-lg hover:shadow-[#02ffff]/20"
    >
      {/* Image Section */}
      <div className="relative h-48 lg:h-52 overflow-hidden w-full bg-gray-900">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={title}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallbackUsed) {
              target.dataset.fallbackUsed = "true";
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='400' height='250' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%2302ffff'%3EProject%3C/text%3E%3C/svg%3E";
            }
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[#02ffff] transition-colors">{title}</h3>

        {description && (
          <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800/50">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#4da8da] hover:text-[#02ffff] text-sm font-medium transition-colors gap-2 z-20"
              onClick={(e) => e.stopPropagation()} // Prevent card click
            >
              Live Demo <LuExternalLink />
            </a>
          ) : <div />}

          <button className="flex items-center text-gray-300 group-hover:text-white text-sm font-medium transition-colors gap-1">
            Details <LuMoveRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hidden Category Tag for semantics/filtering if needed later */}
      <div className="hidden">{category}</div>
    </div>
  );
}

export default ProjectCard;
