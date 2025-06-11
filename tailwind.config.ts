import { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // or wherever your files live
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    from: { transform: "scale(0.95)", opacity: "0" },
                    to: { transform: "scale(1)", opacity: "1" },
                },
                float: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                    "100%": { transform: "translateY(0px)" },
                },
                typing: {
                    "0%": { width: "0%", visibility: "hidden" },
                    "100%": { width: "100%" },
                },
                blink: {
                    "50%": { borderColor: "transparent" },
                    "100%": { borderColor: "white" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "scale-in": "scaleIn 0.3s ease-out forwards",
                float: "float 4s ease-in-out infinite",
                typing: "typing 2s steps(20) infinite alternate, blink 0.7s infinite",
                blink: "blink 0.75s step-start infinite",
                wiggle: "wiggle 1s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tw-animate-css")],
};

export default config;
