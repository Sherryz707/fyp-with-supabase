import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DrawingExp from "../../Tracing/components/Page";
import ActivityWrapper from "../../ActivityCompletion/components/ActivityWrapper";
import QuizCard from "../../QuizCard/Page";
import Scene from "../../Teacher/Experience";
import Intro from "../../Sleep/Intro";
import { getQuizById } from "../../../services/lessonService";
import { useRef } from "react";
import Loading from "../../../components/Loading";

// function QuizPage() {
//   const [quiz, setQuiz] = useState(null);
//   const location = useLocation();
//   const { points, card, replay } = location.state;
//   console.log("quiz page", card);
//   const musicRef = useRef(null);
//   // 🔊 Play background music once on mount
//   useEffect(() => {
//     const music = musicRef.current;
//     if (music) {
//       music.volume = 0.5;
//       music.loop = true;
//       const play = async () => {
//         try {
//           await music.play();
//         } catch (err) {
//           console.warn("Music play blocked:", err);
//         }
//       };
//       play();
//     }

//     return () => {
//       // 🔇 Clean up on unmount
//       if (music) {
//         music.pause();
//         music.currentTime = 0;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const data = await getQuizById(card.quizid);
//         console.log("Supabase quiz data", data);
//         setQuiz(data.data); // `data.data` holds the quiz JSON
//       } catch (error) {
//         console.error("Failed to load quiz from Supabase:", error);
//       }
//     };

//     if (card?.quizid) {
//       fetchQuiz();
//     }
//   }, [card?.quizid]);

//   if (!quiz) return <p>Loading Quiz...</p>;

//   return (
//     <>
//       <audio ref={musicRef} src="/sounds/bg_1.mp3" preload="auto" />

//       <div>
//         {quiz.type === "colouring" && (
//           <ActivityWrapper
//             ActivityComponent={DrawingExp}
//             activityType="drawing"
//             json={quiz}
//             points={points}
//           />
//         )}
//         {quiz.type === "quizCard" && (
//           <ActivityWrapper
//             ActivityComponent={QuizCard}
//             activityType="quiz cards"
//             json={quiz}
//             points={points}
//           />
//         )}
//         {quiz.type === "teaching" && (
//           <ActivityWrapper
//             ActivityComponent={Scene}
//             activityType="teaching"
//             json={quiz}
//             points={points}
//           />
//         )}
//         {quiz.type === "sleeping" && (
//           <ActivityWrapper
//             ActivityComponent={Intro}
//             activityType="teaching"
//             json={quiz}
//             points={points}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default QuizPage;
const musicTracks = [
  "/sounds/bg_1.mp3",
  "/sounds/bg_2.mp3",
  "/sounds/bg_3.mp3",
  "/sounds/bg_4.mp3",
];
function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const location = useLocation();
  const { points, card, replay } = location.state;

  // Load quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(card.quizid);
        setQuiz(data.data);
      } catch (error) {
        console.error("Failed to load quiz from Supabase:", error);
      }
    };
    if (card?.quizid) fetchQuiz();
  }, [card?.quizid]);

  if (!quiz) return <Loading />;

  return (
    <>
      <div>
        {quiz.type === "colouring" && (
          <ActivityWrapper
            ActivityComponent={DrawingExp}
            activityType="colouring"
            json={quiz}
            points={points}
          />
        )}
        {quiz.type === "quizCard" && (
          <ActivityWrapper
            ActivityComponent={QuizCard}
            activityType="quizCard"
            json={quiz}
            points={points}
          />
        )}
        {quiz.type === "teaching" && (
          <ActivityWrapper
            ActivityComponent={Scene}
            activityType="teaching"
            json={quiz}
            points={points}
          />
        )}
        {quiz.type === "sleeping" && (
          <ActivityWrapper
            ActivityComponent={Intro}
            activityType="sleeping"
            json={quiz}
            points={points}
          />
        )}
      </div>
    </>
  );
}
export default QuizPage;
