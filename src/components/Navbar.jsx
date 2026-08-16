import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LoginButton from "../features/auth/components/LoginButton";

const logoUniversidad = "/media/2025/logos/university.png";
const logoCapitulo = "/media/2025/logos/eeri.png";
const logoOficialCapitulo = "/media/2025/logos/Logo Oficial.png";



const navItems = [
  { name: "Inicio", translationKey: "home", path: "/" },
  { name: "Institucional", translationKey: "about", path: "/about" },
  { name: "Eventos", translationKey: "events", path: "/events" },
  { name: "Proyectos", translationKey: "projects", path: "/projects" },
  { name: "Blog", translationKey: "blog", path: "/blog" },
  { name: "Miembros", translationKey: "members", path: "/members" },
  // { name: "Fondos", translationKey: "Funding", path: "/donations" },
];

const Navbar = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const isMatch = (itemPath, targetPath) =>
    itemPath === "/" ? targetPath === "/" : targetPath.startsWith(itemPath);

  const sanitizeName = (text) => {
    if (!text) return "";
    return text.replace(/^\d+[\s_.-]*/, "").replace(/^nav./i, "");
  };

  return (
    <header className="hidden lg:flex fixed top-0 w-full z-50 h-[70px] bg-[#000814]/80 backdrop-blur-md border-b border-white/10 items-center shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

        {/* --- SECCIÓN DE BRANDING --- */}
        <Link to="/" className="flex items-center gap-4 group flex-shrink-0">
          <img src={logoUniversidad} alt="Universidad" className="h-10 object-scale-down transition group-hover:scale-105" />
          <div className="h-8 w-px bg-white/20" />
          <img src={logoCapitulo} alt="EERI" className="h-10 object-scale-down grayscale-[30%] hover:grayscale-0 transition-all duration-300" />
          <img src={logoOficialCapitulo} alt="EERI Sabana" className="h-10 object-scale-down transition group-hover:scale-105" />

          <div className="flex flex-col ml-2">
            <span className="text-[10px] font-extrabold tracking-wider text-white">UNIVERSIDAD DE LA SABANA</span>
            <span className="text-[9px] font-mono font-bold text-[#ab3424] tracking-[0.25em] uppercase">EERI STUDENT CHAPTER</span>
          </div>
        </Link>

        {/* --- NAVEGACIÓN --- */}
        <nav className="flex items-center gap-1 relative" onMouseLeave={() => setHoveredPath(null)}>
          {navItems.map((item) => {
            const translationKeyFull = `nav.${item.translationKey}`;
            const fetchedTranslation = t(translationKeyFull);
            const finalDisplayName = sanitizeName(fetchedTranslation !== translationKeyFull ? fetchedTranslation : item.name);
            const isHovered = hoveredPath === item.path;
            const isActive = isMatch(item.path, location.pathname);

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                className={`relative isolate px-4 py-2 h-10 flex items-center font-mono text-[11px] font-bold uppercase transition-colors ${isHovered || isActive ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                <span className={isActive ? "border-b-2 border-[#ab3424] pb-1" : ""}>{finalDisplayName}</span>
                {isHovered && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-b from-[#ab3424]/20 to-transparent border border-[#ab3424]/20 -z-10 rounded"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Botón Login Cuadrado con mayor margen (ml-12) */}
          <div className="ml-12 border-l border-white/10 pl-4 flex items-center">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors rounded-sm">
              <LoginButton />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;