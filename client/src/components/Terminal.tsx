import { useState, useEffect, useRef } from "react";
import { FaTerminal, FaTimes, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([
        "Welcome to Portfolio OS v1.0.0",
        "Type 'help' to see available commands.",
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

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const newHistory = [...history, `> ${cmd}`];

        switch (trimmedCmd) {
            case "help":
                newHistory.push(
                    "Available commands:",
                    "  about    - Who am I?",
                    "  skills   - My technical skills",
                    "  contact  - Get in touch",
                    "  projects - View my work",
                    "  login    - Admin portal access",
                    "  clear    - Clear terminal",
                    "  exit     - Close terminal"
                );
                break;
            case "about":
                newHistory.push(
                    "I am a Software Engineer passionate about building scalable web applications,",
                    "AI models, and solving complex problems with code."
                );
                break;
            case "skills":
                newHistory.push(
                    "Frontend: React, TypeScript, TailwindCSS",
                    "Backend:  Node.js, Express, MongoDB",
                    "AI/ML:    Python, TensorFlow, PyTorch"
                );
                break;
            case "contact":
                newHistory.push(
                    "Email: kzherdin03@gmail.com",
                    "GitHub: github.com/kzherdinnn"
                );
                break;
            case "projects":
                newHistory.push("Navigate to the Projects section to see my work!");
                // Optional: trigger scroll to projects
                break;
            case "login":
                newHistory.push("Initiating secure connection to admin portal...");
                setTimeout(() => {
                    setIsOpen(false);
                    navigate("/login");
                }, 1000);
                break;
            case "clear":
                setHistory([]);
                return;
            case "exit":
                setIsOpen(false);
                return;
            case "":
                break;
            default:
                newHistory.push(`Command not found: '${trimmedCmd}'. Type 'help' for options.`);
        }

        setHistory(newHistory);
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
