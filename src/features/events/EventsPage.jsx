import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

import background6 from '../../assets/backgrounds/Background_6.png';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Andean Masonry Retrofit',
    version: '4.2.0-ESTABLE',
    coordinates: 'COORD: 4.8616° N, 74.0334° W',
    anomaly: 'ANOMALÍA ESTRUCTURAL: Tensión en Muro de Cortante',
    description: 'Aprende los fundamentos del diseño sísmico y reforzamiento con SAP2000 junto a expertos del capítulo.',
    date: '2026-06-15',
    type: 'WEBINAR',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    capacity: 50,
    registered: 38,
    location: 'Microsoft Teams',
    requirements: [
      'Comprensión avanzada de análisis lineal en SAP2000',
      'Instalación del complemento académico de O365',
      'Conjunto de datos: Ondas Sísmicas Andinas 2024 (precargado)'
    ]
  },
  {
    id: '2',
    title: 'Visita Técnica: Edificio Ad Portas',
    version: '1.0.3-TERRENO',
    coordinates: 'COORD: 4.8621° N, 74.0329° W',
    anomaly: 'INSPECCIÓN DE CAMPO: Verificación de Juntas Sismoresistentes',
    description: 'Recorrido técnico guiado por las instalaciones del nuevo complejo estructural en el campus de la Universidad de La Sabana.',
    date: '2026-06-20',
    type: 'IN_PERSON',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    capacity: 20,
    registered: 18,
    location: 'Campus Universidad de La Sabana',
    requirements: [
      'Uso obligatorio de botas de seguridad y casco tipo II',
      'Carnet vigente de la Universidad de La Sabana',
      'Lectura previa del plano de cimentación estructural del módulo'
    ]
  },
  {
    id: '3',
    title: 'Presentación del Equipo SDC',
    version: '2.1.0-COMPETICIÓN',
    coordinates: 'COORD: 4.8614° N, 74.0341° W',
    anomaly: 'SIMULACIÓN DE MESA DE VIBRACIÓN: Análisis de Derivas Máximas',
    description: 'Presentación oficial y defense de la propuesta estructural para la Seismic Design Competition 2026.',
    date: '2026-07-01',
    type: 'HYBRID',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    capacity: 100,
    registered: 60,
    location: 'Auditorio Principal / En vivo',
    requirements: [
      'Revisión del reglamento oficial de la competencia EERI 2026',
      'Registro activo en la plataforma del Capítulo Estudiantil',
      'Descarga del modelo analítico de la estructura a escala'
    ]
  },
];

const TYPE_STYLES = {
  IN_PERSON: 'bg-[#ab3424]/40 text-[#ff7360] border border-[#ff5540]/60 shadow-[0_0_15px_rgba(171,52,36,0.3)]',
  WEBINAR: 'bg-[#00354d]/70 text-[#00f0ff] border border-[#00f0ff]/80 shadow-[0_0_15px_rgba(0,240,255,0.25)]',
  HYBRID: 'bg-[#064e3b]/70 text-[#34d399] border border-[#10b981]/80 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
};

