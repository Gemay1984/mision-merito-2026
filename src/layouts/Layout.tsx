import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Clock } from 'lucide-react';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-10 p-6 flex justify-between items-center shadow-sm">
                    <div>
                        {/* The page title could be dynamic based on route, but for now we'll keep it simple or use a context */}
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
                            Misión Mérito
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full px-4 border border-slate-200">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-600 italic capitalize">
                            {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
