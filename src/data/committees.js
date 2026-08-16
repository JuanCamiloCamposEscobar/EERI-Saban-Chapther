import { Users, Calendar, Megaphone, Wrench, ShieldCheck, Award } from "lucide-react";

export const COMMITTEES = [
    {
        id: 'EERI-COM',
        title: 'Comité de Comunicaciones y Vinculación',
        desc: 'Fortalece la comunicación del capítulo mediante la gestión de redes sociales, la página web y la creación de contenido informativo. Además, lidera los procesos de integración de nuevos miembros y fomenta una comunidad activa, colaborativa y comprometida con la ingeniería sísmica.',
        icon: Megaphone,
        leader: 'Angela Maria Opsino Julio',
        students: 1
    },
    {
        id: 'EERI-EVE',
        title: 'Comité de Eventos, Alianzas y Desarrollo',
        desc: 'Planifica y coordina conferencias, webinars, talleres, visitas técnicas y otras actividades académicas. También promueve alianzas con empresas e instituciones, además de gestionar estrategias de patrocinio y financiación para apoyar el crecimiento y sostenibilidad del capítulo.',
        icon: Calendar,
        leader: 'Laura Artunduaga',
        students: 1
    },
    {
        id: 'EERI-ACA',
        title: 'Comité Académico, Investigación y Competencias',
        desc: 'Impulsa el desarrollo técnico de los miembros mediante proyectos de investigación, publicación de artículos y espacios de aprendizaje especializado. Asimismo, lidera la preparación y participación del capítulo en competencias estudiantiles, especialmente la Seismic Design Competition (SDC), fortaleciendo habilidades analíticas e innovadoras.',
        icon: Award,
        leader: 'Juan Camilo Campos',
        students: 2
    }
];