const TYPE_LABELS = {
  IN_PERSON: 'Presencial',
  WEBINAR: 'Webinar',
  HYBRID: 'Híbrido',
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/events');
      const data = Array.isArray(response.data) ? response.data : [];

      const integratedData = (data.length > 0 ? data : MOCK_EVENTS).map((ev, idx) => ({
        ...MOCK_EVENTS[idx % MOCK_EVENTS.length],
        ...ev
      }));

      setEvents(integratedData);
      if (integratedData.length > 0) {
        setSelectedEvent(integratedData[0]);
      }
    } catch (err) {
      console.warn('Backend no disponible, usando entorno de simulación local.');
      setEvents(MOCK_EVENTS);
      if (MOCK_EVENTS.length > 0) {
        setSelectedEvent(MOCK_EVENTS[0]);
      }
      setError('demo');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/register`);
      alert('¡Acceso concedido al espacio del módulo!');
      fetchEvents();
    } catch (err) {
      const msg = err.response?.data?.error || 'Error al procesar la solicitud';
      alert(msg);
    }
  };

  const handleSelectEventMobile = (event) => {
    setSelectedEvent(event);
    setIsMobileSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#001530]">
        <div className="w-12 h-12 rounded-full border-4 border-[#ab3424] border-t-transparent animate-spin" />
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">Inicializando Entorno Analítico…</p>
      </div>
    );
  }

  const renderEventList = (isMobile = false) => (
    <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
      {events.map((event, i) => {
        const isSelected = selectedEvent?.id === event.id;
        return (
          <div
            key={event.id}
            onClick={() => isMobile ? handleSelectEventMobile(event) : setSelectedEvent(event)}
            className={`p-5 cursor-pointer transition-all relative group ${isSelected ? 'bg-[#001e40]/70 border-l-4 border-l-[#ab3424]' : 'hover:bg-white/[0.03]'
              }`}
          >
            <span className="absolute top-2 right-4 font-mono text-[9px] text-white/20">
              SIST-{String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2 items-center mb-2">
              <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest rounded-none ${TYPE_STYLES[event.type].split(' ')[0]} ${TYPE_STYLES[event.type].split(' ')[1]} ${TYPE_STYLES[event.type].split(' ')[2]}`}>
                {TYPE_LABELS[event.type] ?? event.type}
              </span>
              <span className="text-white/40 font-mono text-[9px]">{formatDate(event.date)}</span>
            </div>
            <h3 className="text-sm font-bold tracking-tight uppercase font-montserrat text-white/90 group-hover:text-white">
              {event.title}
            </h3>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="w-full h-[calc(100vh-64px)] text-white font-sans overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background6})` }}
    >
      <div className="w-full h-full bg-black/20 relative">
        <main className="flex h-full max-w-7xl mx-auto border-x border-white/10 bg-[#001124]/40">

          {/* ── PANEL ESCRITORIO ── */}
          <section className="hidden lg:flex w-[380px] border-r border-white/10 flex-col h-full bg-[#000d1a]/85 shrink-0">
            <div className="p-6 border-b border-white/10 bg-[#001124]/90">
              <h1 className="text-xl font-bold font-montserrat uppercase tracking-tight text-white">
                Cronograma Técnico
              </h1>
              <p className="text-[10px] font-mono text-[#ab3424] uppercase tracking-widest mt-1">
                Eventos Disponibles
              </p>
              {error === 'demo' && (
                <div className="mt-3 px-3 py-1 border border-[#ab3424]/30 bg-[#ab3424]/10 text-[#ff5540] font-mono text-[9px] uppercase tracking-wider rounded-none">
                  ⚠️ MODO_SIMULACIÓN_LOCAL
                </div>
              )}
            </div>
            {renderEventList(false)}
          </section>

          {/* ── DRAWER / COLUMNA ESCONDIDA MÓVIL ── */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
                <motion.section
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="fixed top-0 left-0 h-full w-[290px] sm:w-[320px] z-50 bg-[#000d1a]/95 border-r border-white/10 flex flex-col lg:hidden shadow-2xl pt-16"
                >
                  <div className="p-4 border-b border-white/10 bg-[#001124]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-md font-bold font-montserrat uppercase text-white">Flujo de Eventos</h2>
                        <span className="text-[9px] font-mono text-[#ff5540] uppercase tracking-wider block mt-0.5">
                          Eventos Disponibles
                        </span>
                      </div>
                      <button
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="w-7 h-7 border border-white/10 font-mono text-xs text-white/60 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {renderEventList(true)}
                </motion.section>
              </>
            )}
          </AnimatePresence>

          {/* ── VISOR PRINCIPAL ── */}
          <section className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-transparent">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 sm:space-y-6 pb-20 lg:pb-0"
                >
                  {/* BOTÓN FLOTANTE MÓVIL */}
                  <div className="lg:hidden flex items-center justify-between bg-white/[0.02] border border-white/10 p-2.5 mb-2">
                    <button
                      onClick={() => setIsMobileSidebarOpen(true)}
                      className="px-3 py-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.15)] active:scale-[0.98]"
                    >
                      [ ☰ FILTRO DE FLUJO ]
                    </button>
                    <span className="font-mono text-[9px] text-white/40 uppercase">
                      Viendo: {TYPE_LABELS[selectedEvent.type]}
                    </span>
                  </div>

                  {/* ENCABEZADO TÉCNICO */}
                  <div className="border-b border-white/20 pb-4 relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-[#ff5540] font-bold tracking-wider block uppercase">
                          HOJA DE ESPECIFICACIONES: 081-A
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight font-montserrat uppercase mt-1">
                          {selectedEvent.title}
                        </h2>
                      </div>
                      <div className="text-left sm:text-right font-mono text-[9px] text-white/40">
                        <div>VERSIÓN: {selectedEvent.version || '1.0.0-STABLE'}</div>
                        <div>{selectedEvent.coordinates || 'COORD: 4.8616° N, 74.0334° W'}</div>
                      </div>
                    </div>
                  </div>

                  {/* MONITOR CON IMAGEN DE FONDO */}
                  <div className="w-full h-56 sm:h-64 md:h-80 border border-white/10 bg-[#000f1f]/85 relative overflow-hidden flex items-center justify-center rounded-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px]">

                    {selectedEvent.image && (
                      <img
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none mix-blend-screen"
                      />
                    )}

                    {/* INDICADOR DE MODALIDAD CON MÁXIMA LEGIBILIDAD */}
                    <span className={`absolute top-3 left-4 font-mono text-[10px] font-black px-2.5 py-1.5 uppercase tracking-widest z-10 backdrop-blur-md bg-opacity-95 rounded-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${TYPE_STYLES[selectedEvent.type]}`}>
                      MODALIDAD: {TYPE_LABELS[selectedEvent.type] || selectedEvent.type}
                    </span>

                    <div className="absolute top-3 right-4 flex gap-1.5 z-10">
                      <button className="w-6 h-6 border border-white/20 bg-[#001124]/90 text-white/70 text-xs flex items-center justify-center">🔍</button>
                      <button className="w-6 h-6 border border-white/20 bg-[#001124]/90 text-white/70 text-xs flex items-center justify-center">🔄</button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-[#ff5540] text-[#000913] px-3 py-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wide border-l-4 border-white flex items-center shadow-lg z-10">
                      <span className="animate-pulse mr-2 shrink-0">●</span>
                      <span className="truncate">{selectedEvent.anomaly || 'ESTADO ESTRUCTURAL: NOMINAL / VERIFICADO'}</span>
                    </div>
                  </div>

                  {/* SECCIÓN DETALLES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                    {/* Tarjeta de Requisitos / Características */}
                    <div className="border border-white/10 bg-[#000d1a]/85 backdrop-blur-sm p-4 sm:p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-white/90">
                        <span className="text-sm">🔩</span>
                        <h4 className="font-montserrat text-xs font-bold uppercase tracking-wider">
                          {selectedEvent.type === 'WEBINAR' ? 'Características del Webinar' : 'Requisitos Técnicos'}
                        </h4>
                      </div>
                      <ul className="space-y-3 font-mono text-[11px] text-white/70">
                        {(selectedEvent.requirements || ['Disponer de conexión estable']).map((req, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="text-[#ff5540] mt-0.5 shrink-0">▪</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Módulos */}
                    <div className="border border-white/10 bg-[#000d1a]/85 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-white/90">
                          <span className="text-sm">💾</span>
                          <h4 className="font-montserrat text-xs font-bold uppercase tracking-wider">Módulos del Sistema</h4>
                        </div>

                        <div className="space-y-1.5 font-mono text-[10px] uppercase">
                          <div className="flex justify-between">
                            <span className="text-white/40">Capacidad de Registro</span>
                            <span className="text-[#ff5540] font-bold">
                              {selectedEvent.capacity - selectedEvent.registered} Cupos Disponibles
                            </span>
                          </div>
                          <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                            <div
                              className="h-full bg-[#ff5540] transition-all duration-500"
                              style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRegister(selectedEvent.id)}
                        disabled={selectedEvent.registered >= selectedEvent.capacity}
                        className={`w-full mt-2 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 border rounded-none ${selectedEvent.registered >= selectedEvent.capacity
                          ? 'border-white/5 bg-transparent text-white/20 cursor-not-allowed'
                          : 'bg-[#a7c8ff] text-[#001b3c] hover:bg-white hover:text-black border-transparent'
                          }`}
                      >
                        {selectedEvent.registered >= selectedEvent.capacity
                          ? 'ACCESO COMPLETO // BLOQUEADO'
                          : 'SOLICITAR ACCESO // ASEGURAR CUPO'}
                      </button>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-white/20 font-mono text-xs tracking-widest uppercase">
                  Selecciona un módulo del flujo para cargar el gemelo digital_
                </div>
              )}
            </AnimatePresence>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EventsPage;