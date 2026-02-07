import React from 'react';
import { UserCircle, ArrowRightCircle, HelpCircle } from 'lucide-react';
import { simoSteps } from '../data/mockData';

const SimoGuide: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                        <UserCircle className="text-blue-600" /> Hoja de Vida en SIMO
                    </h3>
                    <div className="space-y-8 relative z-10">
                        {simoSteps.map((step, i) => (
                            <div key={i} className="flex gap-6 relative group">
                                {i < simoSteps.length - 1 && <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>}
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 z-10 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{step.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 group-hover:border-blue-100 transition-colors">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="bg-blue-600 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Tips</span>
                            ¿Cómo cargar documentos?
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="flex gap-3">
                                <ArrowRightCircle className="w-5 h-5 text-blue-400 shrink-0" />
                                <span><strong className="text-white">Certificados Laborales:</strong> Deben tener fecha de inicio, fin y funciones detalladas. Sin funciones, no hay experiencia relacionada.</span>
                            </li>
                            <li className="flex gap-3">
                                <ArrowRightCircle className="w-5 h-5 text-blue-400 shrink-0" />
                                <span><strong className="text-white">Formación Académica:</strong> Suba tanto el diploma como el acta de grado en un mismo PDF por cada título.</span>
                            </li>
                            <li className="flex gap-3">
                                <ArrowRightCircle className="w-5 h-5 text-blue-400 shrink-0" />
                                <span><strong className="text-white">Actualización:</strong> Recuerde que SIMO no permite subsanar documentos después de que se cierren las inscripciones.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center hover:shadow-lg transition-shadow duration-300">
                        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="font-bold text-slate-800">¿Dudas con la OPEC?</p>
                        <p className="text-xs text-slate-500 mt-2 mb-6">Utilice el Manual de Usuario oficial de la CNSC para procesos avanzados de pago PSE.</p>
                        <button className="px-6 py-2 bg-slate-100 rounded-full text-xs font-bold hover:bg-slate-200 hover:text-blue-700 transition-all">
                            Abrir Guía PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimoGuide;
