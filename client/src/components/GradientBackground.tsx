const GradientBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {/* Main Central Gradient - Clean and Centered like the reference */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `
              radial-gradient(ellipse 80% 50% at 50% 40%, 
                rgba(2, 255, 255, 0.15) 0%, 
                rgba(0, 255, 150, 0.12) 25%,
                rgba(20, 184, 166, 0.08) 50%,
                rgba(0, 0, 0, 0) 70%
              )
            `,
                }}
            />

            {/* Secondary Glow - Bottom accent */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[60%]"
                style={{
                    background: `
              radial-gradient(ellipse 70% 50% at 50% 100%, 
                rgba(99, 102, 241, 0.1) 0%,
                rgba(139, 92, 246, 0.08) 30%,
                rgba(0, 0, 0, 0) 60%
              )
            `,
                }}
            />

            {/* Subtle top accent */}
            <div
                className="absolute top-0 right-0 w-[50%] h-[50%]"
                style={{
                    background: `
              radial-gradient(circle at 80% 20%, 
                rgba(2, 255, 255, 0.08) 0%,
                rgba(0, 0, 0, 0) 50%
              )
            `,
                }}
            />

            {/* Very subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.01]" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
            }}></div>
        </div>
    );
};

export default GradientBackground;
