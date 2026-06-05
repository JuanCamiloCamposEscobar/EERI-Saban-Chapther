import { Users, Calendar, Megaphone, Wrench, ShieldCheck, Award } from "lucide-react";

export const COMMITTEES = [
    {
        id: 'EERI-INV',
        title: 'Comité de Investigación',
        desc: 'Desarrolla proyectos de simulación sísmica y análisis de vulnerabilidad estructural, promoviendo la investigación aplicada y la generación de conocimiento técnico.',
        icon: Users,
        leader: 'Juan Camilo Buitrago',
        students: 4
    },
    {
        id: 'EERI-EVE',
        title: 'Comité de Eventos',
        desc: 'Planifica y ejecuta seminarios, talleres y visitas técnicas, gestionando la logística y experiencia de actividades académicas como el SDC.',
        icon: Calendar,
        leader: 'Mariana Rodríguez',
        students: 8
    },
    {
        id: 'EERI-COM',
        title: 'Comité de Comunicación',
        desc: 'Gestiona la identidad visual y la estrategia de difusión, fortaleciendo la presencia del capítulo mediante contenidos académicos y digitales.',
        icon: Megaphone,
        leader: 'Angela Maria Opsino Julio',
        students: 2
    },
    {
        id: 'EERI-AFI',
        title: 'Comité de Afiliaciones',
        desc: 'Coordina la vinculación de miembros y gestiona recursos logísticos, asegurando el acceso a materiales, espacios y beneficios para el desarrollo de actividades.',
        icon: Wrench,
        leader: 'Laura Sofía Gómez',
        students: 5
    },
    {
        id: 'EERI-FON',
        title: 'Comité de Fondos',
        desc: 'Gestiona la obtención de recursos y financiamiento, estableciendo estrategias de sostenibilidad económica y apoyo a iniciativas del capítulo.',
        icon: ShieldCheck,
        leader: 'Laura Artunduaga',
        students: 7
    },
    {
        id: 'EERI-SDC',
        title: 'Comité de SDC',
        desc: 'Fortalece las relaciones con la industria y la academia, coordinando alianzas estratégicas y la consecución de patrocinios para el desarrollo del SDC.',
        icon: Award,
        leader: 'Juan Camilo Campos',
        students: 8
    }
];