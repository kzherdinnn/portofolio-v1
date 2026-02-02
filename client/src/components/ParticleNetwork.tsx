import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

const ParticleNetwork = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        const maxDistance = 150;

        // Function to initialize particles based on density
        const initParticles = (width: number, height: number) => {
            // Calculate area-based density
            // Standard Reference: 80 particles for ~1920x1080 (approx 2M pixels)
            // Density factor approx 25000 pixels per particle
            const area = width * height;
            const particleDensity = 25000;
            const particleCount = Math.floor(area / particleDensity);

            // Limit minimum particles to avoid emptiness on small screens
            // and maximum to prevent performance issues on huge pages
            const count = Math.max(50, Math.min(particleCount, 300));

            const newParticles: Particle[] = [];
            for (let i = 0; i < count; i++) {
                newParticles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
            return newParticles;
        };

        // Resize handler
        const resizeCanvas = () => {
            const { offsetWidth, offsetHeight } = container;
            canvas.width = offsetWidth;
            canvas.height = offsetHeight;

            // Re-initialize particles to match new dimensions and maintain density
            particles = initParticles(offsetWidth, offsetHeight);
        };

        // Initial setup
        resizeCanvas();

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(2, 255, 255, 0.8)';
                ctx.fill();

                // Draw connections
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        const opacity = (1 - distance / maxDistance) * 0.5;
                        ctx.strokeStyle = `rgba(2, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Use ResizeObserver to handle container size changes (e.g. content loading)
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
                style={{ zIndex: 1 }}
            />
        </div>
    );
};

export default ParticleNetwork;

