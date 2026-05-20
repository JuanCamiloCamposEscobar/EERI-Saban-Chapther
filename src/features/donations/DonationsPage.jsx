import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Constantes de diseño y negocio
const PREDEFINED_AMOUNTS = [50, 100, 250, 500];
const DESTINATIONS = [
    { id: 'research', label: 'Investigación estructural', icon: '🔬' },
    { id: 'lab', label: 'Material de laboratorio', icon: '🏗️' },
    { id: 'competitions', label: 'Competencias internacionales', icon: '🌎' },
    { id: 'academy', label: 'Formación académica', icon: '📚' }
];

const DonationsPage = () => {
    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: null, message: '' }); // 'success' | 'error'

    // Determinar el monto final real de la donación
    const finalAmount = useMemo(() => {
        if (selectedAmount) return selectedAmount;
        const parsedCustom = parseFloat(customAmount);
        return isNaN(parsedCustom) || parsedCustom <= 0 ? 0 : parsedCustom;
    }, [selectedAmount, customAmount]);

    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
        if (status.type) setStatus({ type: null, message: '' });
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        // Previene valores negativos en el estado básico
        if (value < 0) return;
        setCustomAmount(value);
        setSelectedAmount(null);
        if (status.type) setStatus({ type: null, message: '' });
    };

    const handleDonateSubmit = async (e) => {
        e.preventDefault();
        if (finalAmount <= 0) {
            setStatus({ type: 'error', message: 'Por favor, ingresa o selecciona un monto válido.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            // Reemplazar con la URL de entorno correspondiente (ej. import.meta.env.VITE_API_URL)
            const response = await fetch('/api/donations/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: finalAmount, currency: 'USD' }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error al procesar la solicitud.');

            // Redirección a la pasarela de pago (Stripe/PayPal/Epayco)
            if (data.url) {
                window.location.href = data.url;
            } else {
                setStatus({ type: 'success', message: '¡Gracias por tu intención de apoyo! Redirigiendo...' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Error de conexión con el servidor.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen py-24 px-4 text-white bg-gradient-to-b from-neutral-950 to-neutral-900"
        >
            <div className="max-w-6xl mx-auto space-y-16">

                {/* HEADER */}
                <div className="text-center space-y-3">
                    <motion.span
                        initial={{ letterSpacing: '0.1em', opacity: 0 }}
                        animate={{ letterSpacing: '0.2em', opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs font-semibold text-[#ab3424] font-mono uppercase block"
                    >
            // Funding Module
                    </motion.span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-100">
                        Donaciones
                    </h1>
                    <p className="text-neutral-400 text-base max-w-xl mx-auto font-light leading-relaxed">
                        Apoya el desarrollo de investigación sísmica y proyectos estructurales de alto impacto.
                    </p>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLUMNA FORMULARIO (7 Columnas en desktop) */}
                    <section className="lg:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
                        <h2 className="font-bold text-xl uppercase tracking-wide mb-6 text-neutral-200">
                            Selecciona el monto
                        </h2>

                        <form onSubmit={handleDonateSubmit} className="space-y-8">
                            {/* BOTONES PREDEFINIDOS */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {PREDEFINED_AMOUNTS.map((amount) => {
                                    const isSelected = selectedAmount === amount;
                                    return (
                                        <button
                                            key={amount}
                                            type="button"
                                            onClick={() => handleAmountClick(amount)}
                                            aria-pressed={isSelected}
                                            className={`py-3.5 px-4 rounded-lg font-mono font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ab3424] ${isSelected
                                                    ? 'bg-[#ab3424] text-white shadow-lg shadow-[#ab3424]/20 scale-[1.02]'
                                                    : 'bg-neutral-800/40 border border-neutral-700/60 hover:bg-neutral-800 hover:border-neutral-500 text-neutral-300'
                                                }`}
                                        >
                                            ${amount}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* INPUT PERSONALIZADO */}
                            <div className="space-y-2">
                                <label htmlFor="custom-amount" className="text-sm font-medium text-neutral-400 block">
                                    Monto personalizado (USD)
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-neutral-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        id="custom-amount"
                                        type="number"
                                        min="1"
                                        step="any"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        className="w-full bg-neutral-950/60 border border-neutral-800 rounded-lg pl-8 pr-4 py-3 text-neutral-100 outline-none transition-all focus:border-[#ab3424] focus:ring-1 focus:ring-[#ab3424] placeholder-neutral-600 font-mono"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* FEEDBACK DE ESTADOS */}
                            <AnimatePresence mode="wait">
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`p-4 rounded-lg text-sm font-medium ${status.type === 'error'
                                                ? 'bg-red-950/40 border border-red-900/50 text-red-400'
                                                : 'bg-emerald-950/40 border border-emerald-900/50 text-emerald-400'
                                            }`}
                                        role="alert"
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* BOTÓN DE ACCIÓN */}
                            <button
                                type="submit"
                                disabled={isSubmitting || finalAmount <= 0}
                                className="w-full bg-neutral-100 text-neutral-950 hover:bg-white disabled:bg-neutral-800 disabled:text-neutral-500 font-bold py-4 rounded-lg tracking-wider uppercase text-sm transition-all duration-150 flex justify-center items-center gap-2 shadow-lg active:scale-[0.99]"
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    `Donar $${finalAmount.toFixed(2)} USD`
                                )}
                            </button>
                        </form>
                    </section>

                    {/* COLUMNA INFORMACIÓN (5 Columnas en desktop) */}
                    <aside className="lg:col-span-5 bg-neutral-900/30 border border-neutral-800/80 rounded-xl p-6 md:p-8 space-y-6">
                        <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-200">
                            ¿En qué se usa?
                        </h2>

                        <ul className="space-y-4" role="list">
                            {DESTINATIONS.map((item) => (
                                <li key={item.id} className="flex items-start gap-3 text-neutral-400 text-sm">
                                    <span className="flex items-center justify-center bg-neutral-800 rounded-md p-1.5 min-w-[2rem] h-8" aria-hidden="true">
                                        {item.icon}
                                    </span>
                                    <span className="pt-1.5 font-light">{item.label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-neutral-800/80 pt-6 text-xs text-neutral-500 leading-relaxed font-light">
                            Transparencia e integridad garantizadas institucionalmente por la administración del capítulo <span className="text-neutral-400 font-medium">EERI</span>.
                        </div>
                    </aside>

                </div>
            </div>
        </motion.main>
    );
};

export default DonationsPage;