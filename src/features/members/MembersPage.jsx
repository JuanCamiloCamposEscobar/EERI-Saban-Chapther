import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMITTEES } from "../../data/committees";

// Importación centralizada de la instancia de Supabase
import { supabase } from '../../supabaseClient'

// Assets
const background5 = '/media/2025/backgrounds/Background_5.png';



// ── DATA IMPORTS ──
import { MEMBERS, FOUNDERS } from './membersData';
// Años disponibles derivados dinámicamente del array MEMBERS
const AVAILABLE_YEARS = [...new Set(MEMBERS.map(m => m.year).filter(Boolean))].sort((a, b) => b - a);
const STATS = [
  { icon: '👥', value: 12, label: 'Estudiantes del Capítulo' },
  { icon: '🔬', value: 2, label: 'Investigaciones' },
  { icon: '🏢', value: 3, label: 'Comités Activos' },
  { icon: '🌎', value: 2, label: 'Eventos Realizados' }
];

// Actualizado a los 6 comités requeridos con su metadata correspondiente
const CommitteeSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMITTEES.map((comite) => {
          const Icon = comite.icon;
          return (
            <div key={comite.id} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <Icon className="w-8 h-8 text-[#ab3424] mb-4" />
              <h2 className="text-xl font-semibold mb-2">{comite.title}</h2>
              <p className="text-gray-600 mb-4">{comite.desc}</p>
              <div className="text-sm font-medium">
                <p>Líder: {comite.leader}</p>
                <p>Estudiantes: {comite.students}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ROLE_COLORS = {
  'Faculty Advisor': 'bg-blue-500/10 text-blue-400 border border-blue-400/40 font-bold',
  'Presidente': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  'Vicepresidente': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  'Secretario': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  'Tesorero': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
  'Miembro Activo': 'bg-[#b61a22]/10 text-[#e03a42]/90 border border-[#b61a22]/30',
};

// ── ANIMATED COUNTER COMPONENT ──
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        let start = 0;
        const step = Math.ceil(target / 25) || 1;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 45);
      }}
    >
      {count}
    </motion.span>
  );
};

