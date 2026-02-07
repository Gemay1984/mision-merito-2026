import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, Calendar, Layers, BookOpen, UserCircle, Gamepad2, FileText, Brain } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navItems = [
        { to: '/', label: 'Inicio / Objetivos', icon: <LayoutDashboard className="w-5 h-5" /> },
        { to: '/schedule', label: 'Grupo de Estudio', icon: <Calendar className="w-5 h-5" /> },
        { to: '/levels', label: 'Niveles Jerárquicos', icon: <Layers className="w-5 h-5" /> },
        { to: '/structure', label: 'Estructura de Pruebas', icon: <BookOpen className="w-5 h-5" /> },
        { to: '/simo', label: 'Manual de SIMO', icon: <UserCircle className="w-5 h-5" /> },
        { to: '/simulations', label: 'Simulacros', icon: <Gamepad2 className="w-5 h-5" /> },
        { to: '/flashcards', label: 'Repaso Rápido', icon: <Brain className="w-5 h-5" /> },
        { to: '/documents', label: 'Documentos', icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <nav className="w-full md:w-72 bg-slate-900 dark:bg-slate-950 text-white flex-shrink-0 flex flex-col shadow-2xl z-20 h-screen sticky top-0 border-r border-slate-800 dark:border-slate-800/50">
            <div className="p-6 border-b border-slate-800 dark:border-slate-800/50">
                <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                    <h1 className="text-xl font-bold">Misión Mérito <span className="text-blue-400">2026</span></h1>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Grupo de Estudio CNSC</p>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 dark:hover:bg-slate-900'}`
                        }
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Sidebar;
