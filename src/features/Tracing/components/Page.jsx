import React, { useState, useEffect, useMemo, useCallback } from "react";
const Confetti = React.lazy(() => import("react-confetti"));
import HandColouringCanvas from "./ColouringCanvas";
import Experience from "../../../components/Experience";

const DrawingExp = ({ onComplete, json, points }) => {
  // State optimizations
  const [state, setState] = useState({
    showDrawingCanvas: false,
    showNextButton: false,
    showConfetti: false,
    anim: undefined,
  });

  // Memoize data to prevent unnecessary re-renders
  const data = useMemo(
    () => ({ images: json?.images || [], model: json?.model || "" }),
    [json]
  );

  // Single useEffect for multiple timeouts
  useEffect(() => {
    const timers = [];

    timers.push(
      setTimeout(() => {
        setState((prev) => ({ ...prev, showNextButton: true }));
      }, 1000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Optimized event handler with useCallback
  const handleNextClick = useCallback(() => {
    if (state.showDrawingCanvas) {
      setState((prev) => ({ ...prev, showConfetti: true }));
      onComplete(points);
    } else {
      setState((prev) => ({
        ...prev,
        showDrawingCanvas: true,
        showConfetti: true,
        anim: "correct",
      }));

      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, showConfetti: false, anim: undefined }));
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [state.showDrawingCanvas, onComplete]);

  // Memoize canvas props
  const canvasProps = useMemo(
    () => ({
      imageUrl: state.showDrawingCanvas
        ? data.images[1]?.src
        : data.images[0]?.src,
      key: state.showDrawingCanvas ? "letter" : "sign",
    }),
    [state.showDrawingCanvas, data.images]
  );
  useEffect(() => {
    data.images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, [data.images]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 h-screen w-screen p-3">
      {/* Optimized video element */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/Circle-Cross-Triangle_Blue-1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {state.showConfetti && (
        <React.Suspense fallback={null}>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </React.Suspense>
      )}

      <div className="bg-white rounded-3xl shadow-lg p-6 w-1/2 mb-6 z-20">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          {state.showDrawingCanvas ? "Colour the Sign" : "Colour the Letter"}
        </h2>

        <div className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center">
          {data.images.length > 0 && (
            <HandColouringCanvas
              imageUrl={canvasProps.imageUrl}
              key={canvasProps.key}
            />
          )}
        </div>

        {state.showNextButton && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleNextClick}
          >
            {state.showDrawingCanvas ? "Finish" : "Next"}
          </button>
        )}
      </div>

      <div className="w-[45%] flex justify-start items-center">
        {data.model && (
          <Experience
            model={data.model}
            selectedAnswer={state.anim}
            modelPosY={json?.modelPosY ?? null}
          />
        )}
      </div>
    </div>
  );
};

export default DrawingExp;
