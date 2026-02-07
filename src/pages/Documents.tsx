import React from 'react';
import { FileText, Download, Lock, ExternalLink, Globe, Book, Scale, Users, Shield, Archive } from 'lucide-react';

const Documents: React.FC = () => {
    const categories = [
        {
            title: "Normativa Fundamental",
            icon: <Scale className="w-6 h-6 text-blue-600" />,
            docs: [
                { title: "Constitución Política de Colombia (1991)", type: "PDF", size: "5.1 MB", locked: false, code: "CPC" },
                { title: "Ley 909 de 2004 (Carrera Administrativa)", type: "PDF", size: "1.2 MB", locked: false, code: "L909" },
                { title: "Decreto 1083 de 2015 (Único Reglamentario)", type: "PDF", size: "9.5 MB", locked: true, code: "D1083" },
                { title: "Ley 1952 de 2019 (Código Disciplinario)", type: "PDF", size: "3.2 MB", locked: true, code: "L1952" }
            ]
        },
        {
            title: "Modelo Integrado (MIPG)",
            icon: <Users className="w-6 h-6 text-purple-600" />,
            docs: [
                { title: "Manual Operativo MIPG (Versión 5)", type: "PDF", size: "12.4 MB", locked: true, code: "MIPG" },
                { title: "Dimensión 1: Talento Humano", type: "PDF", size: "2.1 MB", locked: true, code: "MIPG-D1" },
                { title: "Dimensión 7: Control Interno (MECI)", type: "PDF", size: "1.8 MB", locked: true, code: "MECI" },
                { title: "Código de Integridad del Servicio Público", type: "PDF", size: "0.9 MB", locked: false, code: "INT" }
            ]
        },
        {
            title: "Transparencia y Servicio",
            icon: <Shield className="w-6 h-6 text-emerald-600" />,
            docs: [
                { title: "Ley 1712 de 2014 (Transparencia)", type: "PDF", size: "1.1 MB", locked: true, code: "L1712" },
                { title: "Ley 1755 de 2015 (Derecho de Petición)", type: "PDF", size: "0.8 MB", locked: false, code: "L1755" },
                { title: "Protocolos de Atención al Ciudadano", type: "PDF", size: "4.5 MB", locked: true, code: "PAC" }
            ]
        },
        {
            title: "Gestión Administrativa",
            icon: <Archive className="w-6 h-6 text-orange-600" />,
            docs: [
                { title: "Ley 594 de 2000 (Ley General de Archivos)", type: "PDF", size: "1.3 MB", locked: true, code: "L594" },
                { title: "Ley 80 de 1993 (Contratación Estatal)", type: "PDF", size: "2.5 MB", locked: true, code: "L80" },
                { title: "Decreto 815 de 2018 (Competencias)", type: "PDF", size: "1.5 MB", locked: false, code: "D815" }
            ]
        }
    ];

    const links = [
        { title: "SIMO - Sistema de Apoyo", url: "https://simo.cnsc.gov.co/", desc: "Inscripciones y cargue de documentos" },
        { title: "Comisión Nacional del Servicio Civil", url: "https://www.cnsc.gov.co/", desc: "Página oficial de convocatorias" },
        { title: "Función Pública", url: "https://www.funcionpublica.gov.co/", desc: "Normatividad y gestores públicos" },
        { title: "SUIT - Trámites del Estado", url: "https://www.suit.gov.co/", desc: "Sistema Único de Información de Trámites" }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Biblioteca Normativa</h2>
                    <p className="text-slate-500 mt-2 text-lg">Repositorio digital para la excelencia pública.</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
                    <Book className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-blue-900 text-sm">38 Documentos Disponibles</span>
                </div>
            </div>

            {/* External Links Section */}
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ">Portales Oficiales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                                <Globe className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1 leading-tight">{link.title}</h4>
                        <p className="text-xs text-slate-500 mt-auto">{link.desc}</p>
                    </a>
                ))}
            </div>

            {/* Categories Grid */}
            <div className="space-y-8">
                {categories.map((cat, i) => (
                    <div key={i} className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{cat.title}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {cat.docs.map((doc, j) => (
                                <div key={j} className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${doc.locked ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-black text-xs border ${doc.locked ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {doc.locked ? <Lock className="w-5 h-5" /> : 'PDF'}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm ${doc.locked ? 'text-slate-500' : 'text-slate-800'}`}>{doc.title}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-2">
                                                <span>{doc.size}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                <span>{doc.code}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        disabled={doc.locked}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${doc.locked ? 'text-slate-300' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                    >
                                        {doc.locked ? <Lock className="w-4 h-4" /> : <Download className="w-5 h-5" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2rem] text-white shadow-xl mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="font-bold text-2xl mb-2">¿Necesitas material impreso?</h4>
                    <p className="text-blue-100 text-sm max-w-lg leading-relaxed">
                        Los miembros del Grupo de Estudio pueden solicitar el kit físico que incluye la Constitución Política comentada y el manual de Misión Mérito 2026.
                    </p>
                </div>
                <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-blue-50 transition-colors shadow-lg">
                    Solicitar Material
                </button>
            </div>
        </div>
    );
};

export default Documents;
