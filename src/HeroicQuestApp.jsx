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

const levels = [
    { name: "Bosque del Inicio", background: "/assets/fondo_camino.png" },
    { name: "Montañas del Desafío", background: "/assets/fondo_bosque.png" },
    { name: "Castillo del Honor", background: "/assets/fondo_castillo.png" },
    { name: "Salón de los Héroes", background: "/assets/fondo_salon.png" }
];

export default function HeroicQuestApp() {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [points, setPoints] = useState({ player1: 0, player2: 0 });
    const [rewards, setRewards] = useState({ player1: [], player2: [] });
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        if (player1.trim() === "" || player2.trim() === "") {
            alert("Ambos jugadores deben ingresar su nombre.");
            return;
        }
        setGameStarted(true);
    };

    const handleAnswer = (answer) => {
        const challenge = challenges[currentChallenge];
        const current = currentPlayer;

        if (answer === challenge.correct) {
            setPoints({ ...points, [current]: points[current] + challenge.points });
            setRewards({
                ...rewards,
                [current]: [...rewards[current], challenge.reward]
            });
        }

        if (currentPlayer === "player1") {
            setCurrentPlayer("player2");
        } else {
            if (currentChallenge < challenges.length - 1) {
                setCurrentChallenge(currentChallenge + 1);
                setCurrentPlayer("player1");
            } else {
                showFinalRanking();
            }
        }
    };

    const showFinalRanking = () => {
        const rank = (points) => points >= 40 ? "🏅 Caballero Legendario" : points >= 25 ? "⚔️ Guerrero Valiente" : "🛡️ Explorador Novato";
        alert(`¡Duelo Finalizado!

${player1}: ${points.player1} puntos - ${rank(points.player1)}
Recompensas: ${rewards.player1.join(", ")}

${player2}: ${points.player2} puntos - ${rank(points.player2)}
Recompensas: ${rewards.player2.join(", ")}

Creado por: Iván Badilla Alfaro`);
    };

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 space-y-4">
                <h1 className="text-4xl font-bold">⚔️ Ruta Épica - Duelo Épico</h1>
                <p className="text-sm italic">Creado por Iván Badilla Alfaro</p>
                <input
                    className="p-2 rounded-lg text-black"
                    placeholder="Nombre Jugador 1"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                />
                <input
                    className="p-2 rounded-lg text-black"
                    placeholder="Nombre Jugador 2"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                />
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                    onClick={handleStartGame}
                >
                    Comenzar Duelo
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
                ⚔️ Turno de: {currentPlayer === "player1" ? player1 : player2}
            </motion.h1>

            <motion.div
                className="p-6 bg-gray-800 rounded-lg shadow-xl text-center space-y-4 w-full max-w-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ backgroundImage: `url(${levels[currentChallenge].background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <h2 className="text-2xl font-semibold">{levels[currentChallenge].name}</h2>
                <h3 className="text-xl font-medium">{challenges[currentChallenge].question}</h3>

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
            </motion.div>
        </div>
    );
}
