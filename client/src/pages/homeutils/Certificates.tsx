/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Animate from "../../utils/animations/Animate";
import { FaChevronDown, FaChevronUp, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { api } from "../../utils/api";

function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.getCertificates();
                setCertificates(response.data);
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            }
        };
        fetchCertificates();
    }, []);

    // Show only 3 certificates initially, or all if showAll is true
    const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);
    const hasMoreCertificates = certificates.length > 3;

    if (certificates.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="max-w-2xl mx-auto p-12 bg-foreground/5 border border-foreground/10 rounded-lg">
                    <FaCertificate className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4 neon-glow">Certificates</h3>
                    <p className="text-foreground/70">
                        This section is coming soon. Stay tuned for my professional certifications and achievements!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-[10vh] px-4">
            <div className="flex flex-col items-center justify-center pb-[5vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
                    {displayedCertificates.map((cert: any, index: number) => (
                        <Animate key={index} delay={200 + (index * 100)} type="slideUp">
                            <div className="group relative bg-foreground/5 border-2 border-foreground/10 rounded-lg p-6 hover:border-primary/50 hover:bg-foreground/10 transition-all duration-300 hover:scale-105">
                                {/* Certificate Image */}
                                {cert.image && (
                                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (!target.dataset.fallbackUsed) {
                                                    target.dataset.fallbackUsed = "true";
                                                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%2302ffff'%3ECertificate%3C/text%3E%3C/svg%3E";
                                                }
                                            }}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )}

                                {/* Certificate Info */}
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {cert.title}
                                        </h3>
                                        <FaCertificate className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                                    </div>

                                    {cert.issuer && (
                                        <p className="text-sm text-foreground/60">
                                            <span className="font-semibold">Issued by:</span> {cert.issuer}
                                        </p>
                                    )}

                                    {cert.date && (
                                        <p className="text-sm text-foreground/50">
                                            <span className="font-semibold">Date:</span> {cert.date}
                                        </p>
                                    )}

                                    {cert.credentialId && (
                                        <p className="text-xs text-foreground/40 font-mono">
                                            ID: {cert.credentialId}
                                        </p>
                                    )}

                                    {/* View Certificate Link */}
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300 mt-2"
                                        >
                                            <FaExternalLinkAlt className="w-3 h-3" />
                                            View Certificate
                                        </a>
                                    )}
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300"></div>
                            </div>
                        </Animate>
                    ))}
                </div>

                {/* See More / See Less Button */}
                {hasMoreCertificates && (
                    <Animate delay={400} type="slideUp">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="mt-10 flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border-2 border-primary/50 hover:border-primary text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            {showAll ? (
                                <>
                                    <FaChevronUp className="w-4 h-4" />
                                    See Less
                                </>
                            ) : (
                                <>
                                    <FaChevronDown className="w-4 h-4" />
                                    See More ({certificates.length - 3} more certificates)
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
