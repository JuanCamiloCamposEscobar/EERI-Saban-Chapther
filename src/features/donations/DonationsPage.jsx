import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

const PREDEFINED_AMOUNTS = [50, 100, 250, 500];
const DESTINATIONS = [
    { id: 'research', label: 'Investigación estructural', icon: '🔬' },
    { id: 'lab', label: 'Material de laboratorio', icon: '🏗️' },
    { id: 'competitions', label: 'Competencias internacionales', icon: '🌎' },
    { id: 'academy', label: 'Formación académica', icon: '📚' }
];

// Función para determinar el color según el progreso
const getProgressColor = (percentage) => {
    if (percentage <= 20) return "#ef4444"; // Rojo neón
    if (percentage <= 60) return "#ffd700"; // Amarillo neón
    return "#22c55e"; // Verde neón
};

const DayCounter = ({ days }) => {
    const [displayDays, setDisplayDays] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = days;
        if (start === end) return;
        let totalDuration = 2000;
        let incrementTime = (totalDuration / end);
        let timer = setInterval(() => {
            start += 1;
            setDisplayDays(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [days]);

    return (
        <div className="text-center mb-6">
            <span className="block text-4xl font-black tracking-tighter text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                {displayDays}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mt-1">
                Días Restantes
            </span>
        </div>
    );
};

const FundsPage = () => {
    const COMPETITION_DATE = "2026-12-31";
    const TOTAL_RAISED = 12500;
    const GOAL = 20000;

    const percentage = Math.min((TOTAL_RAISED / GOAL) * 100, 100);
    const dynamicColor = getProgressColor(percentage);

    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);

    const daysLeft = useMemo(() => {
        const diff = new Date(COMPETITION_DATE) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, []);

    const finalAmount = useMemo(() => {
        if (selectedAmount) return selectedAmount;
        const parsedCustom = parseFloat(customAmount);
        return isNaN(parsedCustom) || parsedCustom <= 0 ? 0 : parsedCustom;
    }, [selectedAmount, customAmount]);

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen py-24 px-4 text-white bg-neutral-950">
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center flex flex-col items-center">
                    <DayCounter days={daysLeft} />

                    <div className="relative w-56 h-56 mb-10">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="112" cy="112" r="95" fill="none" stroke="#262626" strokeWidth="12" />
                            <motion.circle
                                cx="112" cy="112" r="95" fill="none"
                                stroke={dynamicColor}
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 95}
                                initial={{ strokeDashoffset: 2 * Math.PI * 95 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 95 * (1 - percentage / 100) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                strokeLinecap="round"
                                // Añadimos filtro de sombra para el neón del círculo
                                style={{ filter: `drop-shadow(0 0 8px ${dynamicColor})` }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* EFECTO NEÓN: Añadido drop-shadow-[0_0_10px_currentColor] */}
                            <span
                                className="text-3xl font-black drop-shadow-[0_0_10px_currentColor]"
                                style={{ color: dynamicColor }}
                            >
                                ${TOTAL_RAISED.toLocaleString()}
                            </span>
                            <span className="text-neutral-500 text-[9px] font-mono tracking-widest uppercase mt-1">
                                Meta: ${GOAL.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Fondos</h1>
                        <p className="text-neutral-400 text-sm max-w-lg mx-auto font-light">Recursos estratégicos destinados a nuestra participación internacional.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-7 bg-neutral-900 border border-neutral-800 p-8 rounded-sm shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {PREDEFINED_AMOUNTS.map((amount) => (
                                    <button key={amount} type="button" onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`py-3 rounded-lg font-mono font-bold text-sm transition-all ${selectedAmount === amount ? 'bg-white text-neutral-950' : 'bg-neutral-800 hover:bg-neutral-700'}`}>
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} placeholder="Otro monto (USD)" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 font-mono outline-none focus:border-neutral-500" />
                            <button type="button" className="w-full bg-neutral-100 text-neutral-950 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-white transition-colors">
                                Confirmar: ${finalAmount.toFixed(2)}
                            </button>
                        </form>
                    </section>

                    <aside className="lg:col-span-5 bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 space-y-6">
                        <h2 className="font-bold uppercase tracking-widest text-neutral-500">Uso de Recursos</h2>
                        <ul className="space-y-4">
                            {DESTINATIONS.map((item) => (
                                <li key={item.id} className="flex items-center gap-4 text-xs text-neutral-400">
                                    <span className="text-lg">{item.icon}</span> {item.label}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </motion.main>
    );
};

export default FundsPage;