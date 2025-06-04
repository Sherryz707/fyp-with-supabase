import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { predictSign } from "../../services/modelService";

const WebcamGame = ({
  lightChange,
  gameState,
  setGameState,
  answer,
  model,
}) => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  const isGameOver = gameState.attempts === 0;
  const answerStatus = gameState.answer; // 'correct' or 'wrong'

  // Convert dataURL to Blob
  const dataURLtoBlob = (dataUrl) => {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  };

  // Run prediction and update game state
  const handleImage = async (imageBlob) => {
    if (isDisabled || loading) return;
    setLoading(true);
    setDisabled(true);
    setPreviewImage(null);
    setGameState((prev) => ({ ...prev, answer: null }));

    try {
      const topLabel = await predictSign(model, imageBlob);

      const isCorrect = topLabel.toLowerCase() === answer.toLowerCase();

      if (isCorrect) {
        lightChange();
      }

      setGameState((prevState) => ({
        ...prevState,
        answer: isCorrect ? "correct" : "wrong",
        attempts: isCorrect ? prevState.attempts : prevState.attempts - 1,
        count: isCorrect ? prevState.count + 1 : prevState.count,
      }));
    } catch (error) {
      console.error("Prediction error:", error);
      setGameState((prev) => ({ ...prev, answer: null }));
    } finally {
      setLoading(false);

      // Reset answer feedback and enable after delay
      setTimeout(() => {
        setGameState((prev) => ({ ...prev, answer: null }));
        setDisabled(false);
      }, 1500);
    }
  };

  // Capture image from webcam and trigger prediction
  const capture = () => {
    if (webcamRef.current) {
      const dataUrl = webcamRef.current.getScreenshot();
      if (!dataUrl) return;
      const blob = dataURLtoBlob(dataUrl);
      setPreviewImage(dataUrl);
      handleImage(blob);
    }
  };

  // Handle file upload and trigger prediction
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      handleImage(file);
    }
  };

  // Restart the game
  const handleRestart = () => {
    setGameState({
      answer: null,
      count: 0,
      attempts: 3,
    });
    setDisabled(false);
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative gap-6">
      {/* Webcam + preview + feedback overlay */}
      <h1>WTH</h1>
      <div className="relative w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center border-4 border-black shadow-lg">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Captured or uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full rounded-lg object-cover"
            videoConstraints={{ facingMode: "user" }}
          />
        )}

        {answerStatus && (
          <div
            className={`absolute inset-0 flex items-center justify-center text-5xl font-extrabold border-4 rounded-lg 
            ${
              answerStatus === "correct"
                ? "bg-green-400 bg-opacity-60 text-white border-green-600"
                : "bg-red-400 bg-opacity-60 text-white border-red-600"
            }`}
          >
            {answerStatus === "correct" ? "Correct!" : "Wrong!"}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg select-none">
            <p className="text-3xl font-bold text-yellow-600 animate-pulse">
              ⏳ Processing...
            </p>
          </div>
        )}

        {!answerStatus && !loading && (
          <p className="absolute bottom-2 right-2 text-gray-400 text-sm select-none">
            [ Webcam Screen ]
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isGameOver && (
          <>
            <button
              onClick={capture}
              disabled={loading || isDisabled}
              className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 transition-all
              ${
                loading || isDisabled
                  ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                  : "bg-blue-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
              }`}
            >
              📸 Capture
            </button>

            <label
              htmlFor="file-upload"
              className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 cursor-pointer transition-all
              ${
                loading || isDisabled
                  ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                  : "bg-purple-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
              }`}
            >
              📁 Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              disabled={loading || isDisabled}
              onChange={handleUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Status Display */}
      {!isGameOver && (
        <p className="text-gray-400 mt-2">
          Correct: {gameState.count}/3 | Attempts Left: {gameState.attempts}
        </p>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white rounded-lg">
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

export default WebcamGame;
