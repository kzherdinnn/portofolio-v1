/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Animate from "../../utils/animations/Animate";
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const DUMMY_CERTIFICATES = [
    {
        _id: 'meta-fs',
        title: 'Full Stack Web Development Professional Certificate',
        issuer: 'Meta',
        date: 'December 2023',
        credentialId: 'META-FS-123456',
        link: 'https://coursera.org/verify/meta-full-stack',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    },
    {
        _id: 'udemy-react',
        title: 'Advanced React and Redux',
        issuer: 'Udemy',
        date: 'October 2023',
        credentialId: 'UC-RE-789012',
        link: 'https://udemy.com/certificate/react-redux',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    },
    {
        _id: 'udemy-node',
        title: 'Node.js Developer Course',
        issuer: 'Andrew Mead (Udemy)',
        date: 'August 2023',
        credentialId: 'UC-NODE-345678',
        link: 'https://udemy.com/certificate/node-developer',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    },
    {
        _id: 'fcc-js',
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        date: 'June 2023',
        credentialId: 'FCC-JS-901234',
        link: 'https://www.freecodecamp.org/certification/js-algorithms',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop',
    },
    {
        _id: 'fcc-rwd',
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        date: 'April 2023',
        credentialId: 'FCC-RWD-567890',
        link: 'https://www.freecodecamp.org/certification/responsive-web-design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2051&auto=format&fit=crop',
    },
    {
        _id: 'aws-cp',
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

    const handleDetailClick = (cert: any) => {
        const id = cert._id || cert.id || cert.title?.toLowerCase().replace(/\s+/g, '-');
        navigate(`/certificate/${id}`);
    };

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
                            <div
                                onClick={() => handleDetailClick(cert)}
                                className="group relative bg-[#0f111a] border-2 border-foreground/10 rounded-xl p-6 hover:border-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(2,255,255,0.15)] h-full flex flex-col cursor-pointer"
                            >
                                {/* Certificate Preview */}
                                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-foreground/5 group-hover:border-primary/30 transition-all duration-500">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.dataset.fallbackUsed) {
                                                target.dataset.fallbackUsed = "true";
                                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%230a0a0a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%2302ffff'%3ECertificate%3C/text%3E%3C/svg%3E";
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 flex-grow">
                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                        {cert.title}
                                    </h3>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-mono tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                                            {cert.issuer}
                                        </p>
                                        <p className="text-[10px] text-[#02ffff]/50 font-mono">
                                            {cert.date}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center justify-between">
                                    <button className="flex items-center text-xs font-mono text-gray-400 group-hover:text-[#02ffff] transition-colors gap-2">
                                        CERT_DETAILS <LuMoveRight className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-gray-600 hover:text-primary transition-colors"
                                            title="View Original"
                                        >
                                            <FaExternalLinkAlt className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
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
/ /   D e p l o y m e n t   t r i g g e r  
 