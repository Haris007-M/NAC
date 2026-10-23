import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        rasp: { DEFAULT: "#d12e6b", light: "#ff5c95", soft: "#fde3ec" },
        violet: { DEFAULT: "#7b4bd6", light: "#a98bff" },
        ink: "#111014",
        sunk: "#f4f2f3",
        line: "#ebe7ea",
      },
      fontFamily: {
        head: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-bodoni)", "Didot", "Georgia", "serif"],
      },
      backgroundImage: {
        brand: "linear-gradient(110deg,#d12e6b,#7b4bd6)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        float3d: {
          "0%,100%": { transform: "translateY(0) rotateY(-10deg)" },
          "50%": { transform: "translateY(-12px) rotateY(10deg)" },
        },
        rise: { from: { transform: "translateY(24px)", opacity: "0" }, to: { transform: "none", opacity: "1" } },
        progress: { from: { width: "0%" }, to: { width: "100%" } },
        popIn: { from: { transform: "translateY(30px) scale(.96)", opacity: "0" }, to: { transform: "none", opacity: "1" } },
        shine: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "100% 0" } },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float3d: "float3d 6s ease-in-out infinite",
        rise: "rise .8s cubic-bezier(.2,.7,.2,1) both",
        popIn: "popIn .55s cubic-bezier(.2,.9,.2,1) both",
        shine: "shine 8s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
