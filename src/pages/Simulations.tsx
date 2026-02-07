import React, { useState } from 'react';
import { Gamepad2, PlayCircle, CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const mockQuiz: Question[] = [
    {
        id: 1,
        text: "Un ciudadano solicita información sobre un proceso de contratación que aún está en etapa de borrador. Según la Ley 1712 de 2014, ¿cuál es la respuesta correcta?",
        options: [
            "Negar la información porque los borradores no son documentos públicos.",
            "Entregar la información, ya que la regla general es la publicidad de los documentos públicos.",
            "Solicitar al ciudadano que espere a que el proceso se publique en el SECOP."
        ],
        correctAnswer: 1,
        explanation: "La Ley 1712 de 2014 establece el principio de máxima publicidad. Los borradores son documentos públicos y deben ser accesibles salvo excepción legal expresa."
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
        explanation: "Talento Humano es el corazón del modelo MIPG (Dimensión 1), ya que es el activo más importante para el logro de los objetivos."
    },
    {
        id: 3,
        text: "¿Cuál es el término para responder un derecho de petición de documentos?",
        options: [
            "10 días hábiles.",
            "15 días hábiles.",
            "30 días hábiles."
        ],
        correctAnswer: 0,
        explanation: "Según la Ley 1755 de 2015, las peticiones de documentos deben resolverse dentro de los 10 días siguientes a su recepción."
    }
];

const Simulations: React.FC = () => {
    const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

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
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < mockQuiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    if (activeQuiz && !showResult) {
        return (
            <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pregunta {currentQuestion + 1} de {mockQuiz.length}</span>
                        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs">Simulacro Transversal</span>
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
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gamepad2 className="w-12 h-12 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2">Simulacro Finalizado</h2>
                    <p className="text-slate-500 mb-8">Has completado el entrenamiento de hoy.</p>

                    <div className="text-5xl font-black text-blue-600 mb-2">{score} / {mockQuiz.length}</div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Aciertos</p>

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
            <div className="p-10 text-center bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
                <Gamepad2 className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                <h3 className="text-3xl font-black text-slate-800 mb-4">Laboratorio de Práctica</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
                    Accede a nuestros simulacros interactivos diseñados bajo la metodología de Juicio Situacional. Pon a prueba tus conocimientos en tiempo real.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="p-6 border-2 border-blue-600 bg-blue-50 rounded-2xl text-left cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group" onClick={handleStartQuiz}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Gamepad2 className="w-24 h-24" />
                        </div>
                        <h4 className="font-bold text-blue-900 text-lg mb-1">Simulacro Transversal</h4>
                        <p className="text-blue-700 text-xs mb-4">3 Preguntas • Fundamentos</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                            <PlayCircle className="w-4 h-4" /> Iniciar Ahora
                        </button>
                    </div>

                    <div className="p-6 border border-slate-200 bg-white rounded-2xl text-left relative overflow-hidden opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <div className="absolute top-2 right-2 bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase text-slate-400">Próximamente</div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">Competencias Comportamentales</h4>
                        <p className="text-slate-500 text-xs mb-4">20 Preguntas • Nivel Profesional</p>
                        <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-not-allowed">
                            <PlayCircle className="w-4 h-4" /> Bloqueado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulations;
