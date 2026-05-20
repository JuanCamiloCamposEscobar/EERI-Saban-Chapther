import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 md:top-auto md:bottom-6 md:right-6 z-50 font-hanken">
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 md:top-auto md:bottom-full md:mt-0 md:mb-2 right-0 py-2 bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 rounded-xl overflow-hidden flex flex-col min-w-[80px] items-center"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-4 py-2 text-sm font-bold transition-colors ${i18n.language === lang.code ? 'text-[#B33929] bg-gray-50' : 'text-[#003366] hover:text-[#B33929] hover:bg-gray-50'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 rounded-full px-4 py-2 font-bold text-[#003366] hover:text-[#B33929] transition-colors flex items-center gap-2"
        >
          <span>{currentLang.label}</span>
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
