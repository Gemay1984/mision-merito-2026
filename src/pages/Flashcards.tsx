import React, { useState } from 'react';
import { RefreshCw, ArrowRight, ArrowLeft, Brain, Layers } from 'lucide-react';

interface Flashcard {
    id: number;
    term: string;
    definition: string;
    category: string;
}

const flashcardsData: Flashcard[] = [
    { id: 1, term: "Carrera Administrativa", definition: "Sistema técnico de administración de personal que busca garantizar la eficiencia de la administración pública y ofrecer estabilidad e igualdad de oportunidades para el acceso y el ascenso al servicio público.", category: "Ley 909" },
    { id: 2, term: "Mérito", definition: "Principio según el cual el acceso a la función pública, el ascenso y la permanencia en ella deben fundamentarse en la demostración de las calidades académicas, la experiencia y las competencias requeridas.", category: "Conceptos" },
    { id: 3, term: "Periodo de Prueba", definition: "Etapa inicial del empleo público de carrera administrativa, que tiene por objeto evaluar la capacidad, adaptación y competencia del empleado para el desempeño de las funciones del empleo.", category: "Procesos" },
    { id: 4, term: "Evaluación del Desempeño Laboral (EDL)", definition: "Herramienta de gestión que permite verificar, valorar y calificar el cumplimiento de las funciones y compromisos laborales de los servidores públicos.", category: "MIPG" },
    { id: 5, term: "Comisión Nacional del Servicio Civil (CNSC)", definition: "Entidad responsable de la administración y vigilancia de las carreras de los servidores públicos, excepción hecha de las que tengan carácter especial.", category: "Institucional" },
    { id: 6, term: "Habeas Data", definition: "Derecho fundamental que tienen todas las personas a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ellas en bancos de datos y en archivos de entidades públicas y privadas.", category: "Constitución" },
    { id: 7, term: "Acción de Tutela", definition: "Mecanismo de protección de los derechos fundamentales cuando estos resulten vulnerados o amenazados por la acción o la omisión de cualquier autoridad pública.", category: "Constitución" },
    { id: 8, term: "Derecho de Petición", definition: "Derecho fundamental que tiene toda persona para presentar peticiones respetuosas a las autoridades por motivos de interés general o particular y a obtener pronta resolución.", category: "Ciudadano" },
    { id: 9, term: "MIPG", definition: "Modelo Integrado de Planeación y Gestión. Marco de referencia para dirigir, planear, ejecutar, hacer seguimiento, evaluar y controlar la gestión de las entidades y organismos públicos.", category: "Gestión" },
    { id: 10, term: "MECI", definition: "Modelo Estándar de Control Interno. Proporciona una estructura para el control a la estrategia, la gestión y la evaluación en las entidades del Estado.", category: "Control" }
];

const Flashcards: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
        }, 200);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
        }, 200);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
                    <Brain className="w-8 h-8 text-purple-600" /> Repaso Rápido
                </h2>
                <p className="text-slate-500 dark:text-slate-400">Domina los conceptos clave con tarjetas de memoria.</p>
            </div>

            <div className="relative w-full max-w-2xl h-96 perspective-1000 group cursor-pointer" onClick={handleFlip}>
                <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700 p-10 flex flex-col items-center justify-center text-center">
                        <span className="absolute top-6 right-6 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {flashcardsData[currentIndex].category}
                        </span>
                        <Layers className="w-16 h-16 text-purple-200 mb-6" />
                        <h3 className="text-4xl font-black text-slate-800 dark:text-white">
                            {flashcardsData[currentIndex].term}
                        </h3>
                        <p className="mt-8 text-slate-400 text-sm font-bold uppercase tracking-widest animate-pulse">
                            Clic para ver definición
                        </p>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] shadow-xl p-10 flex flex-col items-center justify-center text-center rotate-y-180 text-white">
                        <h3 className="text-xl font-bold mb-4 opacity-80 border-b border-white/20 pb-2">
                            {flashcardsData[currentIndex].term}
                        </h3>
                        <p className="text-xl leading-relaxed font-medium">
                            {flashcardsData[currentIndex].definition}
                        </p>
                    </div>

                </div>
            </div>

            <div className="flex items-center gap-8 mt-8">
                <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="p-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition w-16 h-16 flex items-center justify-center"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </button>

                <span className="text-slate-400 font-bold tracking-widest text-sm">
                    {currentIndex + 1} / {flashcardsData.length}
                </span>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="p-4 rounded-full bg-blue-600 border border-blue-500 shadow-lg shadow-blue-200 hover:bg-blue-700 transition w-16 h-16 flex items-center justify-center"
                >
                    <ArrowRight className="w-6 h-6 text-white" />
                </button>
            </div>

        </div>
    );
};

export default Flashcards;
