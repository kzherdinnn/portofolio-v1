import Animate from "../../utils/animations/Animate";
import { FaCode, FaCertificate, FaGlobe, FaDownload, FaEye } from "react-icons/fa";

function AboutMe() {
    const stats = [
        {
            icon: FaCode,
            number: "15+",
            label: "TOTAL PROJECTS",
            description: "Innovative web solutions crafted"
        },
        {
            icon: FaCertificate,
            number: "8",
            label: "CERTIFICATES",
            description: "Professional skills validated"
        },
        {
            icon: FaGlobe,
            number: "4",
            label: "YEARS OF EXPERIENCE",
            description: "Continuous learning journey"
        }
    ];

    return (
        <div className="w-full py-20 px-4 bg-black">
            {/* Header */}
            <div className="text-center mb-16">
                <Animate delay={200} type="slideDown">
                    <h1 className="text-4xl lg:text-5xl font-bold neon-glow mb-4">
                        About Me
                    </h1>
                </Animate>
                <Animate delay={300} type="slideDown">
                    <p className="text-foreground/70 flex items-center justify-center gap-2">
                        <span className="text-primary">✨</span>
                        Transforming ideas into digital experiences
                        <span className="text-primary">✨</span>
                    </p>
                </Animate>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Side - Text Content */}
                    <Animate delay={400} type="slideLeft">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                                    Hello, I'm
                                </h2>
                                <h3 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
                                    HerdinKz
                                </h3>
                            </div>

                            <p className="text-foreground/80 leading-relaxed text-justify">
                                Seorang lulusan Teknik Jaringan Komputer dan Telekomunikasi yang memiliki
                                ketertarikan besar dalam pengembangan Front-End. Saya berfokus pada menciptakan
                                pengalaman digital yang menarik dan selalu berusaha memberikan solusi terbaik
                                dalam setiap proyek yang saya kerjakan.
                            </p>

                            {/* Quote */}
                            <div className="border-l-4 border-primary/50 pl-4 py-2 bg-primary/5 rounded-r-lg">
                                <p className="text-foreground/70 italic">
                                    "Leveraging AI as a professional tool, not a replacement."
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                                    <FaDownload />
                                    Download CV
                                </button>
                                <button className="flex items-center gap-2 bg-foreground/10 hover:bg-foreground/20 border-2 border-primary/50 text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                                    <FaEye />
                                    View Projects
                                </button>
                            </div>
                        </div>
                    </Animate>

                    {/* Right Side - Profile Image */}
                    <Animate delay={500} type="slideRight">
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                                {/* Image container */}
                                <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                                    <img
                                        src="/profile.jpg"
                                        alt="HerdinKz"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        onError={(e) => {
                                            // Prevent infinite loop by checking if already using fallback
                                            const target = e.currentTarget;
                                            if (!target.dataset.fallbackUsed) {
                                                target.dataset.fallbackUsed = "true";
                                                // Use a simple colored div as fallback
                                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='24' fill='%2302ffff'%3EHerdinKz%3C/text%3E%3C/svg%3E";
                                            }
                                        }}
                                    />
                                </div>

                                {/* Decorative ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
                            </div>
                        </div>
                    </Animate>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <Animate key={stat.label} delay={600 + (index * 100)} type="slideUp">
                                <div className="group relative bg-foreground/5 border-2 border-foreground/10 rounded-lg p-6 hover:border-primary/50 hover:bg-foreground/10 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <Icon className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                                        <span className="text-4xl font-bold text-primary">{stat.number}</span>
                                    </div>

                                    <h4 className="text-sm font-semibold text-foreground/60 mb-2 tracking-wider">
                                        {stat.label}
                                    </h4>

                                    <p className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors duration-300">
                                        {stat.description}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-primary">→</span>
                                    </div>
                                </div>
                            </Animate>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
