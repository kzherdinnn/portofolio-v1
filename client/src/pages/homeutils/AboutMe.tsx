import { useState, useEffect, useCallback } from "react";
import Animate from "../../utils/animations/Animate";
import { FaCode, FaCertificate, FaGlobe, FaDownload, FaEye } from "react-icons/fa";
import ParticleNetwork from "../../components/ParticleNetwork";
import { useAppContext } from "../../utils/AppContext";
import { api } from "../../utils/api";

const PRO_QUOTES = [
    "Building high-performance digital solutions with precision and purpose.",
    "Transforming complex business logic into elegant user experiences.",
    "Engineering scalable systems at the intersection of data and design."
];

function TypewriterQuotes() {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    const handleTyping = useCallback(() => {
        const currentQuote = PRO_QUOTES[index];
        const isFinished = !isDeleting && displayText === currentQuote;
        const isDeleted = isDeleting && displayText === "";

        if (isFinished) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleted) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % PRO_QUOTES.length);
            setTypingSpeed(100);
            return;
        }

        const nextText = isDeleting
            ? currentQuote.substring(0, displayText.length - 1)
            : currentQuote.substring(0, displayText.length + 1);

        setDisplayText(nextText);
        setTypingSpeed(isDeleting ? 50 : 100);
    }, [displayText, isDeleting, index]);

    useEffect(() => {
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [handleTyping, typingSpeed]);

    return (
        <p className="text-foreground/80 italic font-mono text-sm lg:text-base leading-relaxed">
            "{displayText}"
            <span className="inline-block w-[2px] h-[1.2rem] bg-[#02ffff] ml-1 animate-pulse align-middle"></span>
        </p>
    );
}

