import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

// Usamos alias o ruta relativa según tu configuración de Vite

import background14 from "../../assets/backgrounds/Background_14.png";




const ProjectsPage = () => {

  const [selectedProject, setSelectedProject] = useState(null);



  const projects = [

    {

      id: 1,

      code: "EERI-2026-SR01",

      title: "Análisis Sísmico de Estructuras Históricas en Chía",

      authors: "Laura Artunduaga, Juan Felipe Arroyave, Angela",

      date: "2026.05.18",

      phrase:

        "Evaluación avanzada de vulnerabilidad sísmica en patrimonio arquitectónico.",

      impact:

        "Base técnica para conservación estructural y reforzamiento patrimonial.",

      phase: 85,

      image:

        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF8uItI_EwoocAZYgbMItaUUCpk71J_dBK7x0ZPao3QO8R-f8XQ4a7NNtDvlHFMtxG1zipsA90S4VojwJG-AleHn1HpOqiyAqo39n_w4RjbGtqQqEUVGiWYwyS2vrHh44UOjTuvEliRzHarLI0QdHUs8VPGx0e6alf3ikq2xsDkxVfUqfjoobEjSVkEw/s1600/2.-%20FOTO%20CAPÍTULO%20ESTUDIANTIL.jpeg",

      details:

        "El estudio abordó la caracterización dinámica y evaluación de vulnerabilidad sísmica de estructuras patrimoniales en Chía, integrando inspección no destructiva, termografía, esclerometría y modelos avanzados de elementos finitos. Se identificaron mecanismos críticos de falla y se propusieron soluciones mediante CFRP alineadas con NSR-10."

    },

    {

      id: 2,

      code: "B-02",

      title: "Diseño de Vivienda Social Sismorresistente",

      authors: "Juan Daniel Salcedo Urango",

      date: "2026.05.14",

      phrase:

        "Optimización estructural modular para vivienda VIS resiliente.",

      impact:

        "Reducción del 15% en costos sin comprometer seguridad sísmica.",

      phase: 45,

      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",

      details:

        "Proyecto enfocado en diseño paramétrico y optimización topológica de vivienda social sismorresistente. Se evaluaron múltiples configuraciones espaciales para reducir derivas y mejorar disipación energética bajo análisis normativo NSR-10."

    },

    {

      id: 3,

      code: "S-14",

      title: "Modelos de Aislamiento Sísmico",

      authors: "Felipe Arroyave, Angela Rodríguez",

      date: "2026.05.10",

      phrase:

        "Sistemas de aislamiento sísmico de bajo costo para mampostería.",

      impact:

        "Propuesta de aislamiento base accesible para estructuras residenciales.",

      phase: 92,

      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",

      details:

        "Investigación sobre desarrollo de sistemas de aislamiento sísmico económicos usando materiales alternativos y ensayos dinámicos para edificaciones residenciales."

    }

  ];



  const featuredProject = projects[0];

  const secondaryProjects = projects.slice(1);



  return (

    <main className="relative min-h-screen w-full text-white">
      {/* Fondo que no se mueve y mantiene calidad */}

      <div className="absolute inset-0 z-0">
        <img
          src={background14}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>



      {/* AJUSTE DE FONDO: Reducida la opacidad de la superposición roja y el desenfoque para mayor nitidez */}

      <div className="relative z-10 min-h-screen bg-[#7b1d14]/40">

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">



          {/* HEADER */}

          <div className="mb-14 relative z-10">

            <div className="inline-block bg-[#001e40] px-4 py-2 text-xs font-mono tracking-widest border border-white/20 mb-5 shadow-lg relative">

              <span className="absolute left-0 top-0 h-full w-1 bg-[#ff5540]"></span>

              ARCHIVE_SYSTEM_V2.4

            </div>



            {/* AJUSTE DE CONTRASTE: Añadido text-shadow y cambiado color de acento a dorado Sabana */}

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 font-montserrat uppercase tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">

              Portafolio de{" "}

              <span className="text-[#b4975a]">Proyectos</span>

            </h1>



            <p className="text-white text-lg max-w-3xl font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">

              Repositorio técnico de investigaciones y desarrollos en ingeniería

              sísmica del capítulo estudiantil EERI.

            </p>

          </div>



          {/* FEATURED + SIDEBAR */}

          <div className="grid lg:grid-cols-12 gap-8 mb-12 relative z-10">

            {/* featured */}

            <div className="lg:col-span-8 bg-[#001124]/90 border border-white/10 overflow-hidden shadow-2xl rounded-sm">

              <div className="relative group">

                <img

                  src={featuredProject.image}

                  alt={featuredProject.title}

                  className="w-full h-[380px] object-cover grayscale group-hover:grayscale-0 transition duration-700"

                />

                <div className="absolute top-4 left-4 bg-[#ab3424] text-white px-4 py-2 text-xs font-mono font-bold tracking-wider border-l-4 border-white">

                  INVESTIGACIÓN RECIENTE

                </div>

                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>

              </div>



              <div className="p-8 space-y-3">

                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">

                  REF. ARCHIVO: {featuredProject.code}

                </span>



                {/* AJUSTE DE CONTRASTE: Añadido text-shadow y fuente Montserrat */}

                <h2 className="text-3xl sm:text-4xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] mt-2 mb-4">

                  {featuredProject.title}

                </h2>



                <p className="text-[#ff5540] font-mono text-sm font-semibold mb-3 uppercase tracking-wider bg-[#ab3424]/10 inline-block px-2 py-0.5 border border-[#ab3424]/30">

                  {featuredProject.authors}

                </p>



                <p className="italic text-white/90 mb-4 font-light text-sm border-l-2 border-white/20 pl-4">

                  "{featuredProject.impact}"

                </p>



                <p className="text-white/80 mb-6 text-sm leading-relaxed">

                  {featuredProject.phrase}

                </p>



                <div className="w-full h-1 bg-white/10 mb-4 rounded-full overflow-hidden">

                  <div

                    className="h-1 bg-[#ff5540]"

                    style={{ width: `${featuredProject.phase}%` }}

                  />

                </div>



                <button

                  onClick={() => setSelectedProject(featuredProject)}

                  className="bg-white text-[#7b1d14] px-8 py-3 font-mono font-bold hover:bg-[#ff5540] hover:text-white transition rounded-[2px] text-xs uppercase tracking-widest shadow-md active:scale-[0.98]"

                >

                  ACCEDER ARCHIVOS

                </button>

              </div>

            </div>



            {/* sidebar */}

            <div className="lg:col-span-4 bg-[#001124]/90 border border-white/10 p-8 shadow-2xl rounded-sm">

              {/* AJUSTE DE CONTRASTE: Añadido text-shadow y fuente Montserrat */}

              <h3 className="font-bold font-montserrat uppercase tracking-tight text-xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] mb-6">

                REPORTES DE CAMPO ACTIVOS

              </h3>



              <div className="space-y-6">

                {projects.map((project, index) => (

                  <div

                    key={project.id}

                    className={`pb-4 ${index !== projects.length - 1 ? 'border-b border-white/10' : ''}`}

                  >

                    <p className="text-xs font-mono text-[#b4975a] font-bold mb-1.5">

                      {project.date}

                    </p>

                    <h4 className="font-semibold text-white/95 text-md font-sans tracking-tight">{project.title}</h4>

                    <p className="text-sm text-white/60 mt-1.5 font-light">

                      {project.phrase}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>



          {/* secondary cards */}

          <div className="grid md:grid-cols-2 gap-8 relative z-10 pb-16">

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

                    className="w-full h-52 object-cover grayscale group-hover:grayscale-0 transition duration-700"

                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>

                </div>



                <div className="p-6 space-y-2">

                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">

                    {project.code}

                  </span>



                  {/* AJUSTE DE CONTRASTE: Añadido text-shadow y fuente Montserrat */}

                  <h3 className="text-2xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] mt-3 mb-2">

                    {project.title}

                  </h3>



                  <p className="text-[#ff5540] font-mono text-xs font-semibold mb-3 uppercase tracking-wider bg-[#ab3424]/10 inline-block px-2 py-0.5 border border-[#ab3424]/30">

                    {project.authors}

                  </p>



                  <p className="italic text-white/90 text-sm mb-3 font-light border-l-2 border-white/20 pl-4">

                    "{project.impact}"

                  </p>



                  <p className="text-white/80 text-sm mb-5 leading-relaxed font-light">

                    {project.phrase}

                  </p>



                  <button

                    onClick={() => setSelectedProject(project)}

                    className="font-mono text-xs font-bold text-white hover:text-[#ff5540] transition uppercase tracking-widest flex items-center gap-2 group"

                  >

                    Ver detalles <span className="transition-transform group-hover:translate-x-1">→</span>

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>



      {/* MODAL (Se mantiene igual, ya tiene buen contraste) */}

      <AnimatePresence>

        {selectedProject && (

          <motion.div

            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

          >

            <motion.div

              initial={{ scale: 0.9, y: 20 }}

              animate={{ scale: 1, y: 0 }}

              exit={{ scale: 0.9, y: 20 }}

              className="bg-[#001124] max-w-4xl w-full border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] rounded-sm"

            >

              <div className="relative h-80">

                <img

                  src={selectedProject.image}

                  alt={selectedProject.title}

                  className="w-full h-full object-cover"

                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#001124] to-transparent"></div>

              </div>



              <div className="p-8 space-y-4 relative -top-8">

                <h2 className="text-3xl sm:text-4xl font-bold font-montserrat uppercase tracking-tight text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">

                  {selectedProject.title}

                </h2>



                <p className="text-[#ff5540] font-mono text-sm font-semibold mb-3 uppercase tracking-wider bg-[#ab3424]/10 inline-block px-2 py-0.5 border border-[#ab3424]/30">

                  {selectedProject.authors}

                </p>



                <div className="bg-white/5 border-l-4 border-[#ff5540] p-4 italic mb-6 font-light text-white/95 text-sm leading-relaxed">

                  "{selectedProject.impact}"

                </div>



                <p className="text-white/85 leading-relaxed mb-8 text-sm font-light">

                  {selectedProject.details}

                </p>



                <button

                  onClick={() => setSelectedProject(null)}

                  className="bg-[#ab3424] px-6 py-3 font-mono text-xs font-bold hover:bg-white hover:text-[#7b1d14] transition rounded-[2px] uppercase tracking-widest active:scale-[0.98]"

                >

                  Cerrar Proyecto

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

};



export default ProjectsPage;