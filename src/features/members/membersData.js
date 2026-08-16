// ── MEMBERS DATA ──
// Separado de MembersPage.jsx para facilitar mantenimiento y filtrado por año.
// Cada miembro de MEMBERS lleva un campo `year` para el selector de cohorte.
// FOUNDERS no lleva `year` — se muestran siempre en su sección propia.

export const MEMBERS = [
    // ── Faculty Advisor (year: null — se muestra siempre, no se filtra) ──
    {
        name: 'Dr. Diego Roberto Martinez',
        role: 'Faculty Advisor',
        semester: 'Profesor Principal',
        linkedin: 'https://www.linkedin.com/in/diego-martinez-pineda?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        photo: '/media/2025/members/Profesor.jpeg',
        quote: 'Guíando a la próxima generación de ingenieros hacia la resiliencia estructural.',
        year: null,
    },

    // ── Junta Directiva 2025 ──
    {
        name: 'Juan Camilo Buitrago Hurtado',
        role: 'Presidente',
        semester: '8°',
        linkedin: 'https://www.linkedin.com/in/juan-camilo-buitrago-hurtado',
        photo: '/media/2025/members/Presidente.jpeg',
        quote: 'Liderando la innovación sismorresistente desde la academia.',
        year: 2025,
    },
    {
        name: 'Juan Camilo Campos Escobar',
        role: 'Vicepresidente',
        semester: '5°',
        linkedin: 'https://www.linkedin.com/in/juan-camilo-campos-escobar-a6a3533b5?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        photo: '/media/2025/members/vicepresidente.png',
        quote: 'Coordinando esfuerzos para la gestión del riesgo y diseño avanzado.',
        year: 2025,
    },
    {
        name: 'Thomas Alejandro Leon Garcia',
        role: 'Secretario',
        semester: '9°',
        linkedin: 'https://www.linkedin.com/in/thomas-alejandro-leon-garcia-304286308?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        photo: '/media/2025/founders/Thomas Leon.jpeg',
        quote: 'Estructurando la documentación y el rigor técnico del capítulo.',
        year: 2025,
    },
    {
        name: 'Daniel Alejandro Parra Guerrero',
        role: 'Tesorero',
        semester: '8°',
        linkedin: 'https://www.linkedin.com/in/daniel-alejandro-parra-guerrero?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
        photo: '/media/2025/members/Tesorero.jpeg',
        quote: 'Optimizando recursos para viabilizar la investigación y el desarrollo.',
        year: 2025,
    },

    // ── Miembros Activos 2025 ──
    { name: 'Laura Sofia Artunduaga Pulido', role: 'Miembro Activo', semester: '5°', linkedin: 'https://www.linkedin.com/in/laura-sofia-artunduaga-pulido-7120b3358?utm_source=share_via&utm_content=profile&utm_medium=member_android', photo: '/media/2025/members/LauraA.jpeg', year: 2025 },
    { name: 'Angela Maria Ospino Julio', role: 'Miembro Activo', semester: '4°', linkedin: '#', photo: '/media/2025/members/Angela.jpeg', year: 2025 },
    { name: 'Juan Felipe Arroyave Calvo', role: 'Miembro Activo', semester: '5°', linkedin: '#', photo: '', year: 2025 },
    { name: 'Juan Daniel Salcedo Urango', role: 'Miembro Activo', semester: '5°', linkedin: '#', photo: '', year: 2025 },
    { name: 'Pedro Nicolás Cortés Rojas', role: 'Miembro Activo', semester: 'Practicas', linkedin: '#', photo: '', year: 2025 },
    { name: 'Germán Darío Hernández Mora ', role: 'Miembro Activo', semester: 'Practicas', linkedin: '#', photo: '', year: 2025 },
    { name: 'Nicolas Rafael Bilbao Cure', role: 'Miembro Activo', semester: '9°', linkedin: 'https://www.linkedin.com/in/nicolas-r-bilbao-cure-26b58330b?utm_source=share_via&utm_content=profile&utm_medium=member_android', photo: '/media/2025/members/NicolasB.jpeg', year: 2025 },
    { name: 'Brayan Stiven Trujillo Guayara', role: 'Miembro Activo', semester: '8°', linkedin: '#', photo: '', year: 2025 },

    // ── Junta Directiva 2026 ──
    {
        name: 'Prueba',
        role: 'Presidente',
        semester: '9°',
        linkedin: 'https://www.linkedin.com/in/...',
        photo: '/media/2025/members/Presidente.jpeg',
        quote: 'Frase institucional del nuevo presidente.',
        year: 2026,
    },

    // ── Miembros Activos 2026 ──
    { name: 'Laura Sofia Artunduaga Pulido', role: 'Miembro Activo', semester: '5°', linkedin: 'https://www.linkedin.com/in/laura-sofia-artunduaga-pulido-7120b3358?utm_source=share_via&utm_content=profile&utm_medium=member_android', photo: '/media/2025/members/LauraA.jpeg', year: 2026 },
];

// ── FOUNDERS DATA ──
// Sin campo `year` — se muestran siempre en su sección propia, sin filtro.
export const FOUNDERS = [
    {
        name: 'Juan Camilo Buitrago Hurtado',
        role: 'Presidente Fundador',
        period: '2024 - 2025',
        contribution: 'Gestión inicial y establecimiento de las bases del capítulo académico.',
        linkedin: 'https://www.linkedin.com/in/juan-camilo-buitrago-hurtado',
        photo: '/media/2025/founders/Buitrago.jpeg',
    },
    {
        name: 'Juan Camilo Campos Escobar',
        role: 'Vicepresidente Fundador',
        period: '2024 - 2025',
        contribution: 'Co-líder en el desarrollo estratégico, estructuración de comités y creador de la pagina web.',
        linkedin: 'https://www.linkedin.com/in/juan-camilo-campos-escobar-a6a3533b5?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        photo: '/media/2025/founders/Campos.png',
    },
    {
        name: 'Dr. Diego Roberto Martinez',
        role: 'Promotor & Faculty Advisor',
        period: 'Fundación',
        contribution: 'Soporte institucional, académico y mentoría esencial para la validación del capítulo.',
        linkedin: 'https://www.linkedin.com/in/diego-martinez-pineda',
        photo: '/media/2025/founders/Profesor.jpeg',
    },
    {
        name: 'Thomas Alejandro Leon Garcia',
        role: 'Secretario',
        period: '2024 - 2025',
        contribution: 'Estructurando la documentación y el rigor técnico del capítulo.',
        linkedin: 'https://www.linkedin.com/in/thomas-alejandro-leon-garcia-304286308?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        photo: '/media/2025/founders/Thomas Leon.jpeg',
    },
    {
        name: 'Daniel Alejandro Parra Guerrero',
        role: 'Tesorero',
        period: '2024 - 2025',
        contribution: 'Optimizando recursos para viabilizar la investigación y el desarrollo.',
        linkedin: 'https://www.linkedin.com/in/daniel-alejandro-parra-guerrero?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
        photo: '/media/2025/founders/Parra.jpeg',
    },
];

