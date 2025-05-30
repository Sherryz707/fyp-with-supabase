import React, { useEffect, useState, useCallback, useMemo } from "react";
import Experience from "../../components/Experience";
import Confetti from "react-confetti";

const QuizCard = ({ onComplete, points, json }) => {
  const [level, setLevel] = useState(1);
  const [pics, setPics] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizData] = useState(json); // Directly use the prop

  // Memoized calculations
  const { TOTAL_POINTS, LEVELS, POINTS_PER_LEVEL } = useMemo(
    () => ({
      TOTAL_POINTS: points,
      LEVELS: quizData?.levels || 1,
      POINTS_PER_LEVEL: points / (quizData?.levels || 1),
    }),
    [points, quizData]
  );

  // Initialize quiz
  useEffect(() => {
    if (json) {
      setPics(getNewLevelImages(json.images));
    }
  }, [json]);

  // Optimized shuffle function
  const shuffleArray = useCallback((array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  const getNewLevelImages = useCallback(
    (images) => {
      const shuffled = shuffleArray(images);
      const correct = shuffled.find((img) => img.label === "correct");
      const wrongs = shuffled
        .filter((img) => img.label === "wrong")
        .slice(0, 5);
      return shuffleArray([correct, ...wrongs]);
    },
    [shuffleArray]
  );

  const onAnswerHandle = useCallback(
    (selectedPic) => {
      setSelectedAnswer(selectedPic.label);
      const isCorrect = selectedPic.label === "correct";
      const pointsToAdd = isCorrect ? POINTS_PER_LEVEL : 0;

      if (isCorrect) {
        setScore((prev) => prev + pointsToAdd);
      }

      const timer = setTimeout(() => {
        if (level < LEVELS) {
          setLevel((prev) => prev + 1);
          setSelectedAnswer(null);
          setPics(getNewLevelImages(quizData.images));
        } else {
          const finalScore = score + (isCorrect ? POINTS_PER_LEVEL : 0);
          onComplete(Math.round(finalScore));
        }
      }, 1500);

      return () => clearTimeout(timer);
    },
    [
      LEVELS,
      POINTS_PER_LEVEL,
      getNewLevelImages,
      level,
      onComplete,
      quizData,
      score,
    ]
  );

  if (!quizData)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // Progress calculation
  const progressPercentage = ((level - 1) / (LEVELS - 1)) * 100;

  return (
    <div className="h-screen w-screen overflow-hidden p-10">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/models/Sherryz707/Storage/main/Circle-Cross-Triangle_Blue-1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative h-full w-full flex">
        {selectedAnswer === "correct" && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}

        <div className="w-1/2 flex justify-center items-center z-20 flex-col">
          <div className="w-3/4 text-center mt-6 mb-3">
            <div className="text-xl font-semibold text-gray-800">
              Score:{" "}
              <span className="text-green-600 font-bold">
                {Math.round(score)}
              </span>{" "}
              / {TOTAL_POINTS}
            </div>
            <div className="w-full bg-gray-300 rounded-full mt-2 h-4 relative">
              <div
                className="h-4 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Level {level} / {LEVELS}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {pics.map((el, i) => (
              <QuizImageCard
                key={`${el.src}-${i}`}
                el={el}
                selectedAnswer={selectedAnswer}
                onAnswerHandle={onAnswerHandle}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <Experience
            selectedAnswer={selectedAnswer}
            model={quizData.model}
            modelPosY={json?.modelPosY ?? null}
          />
        </div>
      </div>
    </div>
  );
};

// Extracted component
const QuizImageCard = React.memo(({ el, selectedAnswer, onAnswerHandle }) => (
  <div className="flex items-center justify-center">
    <div className="group relative h-96 w-64 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300">
      <img
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
        src={el.src}
        alt="Card"
        loading="lazy"
      />
      <button
        className="absolute bottom-0 w-full bg-white bg-opacity-80 py-2 text-center font-bold text-gray-800"
        onClick={() => onAnswerHandle(el)}
        disabled={!!selectedAnswer}
      >
        Answer
      </button>
      {selectedAnswer && <AnswerFeedback isCorrect={el.label === "correct"} />}
    </div>
  </div>
));

// Extracted component
const AnswerFeedback = React.memo(({ isCorrect }) => (
  <div
    className={`absolute inset-0 flex items-center justify-center ${
      isCorrect ? "bg-green-500 bg-opacity-80" : "bg-red-500 bg-opacity-80"
    }`}
  >
    <span
      className={`text-white text-9xl font-bold ${
        isCorrect ? "animate-bounce" : ""
      }`}
    >
      {isCorrect ? "✓" : "✗"}
    </span>
  </div>
));

export default React.memo(QuizCard);
