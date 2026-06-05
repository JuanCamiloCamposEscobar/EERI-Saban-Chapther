import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Analytics } from "@vercel/analytics/react";
import { createClient } from '@supabase/supabase-js';
import anime from 'animejs';

import Navbar from './components/Navbar';
import MobileNavbar from './components/mobile/MobileNavbar';
import LanguageSelector from './components/LanguageSelector';
import AnimatedPage from './components/AnimatedPage';

import InstitutionalPage from './features/institutional/InstitutionalPage';
import EventsPage from './features/events/EventsPage';
import BlogPage from './features/blog/BlogPage';
import ProjectsPage from './features/projects/ProjectsPage';
import MembersPage from './features/members/MembersPage';
import DonationsPage from './features/donations/DonationsPage';
import { COMMITTEES } from "./data/committees";

import logoCapitulo from './assets/logos/eeri.png';
import imgHero from './assets/logos/eeri.png';

import homeBackground from './assets/backgrounds/Background_7.png';
// ✅ CORREGIDO: Cambiado a B mayúscula para evitar el error de rolldown/vite en Vercel
import heroBanner from './assets/backgrounds/Background_12.png';

/* ───────── CONFIGURACIÓN E INICIALIZACIÓN DE SUPABASE ───────── */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ───────── SPLASH SCREEN ───────── */
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const animation = anime.timeline({ loop: true })
      .add({
        targets: '.square',
        rotate: '360deg',
        borderColor: [{ value: '#001e40' }, { value: '#ab3424' }],
        backgroundColor: [{ value: '#fd6e59' }, { value: '#ab3424' }],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeInOutQuad'
      })
      .add({
        targets: '.square',
        scale: [1, 1.2, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeInOutQuad',
        offset: '-=400'
      });

    const timer = setTimeout(onComplete, 2600);

    return () => {
      clearTimeout(timer);
      animation.pause();
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 flex flex-col justify-center items-center bg-[#000814] z-50 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="flex gap-4 mb-8 justify-center items-center h-16 relative z-10">
        <div className="square w-4 h-4 border-2 border-solid border-transparent rounded-[1px]" />
        <div className="square w-4 h-4 border-2 border-solid border-transparent rounded-[1px]" />
        <div className="square w-4 h-4 border-2 border-solid border-transparent rounded-[1px]" />
        <div className="square w-4 h-4 border-2 border-solid border-transparent rounded-[1px]" />
      </div>

      <div className="z-10 flex flex-col items-center gap-3 bg-[#001e40]/80 border border-white/10 p-6 backdrop-blur-md shadow-2xl text-center min-w-[280px]">
        <div className="flex flex-col items-center gap-1 w-full border-b border-white/10 pb-3">
          <div className="flex items-center justify-center gap-2">
            <span className="bg-[#ab3424] text-white px-2 py-0.5 font-[Montserrat] font-black text-sm tracking-tighter uppercase">
              EERI
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/90 uppercase font-bold">
              CAPÍTULO ESTUDIANTIL
            </span>
          </div>
          <span className="text-[8px] font-mono tracking-[0.15em] text-[#fd6e59] uppercase font-semibold mt-1">
            Universidad de La Sabana
          </span>
        </div>
        <p className="font-mono text-[9px] text-[#fd6e59] uppercase tracking-[0.2em] animate-pulse mt-1">
          Sincronizando espectro dinámico...
        </p>
      </div>
    </motion.div>
  );
};

/* ───────── HOME COMPONENT ───────── */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#001e40] antialiased text-white">

      {/* Sección Hero */}
      <section className="relative bg-[#001e40] overflow-hidden min-h-[550px] flex items-center w-full border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img alt="Plano estructural" className="w-full h-full object-cover opacity-20" src={heroBanner} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001e40] via-[#001e40]/90 to-[#001e40]/40"></div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-16 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#ab3424]/20 border border-[#ab3424]/40 px-3 py-1">
              <span className="font-mono text-[11px] text-[#fd6e59] tracking-widest uppercase font-bold">ST 01 // EXCELENCIA ESTRUCTURAL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-[Montserrat] font-black text-white leading-tight tracking-tight uppercase">
              Innovando para un <span className="text-[#fd6e59] normal-case">Futuro Resiliente</span> en la Ingeniería Sísmica
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-[Hanken-Grotesk] max-w-lg leading-relaxed font-light">
              El Capítulo Estudiantil EERI de la Universidad de La Sabana promueve la investigación y el desarrollo profesional en ingeniería sismorresistente a través del rigor técnico.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button
                onClick={() => navigate('/projects')}
                className="bg-[#ab3424] hover:bg-[#c63d2b] text-white px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-3 border-none cursor-pointer transition-all duration-300 shadow-lg shadow-[#ab3424]/20"
              >
                Ver Proyectos
                <span className="font-sans font-bold">→</span>
              </button>
              <div className="flex flex-col border-l border-white/20 pl-4">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Coordenadas</span>
                <span className="text-sm font-semibold text-slate-200 font-mono">4.8609° N, 74.0326° W</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-sm aspect-square border border-white/10 p-3 bg-[#01162d]/60 backdrop-blur-sm group">
              <div className="absolute top-0 right-0 bg-[#ab3424] px-2 py-0.5 text-[9px] text-white font-mono uppercase tracking-widest">
                SYS.V2.0.4
              </div>
              <div className="w-full h-full bg-[#000d1a] border border-white/5 flex items-center justify-center relative overflow-hidden">
                <span className="text-7xl font-[Montserrat] font-black text-white/[0.02] select-none absolute tracking-widest">EERI</span>
                <img
                  className="absolute inset-0 w-full h-full object-contain p-8 opacity-60 group-hover:scale-105 transition-transform duration-500 ease-out grayscale brightness-125"
                  src={imgHero}
                  alt="EERI Logo Badge"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b border-l border-[#fd6e59]/60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN TARJETAS */}
      <section className="bg-white py-20 px-6 md:px-16 w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card icon="🏗️" title="Proyectos" desc="Modelos dinámicos y análisis estructural de vanguardia." route="/projects" number="01" meta="3 Activos" />
            <Card icon="🤝" title="Donaciones" desc="Apoya la investigación y equipos de competencia nacional." route="/donations" number="02" meta="Meta 85%" />
            <Card icon="📅" title="Eventos" desc="Seminarios técnicos y conferencias internacionales." route="/events" number="03" meta="En 2 Días" />
            <Card icon="👥" title="Miembros" desc="Conoce a la junta directiva y miembros activos." route="/members" number="04" meta="24 Miembros" />
          </div>
        </div>
      </section>

      {/* SECCIÓN COMITÉS */}
      <section className="bg-[#001e40] py-20 px-6 md:px-16 w-full text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00142b]/60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6 text-left">
            <div className="space-y-1">
              <span className="text-[#fd6e59] font-mono text-xs tracking-widest uppercase font-bold">// DIVISIONES OPERATIVAS</span>
              <h2 className="text-3xl font-[Montserrat] font-black tracking-tight uppercase">Comités del Capítulo</h2>
            </div>

            <button
              onClick={() => {
                navigate('/members');
                setTimeout(() => {
                  const el = document.getElementById('comites');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white hover:text-[#fd6e59] font-mono text-xs font-bold uppercase tracking-widest py-2.5 px-4 border border-white/20 hover:border-[#fd6e59]/40 transition-all duration-200 cursor-pointer h-fit w-fit"
            >
              Ver todos los comités
              <span className="text-[10px] font-sans font-bold">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#00152b]/50 backdrop-blur-sm">
            {COMMITTEES && COMMITTEES.slice(0, 3).map((comite) => {
              // 1. Tratamiento del icono por si viene como componente u objeto
              const IconComponent = typeof comite.icon === 'object' ? comite.icon : null;

              // 2. Corregir número de estudiantes buscando variantes comunes en tu objeto
              const cantidadEstudiantes = comite.activeStudents || comite.studentsCount || comite.membersCount || 0;

              return (
                <div
                  key={comite.id}
                  className="p-8 space-y-6 text-left hover:bg-[#00254d]/40 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl bg-[#ab3424]/10 p-2 rounded border border-[#ab3424]/20 select-none flex items-center justify-center">
                      {IconComponent ? <IconComponent className="w-6 h-6" /> : comite.icon || "⚙️"}
                    </span>
                    <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 text-white/50 font-bold">
                      {comite.code || "EERI"}
                    </span>
                  </div>

                  <h3 className="text-xl font-[Montserrat] font-bold tracking-tight uppercase">
                    {comite.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-[Hanken-Grotesk] leading-relaxed font-light min-h-[60px]">
                    {comite.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 space-y-1 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>LÍDER DEL COMITÉ</span>
                      <span className="text-white font-semibold">{comite.leader || "Por asignar"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESTUDIANTES ACTIVOS</span>
                      <span className="text-[#fd6e59] font-semibold">{cantidadEstudiantes} Estudiantes</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadísticas del Capítulo */}
          <div className="border border-white/10 bg-[#00152b]/80 p-8 max-w-7xl mx-auto text-left space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="text-xl">📊</span>
              <h3 className="text-lg font-[Montserrat] font-bold uppercase tracking-wide">Estadísticas del Capítulo</h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 uppercase">Miembros Activos</span>
                  <span className="text-[#fd6e59] font-bold">85%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                  <div className="bg-[#ab3424] h-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 uppercase">Reportes Técnicos y Documentación</span>
                  <span className="text-slate-400 font-bold">90%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                  <div className="bg-[#ab3424] h-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                <span className="text-slate-300 font-bold uppercase">Total Estudiantes</span>
                <span className="text-2xl font-[Montserrat] font-black text-[#fd6e59]">42</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="w-full border-t-2 border-[#ab3424]" />

      {/* SECCIÓN INFERIOR */}
      <section className="py-20 px-6 md:px-16 w-full bg-[#0b1f3a] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* NOTICIAS */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-sm font-[Montserrat] font-bold uppercase border-b border-white/10 pb-2 flex items-center gap-3">
              <span>📰</span> Últimas Noticias
            </h2>

            <div className="space-y-4">
              <div className="bg-[#0f2c4d] p-5 border-l-4 border-[#ab3424] hover:bg-[#133a66] transition-all duration-200 shadow-sm">
                <span className="text-[10px] text-slate-300 font-mono block mb-1">MAYO 18, 2026</span>
                <h4 className="text-white font-[Montserrat] font-bold leading-snug cursor-pointer">
                  Actualización Mensual del Capítulo Estudiantil EERI Sabana
                </h4>
              </div>

              <div className="bg-[#0f2c4d] p-5 border-l-4 border-slate-600 hover:bg-[#133a66] transition-all duration-200 shadow-sm">
                <span className="text-[10px] text-slate-300 font-mono block mb-1">MAYO 15, 2026</span>
                <h4 className="text-white font-[Montserrat] font-bold leading-snug cursor-pointer">
                  Apertura de nuevos laboratorios de simulación sísmica computacional
                </h4>
              </div>
            </div>
          </div>

          {/* JUNTA */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-[Montserrat] font-bold uppercase border-b border-white/10 pb-2 flex items-center gap-3">
              <span>🛡️</span> Junta Directiva
            </h2>

            <div className="space-y-3">
              <div className="bg-[#0f2c4d] p-4 border border-white/10 flex items-center gap-4 hover:bg-[#133a66] transition-all duration-200">
                <div className="w-11 h-11 rounded-full bg-[#001e40] flex-shrink-0 flex items-center justify-center text-white/70">
                  <span className="text-lg select-none">👤</span>
                </div>
                <div>
                  <h4 className="text-sm font-[Montserrat] font-bold text-white">Juan Camilo Buitrago</h4>
                  <p className="text-[#fd6e59] text-[10px] font-mono font-bold uppercase tracking-wider">Presidente del Capítulo</p>
                </div>
              </div>

              <div className="bg-[#0f2c4d] p-4 border border-white/10 flex items-center gap-4 hover:bg-[#133a66] transition-all duration-200">
                <div className="w-11 h-11 rounded-full bg-[#001e40] flex-shrink-0 flex items-center justify-center text-white/70">
                  <span className="text-lg select-none">👤</span>
                </div>
                <div>
                  <h4 className="text-sm font-[Montserrat] font-bold text-white">Juan Camilo Campos</h4>
                  <p className="text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider">Vicepresidente del Capítulo</p>
                </div>
              </div>
            </div>
          </div>

          {/* REPORTE */}
          <div className="lg:col-span-3">
            <div className="bg-[#001e40] p-6 border-t-4 border-[#fd6e59] h-full flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-xl select-none">📄</span>
                </div>
                <h3 className="text-base font-[Montserrat] font-bold tracking-tight text-white uppercase">Reporte Sísmico</h3>
                <p className="text-xs text-slate-300 font-[Hanken-Grotesk] leading-relaxed font-light">
                  Documentación técnica sobre espectros dinámicos sismorresistentes y validación de estructuras v2.
                </p>
              </div>
              <button className="w-full mt-6 bg-[#ab3424] hover:bg-[#c63d2b] text-white text-xs font-mono font-bold uppercase tracking-widest py-3 text-center transition-colors border-none cursor-pointer">
                Descargar PDF (V2)
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-[#00142b] border-t border-white/5 py-12 text-white w-full">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-16 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-base font-[Montserrat] font-black tracking-widest text-white">EERI SABANA</span>
            <p className="text-xs text-slate-400 font-light">
              © 2026 Capítulo Estudiantil EERI - Universidad de La Sabana. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a className="hover:text-[#fd6e59] transition-colors font-mono tracking-wider" href="#">Política de Privacidad</a>
            <a className="hover:text-[#fd6e59] transition-colors" href="#">Términos de Servicio</a>
            <a className="hover:text-[#fd6e59] transition-colors" href="#">Contactar Facultad de Ingeniería</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ───────── COMPONENTE CARD ───────── */
const Card = ({ icon, title, desc, route, number, meta }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-[#ab3424] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-left rounded-none shadow-md"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:bg-[#ab3424]/5 transition-colors select-none">
              {icon}
            </div>
            <h3 className="text-base font-[Montserrat] font-bold text-[#001e40] tracking-tight group-hover:text-[#ab3424] transition-colors uppercase">
              {title}
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-300 font-bold tracking-tight">{number}</span>
        </div>
        <p className="text-xs text-slate-600 font-[Hanken-Grotesk] leading-relaxed font-light">{desc}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] text-[#ab3424] font-mono font-bold uppercase tracking-wider">{meta}</span>
        <span className="font-sans text-slate-400 group-hover:text-[#ab3424] group-hover:translate-x-1 transition-all duration-300 text-sm font-bold">→</span>
      </div>
    </div>
  );
};

/* ───────── APP CONTENT ───────── */
const AppContent = () => {
  const location = useLocation();

  const getBackgroundClass = () => {
    switch (location.pathname) {
      case '/':
        return 'bg-[#001e40]';
      case '/members':
        return 'bg-[#001e40]';
      case '/events':
        return 'bg-[#001e40]';
      case '/donations':
        return 'bg-[#05070d]';
      default:
        return 'bg-[#001e40]';
    }
  };

  return (
    <div className={`min-h-screen text-white relative overflow-x-hidden transition-all duration-500 ${getBackgroundClass()}`}>

      {/* NAVBAR PRO */}
      <Navbar className="fixed top-0 w-full z-50 bg-[#001e40]/80 backdrop-blur-xl border-b border-white/10" />
      <MobileNavbar className="fixed bottom-0 w-full z-50 bg-[#001e40]/90 backdrop-blur-xl border-t border-white/10" />

      <div className="hidden md:block">
        <LanguageSelector />
      </div>

      <div className="w-full min-h-screen pb-24 md:pb-0 pt-20">
        <Routes>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><InstitutionalPage /></AnimatedPage>} />
          <Route path="/events" element={<AnimatedPage><EventsPage /></AnimatedPage>} />
          <Route path="/projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
          <Route path="/blog" element={<AnimatedPage><BlogPage /></AnimatedPage>} />
          <Route path="/members" element={<AnimatedPage><MembersPage /></AnimatedPage>} />
          <Route path="/donations" element={<AnimatedPage><DonationsPage /></AnimatedPage>} />
        </Routes>
      </div>

      <Analytics />
    </div>
  );
};

/* ───────── APP MAIN ENTRY ───────── */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <AppContent />}
    </Router>
  );
}

export default App;