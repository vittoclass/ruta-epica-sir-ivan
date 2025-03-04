import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

const challenges = [
  { id: 1, question: "¿Cómo el honor y la lealtad presentes en el Cantar de Mio Cid pueden reflejarse en la defensa de los derechos humanos hoy?", points: 10 },
  { id: 2, question: "En la Odisea, Odiseo enfrenta sirenas que lo distraen. ¿Qué paralelo encuentras con las distracciones digitales actuales?", points: 10 },
  { id: 3, question: "Explica cómo el contexto de la Guerra de Troya ayuda a entender conflictos actuales entre naciones.", points: 15 },
];

const heroStages = [
  "Inicio del Viaje",
  "Navegando los Desafíos",
  "Enfrentando al Enemigo",
  "Sir Iván Consagrado"
];

const heroImages = [
  "/assets/sir_ivan_novato.png",
  "/assets/sir_ivan_explorador.png",
  "/assets/sir_ivan_guerrero.png",
  "/assets/sir_ivan_leyenda.png"
];

const weapons = [
  "🛡️ Escudo de Madera",
  "⚔️ Espada de Hierro",
  "🗡️ Espada de Acero Forjado",
  "👑 Espada Real y Escudo Sagrado"
];

export default function HeroicQuestApp() {
  const [gameCode, setGameCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [points, setPoints] = useState(0);

  const handleGenerateQR = () => {
    if (gameCode.trim()) setGeneratedCode(gameCode);
  };

  const startGame = () => {
    setIsPlaying(true);
    setCurrentChallenge(0);
    setPoints(0);
  };

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      alert(`¡Felicidades, Sir Iván! Completaste la ruta épica con ${points} puntos.`);
      setIsPlaying(false);
    }
  };

  const handleEarnPoints = () => {
    setPoints(points + challenges[currentChallenge].points);
    handleNextChallenge();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 bg-gradient-to-b from-gray-800 to-black min-h-screen text-white">
      <motion.h1 className="text-4xl font-extrabold" animate={{ scale: 1.1 }}>
        🏰 Ruta Épica - Viaje de Sir Iván ⚔️
      </motion.h1>
      <p className="text-lg font-medium">Bienvenido, Sir Iván Badilla Alfaro</p>

      {!isPlaying ? (
        <div className="p-6 w-full max-w-md border rounded-lg shadow-xl bg-gray-900">
          <input
            className="border p-3 w-full rounded-lg bg-gray-700 text-white"
            placeholder="Ingresa el código de tu misión"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
          />
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full" onClick={handleGenerateQR}>
            Generar Código QR
          </button>
          {generatedCode && (
            <div className="flex flex-col items-center mt-4">
              <QRCodeCanvas value={generatedCode} size={150} />
              <p className="mt-2 text-sm">Escanea para acceder a la misión</p>
            </div>
          )}
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full" onClick={startGame}>
            Iniciar Viaje del Héroe
          </button>
        </div>
      ) : (
        <motion.div className="p-6 w-full max-w-2xl border rounded-xl shadow-2xl bg-gray-900 text-center relative overflow-hidden" animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-2">{heroStages[currentChallenge]}</h2>
          <motion.img
            src={heroImages[currentChallenge]}
            alt={`Evolución de Sir Iván - Etapa ${currentChallenge + 1}`}
            className="mx-auto my-4 rounded-lg border-4 border-yellow-500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p className="text-lg font-semibold">Arma obtenida: {weapons[currentChallenge]}</p>

          <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mt-4">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentChallenge + 1) / challenges.length * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs mt-1">Progreso: {currentChallenge + 1}/{challenges.length}</p>

          <p className="mt-6 text-lg italic">{challenges[currentChallenge].question}</p>

          <textarea
            className="w-full mt-4 p-3 border rounded-lg bg-gray-800 text-white"
            placeholder="Escribe tu reflexión aquí..."
            rows={4}
          ></textarea>

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full"
            onClick={handleEarnPoints}
          >
            Enviar y Continuar
          </button>

          <p className="mt-4 font-bold">Puntos Totales: {points}</p>
        </motion.div>
      )}
    </div>
  );
}
