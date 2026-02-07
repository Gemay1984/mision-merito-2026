import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, PlayCircle, CheckCircle, XCircle, RefreshCw, ArrowRight, Trophy, History, User, Clock, Volume2, VolumeX, ListOrdered, Trash2 } from 'lucide-react';
import { mockQuiz } from '../data/mockData';

// --- ROBUST AUDIO ASSETS (Base64) ---
// Short "Success" Chime (Arcade Style)
const SOUND_SUCCESS_B64 = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbqWEyM2Cw0NupYTIzYLHQ26lhMjNgsdDbqWEyM2Cw0NupYTIzYLHQ26lhMjNgsdDbqWEyM2Cw0NupYTIzYLHQ26lhMjNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
// Short "Error" Buzz
const SOUND_ERROR_B64 = "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAAAAP//////////////////////////////////////////////////";

// We use these hosted files as PRIMARY, allow browser to cache them.
// If they fail, we could fallback, but for now let's use reliable open URLs or keep it simple.
// Actually, to GUARANTEE sound, we will use the user's interaction to trigger a silent play first.

interface LeaderboardEntry {
    name: string;
    score: number;
    time: string;
    date: string;
}

const Simulations: React.FC = () => {
    // --- State ---
    const [userName, setUserName] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null); // New: Countdown state

    // Quiz State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Timer State
    const [seconds, setSeconds] = useState(0);
    const [isActiveTimer, setIsActiveTimer] = useState(false);

    // Settings & Data
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    const timerRef = useRef<number | null>(null);
    const audioSuccessRef = useRef<HTMLAudioElement | null>(null);
    const audioErrorRef = useRef<HTMLAudioElement | null>(null);

    // --- Effects ---

    useEffect(() => {
        // Initialize Audio
        audioSuccessRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        audioErrorRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');

        // Preload
        audioSuccessRef.current.load();
        audioErrorRef.current.load();

        // Load Leaderboard
        const savedLeaderboard = localStorage.getItem('mm_leaderboard');
        if (savedLeaderboard) {
            setLeaderboard(JSON.parse(savedLeaderboard));
        }
    }, []);

    useEffect(() => {
        // Countdown Logic
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            // Start Game
            setCountdown(null);
            setIsStarted(true);
            setIsActiveTimer(true);
        }
    }, [countdown]);

    useEffect(() => {
        // Game Timer Logic
        if (isActiveTimer) {
            timerRef.current = window.setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActiveTimer]);

    // --- Helpers ---

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const playSound = (type: 'success' | 'error') => {
        if (!soundEnabled) return;
        const audio = type === 'success' ? audioSuccessRef.current : audioErrorRef.current;
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.5;
            audio.play().catch(e => console.warn("Audio play blocked", e));
        }
    };

    // --- Handlers ---

    const initCountdown = () => {
        if (!userName.trim()) {
            alert("Por favor ingresa tu nombre para iniciar.");
            return;
        }
        // Unlock audio context on user interaction
        if (audioSuccessRef.current) { audioSuccessRef.current.play().then(() => audioSuccessRef.current?.pause()).catch(() => { }); }

        setSeconds(0);
        setScore(0);
        setCurrentQuestion(0);
        setShowResult(false);
        setIsAnswered(false);
        setSelectedOption(null);
        setCountdown(3); // Start countdown
    };

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        const isCorrect = index === mockQuiz[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
            playSound('success');
        } else {
            playSound('error');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < mockQuiz.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setIsActiveTimer(false);
        setShowResult(true);

        // Correct logic to determine score including the current question if answered correctly
        const finalScore = isAnswered && selectedOption === mockQuiz[currentQuestion].correctAnswer
            ? score // Score state already updated via toggle? No.
            // Wait, setScore is async. If user clicks result, score state MIGHT not be updated if they clicked FAST. 
            // BUT, handleNextQuestion is triggered by a separate click. 
            // Scenario: User clicks Option (setScore +1) -> Re-render -> User clicks Next/Finish.
            // So Score IS updated.
            : score;

        // Note: if the LAST question was just answered, 'score' state reflects it because UI re-rendered to show "Ver Resultados".

        const newEntry: LeaderboardEntry = {
            name: userName,
            score: score, // Use current state
            time: formatTime(seconds),
            date: new Date().toLocaleDateString()
        };

        const updatedLeaderboard = [...leaderboard, newEntry]
            .sort((a, b) => b.score - a.score || a.time.localeCompare(b.time)) // Sort by score DESC, then time ASC
            .slice(0, 5); // Keep top 5

        setLeaderboard(updatedLeaderboard);
        localStorage.setItem('mm_leaderboard', JSON.stringify(updatedLeaderboard));
    };

    const resetQuiz = () => {
        setIsStarted(false);
        setUserName('');
        setIsActiveTimer(false);
        setCountdown(null);
    };

    const clearLeaderboard = () => {
        if (confirm("¿Borrar historial de puntajes?")) {
            setLeaderboard([]);
            localStorage.removeItem('mm_leaderboard');
        }
    };

    // --- Render ---

    if (countdown !== null) {
        return (
            <div className="flex items-center justify-center h-[60vh] animate-in zoom-in-95">
                <div className="text-center">
                    <div className="text-9xl font-black text-blue-600 mb-4 animate-ping">{countdown}</div>
                    <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Iniciando...</p>
                </div>
            </div>
        );
    }

    if (!isStarted) {
        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
                <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    <div className="w-24 h-24 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gamepad2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">Juicio Situacional</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                        Entrenamiento de alta intensidad. Analiza casos reales, toma decisiones bajo presión y mide tu velocidad.
                    </p>

                    <div className="max-w-xs mx-auto space-y-4">
                        <div className="text-left">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nombre del Aspirante</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Ingresa tu nombre..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={initCountdown}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 transition-transform active:scale-95"
                        >
                            <PlayCircle className="w-5 h-5" />
                            Iniciar Prueba
                        </button>
                    </div>

                    {/* Mini Leaderboard Preview */}
                    {leaderboard.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 text-left relative">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-yellow-500" /> Mejores Puntajes
                                </h4>
                                <button onClick={clearLeaderboard} className="text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {leaderboard.slice(0, 3).map((entry, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {i + 1}
                                            </span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{entry.name}</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="font-bold text-blue-600">{entry.score} pts</span>
                                            <span className="text-slate-400 font-mono text-xs">{entry.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (showResult) {
        const percentage = Math.round((score / mockQuiz.length) * 100);
        return (
            <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>

                    <div className="w-24 h-24 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Trophy className="w-12 h-12 text-yellow-500" />
                    </div>

                    <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{score} / {mockQuiz.length}</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">Puntaje Final</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-mono text-slate-500 dark:text-slate-300 mb-8">
                        <Clock className="w-3 h-3" /> Tiempo: {formatTime(seconds)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Efectividad</p>
                            <p className={`text-2xl font-black ${percentage >= 80 ? 'text-emerald-500' : 'text-blue-500'}`}>{percentage}%</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Rendimiento</p>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{percentage >= 80 ? 'Sobresaliente' : percentage >= 60 ? 'Satisfactorio' : 'Por mejorar'}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={resetQuiz}
                            className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            Menú Principal
                        </button>
                    </div>
                </div>

                {/* Full Leaderboard */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <ListOrdered className="w-5 h-5 text-blue-500" /> Ranking Global
                    </h3>
                    <div className="space-y-3">
                        {leaderboard.map((entry, i) => (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${entry.name === userName && entry.time === formatTime(seconds) && i < 1 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30' : 'bg-slate-50 dark:bg-slate-900'}`}>
                                <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-black ${i === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                                        {i + 1}
                                    </span>
                                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{entry.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-blue-600 text-sm">{entry.score} pts</p>
                                    <p className="font-mono text-[10px] text-slate-400">{entry.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Active Quiz View
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
            {/* Header Bar */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24 z-20">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-slate-400">Aspirante</p>
                        <p className="font-bold text-slate-800 dark:text-white leading-none">{userName}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-center hidden md:block">
                        <p className="text-[10px] uppercase font-black text-slate-400">Tiempo</p>
                        <p className="font-mono font-bold text-slate-800 dark:text-white text-lg leading-none tabular-nums">{formatTime(seconds)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase font-black text-slate-400">Puntaje</p>
                        <p className="font-bold text-blue-600 text-lg leading-none">{score}</p>
                    </div>
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                        {soundEnabled ? <Volume2 className="w-5 h-5 text-slate-400" /> : <VolumeX className="w-5 h-5 text-slate-300" />}
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 relative">
                <div className="absolute top-0 right-0 p-8 hidden md:block opacity-5">
                    <Gamepad2 className="w-64 h-64" />
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mb-8 overflow-hidden">
                    <div
                        className="bg-blue-600 h-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / mockQuiz.length) * 100}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="font-bold text-slate-400 text-sm">Caso {currentQuestion + 1} de {mockQuiz.length}</span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
                        {mockQuiz[currentQuestion].category}
                    </span>
                </div>

                {/* Case Context Box */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8 relative z-10">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contexto del Caso</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic">
                        "{mockQuiz[currentQuestion].caseContext}"
                    </p>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-snug relative z-10">
                    {mockQuiz[currentQuestion].text}
                </h3>

                <div className="space-y-4 relative z-10">
                    {mockQuiz[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswered}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group
                                ${!isAnswered
                                    ? 'border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                                    : ''}
                                ${isAnswered && index === mockQuiz[currentQuestion].correctAnswer
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-300'
                                    : ''}
                                ${isAnswered && index === selectedOption && index !== mockQuiz[currentQuestion].correctAnswer
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300'
                                    : ''}
                                ${isAnswered && index !== selectedOption && index !== mockQuiz[currentQuestion].correctAnswer
                                    ? 'border-slate-100 dark:border-slate-800 opacity-40'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'}
                            `}
                        >
                            <span className="text-base font-medium">{option}</span>
                            {isAnswered && index === mockQuiz[currentQuestion].correctAnswer && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                            {isAnswered && index === selectedOption && index !== mockQuiz[currentQuestion].correctAnswer && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                    ))}
                </div>

                {isAnswered && (
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 relative z-10">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-2xl mb-6 border border-emerald-100 dark:border-emerald-900/20">
                            <p className="font-black text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-widest mb-2">Retroalimentación</p>
                            <p className="text-emerald-900 dark:text-emerald-200">{mockQuiz[currentQuestion].explanation}</p>
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            className="w-full bg-blue-600 dark:bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 px-8 transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3"
                        >
                            {currentQuestion < mockQuiz.length - 1 ? 'Siguiente Caso' : 'Finalizar Prueba'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Simulations;
