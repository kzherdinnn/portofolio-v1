import { useState, useEffect, useRef } from "react";
import { FaTerminal, FaTimes, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([
        "Selamat Datang di Portfolio OS v1.0.0",
        "Ketik 'bantuan' untuk melihat perintah yang tersedia.",
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, isOpen]);

    const handleCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const args = trimmedCmd.split(" ");
        const baseCmd = args[0];

        // Push the command to history immediately
        setHistory(prev => [...prev, `> ${cmd}`]);

        switch (baseCmd) {
            case "help":
            case "bantuan":
                setHistory(prev => [...prev,
                    "Perintah yang tersedia:",
                    "  tentang  - Siapa saya?",
                    "  bantuan  - Lihat bantuan",
                    "  skill    - Keahlian teknis saya",
                    "  kontak   - Hubungi saya",
                    "  proyek   - Lihat karya saya",
                    "  login    - Akses portal admin",
                    "  logout   - Keluar dari admin",
                    "  waktu    - Tampilkan waktu saat ini",
                    "  whoami   - Info pengguna saat ini",
                    "  ls       - Daftar direktori",
                    "  cd <dir> - Pindah direktori",
                    "  bersih   - Bersihkan terminal",
                    "  keluar   - Tutup terminal"
                ]);
                break;
            case "about":
            case "tentang":
                setHistory(prev => [...prev,
                    "Saya adalah seorang Software Engineer yang bersemangat membangun aplikasi web yang skalabel,",
                    "model AI, dan memecahkan masalah kompleks dengan kode."
                ]);
                break;
            case "skills":
            case "skill":
                setHistory(prev => [...prev,
                    "Frontend: React, TypeScript, TailwindCSS",
                    "Backend:  Node.js, Express, MongoDB",
                    "AI/ML:    Python, TensorFlow, PyTorch"
                ]);
                break;
            case "contact":
            case "kontak":
                setHistory(prev => [...prev,
                    "Email: kzherdin03@gmail.com",
                    "GitHub: github.com/kzherdinnn"
                ]);
                break;
            case "projects":
            case "proyek":
                setHistory(prev => [...prev, "Menavigasi ke bagian Proyek untuk melihat karya saya!"]);
                // Optional: trigger scroll to projects
                break;
            case "login":
                setHistory(prev => [...prev, "Memulai koneksi aman ke portal admin..."]);
                setTimeout(() => {
                    setIsOpen(false);
                    navigate("/login");
                }, 1000);
                break;
            case "logout":
                try {
                    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                        method: "POST",
                        credentials: "include"
                    });
                    const data = await res.json();
                    if (data.success) {
                        setHistory(prev => [...prev, "Berhasil keluar.", "Mengalihkan ke beranda..."]);
                        setTimeout(() => {
                            setIsOpen(false);
                            navigate("/");
                            window.location.reload(); // Ensure complete state reset
                        }, 1000);
                    } else {
                        setHistory(prev => [...prev, "Gagal keluar atau Anda belum login."]);
                    }
                } catch (e) {
                    setHistory(prev => [...prev, "Kesalahan saat keluar."]);
                }
                break;
            case "date":
            case "waktu":
                setHistory(prev => [...prev, new Date().toLocaleString()]);
                break;
            case "whoami":
                try {
                    const res = await fetch(`${API_BASE_URL}/api/auth/check`, { credentials: "include" });
                    const data = await res.json();
                    const user = data.success ? `root (admin: ${data.user.username})` : "guest";
                    setHistory(prev => [...prev, user]);
                } catch (e) {
                    setHistory(prev => [...prev, "tamu (offline)"]);
                }
                break;
            case "ls":
                setHistory(prev => [...prev,
                    "Direktori:",
                    "  home/",
                    "  projects/",
                    "  admin/",
                    "  login/"
                ]);
                break;
            case "cd":
                const dir = args[1];
                if (!dir) {
                    setHistory(prev => [...prev, "Penggunaan: cd <direktori>"]);
                } else {
                    switch (dir) {
                        case "home":
                            setIsOpen(false);
                            navigate("/");
                            break;
                        case "projects":
                        case "proyek":
                            setIsOpen(false);
                            navigate("/projectdetail"); // Note: users might expect /projects but route is projectdetail
                            break;
                        case "admin":
                            setIsOpen(false);
                            navigate("/admin");
                            break;
                        case "login":
                            setIsOpen(false);
                            navigate("/login");
                            break;
                        case "..":
                            setHistory(prev => [...prev, "Tidak bisa naik dari root."]);
                            break;
                        default:
                            setHistory(prev => [...prev, `Direktori tidak ditemukan: ${dir}`]);
                    }
                }
                break;
            case "sudo":
                setHistory(prev => [...prev, "Akses ditolak: Anda tidak mengucapkan kata ajaib."]);
                break;
            case "secret":
            case "rahasia":
                setHistory(prev => [...prev, "Tidak ada sendok."]);
                break;
            case "clear":
            case "bersih":
                setHistory([]);
                return;
            case "exit":
            case "keluar":
                setIsOpen(false);
                return;
            case "":
                break;
            default:
                setHistory(prev => [...prev, `Perintah tidak ditemukan: '${trimmedCmd}'. Ketik 'bantuan' untuk opsi.`]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-10 right-10 bg-black border border-[#02ffff] text-[#02ffff] p-4 rounded-full shadow-[0_0_15px_#02ffff] hover:scale-110 transition-transform z-[9999] group"
                >
                    <FaTerminal className="w-6 h-6 group-hover:animate-pulse" />
                </button>
            )}

            {/* Terminal Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-10 w-[90vw] md:w-[600px] h-[400px] bg-[#0a0a0a]/95 border border-[#333] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[9999] flex flex-col backdrop-blur-sm overflow-hidden font-mono text-sm md:text-base">
                    {/* Header */}
                    <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#333] flex justify-between items-center cursor-move">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" onClick={() => setIsOpen(false)}></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-gray-400 text-xs">user@portfolio:~</div>
                        <div className="flex gap-4 text-gray-400">
                            <FaMinus className="cursor-pointer hover:text-white" />
                            <FaTimes className="cursor-pointer hover:text-white" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        className="flex-1 p-4 overflow-y-auto text-[#02ffff]"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((line, i) => (
                            <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
                        ))}

                        <div className="flex items-center">
                            <span className="mr-2 text-[#27c93f]">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-1 text-[#02ffff] font-mono"
                                autoFocus
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Terminal;
