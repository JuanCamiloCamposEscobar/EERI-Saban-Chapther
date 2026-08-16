import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const background14 = "/media/2025/backgrounds/Background_14.png";

// Escaneo dinámico en caliente con Vite glob
const mediaGlob = import.meta.glob("/public/media/2025/galleries/**/*", { eager: true });



// Helpers para detección y conversión de URLs de YouTube
const isYouTubeUrl = (url) => {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("steps"); // steps | multimedia | resources
  const [expandedStep, setExpandedStep] = useState(null); // Almacena la fase expandida (ej: "01")
  const [expandedMedia, setExpandedMedia] = useState(null);
  const [detectedImages, setDetectedImages] = useState([]);
  const [detectedVideos, setDetectedVideos] = useState([]);

  // Toggle para abrir/cerrar un paso en la línea de tiempo
  const handleToggleStep = (phaseId) => {
    setExpandedStep(expandedStep === phaseId ? null : phaseId);
  };

  useEffect(() => {
    if (selectedProject && selectedProject.caseStudy) {
      const folder = selectedProject.caseStudy.galleryFolder;

      let imgs = [];
      let sortedVids = [];

      const projectFiles = folder ? Object.keys(mediaGlob).filter(key =>
        key.includes(`/public/galleries/${folder}/`)
      ) : [];

      if (selectedProject.caseStudy.videos) {
        // Mapear los videos definidos estáticamente
        sortedVids = selectedProject.caseStudy.videos.map((vid, idx) => {
          const num = vid.id || (idx + 1);
          let videoUrl = vid.url || "";

          if (!videoUrl && folder) {
            const videosSubfolder = `${folder}_Videos`;
            const matchedFile = projectFiles.find(key => {
              const fileName = key.split("/").pop();
              const fileNum = parseInt(fileName.match(/(\d+)/)?.[1] || 0, 10);
              return fileNum === num && /\.(mp4|mov)$/i.test(fileName) && (key.includes(`/${videosSubfolder}/`) || key.includes(`/Video/`));
            });
            if (matchedFile) {
              videoUrl = matchedFile.replace(/^\/public/, "");
            } else {
              videoUrl = `/galleries/${folder}/${folder}_Videos/Reg_${num}.mp4`;
            }
          }

          const isInteractive = vid.title.toLowerCase().includes("simulacion") || vid.title.toLowerCase().includes("simulación");
          return {
            id: num,
            url: videoUrl,
            title: vid.title,
            fileName: videoUrl.split("/").pop() || `Reg_${num}.mp4`,
            isInteractive,
            isExternal: isYouTubeUrl(videoUrl)
          };
        });

        // Ordenar videos: Simulación interactiva primero, luego por id
        sortedVids.sort((a, b) => {
          if (a.isInteractive && !b.isInteractive) return -1;
          if (!a.isInteractive && b.isInteractive) return 1;
          return a.id - b.id;
        });
      } else if (folder) {
        // Filtrar videos en la subcarpeta videos/ o Video/ o [galleryFolder]_Videos/
        const videosSubfolder = `${folder}_Videos`;
        const vids = projectFiles.filter(key => {
          const relativePath = key.replace(`/public/galleries/${folder}/`, "");
          const isVideoSubdir = /^(videos|video)\//i.test(relativePath) || key.includes(`/public/galleries/${folder}/${videosSubfolder}/`);
          const isVideoFormat = /\.(mp4|mov)$/i.test(relativePath);
          return isVideoSubdir && isVideoFormat;
        }).map(key => {
          const url = key.replace(/^\/public/, "");
          const fileName = key.split("/").pop();
          return { url, fileName };
        });

        // Generar títulos formales predictivos
        const getPredictiveTitle = (fileName) => {
          if (fileName.toLowerCase().includes("simulacion") || fileName.toLowerCase().includes("simulación")) {
            return "Simulación Interactiva Estructural";
          }
          const match = fileName.match(/(\d+)/);
          if (match) {
            const num = parseInt(match[1], 10);
            const formattedNum = String(num).padStart(2, '0');
            if (num === 1) {
              return `Fase de Montaje y Ensamble Estructural - Registro ${formattedNum}`;
            } else if (num === 2) {
              return `Protocolo de Corte y Ajuste de Balsos - Registro ${formattedNum}`;
            } else if (num === 3) {
              return `Metodología de Pegado y Curado de Uniones - Registro ${formattedNum}`;
            } else {
              return `Módulo de Análisis Práctico - Registro ${formattedNum}`;
            }
          }
          return fileName.replace(/\.[^/.]+$/, "");
        };

        sortedVids = vids.sort((a, b) => {
          const isSimA = a.fileName.toLowerCase().includes("simulacion") || a.fileName.toLowerCase().includes("simulación");
          const isSimB = b.fileName.toLowerCase().includes("simulacion") || b.fileName.toLowerCase().includes("simulación");
          if (isSimA && !isSimB) return -1;
          if (!isSimA && isSimB) return 1;

          const numA = parseInt(a.fileName.match(/(\d+)/)?.[1] || 0, 10);
          const numB = parseInt(b.fileName.match(/(\d+)/)?.[1] || 0, 10);
          return numA - numB;
        }).map((vid, idx) => {
          const num = parseInt(vid.fileName.match(/(\d+)/)?.[1] || (idx + 1), 10);
          const isInteractive = vid.fileName.toLowerCase().includes("simulacion") || vid.fileName.toLowerCase().includes("simulación");
          return {
            id: num,
            url: vid.url,
            title: getPredictiveTitle(vid.fileName),
            fileName: vid.fileName,
            isInteractive,
            isExternal: isYouTubeUrl(vid.url)
          };
        });
      }

      if (folder) {
        const imagesSubfolder = `${folder}_Imagenes`;
        // Filtrar imágenes en la subcarpeta _Imagenes/ o en la raíz
        imgs = projectFiles.filter(key => {
          const isImageSubdir = key.includes(`/public/galleries/${folder}/${imagesSubfolder}/`);
          const isImage = /\.(jpg|jpeg|png|webp)$/i.test(key);
          const relativePath = key.replace(`/public/galleries/${folder}/`, "");
          const isDirectChild = !relativePath.includes("/");
          return (isImageSubdir && isImage) || (isDirectChild && isImage);
        }).map(key => key.replace(/^\/public/, ""));

        // Ordenar imágenes de forma natural/numérica
        imgs.sort((a, b) => {
          const nameA = a.split("/").pop();
          const nameB = b.split("/").pop();
          const numA = parseInt(nameA.match(/(\d+)/)?.[1] || 0, 10);
          const numB = parseInt(nameB.match(/(\d+)/)?.[1] || 0, 10);
          if (numA && numB) return numA - numB;
          return nameA.localeCompare(nameB);
        });
      } else {
        // Fallback para proyectos con base de datos tradicional de imágenes
        imgs = selectedProject.caseStudy.gallery || [];
      }

      setDetectedImages(imgs);
      setDetectedVideos(sortedVids);
    } else {
      setDetectedImages([]);
      setDetectedVideos([]);
    }
  }, [selectedProject]);

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
      phase: 100,
      image: "/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/30.jpeg",
      details: "La Seismic Design Competition (SDC) es, sin duda, el escenario de ingeniería sísmica estudiantil más exigente y prestigioso a nivel mundial. Representa el desafío definitivo donde el cálculo estructural, la innovación en materiales y la gestión de riesgos convergen bajo una presión extrema. Para el capítulo EERI Sabana, el año 2026 marca un antes y un después en nuestra trayectoria académica. Nos enorgullece compartir que hemos asumido el reto de llevar nuestra visión técnica al ámbito internacional, convirtiéndonos en la primera universidad colombiana en participar oficialmente en esta competencia. Este hito no solo valida nuestro compromiso con la excelencia en la ingeniería sísmica, sino que también posiciona a la Universidad de La Sabana en la vanguardia de la investigación y la práctica estructural global.",
      caseStudy: {
        galleryFolder: "EERI_SDC_2026",
        videos: [
          { id: 1, title: "Montaje Completo de la Estructura Principal", url: "" },
          { id: 2, title: "Protocolo Técnico: Cómo Cortar los Balsos con Precisión" },
          { id: 3, title: "Metodología de Pegado y Curado de Uniones Estructurales" },
          { id: 4, title: "Ensayos Preliminares de Resistencia al Límite" }
        ],
        steps: [
          {
            phase: "01",
            title: "Organización de los balsos / Tipificación de densidades",
            desc: "Clasificación inicial y estudio de densidades para establecer la base del análisis estructural.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/29.jpeg"]
          },
          {
            phase: "02",
            title: "Zona 1",
            desc: "Análisis y evaluación de la primera zona de estudio estructural.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/22.jpeg"]
          },
          {
            phase: "03",
            title: "Zona 2",
            desc: "Análisis y evaluación de la segunda zona de estudio estructural.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/30.jpg"]
          },
          {
            phase: "04",
            title: "Zona 3",
            desc: "Análisis y evaluación de la tercera zona de estudio estructural.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/32.jpeg"]
          },
          {
            phase: "05",
            title: "Zona 4",
            desc: "Análisis y evaluación de la cuarta zona de estudio estructural.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/33.jpeg"]
          },
          {
            phase: "06",
            title: "Forma de empaque",
            desc: "Proceso detallado de embalaje y disposición técnica de los materiales.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/34.jpeg"]
          },
          {
            phase: "07",
            title: "Resultado final",
            desc: "Consolidación de datos, conclusiones estructurales y entregable terminado.",
            images: ["/media/2025/galleries/EERI_SDC_2026/EERI_SDC_2026_Imagenes/31.jpeg"]
          }
        ],
        resources: [
          { name: "Plantilla_Análisis_Espectral_NSR10.xlsx", size: "2.4 MB", type: "excel", url: "#" },
          { name: "Memoria_Cálculo_Reforzamiento_CFRP.pdf", size: "4.1 MB", type: "pdf", url: "#" },
          { name: "Planos_Estructurales_Reforzamiento.dwg", size: "12.8 MB", type: "cad", url: "#" }
        ],
        // video_thumb: " "
      }
    },
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
                  loading="lazy"
                  className="w-full h-[240px] sm:h-[320px] md:h-[380px] object-cover grayscale md:grayscale md:group-hover:grayscale-0 transition duration-700"
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
                    loading="lazy"
                    className="w-full h-48 sm:h-52 object-cover grayscale md:grayscale md:group-hover:grayscale-0 transition duration-700"
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
        {selectedProject && (() => {
          const basePath = selectedProject.caseStudy?.galleryFolder ? `/galleries/${selectedProject.caseStudy.galleryFolder}` : "";
          const imagesFolderUrl = selectedProject.caseStudy?.galleryFolder ? `${basePath}/${selectedProject.caseStudy.galleryFolder}_Imagenes` : "";
          const videosFolderUrl = selectedProject.caseStudy?.galleryFolder ? `${basePath}/${selectedProject.caseStudy.galleryFolder}_Videos` : "";
          const filesFolderUrl = selectedProject.caseStudy?.galleryFolder ? `${basePath}/${selectedProject.caseStudy.galleryFolder}_archivos` : "";

          return (
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
                className="bg-[#001124] w-full h-full md:h-[90vh] sm:max-w-6xl border-0 sm:border border-white/10 overflow-y-auto md:overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] rounded-none sm:rounded-sm flex flex-col md:flex-row"
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

                  <div className="relative aspect-video bg-[#000e20] border border-white/10 rounded-sm overflow-hidden mt-2 md:mt-0">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                      <span className="text-[9px] font-mono text-white/50 tracking-wider">VISTA PRINCIPAL DEL ESTUDIO</span>
                    </div>
                  </div>
                </div>

                {/* Sección Derecha: Menú Navegable y Tabs */}
                <div className="w-full md:w-3/4 p-5 sm:p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#001124]/50 md:overflow-hidden">
                  <div className="flex flex-col h-full md:h-[calc(100%-60px)]">

                    {/* Navegación Interna (Scroll horizontal en mobile) */}
                    <div className="flex border-b border-slate-700/50 mb-4 md:mb-6 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-nowrap gap-4 scrollbar-none">
                      {/* Pestaña: Paso a Paso */}
                      <button
                        onClick={() => setActiveTab('steps')}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all duration-300 ${activeTab === 'steps' ? 'border-[#ab3424] text-white font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Paso a Paso
                      </button>

                      {/* Pestaña: Galería Fotos */}
                      <button
                        onClick={() => setActiveTab('multimedia')}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all duration-300 ${activeTab === 'multimedia' ? 'border-[#ab3424] text-white font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Galería Fotos
                      </button>

                      {/* 👇 NUEVA PESTAÑA: REGISTROS AUDIOVISUALES */}
                      <button
                        onClick={() => setActiveTab('videos')}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all duration-300 ${activeTab === 'videos'
                          ? 'border-sky-400 text-sky-400 font-bold'
                          : 'border-transparent text-slate-400 hover:text-white'
                          }`}
                      >
                        Registros Audiovisuales
                      </button>

                      {/* Pestaña: Recursos */}
                      <button
                        onClick={() => setActiveTab('resources')}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all duration-300 ${activeTab === 'resources' ? 'border-[#ab3424] text-white font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
                      >
                        Recursos
                      </button>
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
                                            {/* Encabezado de la Tarjeta */}
                                            <div className="flex items-center justify-between gap-3">
                                              <div>
                                                <span className="text-[9px] font-mono tracking-widest text-[#b4975a] uppercase block mb-0.5">
                                                  FASE {step.phase}
                                                </span>
                                                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffb4a7] transition-colors">
                                                  {step.title}
                                                </h3>
                                              </div>
                                              <span className="text-[10px] md:text-xs text-amber-400 font-mono flex-shrink-0 whitespace-nowrap">
                                                {isExpanded ? "[ Contraer Descripción - ]" : "[ Leer Descripción + ]"}
                                              </span>
                                            </div>

                                            {/* Evidencias Ancladas (Siempre Visibles) */}
                                            {step.images && step.images.length > 0 && (
                                              <div className="grid grid-cols-1 gap-2 mt-4 mb-2">
                                                {step.images.map((img, imgIdx) => (
                                                  <div key={imgIdx} className="relative aspect-video w-full overflow-hidden rounded border border-white/10">
                                                    <img
                                                      src={img}
                                                      alt={`Evidencia ${step.title}`}
                                                      loading="lazy"
                                                      className="w-full h-full object-cover opacity-85"
                                                    />
                                                  </div>
                                                ))}
                                              </div>
                                            )}

                                            {/* Contenido Expandible Animado (Únicamente el Texto) */}
                                            <AnimatePresence initial={false}>
                                              {isExpanded && (
                                                <motion.div
                                                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                                  className="overflow-hidden text-left border-t border-white/10 pt-3"
                                                >
                                                  <p className="text-xs text-slate-400 leading-relaxed font-light---">
                                                    {step.desc}
                                                  </p>
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
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="py-2 md:py-4"
                          >
                            {detectedImages && detectedImages.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-1 max-h-[50vh] md:max-h-none overflow-y-auto">
                                {detectedImages.map((fileUrl, index) => {
                                  return (
                                    <div
                                      key={index}
                                      onClick={() => setExpandedMedia(fileUrl)}
                                      className="overflow-hidden rounded-md bg-gray-900 border border-gray-800 aspect-video group relative cursor-pointer"
                                    >
                                      <img
                                        src={fileUrl}
                                        alt={`Registro SDC - Captura ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                      />
                                      <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-[9px] text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                                        REG_{String(index + 1).padStart(2, '0')}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="py-12 border border-dashed border-white/10 text-center rounded-sm">
                                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                                  NO SE REGISTRAN LECTURAS VISUALES
                                </span>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* -------------------------------------------------- */}
                        {/* // --------TABLA: REGISTROS AUDIOVISUALES--------- */}
                        {/* -------------------------------------------------- */}
                        {activeTab === 'videos' && selectedProject.caseStudy && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="py-2 md:py-4 max-h-[50vh] overflow-y-auto pr-1 space-y-4"
                          >
                            {/* Encabezado Técnico */}
                            <div className="bg-sky-500/5 border border-sky-500/20 p-3 rounded-sm flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                                Módulo de Archivo Analítico: Explicaciones y Protocolos de Diseño Sísmico
                              </span>
                            </div>

                            {/* Verificación de datos */}
                            {detectedVideos && detectedVideos.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {detectedVideos.map((video, index) => {
                                  const isSim = video.isInteractive;
                                  return (
                                    <div
                                      key={index}
                                      onClick={() => !video.isExternal && setExpandedMedia(video.url)}
                                      className={`group relative bg-[#00172e]/50 border rounded-sm overflow-hidden cursor-pointer transition-all duration-300 shadow-lg flex flex-col justify-between ${isSim
                                        ? 'border-amber-500/40 hover:border-amber-400 sm:col-span-2 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                                        : 'border-white/5 hover:border-sky-500/30'
                                        }`}
                                    >
                                      {/* Contenedor de Miniatura / Previsualización */}
                                      <div className="relative aspect-video bg-black/80 flex items-center justify-center overflow-hidden">
                                        {video.isExternal ? (
                                          <iframe
                                            src={getYouTubeEmbedUrl(video.url)}
                                            title={video.title}
                                            className="w-full h-full aspect-video rounded border border-white/10 shadow-lg"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                          />
                                        ) : (
                                          <>
                                            <video
                                              src={video.url}
                                              preload="metadata"
                                              muted
                                              playsInline
                                              className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                                            />

                                            {/* Capa de Control Visual (Play Button) */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                                              <div className={`w-11 h-11 rounded-full bg-black/40 flex items-center justify-center pl-0.5 transition-all duration-300 backdrop-blur-xs ${isSim
                                                ? 'group-hover:bg-amber-500/20 border border-white/10 group-hover:border-amber-400/50'
                                                : 'group-hover:bg-sky-500/20 border border-white/10 group-hover:border-sky-400/50'
                                                }`}>
                                                <svg
                                                  className={`w-4 h-4 fill-current transition-colors duration-300 ${isSim ? 'text-amber-400 group-hover:text-amber-300' : 'text-white group-hover:text-sky-400'
                                                    }`}
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M8 5v14l11-7z" />
                                                </svg>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {/* Tag Técnico de Archivo en la esquina */}
                                        <div className="absolute top-2 left-2 bg-[#001124]/90 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-white/50 tracking-wider">
                                          {video.isExternal ? "EXTERNAL: YouTube" : `FILE: ${video.fileName}`}
                                        </div>

                                        {/* Tag de Estado: SIMULACIÓN ACTIVA */}
                                        {isSim && (
                                          <div className="absolute top-2 right-2 bg-amber-500/90 border border-amber-400 px-2 py-0.5 text-[9px] font-mono font-bold text-black tracking-wider animate-pulse rounded-sm">
                                            SIMULACIÓN ACTIVA
                                          </div>
                                        )}
                                      </div>

                                      {/* Información de Video */}
                                      <div className="p-3 bg-[#001124] border-t border-white/5 flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[9px] font-mono tracking-widest text-sky-400/80 uppercase">
                                            REG_AUDIOVISUAL // 0{video.id}
                                          </span>
                                        </div>
                                        <h4 className="text-xs font-medium text-white/80 group-hover:text-white transition-colors duration-300 leading-snug font-sans">
                                          {video.title}
                                        </h4>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="py-12 border border-dashed border-white/10 text-center rounded-sm">
                                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                                  No se registran bitácoras de video para este estudio de caso.
                                </span>
                              </div>
                            )}
                          </motion.div>
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
          );
        })()}
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
              {isYouTubeUrl(expandedMedia) ? (
                <iframe
                  src={getYouTubeEmbedUrl(expandedMedia)}
                  title="YouTube video player"
                  className="w-full aspect-video max-h-[80vh] rounded-lg shadow-2xl border border-white/10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : expandedMedia.endsWith('.mp4') || expandedMedia.endsWith('.MP4') || expandedMedia.includes('/videos/') || expandedMedia.includes('_Videos/') ? (
                <video src={expandedMedia} controls autoPlay playsInline className="max-h-[85vh] w-full max-w-4xl rounded-lg shadow-2xl" />
              ) : (
                <img src={expandedMedia} alt="Registro de proyecto ampliado" loading="lazy" className="max-h-[85vh] object-contain rounded-lg shadow-2xl" />
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