import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Home,
  Info,
  Calendar,
  Briefcase,
  BookOpen,
  Users,
  Heart,
  Menu,
  X,
} from "lucide-react";

import LoginButton from "../../features/auth/components/LoginButton";
import logoUniversidad from "../../assets/logos/university.png";
import logoCapitulo from "../../assets/logos/eeri.png";

const navItems = [
  { name: "Inicio", translationKey: "home", path: "/", icon: Home },
  { name: "Institucional", translationKey: "about", path: "/about", icon: Info },
  { name: "Eventos", translationKey: "events", path: "/events", icon: Calendar },
  { name: "Proyectos", translationKey: "projects", path: "/projects", icon: Briefcase },
  { name: "Blog", translationKey: "blog", path: "/blog", icon: BookOpen },
  { name: "Miembros", translationKey: "members", path: "/members", icon: Users },
  { name: "Donaciones", translationKey: "donations", path: "/donations", icon: Heart },
];

const MobileNavbar = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMatch = (itemPath, targetPath) =>
    itemPath === "/" ? targetPath === "/" : targetPath.startsWith(itemPath);

  const sanitizeName = (text = "") =>
    text.replace(/^\d+[\s_.-]*/, "").replace(/^nav\./i, "");

  return (
    <>
      {/* HEADER SUPERIOR (Visible hasta tablets inclusive) */}
      <header className="lg:hidden sticky top-0 z-40 h-16 px-4 bg-[#001e40]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logoUniversidad}
            alt="Universidad"
            className="h-6 sm:h-7 w-auto object-contain"
          />
          <div className="h-4 w-px bg-white/20" />
          <img
            src={logoCapitulo}
            alt="EERI"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 border border-white/10 bg-white/5 rounded-none text-white hover:bg-white/10 transition-colors"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* DRAWER / DESPLEGABLE LATERAL */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay oscuro de fondo */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Panel lateral deslizable */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 bg-[#001124] border-l border-white/10 p-6 pt-24 flex flex-col lg:hidden shadow-2xl"
            >
              {/* Encabezado del menú */}
              <div className="mb-6 border-b border-white/5 pb-4">
                <p className="text-white font-bold text-base tracking-tight">
                  Universidad de La Sabana
                </p>
                <p className="text-[#ff5540] text-xs font-mono uppercase tracking-widest mt-0.5">
                  EERI Student Chapter
                </p>
              </div>

              {/* Lista con Scroll independiente si se llena la pantalla en móviles pequeños */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const translationKeyFull = `nav.${item.translationKey}`;
                  const fetchedTranslation = t(translationKeyFull);

                  const finalDisplayName = sanitizeName(
                    fetchedTranslation !== translationKeyFull
                      ? fetchedTranslation
                      : item.name
                  );

                  const isActive = isMatch(item.path, location.pathname);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 border transition-all ${isActive
                        ? "bg-[#ab3424]/10 border-[#ab3424] text-white shadow-[0_0_15px_rgba(171,52,36,0.1)]"
                        : "bg-white/[0.02] border-white/5 text-white/70 hover:text-white hover:bg-white/[0.05]"
                        }`}
                    >
                      <Icon size={18} className={isActive ? "text-[#ff5540]" : "text-white/60"} />

                      <div className="flex-1">
                        <p className="font-bold uppercase text-xs tracking-wide">
                          {finalDisplayName}
                        </p>
                        <p className="text-[9px] font-mono text-white/30 -mt-0.5">
                          SEC // {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Contenedor inferior del menú */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <LoginButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BOTTOM NAV BAR (Flotante inferior - Optimizado para pulgar) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30 max-w-md mx-auto">
        <div className="bg-[#001428]/90 backdrop-blur-lg border border-white/10 rounded-none p-1 flex justify-around shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = isMatch(item.path, location.pathname);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center flex-1 py-1.5 rounded-none relative transition-colors ${isActive ? "text-[#00f0ff]" : "text-white/40 hover:text-white/70"
                  }`}
              >
                {/* Indicador animado inferior */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-[#00f0ff]/5 border-t-2 border-[#00f0ff] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon size={16} />
                <span className="text-[8px] mt-1 font-mono uppercase tracking-tighter">
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Botón de control para abrir el Drawer */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center flex-1 py-1.5 text-white/40 hover:text-white/70 active:text-[#ff5540]"
          >
            <Menu size={16} />
            <span className="text-[8px] mt-1 font-mono uppercase tracking-tighter">
              Menú
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;