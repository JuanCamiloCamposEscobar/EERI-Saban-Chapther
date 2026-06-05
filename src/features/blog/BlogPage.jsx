import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import api from '../../utils/api';

// 1. Importación exacta del background técnico institucional
import background11 from '../../assets/backgrounds/Background_11.png';

// ── Mock posts con estética técnica del sistema de diseño ──────────────────
const MOCK_POSTS = [
  {
    id: '1',
    category: 'EVENTS',
    tagLabel: 'ÁRBOL DE CONEXIONES',
    title: 'Ceremonia de Inauguración del Árbol de Conexiones',
    excerpt: 'Evento académico y conmemorativo que celebra la instalación del Árbol de Conexiones en la Universidad de La Sabana, destacando la colaboración entre la academia y la industria en el desarrollo de estructuras en acero.',
    author: 'Capítulo EERI La Sabana',
    date: 'MAY 24, 2024',
    image: '/group-photo.jpg',
    content: `## Introducción
La ceremonia de inauguración del Árbol de Conexiones representa un hito para la Universidad de La Sabana, al materializar la colaboración entre el sector académico y la industria del acero. Este proyecto, posible gracias al apoyo de TECMO S.A. y el Instituto Colombiano de Construcción en Acero, simboliza la integración entre conocimiento técnico y aplicación práctica.

## Desarrollo del Evento

El evento inició con una bienvenida institucional en la que se destacó la importancia de la donación de la estructura del Árbol de Conexiones como herramienta pedagógica para la formación en ingeniería estructural.

Durante la jornada, se llevaron a cabo diversas conferencias técnicas enfocadas en el diseño estructural, la soldadura aplicada a sistemas de resistencia sísmica y la evaluación de infraestructuras reales. Entre los momentos destacados se incluyen:

- **Diseño estructural del edificio "Atrio"** – Presentado por el Ing. Gabriel Valencia Clement.
- **Soldadura para sistemas de resistencia sísmica en acero** – Expuesto por el Ing. Luis Enrique Rodríguez.
- **Evaluación sísmica del puente de acceso a Anchorage, Alaska** – A cargo del Ing. Diego Roberto Martínez.

Asimismo, se dispuso de un espacio de interacción académica durante el receso, promoviendo el intercambio de ideas entre estudiantes, docentes y profesionales.

## Ceremonia de Inauguración

El acto central consistió en la inauguración oficial del Árbol de Conexiones, una estructura que permite visualizar y comprender distintos tipos de uniones en acero utilizadas en la ingeniería moderna. Este elemento servirá como laboratorio abierto para estudiantes y como referencia física para el estudio de conexiones estructurales.

Los conferencistas invitados cuentan con una destacada trayectoria en el ámbito de la ingeniería civil y estructural, con experiencia en diseño, investigación y desarrollo normativo en Colombia y el exterior. Su participación enriqueció el evento al aportar tanto conocimientos teóricos como experiencias prácticas.

La inauguración del Árbol de Conexiones refuerza el compromiso de la Universidad de La Sabana con la excelencia académica y la formación integral de sus estudiantes. Este tipo de iniciativas fomentan la conexión entre teoría y práctica, consolidando espacios de aprendizaje innovadores para las futuras generaciones de ingenieros.`,
  },
  {
    id: '2',
    category: 'FASE I: SIMULACIÓN',
    tagLabel: 'CALIBRACIÓN DE MODELOS',
    title: 'Simulaciones Sísmicas: Calibración de Parámetros No Lineales',
    excerpt: 'Ajuste de parámetros constitutivos para modelos no lineales de fibra en SAP2000 y correlación transitoria de espectros dinámicos de respuesta.',
    author: 'Juan Camilo Campos',
    date: 'MAY 02, 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    content: `## Seismic Design Competition 2024\n\nOptimización del modelo analítico estructural usando matrices de rigidez avanzada en software de ingeniería sísmica especializada.`,
  },
  {
    id: '3',
    category: 'ANÁLISIS FORMAL',
    tagLabel: 'DISEÑO ARQUITECTÓNICO',
    title: 'Estética Arquitectónica vs. Desempeño y Arriostramientos estructurales',
    excerpt: 'Integración de sistemas de arriostramiento en fachadas de alta transparencia y optimización de derivas operacionales bajo cargas dinámicas cíclicas.',
    author: 'Thomas García',
    date: 'ABR 15, 2024',
    image: 'https://images.unsplash.com/photo-1486325157521-729971946765?q=80&w=800&auto=format&fit=crop',
    content: `## Integración Formal\n\nEl desafío técnico de incorporar disipadores estéticos sin irrumpir en las transparencias ni en las plantas libres arquitectónicas demandadas por las normativas modernas.`,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/blog');
      const data = Array.isArray(response.data) ? response.data : [];
      setPosts(data.length > 0 ? data : MOCK_POSTS);
      if (data.length === 0) setDemoMode(true);
    } catch {
      setPosts(MOCK_POSTS);
      setDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  // Opción Pro: Ajuste sutil al 0.02 de opacidad para fundirse con Background_11
  const overlayPattern = {
    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 1px, transparent 0)',
    backgroundSize: '24px 24px',
  };

  if (loading) {
    return (
      <div
        className="w-full relative flex flex-col items-center justify-center py-32 px-6 bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url(${background11})` }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] z-0" />
        <div style={overlayPattern} className="absolute inset-0 pointer-events-none z-10" />
        <div className="relative z-20 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-none border-4 border-[#ab3424] border-t-transparent animate-spin" />
          <p className="font-['Hanken_Grotesk'] text-[#999c9f] tracking-widest text-xs uppercase">Sincronizando registros analíticos...</p>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0] || MOCK_POSTS[0];
  const gridPosts = posts.slice(1);

  return (
    // Contenedor principal con el Background_11.png inyectado dinámicamente
    <div
      className="w-full relative text-white selection:bg-[#ab3424]/30 min-h-screen bg-cover bg-center bg-no-repeat antialiased"
      style={{ backgroundImage: `url(${background11})` }}
    >
      {/* Capa de oscurecimiento y sutil desenfoque HUD */}
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[0.5px] z-0" />

      {/* Retícula Blueprint técnica sutil sobre el background */}
      <div style={overlayPattern} className="absolute inset-0 pointer-events-none z-10" />

      {/* Contenido Responsivo Principal */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-16 py-12 space-y-12">

        {/* ── CASO A: VISTA AMPLIADA DEL ARTÍCULO ───────────────────────────────── */}
        {selectedPost ? (
          <div className="max-w-4xl mx-auto py-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-white font-bold mb-10 hover:text-[#fd6e59] transition-colors flex items-center gap-2 group font-['Montserrat'] text-xs tracking-wider"
              >
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-sm">arrow_back</span>
                VOLVER AL PANEL DE PUBLICACIONES
              </button>

              {/* Card de Documentación de Proyecto: Fondo Navy header bar integrado en la estructura */}
              <div className="bg-[#1b1f21]/90 rounded-sm border border-[#2D3748] shadow-md backdrop-blur-md overflow-hidden">

                {/* Header Técnico de Control de Versión - Conforme al Sistema de Diseño */}
                <div className="bg-[#001e40] px-8 py-3 border-b border-[#2D3748] flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#799dd6] tracking-widest font-bold uppercase">TECHNICAL ARCHIVE</span>
                  <span className="font-mono text-[11px] text-[#fd6e59] tracking-wider font-bold uppercase">
                    VERSION CONTROL: v1.0.4-SYS
                  </span>
                </div>

                <div className="p-8 border-l-4 border-l-[#ab3424]">
                  {selectedPost.image && (
                    <div className="w-full h-80 overflow-hidden mb-8 border border-[#2D3748] rounded-sm">
                      <img
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <span className="bg-[#ab3424] text-white text-[10px] font-bold px-2.5 py-1 font-['Montserrat'] uppercase rounded-sm tracking-wider">
                        {selectedPost.category}
                      </span>
                      <span className="text-xs font-['Montserrat'] text-[#799dd6] font-bold tracking-wider">{selectedPost.tagLabel}</span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-['Montserrat'] font-bold text-white mb-6 leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="flex gap-4 font-mono text-[11px] text-[#999c9f] mb-8 pb-4 border-b border-[#2D3748]">
                    <p>AUTOR: <strong className="text-white font-semibold">{selectedPost.author.toUpperCase()}</strong></p>
                    <span>|</span>
                    <p>FECHA DEL REPORTE: <span className="text-[#fd6e59] font-bold">{selectedPost.date}</span></p>
                  </div>

                  <div className="prose prose-invert max-w-none 
                    font-['Hanken_Grotesk'] text-[#e0e3e6] 
                    space-y-6 
                    prose-headings:font-['Montserrat'] 
                    prose-headings:text-white 
                    prose-headings:font-bold 
                    prose-h2:text-xl 
                    prose-h2:border-b 
                    prose-h2:border-[#2D3748] 
                    prose-h2:pb-3 
                    prose-h2:mt-10
                    prose-ul:list-disc 
                    prose-ul:pl-6 
                    prose-li:marker:text-[#ab3424] 
                    prose-strong:text-[#fd6e59] 
                    prose-p:leading-relaxed 
                    prose-p:text-sm">

                    <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (

          // ── CASO B: DASHBOARD GENERAL (HUD COMPLETO) ───────────────────────────
          <>
            {/* Hero Header */}
            <header className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[#ab3424] font-bold tracking-widest mb-3 font-['Montserrat'] text-xs uppercase">
                    LAT: 4.8617° N | LONG: 74.0321° W
                  </p>
                  <h1 className="text-3xl md:text-[48px] font-['Montserrat'] font-bold text-white max-w-3xl leading-tight tracking-tight">
                    Resiliencia Estructural y Competencia SDC
                  </h1>
                </div>
                <div className="bg-[#1b1f21]/90 p-4 rounded-sm border border-[#2D3748] border-l-4 border-l-[#ab3424] min-w-[220px] backdrop-blur-sm">
                  <span className="text-[10px] text-[#799dd6] block mb-1 font-mono font-bold tracking-widest">CÓDIGO DE PROYECTO</span>
                  <span className="text-lg font-bold text-white font-['Montserrat'] tracking-wide">SDC-2024-US</span>
                </div>
              </div>
            </header>

            {demoMode && (
              <div className="px-4 py-3 rounded-sm bg-amber-950/40 border border-amber-600/30 text-amber-400 font-['Hanken_Grotesk'] text-xs flex items-center gap-2 relative z-30">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>Modo simulación de datos — Desplegando registros analíticos locales preestablecidos.</span>
              </div>
            )}

            {/* Estructura de Grilla de 12 Columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Sección Principal Reportes (8 Columnas) */}
              <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="col-span-12 lg:col-span-8 flex flex-col gap-6"
              >
                {/* Post Principal Destacado */}
                {featuredPost && (
                  <motion.div variants={itemVariants} className="bg-[#1b1f21]/90 overflow-hidden group rounded-sm border border-[#2D3748] shadow-md backdrop-blur-sm relative">
                    {/* Indicador de Version Control en esquina superior derecha */}
                    <div className="absolute top-4 right-4 z-30 bg-[#001e40] border border-[#2D3748] px-3 py-1 font-mono text-[11px] text-white font-bold tracking-wider uppercase rounded-none">
                      DOC v1.0.0
                    </div>

                    <div className="relative h-[380px] bg-[#001e40] flex items-center justify-center overflow-hidden border-b border-[#2D3748]">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1b1f21] to-transparent" />
                      <div className="absolute top-4 left-4 bg-[#1b1f21] border border-[#2D3748] px-3 py-1 text-[10px] font-mono text-white font-bold tracking-widest rounded-sm">
                        {featuredPost.category}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#ab3424] font-bold text-xs font-['Montserrat'] tracking-wider">{featuredPost.date}</span>
                        <span className="w-1 h-1 bg-[#44474a]"></span>
                        <span className="text-[#799dd6] text-xs font-['Montserrat'] font-bold tracking-widest uppercase">
                          {featuredPost.tagLabel}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-['Montserrat'] font-bold text-white mb-4 group-hover:text-[#fd6e59] transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm text-[#c4c7ca] mb-8 font-['Hanken_Grotesk'] leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <button
                        onClick={() => setSelectedPost(featuredPost)}
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-[#003366] text-white px-5 py-2.5 font-['Montserrat'] text-xs font-bold hover:bg-[#003366] active:translate-y-[1px] transition-all tracking-wider rounded-sm shadow-[2px_2px_0px_0px_#001e40]"
                      >
                        LEER REPORTE COMPLETO
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Sub-grilla de Reportes Secundarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gridPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      className="bg-[#1b1f21]/90 flex flex-col group rounded-sm border border-[#2D3748] shadow-sm backdrop-blur-sm relative"
                    >
                      {/* Control de Versión sutil para tarjetas secundarias */}
                      <div className="absolute top-3 right-3 z-30 bg-[#001e40]/90 border border-[#2D3748]/60 px-2 py-0.5 font-mono text-[9px] text-[#999c9f] tracking-wider rounded-none">
                        v0.9.8
                      </div>

                      <div className="h-44 relative bg-[#001e40] flex items-center justify-center overflow-hidden border-b border-[#2D3748]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div
                          onClick={() => setSelectedPost(post)}
                          className="absolute inset-0 bg-[#001e40]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                        >
                          <span className="material-symbols-outlined text-white text-2xl">visibility</span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[#ab3424] font-bold text-[10px] font-['Montserrat'] mb-2 block uppercase tracking-widest">
                            {post.category}
                          </span>
                          <h3 className="text-sm font-['Montserrat'] font-bold text-white mb-3 group-hover:text-[#fd6e59] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-[#c4c7ca] font-['Hanken_Grotesk'] line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-xs font-bold text-[#799dd6] hover:text-white transition-colors text-left mt-5 uppercase tracking-wider font-mono flex items-center gap-1"
                        >
                          Analizar reporte <span className="text-sm">➔</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Sidebar Métricas y Estado SDC (4 Columnas) */}
              <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                {/* Card de Estado (Progress Bar rectos 0px) */}
                <div className="bg-[#1b1f21]/90 p-6 border-l-4 border-l-[#ab3424] rounded-sm border border-[#2D3748] shadow-md backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-[#ab3424] text-base">analytics</span>
                    <h3 className="font-['Montserrat'] text-xs font-bold text-white tracking-widest uppercase">Estado SDC 2024</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2 text-[11px] font-mono">
                        <span className="text-[#999c9f]">Tower Construction</span>
                        <span className="text-[#ab3424] font-bold">85%</span>
                      </div>
                      <div className="h-2 w-full bg-[#001e40] rounded-none border border-[#2D3748]">
                        <div className="h-full bg-[#ab3424] transition-all duration-500 rounded-none" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-[11px] font-mono">
                        <span className="text-[#999c9f]">Documentation Phase</span>
                        <span className="text-[#799dd6] font-bold">60%</span>
                      </div>
                      <div className="h-2 w-full bg-[#001e40] rounded-none border border-[#2D3748]">
                        <div className="h-full bg-[#799dd6] transition-all duration-500 rounded-none" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                    <div className="bg-[#001e40]/40 p-4 rounded-sm border border-[#2D3748] flex items-center gap-4 mt-6">
                      <div className="text-center border-r border-[#2D3748] pr-4 flex-shrink-0">
                        <span className="block font-['Montserrat'] text-xl font-bold text-white">12</span>
                        <span className="text-[9px] text-[#999c9f] uppercase tracking-wider font-mono font-bold block">Días para envío</span>
                      </div>
                      <p className="text-xs text-[#c4c7ca] font-['Hanken_Grotesk'] italic leading-snug">
                        "La precisión estructural no es opcional, es nuestra firma corporativa."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabla Metodológica */}
                <div className="bg-[#1b1f21]/90 p-6 rounded-sm border border-[#2D3748] shadow-sm backdrop-blur-sm">
                  <h3 className="text-[10px] font-bold text-[#799dd6] mb-4 uppercase tracking-widest font-mono">Technical Methodology</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead>
                        <tr className="border-b border-[#2D3748] text-[#999c9f]">
                          <th className="py-2 font-semibold">PHASE</th>
                          <th className="py-2 font-semibold">FREQ (Hz)</th>
                          <th className="py-2 font-semibold text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D3748] text-[#e0e3e6]">
                        <tr>
                          <td className="py-3 font-medium">Baseline</td>
                          <td className="py-3 text-[#799dd6]">1.24</td>
                          <td className="py-3 text-right">
                            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-sm text-[9px] font-bold">STABLE</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium">Resonance</td>
                          <td className="py-3 text-[#799dd6]">0.85</td>
                          <td className="py-3 text-right">
                            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-sm text-[9px] font-bold">CRITICAL</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium">Damped Sweep</td>
                          <td className="py-3 text-[#799dd6]">1.42</td>
                          <td className="py-3 text-right">
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-sm text-[9px] font-bold">CONTROLLED</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Línea de Tiempo SDC - Eje de 2px Navy con marcas cuadradas EERI Red */}
                <div className="bg-[#1b1f21]/90 p-6 rounded-sm border border-[#2D3748] shadow-sm backdrop-blur-sm">
                  <h3 className="font-['Montserrat'] text-xs font-bold text-white mb-6 uppercase tracking-widest">Línea de Tiempo SDC</h3>
                  <div className="relative pl-6 border-l-2 border-l-[#001e40]">

                    <div className="mb-8 relative">
                      {/* Marcador Cuadrado EERI Red */}
                      <div className="absolute -left-[31px] top-1 w-3 h-3 bg-[#ab3424] border-2 border-[#1b1f21] rounded-none" />
                      <span className="font-mono text-[10px] text-[#ab3424] font-bold block mb-1">SEP 2023</span>
                      <h4 className="text-white text-xs font-bold font-['Montserrat'] tracking-wide">Proposal Submission</h4>
                      <p className="text-xs text-[#c4c7ca] font-['Hanken_Grotesk'] mt-1">Aprobación inicial del diseño conceptual y volumétrico.</p>
                    </div>

                    <div className="mb-8 relative">
                      {/* Marcador Cuadrado EERI Red */}
                      <div className="absolute -left-[31px] top-1 w-3 h-3 bg-[#ab3424] border-2 border-[#1b1f21] rounded-none" />
                      <span className="font-mono text-[10px] text-[#799dd6] font-bold block mb-1">ENE 2024</span>
                      <h4 className="text-white text-xs font-bold font-['Montserrat'] tracking-wide">Structural Optimization</h4>
                      <p className="text-xs text-[#c4c7ca] font-['Hanken_Grotesk'] mt-1">Pruebas mecánicas dinámicas en mesa vibratoria escala 1:20.</p>
                    </div>

                    <div className="relative">
                      {/* Marcador Cuadrado EERI Red */}
                      <div className="absolute -left-[31px] top-1 w-3 h-3 bg-[#ab3424] border-2 border-[#1b1f21] rounded-none" />
                      <span className="font-mono text-[10px] text-[#999c9f] font-bold block mb-1">JUN 2024</span>
                      <h4 className="text-white text-xs font-bold font-['Montserrat'] tracking-wide">National Competition</h4>
                      <p className="text-xs text-[#c4c7ca] font-['Hanken_Grotesk'] mt-1">Defensa técnica final y puesta en carga crítica estructural.</p>
                    </div>

                  </div>
                </div>

              </aside>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;