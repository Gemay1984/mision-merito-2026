import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl relative z-10">
                    <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                        Misión Mérito 2026: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Investigación y Capacitación
                        </span>
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Este programa de formación ha sido diseñado como un entrenamiento de alto rendimiento. A diferencia de los métodos tradicionales basados en la memorización, este curso propone una <span className="font-bold text-slate-800 italic">pedagogía de diálogo con el texto</span>, donde el aspirante aprende a interpretar la norma en contextos reales de oficina.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Objetivo General</h4>
                                <p className="text-sm text-slate-500 mt-1">Desarrollar competencias técnicas para superar el umbral eliminatorio del 60% en pruebas funcionales.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Meta de Desempeño</h4>
                                <p className="text-sm text-slate-500 mt-1">Destacar en el 20% clasificatorio de pruebas comportamentales mediante el juicio situacional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Carácter del Curso", val: "Sabatino", color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Enfoque Principal", val: "Juicio Situacional", color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Vacantes 2026", val: "30.000+", color: "text-emerald-600", bg: "bg-emerald-50" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{stat.label}</p>
                        <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                        <div className={`h-1 w-12 rounded-full ${stat.bg.replace('bg-', 'bg-')}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
