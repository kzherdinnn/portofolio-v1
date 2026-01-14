/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: " #66d9ed",
        background: "#17161a",
        foreground: "#ffffff",
        secondary:"#af5fff"
      },
      animation: {
        "move-left-right": "moveLeftRight 4s ease-in-out infinite",
        "smooth-blink": "smooth-blink 2s infinite ease-in-out",
      },
      keyframes: {
        moveLeftRight: {
          "0%, 100%": {
            transform: "translateX(5px)",
          },
          "50%": {
            transform: "translateX(-5px)",
          },
        },
        "smooth-blink": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.5)" },
        }
      },
    },
  },
  plugins: [],
};
