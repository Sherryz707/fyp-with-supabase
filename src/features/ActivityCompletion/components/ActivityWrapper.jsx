// // components/ActivityWrapper.js
// import React, { useState } from "react";
// import ActivityCompletion from "./ActivityCompletion";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";

// const ActivityWrapper = ({ ActivityComponent, activityType, ...props }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, saveUserProgress } = useAuth();
//   const { category } = useParams();
//   const { points, card, replay } = location.state;
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [pointsEarned, setPointsEarned] = useState(0);

//   const handleQuizComplete = (pointsEarn) => {
//     setIsCompleted(true);
//     setPointsEarned(pointsEarn);
//     // completeQuiz(card, pointsEarn, currentUser);
//     if (!replay) {
//       saveUserProgress(card, pointsEarn);
//     } else {
//       console.log("Replay mode: skipping progress update.");
//     }
//   };
//   const handleRestart = () => {
//     setIsCompleted(false);
//     setPointsEarned(0);
//   };

//   const handleNextActivity = () => {
//     console.log("activities: ", category);
//     // Implement your navigation logic here
//     navigate(`/${category}`);
//     console.log("Proceeding to next activity");
//   };

//   if (isCompleted) {
//     return (
//       <ActivityCompletion
//         activityType={activityType}
//         points={pointsEarned}
//         onRestart={handleRestart}
//         onNextActivity={handleNextActivity}
//       />
//     );
//   }

//   return (
//     <ActivityComponent
//       onComplete={handleQuizComplete}
//       {...props}
//       points={points}
//     />
//   );
// };

// export default ActivityWrapper;
const musicTracks = [
  "/sounds/bg_1.mp3",
  "/sounds/bg_2.mp3",
  "/sounds/bg_3.mp3",
  "/sounds/bg_4.mp3",
];
import React, { useState, useRef, useEffect } from "react";
import ActivityCompletion from "./ActivityCompletion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ActivityWrapper = ({ ActivityComponent, activityType, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, saveUserProgress } = useAuth();
  const { category } = useParams();
  const { points, card, replay } = location.state;
  const [isCompleted, setIsCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [started, setStarted] = useState(false);
  const musicRef = useRef(null);
  const endMusicRef = useRef(null);

  // Map activity types to video sources (put your own video paths here)
  const videoSrcMap = {
    colouring: "/videos/colouring_intro.mp4",
    quizCard: "/videos/quiz_intro.mp4",
    teaching: "/videos/teaching_intro.mp4",
    sleeping: "/videos/sleeping_intro.mp4",
  };

  const videoSrc =
    videoSrcMap[activityType] || "/videos/Circle-Cross-Triangle-Yellow-1.mp4";

  const handleQuizComplete = (pointsEarn) => {
    setIsCompleted(true);
    setPointsEarned(pointsEarn);
    if (!replay) {
      saveUserProgress(card, pointsEarn);
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setPointsEarned(0);
    setStarted(false);
  };

  const handleNextActivity = () => {
    navigate(`/${category}`);
  };
  useEffect(() => {
    if (isCompleted && endMusicRef.current) {
      endMusicRef.current.volume = 1;
      endMusicRef.current.play().catch((e) => {
        console.warn("End music play failed:", e);
      });
    }
  }, [isCompleted]);

  useEffect(() => {
    if (started && musicRef.current) {
      musicRef.current.volume = 0.5;
      musicRef.current.loop = true;
      musicRef.current.play().catch((e) => {
        console.warn("Music play blocked:", e);
      });
    }
  }, [started]);

  if (isCompleted) {
    return (
      <>
        <ActivityCompletion
          activityType={activityType}
          points={pointsEarned}
          onRestart={handleRestart}
          onNextActivity={handleNextActivity}
        />
        <audio ref={endMusicRef} src="/sounds/game_end.mp3" preload="auto" />
      </>
    );
  }

  // Start screen with fullscreen video background
  if (!started) {
    return (
      <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-6 bg-black text-white select-none">
        {/* Fullscreen video background */}
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="relative z-10 max-w-lg p-8 bg-white bg-opacity-20 rounded-xl border-4 border-white shadow-[4px_4px_0_rgba(255,255,255,0.8)] flex flex-col items-center gap-6">
          <h1 className="text-4xl font-extrabold drop-shadow-lg text-black text-center">
            Ready to start learning ?
          </h1>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 text-3xl font-bold rounded-xl border-4 border-white bg-pink-500 shadow-[6px_6px_0_rgba(0,0,0,0.6)] hover:bg-pink-600 active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,0.6)] transition-all"
            type="button"
          >
            ▶ Play Game
          </button>
        </div>
      </div>
    );
  }

  // Show activity & music after start
  return (
    <>
      <audio
        ref={musicRef}
        src={musicTracks[Math.floor(Math.random() * musicTracks.length)]}
        preload="auto"
      />
      <ActivityComponent
        onComplete={handleQuizComplete}
        {...props}
        points={points}
      />
    </>
  );
};

export default ActivityWrapper;
