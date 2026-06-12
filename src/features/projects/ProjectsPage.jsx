import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Usamos alias o ruta relativa según tu configuración de Vite
import background14 from "../../assets/backgrounds/Background_14.png";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("steps"); // steps | multimedia | resources
  const [expandedStep, setExpandedStep] = useState(null); // Almacena la fase expandida (ej: "01")
  const [expandedMedia, setExpandedMedia] = useState(null);

  // Toggle para abrir/cerrar un paso en la línea de tiempo
  const handleToggleStep = (phaseId) => {
    setExpandedStep(expandedStep === phaseId ? null : phaseId);
  };

  // --------------------------------------------------
  // ----------------BASE DE DATOS---------------------
  // --------------------------------------------------
  const projects = [
    {
      id: 1,
      code: "EERI-2026-SR01",
      title: "Cometencia EERI SDC - 2026",
      authors: "Capitulo EERI Sabana - Universidad de la Sabana",
      date: "2026.01.18",
      phrase: "Primera competencia sismica del capitulo.",
      impact: "Promoviendo el conocimiento y la cultura de la ingeniería sísmica en la comunidad académica y profesional.",
      phase: 35,
      image: "/galleries/EERI_SDC_2026/28.jpeg",
      details: "La Seismic Design Competition (SDC) es, sin duda, el escenario de ingeniería sísmica estudiantil más exigente y prestigioso a nivel mundial. Representa el desafío definitivo donde el cálculo estructural, la innovación en materiales y la gestión de riesgos convergen bajo una presión extrema. Para el capítulo EERI Sabana, el año 2026 marca un antes y un después en nuestra trayectoria académica. Nos enorgullece compartir que hemos asumido el reto de llevar nuestra visión técnica al ámbito internacional, convirtiéndonos en la primera universidad colombiana en participar oficialmente en esta competencia. Este hito no solo valida nuestro compromiso con la excelencia en la ingeniería sísmica, sino que también posiciona a la Universidad de La Sabana en la vanguardia de la investigación y la práctica estructural global.",
      caseStudy: {
        galleryFolder: "EERI_SDC_2026",
        imageCount: 29,
        steps: [
          {
            phase: "01",
            title: "Organización de los balsos / Tipificación de densidades",
            desc: "Clasificación inicial y estudio de densidades para establecer la base del análisis estructural.",
            images: ["/galleries/EERI_SDC_2026/29.jpeg"]
          },
          {
            phase: "02",
            title: "Zona 1",
            desc: "Análisis y evaluación de la primera zona de estudio estructural.",
            images: ["/galleries/EERI_SDC_2026/22.jpeg"]
          },
          {
            phase: "03",
            title: "Zona 2",
            desc: "Análisis y evaluación de la segunda zona de estudio estructural.",
            images: ["/galleries/EERI_SDC_2026/27.jpeg"]
          },
          {
            phase: "04",
            title: "Zona 3",
            desc: "Análisis y evaluación de la tercera zona de estudio estructural.",
            images: ["/galleries/EERI_SDC_2026/28.jpeg"]
          },
          {
            phase: "05",
            title: "Zona 4",
            desc: "Análisis y evaluación de la cuarta zona de estudio estructural.",
            images: ["/galleries/EERI_SDC_2026/28.jpeg"]
          },
          {
            phase: "06",
            title: "Forma de empaque",
            desc: "Proceso detallado de embalaje y disposición técnica de los materiales.",
            images: ["/galleries/EERI_SDC_2026/28.jpeg"]
          },
          {
            phase: "07",
            title: "Resultado final",
            desc: "Consolidación de datos, conclusiones estructurales y entregable terminado.",
            images: ["/galleries/EERI_SDC_2026/28.jpeg"]
          }
        ],
        resources: [
          { name: "Plantilla_Análisis_Espectral_NSR10.xlsx", size: "2.4 MB", type: "excel", url: "#" },
          { name: "Memoria_Cálculo_Reforzamiento_CFRP.pdf", size: "4.1 MB", type: "pdf", url: "#" },
          { name: "Planos_Estructurales_Reforzamiento.dwg", size: "12.8 MB", type: "cad", url: "#" }
        ],
        video_thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF/s1600/FOTO%20CAPÍTULO%20ESTUDIANTIL.jpeg"
      }
    },
    {
      id: 2,
      code: "B-02",
      title: "Diseño de Vivienda Social Sismorresistente",
      authors: "Juan Daniel Salcedo Urango",
      date: "2026.05.14",
      phrase: "Optimización estructural modular para vivienda VIS resiliente.",
      impact: "Reducción del 15% en costos sin comprometer seguridad sísmica.",
      phase: 45,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      details: "Proyecto enfocado en diseño paramétrico y optimización topológica de vivienda social sismorresistente. Se evaluaron múltiples configuraciones espaciales para reducir derivas y mejorar disipación energética bajo análisis normativo NSR-10.",
      caseStudy: {
        steps: [
          {
            phase: "01",
            title: "Configuración Arquitectónica Modular",
            desc: "Diseño de células espaciales repetitivas para optimizar la construcción en serie y acoplamiento estructural.",
            images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"]
          },
          {
            phase: "02",
            title: "Análisis de Derivas de Piso",
            desc: "Evaluación del comportamiento de muros de concreto reforzado frente a fuerzas cortantes basales.",
            images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80"]
          },
          {
            phase: "03",
            title: "Presupuestación e Impacto Económico",
            desc: "Cálculo analítico del ahorro de acero y concreto mediante diseño optimizado por computadora.",
            images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80"]
          }
        ],
        resources: [
          { name: "Planos_Arquitectonicos_VIS_Modular.dwg", size: "8.5 MB", type: "cad", url: "#" },
          { name: "Analisis_Costos_Materiales.xlsx", size: "1.2 MB", type: "excel", url: "#" }
        ],
        gallery: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        video_thumb: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
      }
    },
    {
      id: 3,
      code: "S-14",
      title: "Modelos de Aislamiento Sísmico",
      authors: "Felipe Arroyave, Angela Rodríguez",
      date: "2026.05.10",
      phrase: "Sistemas de aislamiento sísmico de bajo costo para mampostería.",
      impact: "Propuesta de aislamiento base accesible para estructuras residenciales.",
      phase: 92,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      details: "Investigación sobre desarrollo de sistemas de aislamiento sísmico económicos usando materiales alternativos y ensayos dinámicos para edificaciones residenciales.",
      caseStudy: {
        steps: [
          {
            phase: "01",
            title: "Prototipado de Aisladores de Elastomero",
            desc: "Diseño y fundición de elastómeros de caucho reciclado reforzados con placas metálicas internas.",
            images: ["https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=400&q=80"]
          },
          {
            phase: "02",
            title: "Ensayos de Carga Cíclica",
            desc: "Aplicación de cargas laterales repetitivas en actuadores hidráulicos para medir histéresis y amortiguamiento.",
            images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80"]
          },
          {
            phase: "03",
            title: "Simulación no Lineal",
            desc: "Modelado del amortiguamiento en ETABS para verificar la reducción de la aceleración en la superestructura.",
            images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"]
          }
        ],
        resources: [
          { name: "Resultados_Ensayos_Ciclicos.csv", size: "14.2 MB", type: "excel", url: "#" },
          { name: "Reporte_Aislamiento_Bajo_Costo.pdf", size: "3.5 MB", type: "pdf", url: "#" }
        ],
        gallery: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"],
        video_thumb: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"
      }
    }
  ];

  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <main className="relative min-h-screen w-full text-white bg-[#001e40] selection:bg-[#ab3424] selection:text-white overflow-x-hidden">

      {/* CAPA MULTIMEDIA DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src={background14}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Grid de Fondo de Ondas Sísmicas */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(171, 52, 36, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
        }}
      ></div>

      <div className="relative z-10 min-h-screen bg-[#7b1d14]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">

          {/* HEADER */}
          <div className="mb-10 md:mb-14 relative z-10">
            <div className="inline-block bg-[#001e40] px-4 py-2 text-xs font-mono tracking-widest border border-white/20 mb-5 shadow-lg relative">
              <span className="absolute left-0 top-0 h-full w-1 bg-[#ff5540]"></span>
              ARCHIVE_SYSTEM_V2.4
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-montserrat uppercase tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Portafolio de <span className="text-[#b4975a]">Proyectos</span>
            </h1>

            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Repositorio técnico de investigaciones y desarrollos en ingeniería
              sísmica del capítulo estudiantil EERI.
            </p>
          </div>

          {/* PROYECTO DESTACADO + SIDEBAR */}
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12 relative z-10">

            {/* Tarjeta Destacada */}
            <div className="lg:col-span-8 bg-[#001124]/90 border border-white/10 overflow-hidden shadow-2xl rounded-sm relative">
              <div className="relative group">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover grayscale group-hover:grayscale-0 transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#ab3424] text-white px-3 py-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider border-l-4 border-white z-10">
                  INVESTIGACIÓN RECIENTE
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>
              </div>

              <div className="p-5 sm:p-8 space-y-3 relative z-10">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  REF. ARCHIVO: {featuredProject.code}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] mt-1 mb-3">
                  {featuredProject.title}
                </h2>

                <p className="text-[#ff5540] font-mono text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider bg-[#ab3424]/10 inline-block px-2 py-0.5 border border-[#ab3424]/30">
                  {featuredProject.authors}
                </p>

                <p className="italic text-white/90 mb-3 font-light text-xs sm:text-sm border-l-2 border-white/20 pl-4">
                  "{featuredProject.impact}"
                </p>

                <p className="text-white/80 mb-5 text-xs sm:text-sm leading-relaxed">
                  {featuredProject.phrase}
                </p>

                <div className="w-full h-1 bg-white/10 mb-4 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-[#ff5540]"
                    style={{ width: `${featuredProject.phase}%` }}
                  />
                </div>

                <button
                  onClick={() => { setSelectedProject(featuredProject); setActiveTab("steps"); setExpandedStep(null); }}
                  className="w-full sm:w-auto text-center bg-white text-[#7b1d14] px-8 py-3 font-mono font-bold hover:bg-[#ff5540] hover:text-white transition rounded-[2px] text-xs uppercase tracking-widest shadow-md active:scale-[0.98]"
                >
                  ACCEDER ARCHIVOS
                </button>
              </div>
            </div>

            {/* Sidebar de Reportes Activos */}
            <div className="lg:col-span-4 bg-[#001124]/90 border border-white/10 p-5 sm:p-8 shadow-2xl rounded-sm">
              <h3 className="font-bold font-montserrat uppercase tracking-tight text-lg sm:text-xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-4 sm:mb-6">
                REPORTES DE CAMPO ACTIVOS
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => { setSelectedProject(project); setActiveTab("steps"); setExpandedStep(null); }}
                    className={`pb-4 cursor-pointer group ${index !== projects.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <p className="text-[11px] font-mono text-[#b4975a] font-bold mb-1">
                      {project.date} → <span className="text-white/40 group-hover:text-amber-400 transition">ABRIR LOG</span>
                    </p>
                    <h4 className="font-semibold text-white/95 text-sm sm:text-md font-sans tracking-tight group-hover:text-[#ff5540] transition">{project.title}</h4>
                    <p className="text-xs text-white/60 mt-1 font-light line-clamp-2">
                      {project.phrase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TARJETAS SECUNDARIAS */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative z-10 pb-12">
            {secondaryProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="bg-[#001124]/90 border border-white/10 overflow-hidden shadow-xl rounded-sm"
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 sm:h-52 object-cover grayscale group-hover:grayscale-0 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>
                </div>

                <div className="p-5 sm:p-6 space-y-2 relative z-10">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {project.code}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] mt-2 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-[#ff5540] font-mono text-[11px] font-semibold mb-2 uppercase tracking-wider bg-[#ab3424]/10 inline-block px-2 py-0.5 border border-[#ab3424]/30">
                    {project.authors}
                  </p>

                  <p className="italic text-white/90 text-xs sm:text-sm mb-2 font-light border-l-2 border-white/20 pl-4">
                    "{project.impact}"
                  </p>

                  <p className="text-white/80 text-xs sm:text-sm mb-4 leading-relaxed font-light">
                    {project.phrase}
                  </p>

                  <button
                    onClick={() => { setSelectedProject(project); setActiveTab("steps"); setExpandedStep(null); }}
                    className="font-mono text-xs font-bold text-white hover:text-[#ff5540] transition uppercase tracking-widest flex items-center gap-2 group w-full sm:w-auto"
                  >
                    Ver detalles <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL INTEGRAL DETALLADO (RESPONSIVO PARA CELULARES) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-0 sm:p-4 md:p-6 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#001124] w-full min-h-screen sm:min-h-0 sm:max-w-6xl border-0 sm:border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] rounded-none sm:rounded-sm flex flex-col md:flex-row md:h-[85vh]"
            >
              {/* Sección Izquierda: Cabecera Estática / Superior en Mobile */}
              <div className="w-full md:w-1/4 bg-[#001c3a] border-b md:border-b-0 md:border-r border-white/10 p-5 sm:p-6 flex flex-col justify-between shrink-0 md:overflow-y-auto">
                <div>
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-1 block">Descripción</span>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-3">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-light">
                    {selectedProject.details}
                  </p>
                </div>

                <div className="bg-[#000e20] border border-white/10 aspect-video flex items-center justify-center font-mono text-white/50 text-xs rounded-sm relative overflow-hidden group mt-2 md:mt-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent z-10 transition-all cursor-pointer"></div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 text-amber-400 border-2 border-amber-400/40 flex items-center justify-center pl-1 cursor-pointer hover:scale-110 hover:border-amber-400 transition-transform z-20 shadow-lg group-hover:shadow-amber-500/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="absolute bottom-2 left-3 text-[9px] md:text-[10px] font-mono text-slate-300 z-20 group-hover:text-amber-300 truncate max-w-[90%]">SIMULACIÓN_INTERACTIVA.mp4</span>
                </div>
              </div>

              {/* Sección Derecha: Menú Navegable y Tabs */}
              <div className="w-full md:w-3/4 p-5 sm:p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#001124]/50 md:overflow-hidden">
                <div className="flex flex-col h-full md:h-[calc(100%-60px)]">

                  {/* Navegación Interna (Scroll horizontal en mobile) */}
                  <div className="flex border-b border-slate-700/50 mb-4 md:mb-6 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-nowrap gap-1 scrollbar-none">
                    {[
                      { id: 'steps', label: '01. Línea del tiempo' },
                      { id: 'multimedia', label: '02. Multimedia' },
                      { id: 'resources', label: '03. Recursos' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2.5 px-3 md:py-3 md:px-4 uppercase tracking-wider border-b-2 font-bold transition-all ${activeTab === tab.id
                          ? 'border-[#ab3424] text-white bg-[#ab3424]/10'
                          : 'border-transparent text-slate-400 hover:text-white'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Área de Visualización Dinámica */}
                  <div className="flex-1 md:overflow-y-auto pr-0 md:pr-2 scrollbar-none">
                    <AnimatePresence mode="wait">

                      {/* TABLA: PASO A PASO */}
                      {activeTab === 'steps' && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="py-2 md:py-4 relative min-h-[300px]"
                        >
                          {selectedProject.caseStudy ? (
                            <div className="relative w-full">
                              {/* Línea de tiempo estructural central - Ajustada a la izquierda en mobile */}
                              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ab3424] via-[#ab3424]/50 to-[#ab3424]/10 transform md:-translate-x-1/2 z-0" />

                              <div className="space-y-6 md:space-y-12">
                                {selectedProject.caseStudy.steps.map((step, idx) => {
                                  const isLeft = idx % 2 === 0;
                                  const isExpanded = expandedStep === step.phase;

                                  return (
                                    <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center w-full">

                                      {/* Indicador de Fase */}
                                      <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#001e40] border-2 border-[#ab3424] flex items-center justify-center font-mono text-[11px] md:text-xs text-white font-bold z-10 transform -translate-x-1/2 shadow-[0_0_20px_#ab3424]">
                                        {step.phase}
                                      </div>

                                      {/* Tarjeta del paso */}
                                      <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
                                        <motion.div
                                          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.05 }}
                                          onClick={() => handleToggleStep(step.phase)}
                                          className={`bg-[#001c3a]/70 backdrop-blur-md border ${isExpanded ? 'border-[#ff5540]' : 'border-white/10'} hover:border-[#ab3424]/50 rounded-lg p-4 md:p-5 shadow-xl transition-all duration-300 group cursor-pointer text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                                        >
                                          <div className="flex items-center justify-between gap-3">
                                            <div>
                                              <span className="text-[9px] font-mono tracking-widest text-[#b4975a] uppercase block mb-0.5">
                                                // FASE {step.phase}
                                              </span>
                                              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffb4a7] transition-colors">
                                                {step.title}
                                              </h3>
                                            </div>
                                            <span className="text-[10px] md:text-xs text-amber-400 font-mono flex-shrink-0 whitespace-nowrap">
                                              {isExpanded ? "[-]" : "[+]"}
                                            </span>
                                          </div>

                                          {/* Contenido Expandible Animado */}
                                          <AnimatePresence initial={false}>
                                            {isExpanded && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                className="overflow-hidden text-left"
                                              >
                                                <p className="text-xs text-slate-400 leading-relaxed font-light mb-3">
                                                  {step.desc}
                                                </p>

                                                {step.images && step.images.length > 0 && (
                                                  <div className="grid grid-cols-1 gap-2 mt-1">
                                                    {step.images.map((img, imgIdx) => (
                                                      <div key={imgIdx} className="relative aspect-video w-full overflow-hidden rounded border border-white/10">
                                                        <img
                                                          src={img}
                                                          alt={`Evidencia ${step.title}`}
                                                          className="w-full h-full object-cover opacity-85"
                                                        />
                                                      </div>
                                                    ))}
                                                  </div>
                                                )}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </motion.div>
                                      </div>

                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-center border border-white/5 bg-white/[0.02] rounded-md p-6">
                              <p className="text-sm font-mono text-slate-400">FASE EN CONFIGURACIÓN TÉCNICA</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* TABLA: GALERÍA FOTOS */}
                      {activeTab === 'multimedia' && selectedProject.caseStudy && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-1 max-h-[50vh] md:max-h-none overflow-y-auto">
                          {Array.from({ length: selectedProject.caseStudy.imageCount || 0 }).map((_, index) => {
                            const imageNumber = index + 1;
                            const isVideo = selectedProject.caseStudy.videoIndices?.includes(imageNumber) || false;
                            const extension = isVideo ? 'mp4' : 'jpeg';
                            const fileUrl = `/galleries/${selectedProject.caseStudy.galleryFolder}/${imageNumber}.${extension}`;

                            return (
                              <div
                                key={index}
                                onClick={() => setExpandedMedia(fileUrl)}
                                className="overflow-hidden rounded-md bg-gray-900 border border-gray-800 aspect-video group relative cursor-pointer"
                              >
                                {isVideo ? (
                                  <video
                                    src={fileUrl}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                  />
                                ) : (
                                  <img
                                    src={fileUrl}
                                    alt={`Registro SDC - Captura ${imageNumber}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                      const currentSrc = e.target.src;
                                      const paddedName = String(imageNumber).padStart(2, '0');
                                      if (currentSrc.endsWith(`/${imageNumber}.jpeg`)) {
                                        e.target.src = `/galleries/${selectedProject.caseStudy.galleryFolder}/${imageNumber}.jpg`;
                                      } else if (currentSrc.endsWith(`/${imageNumber}.jpg`)) {
                                        e.target.src = `/galleries/${selectedProject.caseStudy.galleryFolder}/${imageNumber}.png`;
                                      } else {
                                        e.target.style.display = 'none';
                                      }
                                    }}
                                  />
                                )}
                                <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-[9px] text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                                  REG_{String(imageNumber).padStart(2, '0')}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* TABLA: ENTREGABLES */}
                      {activeTab === 'resources' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {selectedProject.caseStudy ? (
                            selectedProject.caseStudy.resources.map((file, i) => (
                              <div key={i} className="flex items-center justify-between p-3.5 bg-[#001c3a] border border-white/10 rounded-lg hover:border-amber-500/30 transition-all group gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className={`w-9 h-9 rounded flex items-center justify-center font-mono font-black text-[10px] flex-shrink-0 ${file.type === 'excel' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    file.type === 'pdf' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                    }`}>
                                    {file.type.toUpperCase().substring(0, 3)}
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-slate-200 truncate">{file.name}</h4>
                                    <p className="text-[9px] font-mono text-slate-500">{file.size}</p>
                                  </div>
                                </div>
                                <a href={file.url} className="flex flex-shrink-0 items-center text-[9px] font-mono font-bold text-amber-400 border border-amber-500/30 px-2 py-1 bg-amber-500/5 rounded">
                                  DOWNLOAD
                                </a>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs font-mono text-slate-500 col-span-2">No hay recursos descargables adjuntos.</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Botón de Cierre del Modal */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full md:w-auto bg-[#ab3424] px-6 py-3 font-mono text-xs font-bold hover:bg-white hover:text-[#7b1d14] transition rounded-[2px] uppercase tracking-widest active:scale-[0.98] mt-6 md:mt-4 self-end"
                >
                  Cerrar Proyecto [X]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL (MEDIOS EXPANDIDOS) */}
      <AnimatePresence>
        {expandedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setExpandedMedia(null)}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
              {expandedMedia.endsWith('.mp4') || expandedMedia.endsWith('.MP4') ? (
                <video src={expandedMedia} controls autoPlay className="max-h-[85vh] rounded-lg shadow-2xl" />
              ) : (
                <img src={expandedMedia} alt="Expanded" className="max-h-[85vh] object-contain rounded-lg shadow-2xl" />
              )}
              <button
                className="absolute -top-10 right-0 text-white hover:text-emerald-400 font-mono text-xs"
                onClick={() => setExpandedMedia(null)}
              >
                [ CERRAR X ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectsPage;