import React, { useState, useEffect } from 'react';
import { Gamepad2, PlayCircle, CheckCircle, XCircle, RefreshCw, ArrowRight, Trophy, History } from 'lucide-react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: string;
}

const mockQuiz: Question[] = [
    {
        id: 1,
        text: "Un ciudadano solicita información sobre un proceso de contratación. Según la Ley 1712 de 2014, ¿cuál es la respuesta correcta?",
        options: [
            "Negar la información si está en etapa de borrador.",
            "Entregar la información bajo el principio de máxima publicidad.",
            "Solicitar al ciudadano que espere a la publicación en SECOP."
        ],
        correctAnswer: 1,
        explanation: "La Ley 1712 de 2014 establece que toda información en posesión del Estado se presume pública.",
        category: "Transparencia"
    },
    {
        id: 2,
        text: "En el modelo MIPG, ¿cuál es la dimensión que articula a todas las demás?",
        options: [
            "Gestión con Valores para Resultados.",
            "Información y Comunicación.",
            "Talento Humano."
        ],
        correctAnswer: 2,
        explanation: "Talento Humano es el corazón del modelo MIPG (Dimensión 1).",
        category: "MIPG"
    },
    {
        id: 3,
        text: "¿Cuál es el término general para responder un derecho de petición de documentos?",
        options: [
            "10 días hábiles.",
            "15 días hábiles.",
            "30 días hábiles."
        ],
        correctAnswer: 0,
        explanation: "Ley 1755 de 2015: Peticiones de documentos deben resolverse en 10 días.",
        category: "Atención al Ciudadano"
    },
    {
        id: 4,
        text: "¿Qué instrumento archivístico es indispensable para realizar transferencias documentales?",
        options: [
            "El Cuadro de Clasificación Documental.",
            "La Tabla de Retención Documental (TRD).",
            "El Inventario Único Documental."
        ],
        correctAnswer: 1,
        explanation: "Las TRD determinan los tiempos de retención y disposición final de los documentos.",
        category: "Gestión Documental"
    },
    {
        id: 5,
        text: "Según el Código de Integridad, ¿qué valor se asocia a 'Actúo con imparcialidad garantizando los derechos de las personas'?",
        options: [
            "Justicia.",
            "Respeto.",
            "Honestidad."
        ],
        correctAnswer: 0,
        explanation: "El valor de Justicia implica actuar con imparcialidad y equidad.",
        category: "Integridad"
    },
    // ... adding more questions to reach 20 ...
    {
        id: 6,
        text: "¿Quién es el responsable de implementar el Sistema de Control Interno en una entidad?",
        options: [
            "El Jefe de Control Interno.",
            "El Representante Legal.",
            "Todos los servidores públicos."
        ],
        correctAnswer: 1,
        explanation: "La responsabilidad principal recae en el Representante Legal, aunque todos participan.",
        category: "MECI"
    },
    {
        id: 7,
        text: "¿Qué tipo de nombramiento se utiliza para proveer un empleo de carrera administrativa mientras se surte el concurso?",
        options: [
            "Nombramiento Ordinario.",
            "Nombramiento en Provisionalidad.",
            "Nombramiento de Libre Nombramiento y Remoción."
        ],
        correctAnswer: 1,
        explanation: "La provisionalidad es temporal mientras se provee el cargo por mérito (Ley 909 de 2004).",
        category: "Empleo Público"
    },
    {
        id: 8,
        text: "En una entidad pública, ¿quién aprueba el Plan Anual de Adquisiciones?",
        options: [
            "El Comité de Contratación.",
            "El Ordenador del Gasto.",
            "El Representante Legal."
        ],
        correctAnswer: 0,
        explanation: "Generalmente lo aprueba el Comité de Contratación o quien haga sus veces, liderado por el ordenador del gasto.",
        category: "Contratación"
    },
    {
        id: 9,
        text: "¿Cuál es la vigencia mínima de una Tabla de Retención Documental antes de su actualización?",
        options: [
            "No tiene vigencia fija, se actualiza según cambios orgánicos.",
            "5 años.",
            "10 años."
        ],
        correctAnswer: 0,
        explanation: "Las TRD se actualizan cuando hay cambios en la estructura o funciones, no por tiempo fijo.",
        category: "Gestión Documental"
    },
    {
        id: 10,
        text: "¿Qué mecanismo protege el derecho fundamental a la salud cuando se ve vulnerado?",
        options: [
            "Acción de Grupo.",
            "Acción de Tutela.",
            "Habeas Corpus."
        ],
        correctAnswer: 1,
        explanation: "La Acción de Tutela protege derechos fundamentales inmediatos (Art. 86 CP).",
        category: "Constitución"
    },
    {
        id: 11,
        text: "¿Cuál es el fin esencial del Estado según el Artículo 2 de la Constitución?",
        options: [
            "Generar riqueza para las empresas.",
            "Servir a la comunidad y promover la prosperidad general.",
            "Mantener el orden público a toda costa."
        ],
        correctAnswer: 1,
        explanation: "Servir a la comunidad es el fin primordial.",
        category: "Constitución"
    },
    {
        id: 12,
        text: "¿Qué es el SECOP II?",
        options: [
            "Un sistema de nómina estatal.",
            "Una plataforma transaccional para la contratación pública.",
            "Un portal de empleo público."
        ],
        correctAnswer: 1,
        explanation: "SECOP II permite realizar el proceso de contratación en línea (transaccional).",
        category: "Contratación"
    },
    {
        id: 13,
        text: "En gestión documental, ¿qué es el 'Ciclo Vital del Documento'?",
        options: [
            "Su periodo de vigencia legal.",
            "Las etapas de Archivo de Gestión, Central e Histórico.",
            "El tiempo que dura el papel sin deteriorarse."
        ],
        correctAnswer: 1,
        explanation: "El ciclo vital comprende la producción, trámite, y las fases de archivo.",
        category: "Gestión Documental"
    },
    {
        id: 14,
        text: "¿Cuál es la conducta asociada a la competencia 'Orientación a Resultados'?",
        options: [
            "Cumplir el horario estrictamente.",
            "Realizar las funciones asignadas con calidad y oportunidad.",
            "Llevarse bien con los compañeros."
        ],
        correctAnswer: 1,
        explanation: "Orientación a resultados implica logro de metas con estándares de calidad.",
        category: "Comportamentales"
    },
    {
        id: 15,
        text: "¿Qué ley regula el Derecho de Petición en Colombia?",
        options: [
            "Ley 80 de 1993.",
            "Ley 1755 de 2015.",
            "Ley 1437 de 2011 (CPACA)."
        ],
        correctAnswer: 1,
        explanation: "La Ley 1755 de 2015 regula el derecho fundamental de petición.",
        category: "Atención al Ciudadano"
    },
    {
        id: 16,
        text: "Si un servidor público recibe una orden contraria a la Constitución, ¿qué debe hacer?",
        options: [
            "Cumplirla para evitar sanciones.",
            "No cumplirla y reportar la irregularidad (Objeción de conciencia).",
            "Delegarla a un subordinado."
        ],
        correctAnswer: 1,
        explanation: "La Constitución es norma de normas (Art. 4). El servidor no debe cumplir órdenes inconstitucionales.",
        category: "Constitución"
    },
    {
        id: 17,
        text: "¿Qué entidad vigila la conducta oficial de los servidores públicos?",
        options: [
            "Contraloría General.",
            "Procuraduría General.",
            "Fiscalía General."
        ],
        correctAnswer: 1,
        explanation: "La Procuraduría ejerce el control disciplinario.",
        category: "Estructura del Estado"
    },
    {
        id: 18,
        text: "En el nivel 'Asistencial', ¿cuál es el enfoque principal?",
        options: [
            "Diseño de políticas.",
            "Ejecución de procesos y soporte operativo.",
            "Coordinación de áreas."
        ],
        correctAnswer: 1,
        explanation: "El nivel asistencial se enfoca en la ejecución y apoyo operativo.",
        category: "Niveles"
    },
    {
        id: 19,
        text: "¿Qué es el FURAG?",
        options: [
            "Un fondo de pensiones.",
            "Formulario Único de Reporte de Avances de la Gestión.",
            "Un impuesto distrital."
        ],
        correctAnswer: 1,
        explanation: "Es el instrumento para medir el avance de MIPG.",
        category: "MIPG"
    },
    {
        id: 20,
        text: "¿Cuál es el principio que obliga a tratar a todos los ciudadanos igual ante la ley?",
        options: [
            "Principio de Igualdad.",
            "Principio de Celeridad.",
            "Principio de Economía."
        ],
        correctAnswer: 0,
        explanation: "Art. 13 de la Constitución: Derecho a la Igualdad.",
        category: "Constitución"
    }
];

