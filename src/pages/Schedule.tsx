import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { schedule } from '../data/mockData';

const Schedule: React.FC = () => {
    const [expandedSession, setExpandedSession] = useState<number | null>(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10 w-full mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold">Grupo de Estudio Concurso</h3>
                    <p className="text-slate-400 text-sm mt-1">Plan de capacitación detallado - Ciclo 2026</p>
                </div>
                <div className="relative z-10 bg-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter whitespace-nowrap shadow-lg shadow-blue-900/50">
                    {schedule.length} Sesiones Programadas
                </div>
            </div>

            <div className="space-y-4">
                {schedule.map((session) => (
                    <div key={session.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:border-blue-300 hover:shadow-md">
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer group"
                            onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${session.cycle === 'Fundamentos' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}`}>
                                    {session.id}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{session.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(session.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', timeZone: 'UTC' })}</p>
                                </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${expandedSession === session.id ? 'rotate-90 text-blue-500' : 'group-hover:text-blue-400'}`} />
                        </div>
                        {expandedSession === session.id && (
                            <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-300">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        {session.desc}
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-[9px] font-black bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 uppercase">{session.cycle}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
