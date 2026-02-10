/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Animate from "../../utils/animations/Animate";
import { FaChevronDown, FaChevronUp, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";
import { api } from "../../utils/api";

const DUMMY_CERTIFICATES = [
    {
        title: 'Full Stack Web Development Professional Certificate',
        issuer: 'Meta',
        date: 'December 2023',
        credentialId: 'META-FS-123456',
        link: 'https://coursera.org/verify/meta-full-stack',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Advanced React and Redux',
        issuer: 'Udemy',
        date: 'October 2023',
        credentialId: 'UC-RE-789012',
        link: 'https://udemy.com/certificate/react-redux',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Node.js Developer Course',
        issuer: 'Andrew Mead (Udemy)',
        date: 'August 2023',
        credentialId: 'UC-NODE-345678',
        link: 'https://udemy.com/certificate/node-developer',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        date: 'June 2023',
        credentialId: 'FCC-JS-901234',
        link: 'https://www.freecodecamp.org/certification/js-algorithms',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        date: 'April 2023',
        credentialId: 'FCC-RWD-567890',
        link: 'https://www.freecodecamp.org/certification/responsive-web-design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2051&auto=format&fit=crop',
    },
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'February 2023',
        credentialId: 'AWS-CP-112233',
        link: 'https://aws.amazon.com/verification',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    }
];

function Certificates() {
    const navigate = useNavigate();
    const [certificates, setCertificates] = useState<any[]>(DUMMY_CERTIFICATES);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.getCertificates();
                console.log("API Response for Certificates:", response.data);

                // Handling both potential response formats: array directly or { success, data }
                const rawData = response.data.data || (Array.isArray(response.data) ? response.data : null);

                if (rawData && rawData.length > 0) {
                    const formattedCerts = rawData.map((cert: any) => ({
                        ...cert,
                        date: cert.issueDate || cert.date,
                        link: cert.credentialUrl || cert.link
                    }));
                    setCertificates(formattedCerts);
                }
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            }
        };
        fetchCertificates();
    }, []);

    const safeCertificates = Array.isArray(certificates) ? certificates : DUMMY_CERTIFICATES;
    const displayedCertificates = showAll ? safeCertificates : safeCertificates.slice(0, 6);
    const hasMoreCertificates = safeCertificates.length > 6;

    return (
        <div className="mt-8 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
                <Animate type="slideUp" delay={100}>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-glow">My Certifications</h2>
                        <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(2,255,255,0.5)]"></div>
                    </div>
                </Animate>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {displayedCertificates.map((cert: any, index: number) => (
                        <Animate key={index} delay={200 + (index * 100)} type="slideUp">
                            <div className="group relative bg-foreground/5 border-2 border-foreground/10 rounded-xl p-6 hover:border-primary/50 hover:bg-foreground/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(2,255,255,0.1)] h-full flex flex-col">
                                {/* Certificate Image */}
                                <div className="relative w-full h-56 mb-6 rounded-lg overflow-hidden border border-foreground/10 group-hover:border-primary/30 transition-colors duration-500">
                                    <img
                                        src={cert.image || "https://images.unsplash.com/photo-1589330694653-96b6f7091448?q=80&w=2070&auto=format&fit=crop"}
                                        alt={cert.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.dataset.fallbackUsed) {
                                                target.dataset.fallbackUsed = "true";
                                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%230a0a0a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%2302ffff'%3ECertificate%3C/text%3E%3C/svg%3E";
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-primary/20 backdrop-blur-md border border-primary/30 rounded-md px-3 py-1 text-xs text-primary font-bold inline-block">
                                            Verified Credential
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Info */}
                                <div className="space-y-4 flex-grow">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                            {cert.title}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                            <FaCertificate className="w-5 h-5 text-primary/70 group-hover:text-primary transition-all duration-300" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {cert.issuer && (
                                            <div className="flex items-center gap-2 text-foreground/70">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                                <p className="text-sm">
                                                    <span className="font-semibold text-foreground/90">Issued by:</span> {cert.issuer}
                                                </p>
                                            </div>
                                        )}

                                        {cert.date && (
                                            <div className="flex items-center gap-2 text-foreground/70">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                                <p className="text-sm">
                                                    <span className="font-semibold text-foreground/90">Date:</span> {cert.date}
                                                </p>
                                            </div>
                                        )}

                                        {cert.credentialId && (
                                            <div className="flex items-center gap-2 text-foreground/50 font-mono">
                                                <div className="w-1.5 h-1.5 rounded-full bg-foreground/20"></div>
                                                <p className="text-xs">ID: {cert.credentialId}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-foreground/10 group-hover:border-primary/20 transition-colors duration-300 flex items-center justify-between">
                                        {cert.link ? (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-3"
                                            >
                                                View Certificate
                                                <FaExternalLinkAlt className="w-3 h-3" />
                                            </a>
                                        ) : <div />}

                                        <button
                                            onClick={() => navigate(`/certificate/${cert._id || cert.id || cert.title?.toLowerCase().replace(/\s+/g, '-')}`)}
                                            className="flex items-center text-gray-400 group-hover:text-white text-sm font-medium transition-colors gap-1"
                                        >
                                            Details <LuMoveRight className="transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 rounded-tr-xl transition-all duration-500"></div>
                            </div>
                        </Animate>
                    ))}
                </div>

                {hasMoreCertificates && (
                    <Animate delay={400} type="slideUp">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="mt-16 flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/50 hover:border-primary text-primary font-bold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,255,255,0.2)] active:scale-95"
                        >
                            {showAll ? (
                                <>
                                    <FaChevronUp className="w-4 h-4" />
                                    See Less
                                </>
                            ) : (
                                <>
                                    <FaChevronDown className="w-4 h-4" />
                                    Explore More ({safeCertificates.length - 6} more)
                                </>
                            )}
                        </button>
                    </Animate>
                )}
            </div>
        </div>
    );
}

export default Certificates;
