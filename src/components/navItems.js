import { Home, Info, Calendar, Briefcase, BookOpen, Users, Heart } from "lucide-react";

export const navItems = [
    { name: "Inicio", translationKey: "home", path: "/", icon: Home },
    { name: "Institucional", translationKey: "about", path: "/about", icon: Info },
    { name: "Eventos", translationKey: "events", path: "/events", icon: Calendar },
    { name: "Proyectos", translationKey: "projects", path: "/projects", icon: Briefcase },
    { name: "Blog", translationKey: "blog", path: "/blog", icon: BookOpen },
    { name: "Miembros", translationKey: "members", path: "/members", icon: Users },
    { name: "Donaciones", translationKey: "donations", path: "/donations", icon: Heart },
];