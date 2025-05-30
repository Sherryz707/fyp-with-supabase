import { Canvas } from "@react-three/fiber";
import { Model } from "./Sleep";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import WebcamPlaceholder from "./WebcamHolder";
import { motion } from "framer-motion";
// Enum for lighting states
const LightingState = {
  NIGHT: "night",
  DAWN: "dawn",
  COZY: "cozy",
  MORNING: "morning",
};

function Intro({ onComplete, points: maxPoints, json }) {
  console.log("json", json.model);
  const [lightingState, setLightingState] = useState(LightingState.NIGHT);
  const [gameState, setGameState] = useState({
    answer: null, // Store the current answer
    count: 0, // Number of correct answers
    attempts: 3, // Total attempts
    isGameOver: false,
  });
  // const maxPoints = 100;
  const [correctStreak, setCorrectStreak] = useState(0);
  const [lives, setLives] = useState(4);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  // Function to handle cycling through lighting states
  const handleClick = () => {
    if (lightingState === LightingState.NIGHT) {
      setLightingState(LightingState.DAWN);
    } else if (lightingState === LightingState.DAWN) {
      setLightingState(LightingState.COZY);
    } else if (lightingState === LightingState.COZY) {
      setLightingState(LightingState.MORNING);
    }
  };
  const handleAnswer = (type) => {
    console.log("handling answr");
    setFeedbackType(type);

    if (type === "correct") {
      setCorrectStreak((prevStreak) => {
        const updatedStreak = prevStreak + 1;
        console.log("score", Math.floor(maxPoints / 3));
        setScore((prevScore) => prevScore + Math.floor(maxPoints / 3));
        setCount((prev) => prev + 1);
        handleClick();

        if (updatedStreak >= 3) {
          console.log("won this");
          setGameWon(true);
        }

        setTimeout(() => setFeedbackType(null), 600);
        return updatedStreak;
      });
    } else if (type === "wrong") {
      setLives((prevLives) => {
        const newLives = prevLives - 1;

        if (newLives <= 0) {
          setDisable(true);
          setGameOver(true);
        }

        setTimeout(() => setFeedbackType(null), 600);
        return newLives;
      });
    }
  };
  useEffect(() => {
    if (gameOver || gameWon) {
      // Let the model reset for 2 seconds
      setCount(0);
      const timer = setTimeout(() => {
        // Fully reset all game state
        setLightingState(LightingState.NIGHT);
        setGameState({
          answer: null,
          count: 0,
          attempts: 3,
          isGameOver: false,
        });
        setCorrectStreak(0);
        setLives(4);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setFeedbackType(null);
        onComplete(score); // optionally notify parent
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameOver, gameWon]);

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex w-full px-6 justify-center">
        {/* Progress Bar Container (centered) */}
        <div className="w-full max-w-3xl flex-1 space-y-2">
          {/* Bar Container */}
          <div className="w-full h-8 bg-fuchsia-100 border-4 border-black rounded-full shadow-[3px_3px_0_rgba(0,0,0,1)] overflow-hidden">
            {/* Animated Bar Fill */}
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(correctStreak / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Label */}
          <div className="text-center text-xl font-extrabold text-pink-600 drop-shadow-[1px_1px_0_black]">
            {correctStreak} / 3 Correct
          </div>
        </div>
      </div>
      {/* Lives and Score Container (left-aligned) */}
      <div className="absolute top-4 left-0 z-30 flex items-center space-x-8 px-2 py-2 bg-fuchsia-100 border-4 border-black rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {/* Lives Display */}
        <div className="flex space-x-2 items-center">
          {Array.from({ length: lives }).map((_, i) => (
            <span
              key={i}
              className="text-xl text-red-500 drop-shadow-[1px_1px_0_black]"
            >
              ❤️
            </span>
          ))}
          {Array.from({ length: 4 - lives }).map((_, i) => (
            <span
              key={i + lives}
              className="text-xl text-gray-400 drop-shadow-[1px_1px_0_black]"
            >
              💀
            </span>
          ))}
        </div>

        {/* Score Display */}
        <div className="text-2xl font-extrabold text-pink-600 border-l-4 border-black pl-6 ml-4">
          Score: <span className="text-black">{score}</span>
        </div>
      </div>

      <Canvas>
        {/* Dynamic ambient light */}
        <ambientLight
          intensity={
            lightingState === LightingState.MORNING
              ? 0.8
              : lightingState === LightingState.COZY
                ? 0.4
                : lightingState === LightingState.DAWN
                  ? 0.3
                  : 0.2
          }
          color={
            lightingState === LightingState.MORNING
              ? "#f1e1a6"
              : lightingState === LightingState.COZY
                ? "#ffdab9"
                : lightingState === LightingState.DAWN
                  ? "#ffb27d"
                  : "#a2cce3"
          }
        />

        {/* Dynamic point light */}
        <pointLight
          position={[2, 3, -1]}
          intensity={
            lightingState === LightingState.MORNING
              ? 1.5
              : lightingState === LightingState.COZY
                ? 0.8
                : lightingState === LightingState.DAWN
                  ? 0.6
                  : 0.3
          }
          color={
            lightingState === LightingState.MORNING
              ? "#ffeb6b"
              : lightingState === LightingState.COZY
                ? "#ffd27f"
                : lightingState === LightingState.DAWN
                  ? "#ff9966"
                  : "#557aa3"
          }
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Dynamic directional light */}
        <directionalLight
          position={[-5, 10, 5]}
          intensity={
            lightingState === LightingState.MORNING
              ? 2
              : lightingState === LightingState.COZY
                ? 0.6
                : lightingState === LightingState.DAWN
                  ? 0.4
                  : 0.2
          }
          color={
            lightingState === LightingState.MORNING
              ? "#ffeb6b"
              : lightingState === LightingState.COZY
                ? "#ffcc88"
                : lightingState === LightingState.DAWN
                  ? "#ffb27d"
                  : "#223355"
          }
          castShadow
        />

        {/* Dynamic hemisphere light */}
        <hemisphereLight
          skyColor={
            lightingState === LightingState.MORNING
              ? "#a8c9f7"
              : lightingState === LightingState.COZY
                ? "#ffdab9"
                : lightingState === LightingState.DAWN
                  ? "#f4a86e"
                  : "#112244"
          }
          groundColor={
            lightingState === LightingState.MORNING
              ? "#f0d78f"
              : lightingState === LightingState.COZY
                ? "#cdb39e"
                : lightingState === LightingState.DAWN
                  ? "#d4876c"
                  : "#443322"
          }
          intensity={
            lightingState === LightingState.MORNING
              ? 0.6
              : lightingState === LightingState.COZY
                ? 0.3
                : lightingState === LightingState.DAWN
                  ? 0.25
                  : 0.2
          }
        />

        {/* Your 3D model */}
        <Model
          lightChange={handleClick}
          gameState={gameState}
          feedbackType={feedbackType}
          count={correctStreak}
          setDisable={setDisable}
          url={json.model}
          reset={gameOver || gameWon}
        />

        {/* Add orbit controls for interactive camera movement */}
        <OrbitControls />
      </Canvas>
      {/* Header UI */}
      <div className="absolute top-4 left-4 flex gap-2 text-4xl z-15">
        {Array.from({ length: gameState.attempts }, (_, i) => (
          <span key={i} className="text-red-500">
            ❤️
          </span>
        ))}
      </div>

      <div className="z-50 absolute w-[30rem] h-[27rem] z-15 right-24 top-1/2 transform -translate-y-1/2 flex items-center justify-end">
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {/* Webcam Placeholder */}
          <div className="relative w-full h-full bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {feedbackType && (
              <div className="absolute inset-0 bg-green-400 bg-opacity-60 flex items-center justify-center text-4xl font-extrabold text-pink-600 border-4 border-pink-600 rounded-xl">
                {feedbackType}
              </div>
            )}
            <p className="text-gray-700 font-semibold">
              [ Webcam Screen Placeholder ]
            </p>
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-6">
            <button
              onClick={() => handleAnswer("correct")}
              disabled={disable}
              className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 transition-all
                ${
                  disable
                    ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                    : "bg-green-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
                }`}
            >
              ✅ Correct!
            </button>

            <button
              onClick={() => handleAnswer("wrong")}
              disabled={disable}
              className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 transition-all
                ${
                  disable
                    ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                    : "bg-red-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
                }`}
            >
              ❌ Wrong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
