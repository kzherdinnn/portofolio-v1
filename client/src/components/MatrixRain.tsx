import { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Binary characters only
        const chars = '01';
        const fontSize = 20; // Larger font
        const columns = canvas.width / fontSize;

        // Array to store y-position and speed of each column
        const drops: { y: number; speed: number; brightness: number }[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = {
                y: Math.random() * -100,
                speed: Math.random() * 0.8 + 0.5, // Faster
                brightness: Math.random() * 0.3 + 0.7 // Brighter
            };
        }

        // Drawing function
        const draw = () => {
            // More opaque black for trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;

            // Loop through drops
            for (let i = 0; i < drops.length; i++) {
                // Random binary character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Bright cyan
                const alpha = drops[i].brightness;
                ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;

                // Draw character
                const x = i * fontSize;
                const y = drops[i].y * fontSize;
                ctx.fillText(text, x, y);

                // White highlights more frequently
                if (Math.random() > 0.95) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                    ctx.fillText(text, x, y);
                }

                // Reset drop
                if (drops[i].y * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i].y = 0;
                    drops[i].speed = Math.random() * 0.8 + 0.5;
                    drops[i].brightness = Math.random() * 0.3 + 0.7;
                }

                // Move drop down
                drops[i].y += drops[i].speed;
            }
        };

        // Animation loop
        const interval = setInterval(draw, 50);

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
            style={{ zIndex: 202 }}
        />
    );
};

export default MatrixRain;
