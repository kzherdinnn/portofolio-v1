import { useState, useEffect, useRef, ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  delay: number;
  type?: "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "blink"; // Add more types here as needed
  duration?: number; // Optional duration for customization
}

function Animate({
  children,
  delay,
  type = "slideUp",
  duration = 700,
}: AnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    switch (type) {
      case "slideUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10";
      case "slideDown":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10";
      case "slideLeft":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-30vw]";
      case "slideRight":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-30vw]";
      case "blink":
        return isVisible ? "opacity-100 animate-smooth-blink" : "opacity-0";
      default:
        return "opacity-100 translate-y-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${isVisible ? delay + "ms" : 0}`,
        transitionDuration: `${duration}ms`,
      }}
      className={`transition-all ease-in-out ${getAnimationClass()}`}
    >
      {children}
    </div>
  );
}

export default Animate;