const Simulations: React.FC = () => {
    const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [bestScore, setBestScore] = useState<number>(0);

    useEffect(() => {
        // Load best score from local storage
        const savedScore = localStorage.getItem('mm_best_score');
        if (savedScore) {
            setBestScore(parseInt(savedScore, 10));
        }
    }, []);

    const handleStartQuiz = () => {
        setActiveQuiz(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === mockQuiz[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < mockQuiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setShowResult(true);
        // Update best score if current is higher
        if (score > bestScore) { // Note: using score state here might be tricky due to closure, but since we updated it via setScore previously, let's trusting React batching or check logic. 
            // Actually score inside handleNextQuestion won't be updated immediately if called in same render cycle, but finishQuiz is called AFTER the last question. 
            // Wait, let's fix the logic. The score is incremented in handleOptionSelect.
            // But we need to check the FINAL score which includes the last question if correct.
            // Let's rely on an effect or calculation.
            // Better: check inside render or specific effect.
        }
    };

    // Effect to update best score when result is shown
    useEffect(() => {
        if (showResult) {
            const finalScore = score; // Current score state
            if (finalScore > bestScore) {
                setBestScore(finalScore);
                localStorage.setItem('mm_best_score', finalScore.toString());
            }
        }
    }, [showResult, score, bestScore]);

    if (activeQuiz && !showResult) {
        return (
            <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pregunta {currentQuestion + 1} de {mockQuiz.length}</span>
                        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs">{mockQuiz[currentQuestion].category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
                        {mockQuiz[currentQuestion].text}
                    </h3>

                    <div className="space-y-3">
                        {mockQuiz[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isAnswered}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                  ${!isAnswered && 'hover:border-blue-300 hover:bg-blue-50 border-slate-100'}
                  ${isAnswered && index === mockQuiz[currentQuestion].correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : ''}
                  ${isAnswered && index === selectedOption && index !== mockQuiz[currentQuestion].correctAnswer ? 'border-red-500 bg-red-50 text-red-900' : ''}
                  ${isAnswered && index !== selectedOption && index !== mockQuiz[currentQuestion].correctAnswer ? 'border-slate-100 opacity-50' : ''}
                `}
                            >
                                <span>{option}</span>
                                {isAnswered && index === mockQuiz[currentQuestion].correctAnswer && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                                {isAnswered && index === selectedOption && index !== mockQuiz[currentQuestion].correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                            </button>
                        ))}
                    </div>

                    {isAnswered && (
                        <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                            <div className="bg-slate-50 p-4 rounded-xl mb-6">
                                <p className="font-bold text-slate-700 text-sm mb-1">Explicación:</p>
                                <p className="text-sm text-slate-600">{mockQuiz[currentQuestion].explanation}</p>
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                            >
                                {currentQuestion < mockQuiz.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="max-w-xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
                    {score >= 12 && (
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                    )}
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className={`w-12 h-12 ${score >= 12 ? 'text-yellow-500' : 'text-blue-600'}`} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">
                        {score >= 12 ? '¡Excelente Trabajo!' : 'Simulacro Finalizado'}
                    </h2>
                    <p className="text-slate-500 mb-8">
                        {score >= 12 ? 'Has demostrado un gran dominio de los temas.' : 'Continúa repasando los temas fundamentales.'}
                    </p>

                    <div className="text-6xl font-black text-blue-600 mb-2">{score} / {mockQuiz.length}</div>
                    <div className="flex justify-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
                        <span>Aciertos</span>
                        <span>•</span>
                        <span>{Math.round((score / mockQuiz.length) * 100)}% Efectividad</span>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveQuiz(false)}
                            className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Volver al Menú
                        </button>
                        <button
                            onClick={handleStartQuiz}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Intentar de nuevo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-10 text-center bg-white rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-50 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-60"></div>

                <Gamepad2 className="w-20 h-20 text-slate-200 mx-auto mb-6 relative z-10" />
                <h3 className="text-3xl font-black text-slate-800 mb-4 relative z-10">Laboratorio de Práctica</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed relative z-10">
                    Entrenamiento intensivo con preguntas tipo juicio situacional.
                </p>

                {/* Score Board */}
                <div className="max-w-xs mx-auto bg-slate-50 rounded-2xl p-4 mb-8 flex items-center justify-center gap-3 border border-slate-100">
                    <History className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-black text-slate-400">Tu Mejor Puntaje</p>
                        <p className="text-lg font-bold text-slate-700">{bestScore} / {mockQuiz.length} Aciertos</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto relative z-10">
                    <div className="p-6 border-2 border-blue-600 bg-blue-50 rounded-2xl text-left cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group shadow-lg shadow-blue-100" onClick={handleStartQuiz}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Gamepad2 className="w-24 h-24 text-blue-900" />
                        </div>
                        <h4 className="font-bold text-blue-900 text-lg mb-1">Simulacro General</h4>
                        <p className="text-blue-700 text-xs mb-4">{mockQuiz.length} Preguntas • Aleatorio</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 group-hover:bg-blue-700 transition-colors">
                            <PlayCircle className="w-4 h-4" /> Iniciar Ahora
                        </button>
                    </div>

                    <div className="p-6 border border-slate-200 bg-white rounded-2xl text-left relative overflow-hidden opacity-60 grayscale cursor-not-allowed">
                        <div className="absolute top-2 right-2 bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase text-slate-400">Próximamente</div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">Nivel Profesional</h4>
                        <p className="text-slate-500 text-xs mb-4">Específico • Casos Gerencia</p>
                        <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                            <PlayCircle className="w-4 h-4" /> Bloqueado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulations;
