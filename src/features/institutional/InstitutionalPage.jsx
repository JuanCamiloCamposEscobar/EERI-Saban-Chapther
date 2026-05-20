import React from 'react';
import { motion } from 'framer-motion';

// Importación del fondo
import backgroundInstitutional from '../../assets/backgrounds/Background_13.png';

// Animación de transición para la entrada de la página completa
const pageVariants = {
  initial: {
    opacity: 0,
    y: 15
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 14 } }
};

const BOARD = [
  { name: 'Juan Camilo Buitrago', role: 'Presidente', initials: 'JC', photo: '/avatar-presidente.png' },
  { name: 'Juan Camilo Campos', role: 'Vicepresidente', initials: 'JC', photo: '/avatar-vicepresidente.png' },
  { name: 'Thomas Garcia', role: 'Secretario', initials: 'TG', photo: '/avatar-secretario.png' },
  { name: 'Daniel Martinez', role: 'Tesorero', initials: 'DM', photo: '/avatar-tesorero.png' },
];

const TimelinePoint = ({ year }) => {
  return (
    <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 top-1.5 flex items-center justify-center w-5 h-5 z-30">
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <p className="sr-only">Indicador {year}</p>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            initial={{ width: 10, height: 10, opacity: 0 }}
            animate={{
              width: [10, 10 + i * 24],
              height: [10, 10 + i * 24],
              opacity: [0.2, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
          />
        ))}

        <motion.div
          className="relative w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] z-10 border-2 border-[#3b82f6]"
          whileHover={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        />
      </motion.div>
    </div>
  );
};

const Institutional = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full min-h-screen relative overflow-hidden"
    >
      {/* FONDO FIJO */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundInstitutional})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* CAPA DE OSCURECIMIENTO */}
      <div className="fixed inset-0 bg-[#1e0704]/90 z-0 pointer-events-none" />

      {/* Contenedor de contenido asegurado por encima del fondo */}
      <div className="max-w-7xl mx-auto space-y-28 relative z-10 py-16 px-4">

        {/* Rejilla estructural */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(171, 52, 36, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(171, 52, 36, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* ── Quiénes Somos ─────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 block mb-3 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Información Institucional
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Quiénes Somos
            </h2>
            <p className="text-lg text-white/80 font-hanken leading-relaxed border-l-2 border-[#ab3424]/50 pl-6 py-2">
              El Capítulo Estudiantil EERI de la Universidad de La Sabana es una organización
              dedicada a la investigación y difusión de conocimientos en ingeniería sismorresistente.
              Nuestro objetivo es preparar a los futuros ingenieros para enfrentar los desafíos
              de la resiliencia estructural en Colombia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-sm overflow-hidden shadow-2xl border border-white/10 h-80 relative group bg-black/30"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/group-photo.jpg"
              alt="Fotografía oficial del Capítulo EERI La Sabana"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800"; }}
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] text-white/60 tracking-wider font-medium uppercase">
              Capítulo Estudiantil // Estructura SDC
            </div>
          </motion.div>
        </section>

        {/* ── Misión / Visión ──────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="p-10 rounded-sm relative overflow-hidden border border-[#ab3424]/20 bg-black/30 backdrop-blur-sm transition-all duration-500 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              borderColor: 'rgba(255, 255, 255, 0.25)',
              backgroundColor: 'rgba(171, 52, 36, 0.08)',
              boxShadow: '0 12px 40px -15px rgba(171, 52, 36, 0.2)'
            }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-[2px] bg-[#ab3424] mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Nuestra Misión</h3>
            <p className="text-white/70 font-hanken leading-relaxed text-base">
              Fomentar la excelencia académica y profesional en el campo de la ingeniería sísmica,
              promoviendo la investigación y el intercambio de conocimientos entre estudiantes y expertos.
            </p>
          </motion.div>

          <motion.div
            className="p-10 rounded-sm relative overflow-hidden border border-[#ab3424]/20 bg-black/30 backdrop-blur-sm transition-all duration-500 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              borderColor: 'rgba(255, 255, 255, 0.25)',
              backgroundColor: 'rgba(171, 52, 36, 0.08)',
              boxShadow: '0 12px 40px -15px rgba(171, 52, 36, 0.2)'
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-8 h-[2px] bg-[#ab3424] mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Nuestra Visión</h3>
            <p className="text-white/70 font-hanken leading-relaxed text-base">
              Ser reconocidos como el capítulo estudiantil líder en Colombia por nuestro impacto
              en la comunidad académica y nuestra contribución a la gestión del riesgo sísmico.
            </p>
          </motion.div>
        </section>

        {/* ── Mesa Directiva ─────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#3b82f6] block mb-3 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Dirección Estratégica</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mesa Directiva</h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {BOARD.map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-8 rounded-sm bg-black/20 border border-white/5 backdrop-blur-sm relative overflow-hidden group transition-all duration-300"
                whileHover={{ borderColor: 'rgba(59, 130, 246, 0.4)', backgroundColor: 'rgba(59, 130, 246, 0.03)' }}
              >
                <div className="absolute top-0 left-0 w-2 h-[2px] bg-white/10 group-hover:bg-[#3b82f6] transition-colors" />
                <div className="absolute top-0 left-0 w-[2px] h-2 bg-white/10 group-hover:bg-[#3b82f6] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-[2px] bg-white/10 group-hover:bg-[#3b82f6] transition-colors" />
                <div className="absolute bottom-0 right-0 w-[2px] h-2 bg-white/10 group-hover:bg-[#3b82f6] transition-colors" />

                <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 text-white font-bold text-xl relative z-10 transition-all duration-500 group-hover:border-[#3b82f6] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : null}
                  <span className="absolute inset-0 flex items-center justify-center bg-[#1e0704]/80 font-bold text-lg tracking-wider text-white/30 group-hover:text-[#3b82f6] transition-colors -z-10">
                    {member.initials}
                  </span>
                </div>

                <h4 className="text-lg font-bold mb-1 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{member.name}</h4>
                <p className="text-[#3b82f6] font-semibold text-xs uppercase tracking-widest transition-colors duration-300">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Timeline (Trayectoria) ─────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#3b82f6] block mb-3 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Cronología Histórica</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>Nuestra Trayectoria</h2>
          </div>

          <div className="relative w-full pl-6 md:pl-0">
            <div className="absolute left-[3px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="space-y-16 relative z-10"
            >
              {[
                { year: '2025', title: 'Participación SDC 2025', desc: 'Competencia internacional de diseño sísmico de estructuras de madera balsa en Seattle, EE.UU.' },
                { year: '2024', title: 'I Simposio de Ingeniería Sísmica', desc: 'Encuentro académico regional con la participación de conferencistas magistrales y delegaciones de 5 universidades del país.' },
                { year: '2023', title: 'Fundación del Capítulo', desc: 'Reconocimiento oficial y constitución legal de la mesa directiva avalada formalmente por el EERI International.' },
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="relative w-full flex items-start">
                  <TimelinePoint year={item.year} />
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <div className={`hidden md:block pr-16 text-right ${i % 2 !== 0 ? 'pointer-events-none opacity-0' : ''}`}>
                      <span className="text-[#3b82f6] font-bold text-sm tracking-wider block mb-1">Año {item.year}</span>
                      <h4 className="text-xl font-bold mb-2 text-white block leading-normal" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h4>
                      <p className="text-white/60 text-sm font-hanken max-w-md inline-block leading-normal">{item.desc}</p>
                    </div>
                    <div className={`pl-8 md:pl-16 text-left ${i % 2 === 0 ? 'md:hidden' : 'md:col-start-2'}`}>
                      <span className="text-[#3b82f6] font-bold text-sm tracking-wider block mb-1">Año {item.year}</span>
                      <h4 className="text-xl font-bold mb-2 text-white block leading-normal" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h4>
                      <p className="text-white/60 text-sm font-hanken max-w-md leading-normal">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default Institutional;