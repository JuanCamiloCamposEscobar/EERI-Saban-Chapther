/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60-30-10 System
        background: "#FFFFFF", // Canvas (60%)
        surface: "#F8FAFC",     // Light gray for cards/sections
        navy: {
          900: "#0F172A",      // Primary Navy (30%)
        },
        crimson: {
          600: "#DC2626",      // Accent Crimson (10%)
          700: "#B91C1C",      // Darker Crimson for hovers
        },
        slate: {
          500: "#64748B",      // Secondary text
        },
        // Mantenemos tus referencias por si acaso, pero mapeadas al nuevo sistema
        brand: {
          university: "#003366",
          chapter: "#b33929",
        }
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        hanken: ["Hanken Grotesk", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem", // Para tarjetas más modernas
        soft: "0.25rem",
      },
      boxShadow: {
        // Para el efecto "lift" que pediste
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: