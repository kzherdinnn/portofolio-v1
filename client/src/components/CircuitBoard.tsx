import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    active: boolean;
    pulsePhase: number;
}

interface Connection {
    from: Node;
    to: Node;
    progress: number;
    speed: number;
}

const CircuitBoard = () => {
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

        // Create grid of nodes
        const gridSpacing = 100;
        const nodes: Node[] = [];
        const connections: Connection[] = [];

        for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
            for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
                nodes.push({
                    x: x + (Math.random() - 0.5) * 20,
                    y: y + (Math.random() - 0.5) * 20,
                    active: Math.random() > 0.7,
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        }

        // Create connections between nearby nodes
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < gridSpacing * 1.5 && Math.random() > 0.6) {
                    connections.push({
                        from: node,
                        to: otherNode,
                        progress: Math.random(),
                        speed: Math.random() * 0.005 + 0.002
                    });
                }
            });
        });

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            connections.forEach(conn => {
                // Draw static line
                ctx.beginPath();
                ctx.moveTo(conn.from.x, conn.from.y);
                ctx.lineTo(conn.to.x, conn.to.y);
                ctx.strokeStyle = 'rgba(2, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw moving pulse
                conn.progress += conn.speed;
                if (conn.progress > 1) conn.progress = 0;

                const pulseX = conn.from.x + (conn.to.x - conn.from.x) * conn.progress;
                const pulseY = conn.from.y + (conn.to.y - conn.from.y) * conn.progress;

                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(2, 255, 255, 0.8)';
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(2, 255, 255, 0.2)';
                ctx.fill();
            });

            // Draw nodes
            nodes.forEach(node => {
                node.pulsePhase += 0.05;

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);

                if (node.active) {
                    const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
                    ctx.fillStyle = `rgba(2, 255, 255, ${pulse})`;
                } else {
                    ctx.fillStyle = 'rgba(2, 255, 255, 0.3)';
                }
                ctx.fill();

                // Outer glow for active nodes
                if (node.active) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                    const pulse = Math.sin(node.pulsePhase) * 0.2 + 0.2;
                    ctx.fillStyle = `rgba(2, 255, 255, ${pulse})`;
                    ctx.fill();
                }
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
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-25"
            style={{ zIndex: 1 }}
        />
    );
};

export default CircuitBoard;
