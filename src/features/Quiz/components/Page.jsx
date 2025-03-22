import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DrawingExp from "../../Tracing/components/Page";

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetch(`/dev-data/quiz/quiz123.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("received", data);
        setQuiz(data);
      });
  }, [quizId]);

  if (!quiz) return <p>Loading Quiz...</p>;

  return <div>{quiz.type === "colouring" && <DrawingExp json={quiz} />}</div>;
}

export default QuizPage;
