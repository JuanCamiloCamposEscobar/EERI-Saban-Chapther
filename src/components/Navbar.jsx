import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LoginButton from "../features/auth/components/LoginButton";
import logoUniversidad from "../assets/logos/university.png";
import logoCapitulo from "../assets/logos/eeri.png";

const navItems = [
  { name: "Inicio", translationKey: "home", path: "/" },
  { name: "Institucional", translationKey: "about", path: "/about" },
  { name: "Eventos", translationKey: "events", path: "/events" },
  { name: "Proyectos", translationKey: "projects", path: "/projects" },
  { name: "Blog", translationKey: "blog", path: "/blog" },
  { name: "Miembros", translationKey: "members", path: "/members" },
  { name: "Donaciones", translationKey: "donations", path: "/donations" },
];

const Navbar = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const isMatch = (itemPath, targetPath) =>
    itemPath === "/" ? targetPath === "/" : targetPath.startsWith(itemPath);

  const sanitizeName = (text) => {
    if (!text) return "";
    return text.replace(/^\d+[\s_.-]*/, "").replace(/^nav\./i, "");
  };

  return (
    /* FIX: Cambiado h-16 por h-[70px] para estandarizar. 
       Añadido shadow-[0_2px_10px_rgba(0,0,0,0.4)] para el toque profesional.
    */
    <header className="hidden lg:flex fixed top-0 w-full z-50 h-[70px] bg-[#000814]/80 backdrop-blur-md border-b border-white/10 items-center shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Branding */}
        <Link
          to="/"
          className="flex items-center gap-5 group flex-shrink-0"
        >
          <img
            src={logoUniversidad}
            alt="Universidad"
            className="h-8 object-contain group-hover:scale-105 transition"
          />

          <div className="h-7 w-px bg-white/20" />

          <img
            src={logoCapitulo}
            alt="EERI"
            className="h-8 object-contain group-hover:scale-105 transition"
          />

          <div className="flex flex-col ml-2">
            <span className="text-[11px] font-extrabold tracking-wider text-white">
              UNIVERSIDAD DE LA SABANA
            </span>
            <span className="text-[10px] font-mono font-bold text-[#ab3424] tracking-[0.25em] uppercase">
              EERI STUDENT CHAPTER
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          className="flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navItems.map((item) => {
            const translationKeyFull = `nav.${item.translationKey}`;
            const fetchedTranslation = t(translationKeyFull);

            const finalDisplayName = sanitizeName(
              fetchedTranslation !== translationKeyFull
                ? fetchedTranslation
                : item.name
            );

            const isHovered = hoveredPath === item.path;
            const isActive = isMatch(item.path, location.pathname);

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                className={`relative isolate px-5 py-2 h-10 flex items-center font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${isHovered || isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                  }`}
              >
                <span
                  className={
                    isActive ? "border-b-2 border-[#ab3424] pb-1" : ""
                  }
                >
                  {finalDisplayName}
                </span>

                {isHovered && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-b from-[#ab3424]/20 to-transparent border border-[#ab3424]/20 -z-10 rounded"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* ✅ CONTENEDOR ESTABILIZADO: Reserva espacio fijo de 70px de altura total */}
          <div className="ml-3 pl-3 border-l border-white/10 flex items-center justify-center min-w-[120px] h-[70px]">
            <LoginButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;