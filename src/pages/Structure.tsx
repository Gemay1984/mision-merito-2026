import React from 'react';
import { Info } from 'lucide-react';
import { examComponents } from '../data/mockData';

const Structure: React.FC = () => {
    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm">
                <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <h3 className="text-2xl font-bold relative z-10">Desglose de la Prueba Escrita</h3>
                    <p className="text-slate-400 relative z-10 text-sm">Distribución porcentual estándar para procesos CNSC 2026</p>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {examComponents.map((item, i) => (
                            <div key={i} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-slate-100 transition-colors duration-300">
                                <div className="text-4xl font-black text-blue-600 mb-2">{item.pct}</div>
                                <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 ${item.type === 'Eliminatorio' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {item.type}
                                </span>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg relative z-10">
                    <Info className="w-10 h-10" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-blue-900 mb-2">Metodología de Juicio Situacional</h4>
                    <p className="text-sm text-blue-800 leading-relaxed opacity-80 max-w-2xl">
                        Las preguntas ya no son de memoria. Se estructuran en <span className="font-bold">Caso - Enunciado - Opciones</span>. Cada ítem presenta una situación laboral real con tres opciones de respuesta, donde solo una es legalmente sólida y eficiente.
                    </p>
                </div>
                {/* Decorative circle */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-200 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl opacity-50"></div>
            </div>
        </div>
    );
};

export default Structure;
