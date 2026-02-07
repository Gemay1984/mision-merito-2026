import React from 'react';
import { FileText, Download, Lock, ExternalLink, Globe } from 'lucide-react';

const Documents: React.FC = () => {
    const documents = [
        { title: "Guía de Orientación al Aspirante 2026", type: "PDF", size: "2.4 MB", locked: false },
        { title: "Constitución Política de Colombia (Actualizada)", type: "PDF", size: "5.1 MB", locked: false },
        { title: "Manual de Funciones (Decreto 815 de 2018)", type: "PDF", size: "1.8 MB", locked: false },
        { title: "Ley 909 de 2004 - Empleo Público", type: "PDF", size: "1.2 MB", locked: true },
        { title: "Modelo Integrado de Planeación y Gestión (MIPG)", type: "PDF", size: "8.5 MB", locked: true },
        { title: "Código de Integridad del Servicio Público", type: "PDF", size: "0.9 MB", locked: true },
        { title: "Estatuto Anticorrupción (Ley 1474)", type: "PDF", size: "1.5 MB", locked: true },
    ];

    const links = [
        { title: "SIMO - Sistema de Apoyo", url: "https://simo.cnsc.gov.co/", desc: "Inscripciones y cargue de documentos" },
        { title: "Comisión Nacional del Servicio Civil", url: "https://www.cnsc.gov.co/", desc: "Página oficial de convocatorias" },
        { title: "Función Pública", url: "https://www.funcionpublica.gov.co/", desc: "Normatividad y gestores públicos" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Biblioteca Documental</h2>
                    <p className="text-slate-500 mt-1">Recursos oficiales y normatividad actualizada.</p>
                </div>
            </div>

            {/* External Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between hover:bg-blue-900 transition-colors group shadow-lg shadow-slate-200"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Globe className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg leading-tight">{link.title}</h4>
                            <p className="text-xs text-slate-400 mt-2">{link.desc}</p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Documents Grid */}
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Descargas PDF</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-center justify-between group transition-all duration-300 ${doc.locked ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${doc.locked ? 'bg-slate-200 text-slate-400' : 'bg-red-50 text-red-500'}`}>
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className={`font-bold text-sm ${doc.locked ? 'text-slate-500' : 'text-slate-800'}`}>{doc.title}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.type} • {doc.size}</p>
                            </div>
                        </div>

                        <button
                            disabled={doc.locked}
                            className={`p-2 rounded-lg transition-colors ${doc.locked ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                        >
                            {doc.locked ? <Lock className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start mt-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                    <Lock className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">Contenido Protegido</h4>
                    <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                        Algunos documentos son exclusivos para miembros del Grupo de Estudio. Se desbloquearán automáticamente según el cronograma de sesiones.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Documents;
