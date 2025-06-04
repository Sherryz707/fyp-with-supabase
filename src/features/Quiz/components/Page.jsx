import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DrawingExp from "../../Tracing/components/Page";
import ActivityWrapper from "../../ActivityCompletion/components/ActivityWrapper";
import QuizCard from "../../QuizCard/Page";
import Scene from "../../Teacher/Experience";
import Intro from "../../Sleep/Intro";
import { getQuizById } from "../../../services/lessonService";

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const location = useLocation();
  const { points, card, replay } = location.state;
  console.log("quiz page", card);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(card.quizid);
        console.log("Supabase quiz data", data);
        setQuiz(data.data); // `data.data` holds the quiz JSON
      } catch (error) {
        console.error("Failed to load quiz from Supabase:", error);
      }
    };

    if (card?.quizid) {
      fetchQuiz();
    }
  }, [card?.quizid]);

  if (!quiz) return <p>Loading Quiz...</p>;

  return (
    <div>
      {quiz.type === "colouring" && (
        <ActivityWrapper
          ActivityComponent={DrawingExp}
          activityType="drawing"
          json={quiz}
          points={points}
        />
      )}
      {quiz.type === "quizCard" && (
        <ActivityWrapper
          ActivityComponent={QuizCard}
          activityType="quiz cards"
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
          activityType="teaching"
          json={quiz}
          points={points}
        />
      )}
    </div>
  );
}

export default QuizPage;
