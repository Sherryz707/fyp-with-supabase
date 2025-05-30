import { useState, useEffect } from "react";

const WebcamPlaceholder = ({ lightChange, gameState, setGameState }) => {
  const [isDisabled, setDisabled] = useState(false);
  const isGameOver = gameState.attempts === 0;
  const answerStatus = gameState.answer; // 'correct' or 'wrong'

  const handleAnswerCheck = () => {
    if (isGameOver || isDisabled) return;

    setDisabled(true); // Disable button immediately

    const isCorrect = Math.random() > 0.5; // Simulating answer check

    if (isCorrect) {
      lightChange();
    }

    setGameState((prevState) => ({
      ...prevState,
      answer: isCorrect ? "correct" : "wrong",
      attempts: isCorrect ? prevState.attempts : prevState.attempts - 1,
      count: isCorrect ? prevState.count + 1 : prevState.count,
    }));
  };

  // Clear answer status after 1.5 seconds and re-enable button
  useEffect(() => {
    if (gameState.answer) {
      const timer = setTimeout(() => {
        setGameState((prevState) => ({ ...prevState, answer: null }));
        setDisabled(false); // Re-enable the button
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.answer]);

  // Function to restart the game
  const handleRestart = () => {
    setGameState({
      answer: null,
      count: 0,
      attempts: 3,
    });
    setDisabled(false); // Re-enable button on restart
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      {/* Webcam Placeholder */}
      <div className="relative w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
        {answerStatus && (
          <div
            className={`absolute inset-0 ${
              answerStatus === "correct" ? "bg-green-400" : "bg-red-500"
            } bg-opacity-50 flex items-center justify-center text-3xl font-bold text-white`}
          >
            {answerStatus === "correct" ? "Correct!" : "Wrong!"}
          </div>
        )}
        <p className="text-gray-400">[ Webcam Screen Placeholder ]</p>
      </div>

      {/* Buttons */}
      {!isGameOver && (
        <button
          className={`mt-4 px-4 py-2 text-white font-semibold bg-blue-500 rounded-lg 
          ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handleAnswerCheck}
          disabled={isDisabled}
        >
          Check Answer
        </button>
      )}

      {/* Status Display */}
      {!isGameOver && (
        <p className="text-gray-400 mt-2">
          Correct: {gameState.count}/3 | Attempts Left: {gameState.attempts}
        </p>
      )}

      {/* Fullscreen Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            {gameState.count >= 3 ? "You Win!" : "Game Over"}
          </h1>
          <button
            className="px-6 py-3 text-xl font-semibold bg-red-500 rounded-lg hover:bg-red-600"
            onClick={handleRestart}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamPlaceholder;