function AboutMe() {
    const { dispatch } = useAppContext();
    const [counts, setCounts] = useState({
        projects: 0,
        certificates: 0,
        experienceCount: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all data in parallel
                const [projRes, certRes, expRes] = await Promise.all([
                    api.getProjects(),
                    api.getCertificates(),
                    api.getExperience()
                ]);

                setCounts({
                    projects: Array.isArray(projRes.data) ? projRes.data.length : 0,
                    certificates: certRes.data.success ? certRes.data.data.length : 0,
                    experienceCount: Array.isArray(expRes.data) ? expRes.data.length : 0
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const handleViewProjects = () => {
        dispatch({ type: "setScrollView", payload: "WORK" });
        setTimeout(() => {
            dispatch({ type: "setScrollView", payload: undefined });
        }, 400);
    };

    const handleDownloadCV = () => {
        window.open('/cv_herdin.pdf', '_blank');
    };

    const stats = [
        {
            icon: FaCode,
            number: counts.projects > 0 ? `${counts.projects}+` : "0",
            label: "PROJECTS",
            description: "Built & Deployed"
        },
        {
            icon: FaCertificate,
            number: counts.certificates,
            label: "CERTIFICATIONS",
            description: "Technical skills"
        },
        {
            icon: FaGlobe,
            number: counts.experienceCount > 0 ? `${counts.experienceCount}+` : "0",
            label: "EXPERIENCES",
            description: "Professional roles"
        }
    ];

    return (
        <div className="w-full py-20 px-4 bg-black relative overflow-hidden">
            {/* Background Animation */}
            <ParticleNetwork />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <Animate delay={200} type="slideDown">
                        <h1 className="text-4xl lg:text-5xl font-bold neon-glow mb-4">
                            About Me
                        </h1>
                    </Animate>
                    <Animate delay={300} type="slideDown">
                        <p className="text-foreground/70 flex items-center justify-center gap-2">
                            Transforming ideas into digital experiences
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
                                    <h3 className="text-3xl lg:text-5xl font-bold text-primary mb-2">
                                        HerdinKz
                                    </h3>
                                    <h4 className="text-lg lg:text-xl font-mono text-[#02ffff]/70 mb-6">
                                        Undergraduate Informatics Engineering at UIN Sunan Gunung Djati Bandung
                                    </h4>
                                </div>

                                <p className="text-foreground/80 leading-relaxed text-justify">
                                    I am an Informatics Engineering undergraduate student with a versatile
                                    technical background and a passion for building comprehensive digital
                                    ecosystems. My expertise spans across <strong>Full-Stack Web Development</strong>,
                                    <strong> Mobile Applications</strong>, and <strong>Quality Assurance (QA)</strong>.
                                    Beyond core development, I am deeply interested in <strong>Data Science</strong>
                                    and <strong>Natural Language Processing (NLP)</strong>, always seeking to
                                    integrate intelligent insights into user-centric applications.
                                </p>

                                {/* Rotating Pro Quote with Typewriter Effect */}
                                <div className="border-l-4 border-[#02ffff]/50 pl-4 py-3 bg-[#02ffff]/5 rounded-r-lg min-h-[80px] flex items-center">
                                    <TypewriterQuotes />
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button
                                        onClick={handleDownloadCV}
                                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <FaDownload />
                                        Download CV
                                    </button>
                                    <button
                                        onClick={handleViewProjects}
                                        className="flex items-center gap-2 bg-foreground/10 hover:bg-foreground/20 border-2 border-primary/50 text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <FaEye />
                                        View Projects
                                    </button>
                                </div>
                            </div>
                        </Animate>

                        {/* Right Side - Profile Image with Advanced Effects */}
                        <Animate delay={500} type="slideRight">
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative group">
                                    {/* Outer rotating hexagon border */}
                                    <div className="absolute inset-0 w-72 h-72 lg:w-96 lg:h-96 -translate-x-4 -translate-y-4 lg:-translate-x-8 lg:-translate-y-8">
                                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                            <defs>
                                                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#02ffff', stopOpacity: 0.8 }} />
                                                    <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.6 }} />
                                                    <stop offset="100%" style={{ stopColor: '#02ffff', stopOpacity: 0.8 }} />
                                                </linearGradient>
                                            </defs>
                                            <polygon
                                                points="50,5 90,25 90,75 50,95 10,75 10,25"
                                                fill="none"
                                                stroke="url(#hexGradient)"
                                                strokeWidth="0.5"
                                                className="opacity-60"
                                            />
                                        </svg>
                                    </div>

                                    {/* Pulsing glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/40 to-blue-500/40 rounded-full blur-3xl opacity-60 group-hover:opacity-90 animate-pulse-slow transition-opacity duration-500"></div>

                                    {/* Floating particles */}
                                    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                                                style={{
                                                    left: `${Math.random() * 100}%`,
                                                    top: `${Math.random() * 100}%`,
                                                    animationDelay: `${i * 0.5}s`,
                                                    animationDuration: `${3 + Math.random() * 2}s`
                                                }}
                                            ></div>
                                        ))}
                                    </div>

                                    {/* Main image container with hexagon clip */}
                                    <div className="relative w-64 h-64 lg:w-80 lg:h-80 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        {/* Hexagon shape using clip-path */}
                                        <div
                                            className="w-full h-full relative"
                                            style={{
                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                            }}
                                        >
                                            {/* Image */}
                                            <img
                                                src="/profile.png"
                                                alt="HerdinKz"
                                                className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    if (!target.dataset.fallbackUsed) {
                                                        target.dataset.fallbackUsed = "true";
                                                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='24' fill='%2302ffff'%3EHerdinKz%3C/text%3E%3C/svg%3E";
                                                    }
                                                }}
                                            />

                                            {/* Scan line effect */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-full w-full animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Grid overlay */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                                style={{
                                                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(2, 255, 255, .3) 25%, rgba(2, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(2, 255, 255, .3) 75%, rgba(2, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(2, 255, 255, .3) 25%, rgba(2, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(2, 255, 255, .3) 75%, rgba(2, 255, 255, .3) 76%, transparent 77%, transparent)',
                                                    backgroundSize: '50px 50px'
                                                }}
                                            ></div>

                                            {/* Corner brackets */}
                                            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Hexagon border */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                                            <defs>
                                                <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#02ffff', stopOpacity: 1 }} />
                                                    <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
                                                    <stop offset="100%" style={{ stopColor: '#02ffff', stopOpacity: 1 }} />
                                                </linearGradient>
                                            </defs>
                                            <polygon
                                                points="50,2 98,27 98,73 50,98 2,73 2,27"
                                                fill="none"
                                                stroke="url(#borderGradient)"
                                                strokeWidth="1"
                                                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </svg>
                                    </div>

                                    {/* Orbiting dots */}
                                    <div className="absolute inset-0 w-64 h-64 lg:w-80 lg:h-80 animate-spin-reverse pointer-events-none">
                                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 shadow-glow-primary"></div>
                                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full -translate-x-1/2 shadow-glow-purple"></div>
                                    </div>

                                    {/* Status indicator */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-primary/50 rounded-full px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-mono text-primary">ONLINE</span>
                                    </div>

                                    {/* Glitch effect overlay */}
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay animate-glitch"></div>
                                    </div>
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
                                            <Icon className="w-8 h-8 text-[#02ffff]/60 group-hover:text-[#02ffff] transition-colors duration-300" />
                                            <span className="text-4xl font-bold text-[#02ffff]">{stat.number}</span>
                                        </div>

                                        <h4 className="text-sm font-semibold text-[#02ffff]/60 mb-2 tracking-wider">
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
        </div >
    );
}

export default AboutMe;
