import { useEffect, useRef, useState } from "react";

interface TrailPoint {
    x: number;
    y: number;
    value: string; // "0" or "1"
    id: number;
    opacity: number;
}

const CustomCursor = () => {
    const [trails, setTrails] = useState<TrailPoint[]>([]);
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailsRef = useRef<TrailPoint[]>([]); // Ref to avoid closure stale state in interval
    const requestRef = useRef<number>();

    useEffect(() => {
        // Keep default cursor visible so user can see where they point, while trail follows
        document.body.style.cursor = "auto";

        let idCounter = 0;
        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            // Add a trail point only if moved enough distance to prevent overcrowding
            const dist = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));

            if (dist > 30) { // Every 30px
                const binary = Math.random() > 0.5 ? "1" : "0";
                const newTrail = {
                    x: e.clientX,
                    y: e.clientY,
                    value: binary,
                    id: idCounter++,
                    opacity: 1
                };

                trailsRef.current = [...trailsRef.current, newTrail];
                setTrails([...trailsRef.current]);

                lastX = e.clientX;
                lastY = e.clientY;
            }
        };

        const animateTrails = () => {
            // Fade out trails
            const updatedTrails = trailsRef.current
                .map(t => ({ ...t, opacity: t.opacity - 0.03 })) // Fade speed
                .filter(t => t.opacity > 0);

            if (updatedTrails.length !== trailsRef.current.length) {
                trailsRef.current = updatedTrails;
                setTrails(updatedTrails);
            } else {
                // Optimization: only update state if visible changes occurred that aren't strictly just map updates
                // But for opacity animation in React state, we need to trigger re-render.
                // To save performance, we could use a canvas overlay, but for DOM:
                if (trailsRef.current.length > 0) {
                    trailsRef.current = updatedTrails;
                    setTrails(updatedTrails);
                }
            }

            requestRef.current = requestAnimationFrame(animateTrails);
        };

        window.addEventListener("mousemove", handleMouseMove);
        requestRef.current = requestAnimationFrame(animateTrails);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.style.cursor = "auto";
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            {/* The Binary Trails */}
            {trails.map((trial) => (
                <div
                    key={trial.id}
                    className="fixed pointer-events-none text-[#02ffff] font-mono text-xs font-bold z-[9998]"
                    style={{
                        left: trial.x,
                        top: trial.y,
                        opacity: trial.opacity,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {trial.value}
                </div>
            ))}

            {/* Main Cursor: Blinking Terminal Block */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }} // Initial hidden
            >
                <div className="flex items-center">

                    {/* Optional: tech crosshair removed */}
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
