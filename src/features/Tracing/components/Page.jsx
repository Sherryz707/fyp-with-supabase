import React, { useState, useEffect } from "react";
import HandColouringCanvas from "./ColouringCanvas";

import Confetti from "react-confetti";
import Experience from "../../../components/Experience";

const DrawingExp = ({ setCompleted, setPoints, points, json }) => {
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [anim, setAnim] = useState();
  const [data, setData] = useState({ images: [], model: "" });

  // Fetch data from tracing.json
  useEffect(() => {
    setData(json);
  }, [json]);

  // Show the Next button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 60000); // Show button after 1 minute

    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    setShowDrawingCanvas(true);
    setShowConfetti(true);
    setAnim("correct");
    setTimeout(() => {
      setShowConfetti(false);
      setAnim("");
    }, 6000); // Stop confetti after 6 seconds
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 h-screen w-screen p-3">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/Circle-Cross-Triangle_Blue-1.mp4"
        autoPlay
        loop
        muted
      />
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Left Section: Drawing */}
      <div className="bg-white rounded-3xl shadow-lg p-6 w-1/2 mb-6 z-20">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          {showDrawingCanvas ? "Colour the Letter 'A'" : "Colour the Sign 'A'"}
        </h2>
        <div className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center">
          {data.images.length > 0 && (
            <HandColouringCanvas
              imageUrl={
                showDrawingCanvas ? data.images[1].src : data.images[0].src
              }
              key={showDrawingCanvas ? "letter" : "sign"}
            />
          )}
        </div>
        {/* Next Button */}
        {showNextButton && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleNextClick}
          >
            {showDrawingCanvas ? "Finish" : "Next"}
          </button>
        )}
      </div>

      {/* Right Section: Experience Model */}
      <div className="w-[45%] flex justify-start items-center">
        {data.model && <Experience model={data.model} selectedAnswer={anim} />}
      </div>
    </div>
  );
};

export default DrawingExp;
