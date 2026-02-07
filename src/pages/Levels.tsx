import React from 'react';
import { Trophy } from 'lucide-react';
import { hierarchyLevels } from '../data/mockData';

const Levels: React.FC = () => {
    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Niveles Jerárquicos</h2>
                <p className="text-slate-500">Comprender su nivel es clave para enfocar el estudio.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {hierarchyLevels.map((lvl, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-shadow duration-300 group">
                        <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Trophy className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase">{lvl.level}</h3>
                        <p className="text-blue-600 font-bold text-sm mb-4">{lvl.role}</p>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed border-b border-slate-100 pb-6">{lvl.desc}</p>

                        <div className="mt-auto space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-400 uppercase mb-1">Tareas Clave</p>
                                <p className="text-xs text-slate-700 font-medium">{lvl.tasks}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-400 uppercase mb-1">Competencias</p>
                                <p className="text-xs text-slate-700 font-medium">{lvl.competencies}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Levels;
