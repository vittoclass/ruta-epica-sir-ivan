import { useState } from "react";
import { motion } from "framer-motion";

const challenges = [
    { 
        question: "¿Cómo el honor y la lealtad presentes en el Cantar de Mio Cid pueden reflejarse en los derechos humanos hoy?", 
        options: ["Defender la dignidad", "Ignorar conflictos", "Proteger solo a amigos"], 
        correct: "Defender la dignidad", 
        points: 10,
        reward: "🪙 10 Monedas de Honor"
    },
    { 
        question: "¿Qué simbolizan las sirenas en la Odisea respecto a las distracciones digitales?", 
        options: ["El exceso de notificaciones", "El buen uso de la tecnología", "La navegación segura"], 
        correct: "El exceso de notificaciones", 
        points: 15,
        reward: "⚔️ Espada de Explorador"
    },
    { 
        question: "¿Qué podemos aprender de la Guerra de Troya sobre los conflictos actuales?", 
        options: ["La importancia de las alianzas", "El uso de redes sociales", "La paz inmediata"], 
        correct: "La importancia de las alianzas", 
        points: 20,
        reward: "🏅 Título: Guerrero Estratega"
    }
];

export default function HeroicQuestApp() {
    const [playerName, setPlayerName] = useState("");
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [points, setPoints] = useState(0);
    const [rewards, setRewards] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        if (playerName.trim() === "") {
            alert("Por favor, ingresa tu nombre antes de comenzar.");
            return;
        }
        setGameStarted(true);
    };

    const handleAnswer = (answer) => {
        const challenge = challenges[currentChallenge];

        if (answer === challenge.correct) {
            setPoints(points + challenge.points);
            setRewards([...rewards, challenge.reward]);
        }

        if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge(currentChallenge + 1);
        } else {
            showFinalRanking();
        }
    };

    const showFinalRanking = () => {
        const rank = points >= 40 ? "🏅 Caballero Legendario" : points >= 25 ? "⚔️ Guerrero Valiente" : "🛡️ Explorador Novato";
        alert(`¡Ruta completada, ${playerName}!
Puntaje: ${points} puntos
Título obtenido: ${rank}
Recompensas: ${rewards.join(", ")}

Creado por: Iván Badilla Alfaro`);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 space-y-4">
                <h1 className="text-4xl font-bold">⚔️ Ruta Épica</h1>
                <p className="text-sm italic">Creado por Iván Badilla Alfaro</p>
                <input
                    className="p-2 rounded-lg text-black"
                    placeholder="Ingresa tu nombre"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                    onClick={handleStartGame}
                >
                    Comenzar Aventura
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 space-y-4">
            <motion.h1 
                className="text-4xl font-bold"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                ⚔️ Ruta Épica de {playerName}
            </motion.h1>

            <motion.div 
                className="p-6 bg-gray-800 rounded-lg shadow-xl text-center space-y-4 w-full max-w-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-semibold">{challenges[currentChallenge].question}</h2>

                <div className="flex flex-col space-y-2">
                    {challenges[currentChallenge].options.map((option) => (
                        <motion.button
                            key={option}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </motion.button>
                    ))}
                </div>

                <motion.div 
                    className="h-3 w-full bg-gray-600 rounded-full mt-4 overflow-hidden"
                >
                    <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>

                <p className="mt-2 text-sm">Progreso: {currentChallenge + 1}/{challenges.length}</p>
                <p className="mt-2 font-semibold">Puntos: {points}</p>

                <ul className="text-left list-disc list-inside mt-4">
                    {rewards.map((reward, index) => (
                        <li key={index} className