// ── MAIN COMPONENT ──
const MembersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedYear, setSelectedYear] = useState(AVAILABLE_YEARS[0] ?? 2025);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    name: '',
    studentId: '',
    email: '',
    phone: '',
    semester: 4,
    selectedCommittee: 'EERI-COM',
    motivation: ''
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = 'El nombre completo es requerido';
      if (!form.studentId.trim()) e.studentId = 'El ID de estudiante es obligatorio';
    }
    if (step === 2) {
      if (!form.email.includes('@unisabana.edu.co')) e.email = 'Debe ser un correo válido @unisabana.edu.co';
      if (!form.phone.trim()) e.phone = 'El teléfono de contacto es obligatorio';
    }
    if (step === 4) {
      if (!form.motivation.trim() || form.motivation.length < 20) {
        e.motivation = 'Por favor escribe al menos un pequeño párrafo (mínimo 20 caracteres)';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepTarget) => {
    if (stepTarget < currentStep) {
      setErrors({});
      setCurrentStep(stepTarget);
    } else {
      if (validateStep(currentStep)) {
        setCurrentStep(stepTarget);
      }
    }
  };

  const handleResetForm = () => {
    setForm(initialFormState);
    setErrors({});
    setShowForm(false);
    setSubmitted(false);
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error("Supabase no está configurado correctamente en App.jsx");
      }

      const { error } = await supabase
        .from('inscripcion_eeri')
        // Usamos .select() vacio o simplemente .insert() con un objeto que NO tenga id
        .insert([
          {
            full_name: form.name,
            student_id: form.studentId,
            email: form.email,
            phone: form.phone,
            semester: parseInt(form.semester),
            committee: form.selectedCommittee,
            motivation: form.motivation,
          },
        ], { returning: 'minimal' });

      if (error) {
        console.error('Error de Supabase:', error);
        alert(`Error desde la Base de Datos:\n${error.message}`);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error inesperado:', err);
      alert('Error conectando con la base de datos de inscripciones.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrado de jerarquía organizacional
  // facultyAdvisor: siempre visible (year: null), no se filtra
  const facultyAdvisor = MEMBERS.find(m => m.role === 'Faculty Advisor');
  // executiveBoard y activeMembers se filtran por el año seleccionado
  const executiveBoard = MEMBERS.filter(m => m.role !== 'Miembro Activo' && m.role !== 'Faculty Advisor' && m.year === selectedYear);
  const activeMembers = MEMBERS.filter(m => m.role === 'Miembro Activo' && m.year === selectedYear);

  return (
    <div
      className="w-full min-h-screen text-white py-20 px-4 space-y-24 relative bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `linear-gradient(rgba(0, 8, 20, 0.85), rgba(0, 8, 20, 0.95)), url(${background5})` }}
    >
      {/* Grid de Fondo */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:30px_30px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-3"
        >
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#b61a22] uppercase block">
            // PERSONNEL_REGISTRY
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-montserrat uppercase">
            Estructura Organizacional
          </h1>
          <p className="font-mono text-white/50 text-xs max-w-xl mx-auto uppercase tracking-wider">
            Dirección, comités y fuerza de investigación activa del capítulo.
          </p>
        </motion.div>

        {/* ── STATS BLOCK ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 bg-black/40 backdrop-blur-md divide-x divide-y md:divide-y-0 divide-white/10 rounded-sm">
          {STATS.map((stat, i) => (
            <div key={i} className="p-6 md:p-8 text-center flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors">
              <div className="text-2xl mb-2 opacity-80 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black font-mono text-white mb-1">
                <AnimatedCounter target={stat.value} />
                <span className="text-[#b61a22] ml-0.5 text-xl md:text-2xl font-bold">_</span>
              </div>
              <p className="font-mono text-white/40 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── DIRECTORIO DE MIEMBROS V2 ── */}
        <section className="space-y-16">

          {/* Subsección: Faculty Advisor */}
          {facultyAdvisor && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="h-px bg-blue-500/20 flex-1" />
                <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider text-blue-400 whitespace-nowrap">
                  Faculty Advisor
                </h2>
                <div className="h-px bg-blue-500/20 flex-1" />
              </div>

              <div className="border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm p-8 flex flex-col items-center text-center relative group hover:border-blue-400 hover:bg-blue-500/[0.06] transition-all duration-300 rounded-sm shadow-lg shadow-blue-500/5">
                <span className="absolute top-3 left-4 font-mono text-[9px] text-blue-400/40">
                  ADV-001
                </span>

                <div className="w-24 h-24 mb-4 border border-[#b61a22]/30 group-hover:border-blue-400 transition-all rounded-sm overflow-hidden bg-blue-500/10 flex items-center justify-center relative">
                  {facultyAdvisor.photo ? (
                    <img
                      src={facultyAdvisor.photo}
                      alt={facultyAdvisor.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top brightness-110 contrast-110 transition-all duration-300 md:grayscale md:group-hover:grayscale-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="font-mono font-bold text-xl text-blue-400">
                      {facultyAdvisor.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-lg tracking-wide mb-2 text-white">
                  {facultyAdvisor.name}
                </h4>

                {/* LinkedIn Asesor de facultad */}

                {facultyAdvisor.linkedin && facultyAdvisor.linkedin !== '#' && (
                  <a
                    href={facultyAdvisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-[10px] font-mono font-bold text-blue-400 hover:text-white underline uppercase transition-all"
                  >
                    Ver LinkedIn
                  </a>
                )}
                <span className={`px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest rounded-sm mb-3 ${ROLE_COLORS[facultyAdvisor.role]}`}>
                  {facultyAdvisor.role}
                </span>

                {facultyAdvisor.quote && (
                  <p className="text-xs font-serif italic text-white/60 max-w-sm px-4 mt-2 mb-4 relative before:content-['“'] after:content-['”'] before:text-blue-400/50 after:text-blue-400/50 before:text-lg after:text-lg">
                    {facultyAdvisor.quote}
                  </p>
                )}

                <div className="w-full mt-4 pt-3 border-t border-blue-500/10 flex justify-between items-center font-mono text-[9px] text-white/40">
                  <span>VÍNCULO</span>
                  <span className="text-blue-400 font-bold">FACULTAD INGENIERÍA</span>
                </div>
              </div>
            </div>
          )}

          {/* ── SELECTOR DE AÑO / COHORTE (solo visible cuando hay más de un año) ── */}
          {AVAILABLE_YEARS.length > 1 && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[9px] font-bold tracking-widest text-white/30 uppercase">// COHORTE</span>
              {AVAILABLE_YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 border transition-colors rounded-sm ${
                    selectedYear === yr
                      ? 'border-[#b61a22] bg-[#b61a22]/10 text-white'
                      : 'border-white/10 text-white/40 hover:border-blue-400 hover:text-white/70'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}


          {/* Subsección: Mesa Directiva */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider text-blue-400">
                Mesa Directiva Junta
              </h2>
              <div className="h-px bg-blue-500/20 flex-1" />
              <span className="font-mono text-[10px] text-blue-400/40">// EXECUTIVE_BOARD</span>
            </div>

            <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear + '-board'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {executiveBoard.map((member, i) => (
                <div key={i} className="border border-blue-500/20 bg-blue-950/10 backdrop-blur-sm p-8 flex flex-col items-center text-center relative group hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-all duration-300 rounded-sm shadow-md">
                  <span className="absolute top-3 left-4 font-mono text-[9px] text-blue-400/30">
                    DIR-{String(i + 1).padStart(3, '0')}
                  </span>

                  {/* Contenedor de Foto */}
                  <div className="w-24 h-28 mb-4 border border-blue-500/20 group-hover:border-blue-400 transition-all rounded-sm overflow-hidden bg-black/40 flex items-center justify-center relative">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top brightness-110 contrast-110 transition-all duration-300 md:grayscale md:group-hover:grayscale-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="font-mono font-bold text-lg text-blue-400/60">
                        {member.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                    )}
                  </div>

                  {/* Información */}
                  <h4 className="font-bold text-md tracking-wide mb-2 text-white/95">
                    {member.name}
                  </h4>

                  {/* LinkedIn */}

                  {/* Junta directiva */}

                  {member.linkedin && member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2 text-[10px] font-mono font-bold text-blue-400 hover:text-white underline uppercase transition-all"
                    >
                      Ver LinkedIn
                    </a>

                  )}


                  <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest rounded-sm mb-3 ${ROLE_COLORS[member.role]}`}>
                    {member.role}
                  </span>

                  {member.quote && (
                    <p className="text-xs font-serif italic text-white/60 max-w-sm px-4 mt-1 mb-3 relative before:content-['“'] after:content-['”'] before:text-blue-400/40 after:text-blue-400/40">
                      {member.quote}
                    </p>
                  )}

                  <div className="w-full mt-4 pt-3 border-t border-blue-500/10 flex justify-between items-center font-mono text-[9px] text-white/40">
                    <span>SEMESTRE</span>
                    <span className="text-blue-400 font-bold">{member.semester}</span>
                  </div>
                </div>
              ))}
            </motion.div>
            </AnimatePresence>
          </div>

          {/* ── AGREGADO: SUBSECCIÓN DE COMITÉS DEL CAPÍTULO ── */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider text-blue-400">
                Comités del Capítulo
              </h2>
              <div className="h-px bg-blue-500/20 flex-1" />
              <span className="font-mono text-[10px] text-blue-400/40">// CHAPTER_COMMITTEES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {COMMITTEES.map((comite, index) => {
                const IconComponent = comite.icon;
                return (
                  <div
                    key={index}
                    className="bg-black/30 border border-white/10 backdrop-blur-sm p-6 relative flex flex-col justify-between hover:border-[#b61a22]/50 transition-all duration-300 rounded-sm"
                  >
                    <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-white/30">
                      {comite.id}
                    </span>

                    <div>
                      <div className="text-[#b61a22] mb-4">
                        <IconComponent className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-wide mb-2">
                        {comite.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed mb-6 font-sans">
                        {comite.desc}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.05] pt-4 flex flex-col gap-2 font-mono text-[9px]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#b61a22] font-bold tracking-wider uppercase">
                          Líder del Comité
                        </span>
                        <span className="text-white/90">
                          {comite.leader}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 tracking-wider uppercase">
                          Estudiantes Activos
                        </span>
                        <span className="text-white font-bold">
                          {comite.students} Estudiantes
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel de Estadísticas del Capítulo Integrado */}
            <div className="mt-8 border border-white/10 bg-black/40 backdrop-blur-md p-6 max-w-3xl mx-auto rounded-sm">
              <div className="flex items-center gap-2 mb-6 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="text-[#b61a22]">📊</span> Estadísticas del Capítulo
              </div>

              <div className="space-y-4 font-mono text-[10px]">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-white/60 uppercase tracking-wider">Active Members Ratio</span>
                    <span className="text-[#b61a22]">85%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-none overflow-hidden">
                    <div className="bg-[#b61a22] h-1" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-white/60 uppercase tracking-wider">Certifications & Modules Done</span>
                    <span className="text-blue-400">40%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-none overflow-hidden">
                    <div className="bg-blue-500 h-1" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="font-bold tracking-wider uppercase text-white/50">
                    Total Estudiantes en el Capítulo
                  </span>
                  <span className="text-3xl font-black text-[#b61a22] font-mono tracking-tight">
                    42
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subsección: Miembros Activos */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold font-montserrat uppercase tracking-wider text-[#b61a22]">
                Personal Investigativo Activo
              </h2>
              <div className="h-px bg-white/10 flex-1" />
              <span className="font-mono text-[10px] text-white/30">// TOTAL_COUNT: {activeMembers.length}</span>
            </div>

            <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear + '-active'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {activeMembers.map((member, i) => (
                <div key={i} className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 flex flex-col items-center text-center relative group hover:border-[#b61a22]/50 hover:bg-white/[0.04] transition-all duration-300 rounded-sm">
                  <span className="absolute top-3 left-4 font-mono text-[9px] text-white/20">
                    REG-{String(i + 1).padStart(3, '0')}
                  </span>

                  <div className="w-20 h-20 mb-4 border border-white/10 group-hover:border-[#b61a22] transition-all rounded-sm overflow-hidden bg-white/5 flex items-center justify-center relative">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top brightness-110 contrast-110 transition-all duration-300 md:grayscale md:group-hover:grayscale-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="font-mono font-bold text-base text-white/30">
                        {member.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                    )}
                  </div>

                  {/* Miembors activos Linked In */}

                  {member.linkedin && member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2 text-[10px] font-mono font-bold text-red-400 hover:text-yellow-300 underline uppercase transition-all"
                    >
                      Ver LinkedIn
                    </a>
                  )}

                  <h4 className="font-bold text-sm tracking-wide mb-2 text-white/90 min-h-[40px] flex items-center justify-center">
                    {member.name}
                  </h4>
                  <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest rounded-sm ${ROLE_COLORS[member.role]}`}>
                    {member.role}
                  </span>
                  <div className="w-full mt-4 pt-2 border-t border-white/[0.05] flex justify-between items-center font-mono text-[9px] text-white/40">
                    <span>SEMESTRE</span>
                    <span className="text-white/70 font-bold">{member.semester}</span>
                  </div>
                </div>
              ))}
            </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ── SECTION: MESA DIRECTIVA FUNDADORA (ACCENT AMARILLO/DORADO) ── */}
        {/* ========================================================================= */}
        <section className="mb-32 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[Montserrat] font-black tracking-widest text-amber-400 uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Mesa Directiva Fundadora
            </h2>
            <p className="text-xs font-mono text-amber-500/70 tracking-widest uppercase mt-2">
          // LOS PRIMEROS INTEGRANTES QUE DIERON ORIGEN AL CAPÍTULO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
            {FOUNDERS.map((founder, idx) => {
              const obtenerIniciales = (name) => {
                if (!name) return "EERI";
                const nombreLimpio = name.replace(/^(Dr\.|Ing\.|Prof\.)\s+/i, '');
                const palabras = nombreLimpio.trim().split(/\s+/);
                if (palabras.length === 1) return palabras[0].substring(0, 2).toUpperCase();

                const primeraLetra = palabras[0][0];
                const segundaLetra = palabras.length > 2 ? palabras[2][0] : palabras[1][0];
                return (primeraLetra + segundaLetra).toUpperCase();
              };

              const [imageError, setImageError] = useState(false);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-gradient-to-b from-[#001c3a]/90 to-[#000e20]/95 border border-amber-500/30 rounded-lg p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>

                  {/* Contenedor de la Foto Rectangular Totalmente Centrado (`mx-auto`) */}
                  <div className="relative w-44 h-48 mb-6 mx-auto rounded-md p-1 bg-gradient-to-tr from-amber-600 via-transparent to-amber-400 shadow-inner transition-transform duration-500">
                    <div className="w-full h-full rounded-md overflow-hidden bg-[#000e20] border border-amber-500/20 flex items-center justify-center">

                      {!imageError ? (
                        <img
                          src={founder.photo}
                          alt={founder.name}
                          loading="lazy"
                          // filter-none (Móvil: color total) | md:filter md:grayscale (PC: Gris inicial) | md:group-hover:grayscale-0 (PC: Color en Hover)
                          className="w-full h-full object-cover object-center filter-none md:filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        // Estado Alternativo Centrado Matemáticamente en caso de que falle la carga de la foto
                        <div className="w-full h-full bg-gradient-to-br from-[#001833] to-[#000a14] flex items-center justify-center font-[Montserrat] font-black text-3xl tracking-wider text-amber-400 select-none animate-fade-in group-hover:text-amber-300">
                          {obtenerIniciales(founder.name)}
                        </div>
                      )}

                    </div>
                    {/* Insignia del período perfectamente acoplada a la esquina inferior derecha del rectángulo */}
                    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-[#000a14] font-mono font-black text-[9px] px-2 py-0.5 rounded-sm border border-[#000a14]">
                      {founder.period}
                    </span>
                  </div>

                  {/* Información */}
                  <h3 className="text-lg font-[Montserrat] font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    {founder.name}
                  </h3>

                  <span className="inline-block text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-sm uppercase tracking-wider my-2">
                    {founder.role}
                  </span>

                  <p className="text-xs text-slate-400 font-[Hanken-Grotesk] leading-relaxed mt-2 flex-grow min-h-[45px]">
                    {founder.contribution}
                  </p>

                  {/* Enlace de Red Social */}
                  {founder.linkedin && founder.linkedin !== '#' && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/30 text-amber-500/70 hover:text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300"
                      title="Ver Perfil Profesional"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN DE INSCRIPCIÓN MULTIPASO ── */}
        <section id="recruitment-section" className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="border border-white/10 bg-black/30 p-12 text-center relative overflow-hidden backdrop-blur-md hover:border-[#b61a22]/40 transition-all duration-500 rounded-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b61a22]/[0.02] to-transparent pointer-events-none" />
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 font-montserrat uppercase tracking-tight text-white">
                  ¿Quieres unirte al <span className="text-[#b61a22]">Capítulo EERI</span>?
                </h2>
                <p className="font-mono text-white/50 text-xs mb-8 max-w-xl mx-auto leading-relaxed uppercase tracking-wide">
                  Convocatorias abiertas para estudiantes de ingeniería civil con enfoque en análisis estructural, geotécnico y resiliencia sismorresistente.
                </p>
                <button
                  onClick={() => { setShowForm(true); setSubmitted(false); setCurrentStep(1); }}
                  className="border border-white text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-[#b61a22] hover:border-[#b61a22] transition-all duration-300 active:scale-[0.98] rounded-sm"
                >
                  Solicitar Inscripción
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form-intake"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="border border-white/10 bg-[#001730]/95 backdrop-blur-md p-8 md:p-12 text-left relative rounded-sm"
              >
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="absolute top-6 right-8 font-mono text-[10px] tracking-widest text-white/40 hover:text-[#b61a22] transition-colors"
                >
                  // CANCEL_REGISTRY
                </button>

                {submitted ? (
                  <motion.div className="text-center py-16 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-3xl text-[#b61a22] font-mono font-bold tracking-widest">// SUCCESS_ENROLL</div>
                    <h3 className="text-2xl font-bold font-montserrat uppercase">Registro de Admisión Recibido</h3>
                    <p className="font-mono text-white/50 text-xs max-w-lg mx-auto leading-relaxed uppercase tracking-wider">
                      La mesa directiva del capítulo evaluará tus credenciales. Recibirás respuesta oficial en tu correo institucional.
                    </p>
                    <button
                      onClick={handleResetForm}
                      className="mt-6 border border-[#b61a22] text-white bg-[#b61a22]/20 font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-[#b61a22] transition-colors rounded-sm"
                    >
                      Terminar Proceso
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black font-montserrat text-white tracking-tight uppercase">
                        Inscripción <span className="text-[#b61a22]">al Capítulo</span>
                      </h2>
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                        PROTOCOL: 2026-STUDENT-ENROLLMENT
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] tracking-wider uppercase mt-8 border-b border-white/10 pb-4">
                        {[
                          { id: 1, label: '01 Personal Info' },
                          { id: 2, label: '02 Correo y Datos' },
                          { id: 3, label: '03 Semestre y Comité' },
                          { id: 4, label: '04 Motivación' }
                        ].map((step) => (
                          <div
                            key={step.id}
                            onClick={() => handleStepClick(step.id)}
                            className={`cursor-pointer pb-2 transition-colors ${currentStep === step.id ? 'border-b-2 border-[#b61a22] text-white font-bold' : 'text-white/30 hover:text-white/60'}`}
                          >
                            {step.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                          <span className="text-[#b61a22]">👤</span> Personal Info
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Full Name</label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                              placeholder="Juan Carlos"
                              className={`w-full bg-[#001124]/50 text-white px-4 py-3 border rounded-none outline-none focus:border-[#b61a22] transition-colors ${errors.name ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-white/10'}`}
                            />
                            {errors.name && <p className="text-red-400 text-[10px] mt-1 uppercase">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Student ID</label>
                            <input
                              type="text"
                              value={form.studentId}
                              onChange={e => setForm({ ...form, studentId: e.target.value })}
                              placeholder="0000332627"
                              className={`w-full bg-[#001124]/50 text-white px-4 py-3 border rounded-none outline-none focus:border-[#b61a22] transition-colors ${errors.studentId ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-white/10'}`}
                            />
                            {errors.studentId && <p className="text-red-400 text-[10px] mt-1 uppercase">{errors.studentId}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                          <span className="text-[#b61a22]">✉</span> Correo y Datos
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Institutional Email</label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={e => setForm({ ...form, email: e.target.value })}
                              placeholder="usuario@unisabana.edu.co"
                              className={`w-full bg-[#001124]/50 text-white px-4 py-3 border rounded-none outline-none focus:border-[#b61a22] transition-colors ${errors.email ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-white/10'}`}
                            />
                            {errors.email && <p className="text-red-400 text-[10px] mt-1 uppercase">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Phone Number</label>
                            <input
                              type="text"
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                              placeholder="3001234567"
                              className={`w-full bg-[#001124]/50 text-white px-4 py-3 border rounded-none outline-none focus:border-[#b61a22] transition-colors ${errors.phone ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-white/10'}`}
                            />
                            {errors.phone && <p className="text-red-400 text-[10px] mt-1 uppercase">{errors.phone}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                          <span className="text-[#b61a22]">🏗</span> Interés de Enfoque
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Semestre Actual</label>
                            <select
                              value={form.semester}
                              onChange={e => setForm({ ...form, semester: parseInt(e.target.value) })}
                              className="w-full bg-[#001124] text-white px-4 py-3 border border-white/10 rounded-none outline-none focus:border-[#b61a22]"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                                <option key={s} value={s} className="bg-[#001124]">{s}° Semestre</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">Comité de Preferencia</label>
                            <select
                              value={form.selectedCommittee}
                              onChange={e => setForm({ ...form, selectedCommittee: e.target.value })}
                              className="w-full bg-[#001124] text-white px-4 py-3 border border-white/10 rounded-none outline-none focus:border-[#b61a22]"
                            >
                              {COMMITTEES.map(c => (
                                <option key={c.id} value={c.id} className="bg-[#001124]">{c.title}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                          <span className="text-[#b61a22]">📝</span> Declaración de Interés
                        </div>
                        <div className="font-mono text-xs">
                          <label className="block text-white/40 font-bold mb-2 uppercase tracking-widest">¿Por qué deseas unirte al Capítulo EERI?</label>
                          <textarea
                            value={form.motivation}
                            onChange={e => setForm({ ...form, motivation: e.target.value })}
                            rows={5}
                            placeholder="Escribe aquí tu motivación académica y técnica..."
                            className={`w-full bg-[#001124]/50 text-white px-4 py-3 border rounded-none outline-none focus:border-[#b61a22] transition-colors ${errors.motivation ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-white/10'}`}
                          />
                          {errors.motivation && <p className="text-red-400 text-[10px] mt-1 uppercase">{errors.motivation}</p>}
                        </div>
                      </motion.div>
                    )}

                    {/* Botonera de Control de Pasos */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1 || loading}
                        className={`border border-white/20 text-white/60 px-6 py-2.5 uppercase tracking-widest hover:text-white hover:border-white transition-colors disabled:opacity-20 disabled:pointer-events-none rounded-sm`}
                      >
                        BACK_
                      </button>

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="border border-white text-white px-6 py-2.5 uppercase tracking-widest hover:bg-[#b61a22] hover:border-[#b61a22] transition-all rounded-sm"
                        >
                          NEXT_
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="border border-[#b61a22] bg-[#b61a22]/10 text-white px-8 py-2.5 uppercase tracking-widest hover:bg-[#b61a22] transition-all disabled:opacity-50 rounded-sm font-bold"
                        >
                          {loading ? 'TRANSMITTING...' : 'SUBMIT_REGISTRY_'}
                        </button>
                      )
                      }
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};

export default MembersPage;