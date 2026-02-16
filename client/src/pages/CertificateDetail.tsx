import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import NavBar from "../utils/NavBar";
import Animate from "../utils/animations/Animate";
import { MdChevronRight, MdDateRange, MdVerified } from "react-icons/md";
import { LuExternalLink, LuAward, LuShieldCheck } from "react-icons/lu";
import BottomNav from "./homeutils/BottomNav";

function CertificateDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCertificate = async () => {
            try {
                const response = await api.getCertificates();
                const rawData = response.data.data || (Array.isArray(response.data) ? response.data : []);

                // Find by ID or by a slugified title for dummy data
                const found = rawData.find((c: any) =>
                    c._id === id ||
                    c.id === id ||
                    c.title?.toLowerCase().replace(/\s+/g, '-') === id
                );

                if (found) {
                    setCertificate({
                        ...found,
                        date: found.issueDate || found.date,
                        link: found.credentialUrl || found.link
                    });
                }
            } catch (error) {
                console.error("Failed to fetch certificate:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#02ffff] font-mono animate-pulse">Verifying Credentials...</div>;
    if (!certificate) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">Error: Certificate Data Not Found</div>;

    return (
        <div className="min-h-screen bg-[#050511] text-white flex flex-col relative overflow-hidden font-mono selection:bg-[#02ffff] selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="binary-rain text-[#02ffff]/5 font-mono text-xs"></div>
            </div>

            <NavBar />

            <div className="flex-grow max-w-7xl mx-auto px-6 w-full mt-24 lg:mt-32 pb-20 relative z-10">

                {/* Breadcrumb & Back */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 px-4 py-2 rounded border border-gray-800 bg-black/50 hover:border-[#02ffff] text-gray-400 hover:text-[#02ffff] transition-all duration-300"
                    >
                        <span className="text-lg">‹</span> <span className="text-sm font-mono group-hover:tracking-widest transition-all">BACK</span>
                    </button>
                    <div className="flex items-center text-sm font-mono text-gray-500">
                        <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>~/certificates</span>
                        <MdChevronRight className="mx-2 text-[#02ffff]" />
                        <span className="text-[#02ffff] neon-glow">{certificate.credentialId || 'view'}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left Column: Certificate Info */}
                    <Animate type="slideRight" delay={100}>
                        <div className="terminal-window bg-[#0a0a0a]/90 backdrop-blur-sm h-full flex flex-col">
                            <div className="terminal-header">
                                <div className="terminal-dot red"></div>
                                <div className="terminal-dot yellow"></div>
                                <div className="terminal-dot green"></div>
                                <div className="ml-4 text-xs text-gray-500 font-mono">certificate_verify.log</div>
                            </div>
                            <div className="p-8 flex-col flex gap-8">
                                <div>
                                    <div className="flex items-center gap-2 text-[#02ffff] mb-2">
                                        <LuShieldCheck className="w-5 h-5 shadow-[0_0_10px_#02ffff]" />
                                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Verified Achievement</span>
                                    </div>
                                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 line-clamp-3">
                                        {certificate.title}
                                    </h1>
                                    <div className="h-1 w-24 bg-[#02ffff] rounded-full shadow-[0_0_10px_#02ffff]"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#02ffff]/50 transition-colors">
                                            <LuAward className="w-6 h-6 text-[#02ffff]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-tighter">Organisasi penerbit</p>
                                            <p className="text-xl font-bold text-white">{certificate.issuer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#02ffff]/50 transition-colors">
                                            <MdDateRange className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-tighter">Tanggal terbit</p>
                                            <p className="text-xl font-bold text-white">{certificate.date}</p>
                                        </div>
                                    </div>

                                    {certificate.expirationDate && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#02ffff]/50 transition-colors">
                                                <MdDateRange className="w-6 h-6 text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-tighter">Tanggal kedaluwarsa</p>
                                                <p className="text-xl font-bold text-white">{certificate.expirationDate}</p>
                                            </div>
                                        </div>
                                    )}

                                    {certificate.credentialId && (
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#02ffff]/50 transition-colors">
                                                <MdVerified className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-tighter">ID Kredensial</p>
                                                <p className="text-sm font-mono text-gray-300 bg-white/5 px-2 py-1 rounded inline-block mt-1">{certificate.credentialId}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Skills Earned */}
                                {certificate.skills && certificate.skills.length > 0 && (
                                    <div className="pt-6 border-t border-gray-800 mt-4">
                                        <h3 className="text-sm font-mono text-gray-500 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                            <span className="text-[#02ffff]">&gt;</span> Keahlian
                                        </h3>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {certificate.skills.map((skill: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 font-mono rounded-sm hover:border-[#02ffff] hover:text-[#02ffff] transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Verification Link */}
                                {certificate.link && (
                                    <div className="mt-auto pt-8">
                                        <a
                                            href={certificate.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-[#02ffff]/10 border border-[#02ffff]/50 hover:bg-[#02ffff]/20 hover:border-[#02ffff] text-[#02ffff] py-4 rounded flex items-center justify-center gap-3 font-mono text-sm transition-all group shadow-[0_0_15px_rgba(2,255,255,0.1)] hover:shadow-[0_0_25px_rgba(2,255,255,0.3)] uppercase tracking-[0.2em]"
                                        >
                                            <LuExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            Lihat Kredensial
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Animate>

                    {/* Right Column: High Quality Preview */}
                    <div className="space-y-8 h-full flex flex-col">
                        <Animate type="slideLeft" delay={200}>
                            <div className="terminal-window bg-[#0a0a0a]/90 backdrop-blur-sm p-1">
                                <div className="terminal-header">
                                    <div className="terminal-dot red"></div>
                                    <div className="terminal-dot yellow"></div>
                                    <div className="terminal-dot green"></div>
                                    <div className="ml-4 text-xs text-gray-500 font-mono">certificate_preview.jpg</div>
                                </div>
                                <div className="relative group overflow-hidden bg-black aspect-[4/3] flex items-center justify-center">
                                    <img
                                        src={certificate.image || "https://images.unsplash.com/photo-1589330694653-96b6f7091448?q=80&w=2070&auto=format&fit=crop"}
                                        alt={certificate.title}
                                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    <LuAward className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white/5 pointer-events-none group-hover:text-[#02ffff]/10 transition-colors duration-700" />
                                </div>
                            </div>
                        </Animate>

                        <Animate type="slideLeft" delay={400}>
                            <div className="terminal-window bg-[#0a0a0a]/90 backdrop-blur-sm h-full">
                                <div className="terminal-header">
                                    <div className="terminal-dot red"></div>
                                    <div className="terminal-dot yellow"></div>
                                    <div className="terminal-dot green"></div>
                                    <div className="ml-4 text-xs text-gray-500 font-mono">system_notes.txt</div>
                                </div>
                                <div className="p-8 font-mono text-sm text-gray-400 space-y-4 leading-relaxed">
                                    <p><span className="text-[#02ffff]">STATUS:</span> COMPLETED</p>
                                    <p><span className="text-[#02ffff]">VALIDITY:</span> {certificate.expirationDate || "PERMANENT"}</p>
                                    <p><span className="text-[#02ffff]">METADATA:</span> This certification validates the technical proficiency and professional expertise acquired through {certificate.issuer}, serving as a verified record of achievement.</p>
                                    <div className="mt-8 pt-8 border-t border-gray-800 text-[10px] text-gray-600">
                                        ID_AUTO_GENERATED: {id}<br />
                                        SYSTEM_CHECK: PASS<br />
                                        ENCRYPTION: SHA-256
                                    </div>
                                </div>
                            </div>
                        </Animate>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}

export default CertificateDetail;
