import { useState, useEffect } from "react";
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

const avatars = {
    caballero: "🛡️ Caballero",
    mago: "🧙‍♂️ Mago",
    arquero: "🏹 Arquero"
};

const narratorPhrases = [
    "¡Golpe crítico!", 
    "¡Combo demoledor!", 
    "¡Fatality educativo!", 
    "¡Perfecto!", 
    "¡Contraataque épico!", 
    "¡KO histórico!", 
    "¡El conocimiento es poder!", 
    "¡Sir Iván destroza a su rival con sabiduría antigua!", 
    "¡Ataque legendario directo al honor!"
];

export default function HeroicQuestApp() {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [avatar1, setAvatar1] = useState("caballero");
    const [avatar2, setAvatar2] = useState("caballero");
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [points, setPoints] = useState({ player1: 0, player2: 0 });
    const [health, setHealth] = useState({ player1: 100, player2: 100 });
    const [rewards, setRewards] = useState({ player1: [], player2: [] });
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [gameStarted, setGameStarted] = useState(false);
    const [timer, setTimer] = useState(15);
    const [shake, setShake] = useState({ player1: false, player2: false });
    const [narratorMessage, setNarratorMessage] = useState("");

    useEffect(() => {
        if (gameStarted) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        handleTimeout();
                        clearInterval(interval);
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameStarted, currentChallenge, currentPlayer]);

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
        const opponent = current === "player1" ? "player2" : "player1";

        if (answer === challenge.correct) {
            setPoints({ ...points, [current]: points[current] + challenge.points });
            setRewards({
                ...rewards,
                [current]: [...rewards[current], challenge.reward]
            });
            setHealth({ ...health, [opponent]: health[opponent] - 10 });
            setNarratorMessage(narratorPhrases[Math.floor(Math.random() * narratorPhrases.length)]);
        } else {
            setHealth({ ...health, [current]: health[current] - 5 });
            setShake({ ...shake, [current]: true });
            setTimeout(() => setShake({ ...shake, [current]: false }), 500);
            setNarratorMessage("¡Fallaste! El conocimiento es tu mejor arma.");
        }

        switchPlayerOrAdvance();
    };

    const handleTimeout = () => {
        setHealth({ ...health, [currentPlayer]: health[currentPlayer] - 10 });
        setShake({ ...shake, [currentPlayer]: true });
        setTimeout(() => setShake({ ...shake, [currentPlayer]: false }), 500);
        setNarratorMessage("¡Tiempo agotado! Piensa rápido, actúa fuerte.");
        switchPlayerOrAdvance();
    };

    const switchPlayerOrAdvance = () => {
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
        setTimer(15);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 space-y-4">
            <motion.h1 className="text-4xl font-bold">⚔️ Turno de: {avatars[currentPlayer === "player1" ? avatar1 : avatar2]} {currentPlayer === "player1" ? player1 : player2}</motion.h1>
            <motion.div animate={shake.player1 ? { x: [0, -5, 5, 0] } : {}} transition={{ duration: 0.2 }}>
                <p className="text-lg">❤️ {avatars[avatar1]} {player1}: {health.player1} HP</p>
            </motion.div>
            <motion.div animate={shake.player2 ? { x: [0, -5, 5, 0] } : {}} transition={{ duration: 0.2 }}>
                <p className="text-lg">❤️ {avatars[avatar2]} {player2}: {health.player2} HP</p>
            </motion.div>
            <p className="text-lg">⏳ Tiempo restante: {timer}s</p>
            <p className="text-yellow-400 text-lg font-bold">{narratorMessage}</p>
        </div>
    );
}
