import { useEffect, useRef } from 'react';

const WaveAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        let time = 0;

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.01;

            // Draw multiple wave layers
            const waves = [
                { amplitude: 30, frequency: 0.01, speed: 0.5, opacity: 0.3, offset: 0 },
                { amplitude: 40, frequency: 0.008, speed: 0.3, opacity: 0.2, offset: 100 },
                { amplitude: 25, frequency: 0.012, speed: 0.7, opacity: 0.25, offset: 200 },
                { amplitude: 35, frequency: 0.009, speed: 0.4, opacity: 0.2, offset: 300 }
            ];

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x < canvas.width; x++) {
                    const y = canvas.height / 2 + 
                             Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                             Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude / 2) +
                             wave.offset;
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.strokeStyle = `rgba(2, 255, 255, ${wave.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Add glow effect
                ctx.strokeStyle = `rgba(2, 255, 255, ${wave.opacity * 0.5})`;
                ctx.lineWidth = 4;
                ctx.stroke();
            });

            // Draw particles along the waves
            for (let i = 0; i < 20; i++) {
                const x = (time * 50 + i * 50) % canvas.width;
                const wave = waves[i % waves.length];
                const y = canvas.height / 2 + 
                         Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                         Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude / 2) +
                         wave.offset;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(2, 255, 255, 0.6)';
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(2, 255, 255, 0.2)';
                ctx.fill();
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-35"
            style={{ zIndex: 1 }}
        />
    );
};

export default WaveAnimation;
