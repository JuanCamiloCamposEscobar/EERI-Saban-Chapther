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

  return (
    <>
      {/* HEADER SOLO LOGOS (SIN BOTÓN) */}
      <header className="lg:hidden sticky top-0 z-40 h-16 px-4 bg-[#000814]/90 backdrop-blur-md border-b border-white/10 flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUniversidad} className="h-6 object-contain" />
          <div className="h-4 w-px bg-white/20" />
          <img src={logoCapitulo} className="h-6 object-contain" />
          <div className="flex flex-col ml-2">
            <span className="text-[10px] text-white font-bold">
              UNIVERSIDAD DE LA SABANA
            </span>
            <span className="text-[9px] text-[#ab3424] uppercase font-mono tracking-widest">
              EERI STUDENT CHAPTER
            </span>
          </div>
        </Link>
      </header>

      {/* DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 bg-[#001124] border-l border-white/10 p-6 pt-20 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto space-y-2">

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isMatch(item.path, location.pathname);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 border transition ${isActive
                        ? "bg-[#ab3424]/10 border-[#ab3424] text-white"
                        : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.08]"
                        }`}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-bold uppercase">
                        {t(`nav.${item.translationKey}`) !== `nav.${item.translationKey}` ? t(`nav.${item.translationKey}`) : item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <LoginButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30 max-w-md mx-auto">
        <div className="bg-[#001428]/90 backdrop-blur-lg border border-white/10 p-1 flex justify-around">

          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = isMatch(item.path, location.pathname);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center flex-1 py-1 ${isActive ? "text-[#00f0ff]" : "text-white/40"
                  }`}
              >
                <Icon size={16} />
                <span className="text-[8px] mt-1 uppercase">
                  {item.name}
                </span>
              </Link>
            );
          })}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center flex-1 text-white/40"
          >
            <Menu size={16} />
            <span className="text-[8px] mt-1 uppercase">Menú</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;