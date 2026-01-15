import { useEffect, useRef } from 'react';

interface CodeSnippet {
    x: number;
    y: number;
    speed: number;
    text: string;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
}

const FloatingCode = () => {
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

        // Code snippets
        const codeTexts = [
            'const', 'function', '=>', '{}', '[]', 'if', 'else',
            'return', 'import', 'export', 'async', 'await',
            'class', 'extends', 'new', 'this', 'let', 'var',
            '<>', '</>', '()', ';', '===', '!==', '&&', '||'
        ];

        const snippets: CodeSnippet[] = [];
        const snippetCount = 30;

        // Create code snippets
        for (let i = 0; i < snippetCount; i++) {
            snippets.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 0.3 + 0.1,
                text: codeTexts[Math.floor(Math.random() * codeTexts.length)],
                opacity: Math.random() * 0.3 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01
            });
        }

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            snippets.forEach(snippet => {
                // Move snippet
                snippet.y -= snippet.speed;
                snippet.rotation += snippet.rotationSpeed;

                // Reset if off screen
                if (snippet.y < -50) {
                    snippet.y = canvas.height + 50;
                    snippet.x = Math.random() * canvas.width;
                    snippet.text = codeTexts[Math.floor(Math.random() * codeTexts.length)];
                }

                // Draw snippet
                ctx.save();
                ctx.translate(snippet.x, snippet.y);
                ctx.rotate(snippet.rotation);
                ctx.font = '16px "Roboto Mono", monospace';
                ctx.fillStyle = `rgba(2, 255, 255, ${snippet.opacity})`;
                ctx.textAlign = 'center';
                ctx.fillText(snippet.text, 0, 0);
                ctx.restore();
            });

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
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
            style={{ zIndex: 1 }}
        />
    );
};

export default FloatingCode;
