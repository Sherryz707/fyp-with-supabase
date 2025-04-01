// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import DrawingExp from "../../Tracing/components/Page";

// function QuizPage() {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);

//   useEffect(() => {
//     fetch(`/dev-data/quiz/quiz123.json`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("received", data);
//         setQuiz(data);
//       });
//   }, [quizId]);

//   if (!quiz) return <p>Loading Quiz...</p>;

//   return <div>{quiz.type === "colouring" && <DrawingExp json={quiz} />}</div>;
// }

// export default QuizPage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import DrawingExp from "../../Tracing/components/Page";
// import { completeQuiz } from "../../../services/progressService";

// function QuizPage() {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const currentUser = "demo-user"; // In real app, get from auth context

//   const handleQuizComplete = (points) => {
//     // For demo, we'll hardcode activeTab - in real app pass this as prop
//     const activeTab = { id: "A-Alphabet-id" };
//     completeQuiz(quizId, points, activeTab, currentUser);
//     // Optionally notify parent component or update state
//   };

//   useEffect(() => {
//     fetch(`/dev-data/quiz/quiz123.json`)
//       .then((res) => res.json())
//       .then((data) => {
//         setQuiz(data);
//       });
//   }, [quizId]);

//   if (!quiz) return <p>Loading Quiz...</p>;

//   return (
//     <div>
//       {quiz.type === "colouring" && (
//         <DrawingExp
//           json={quiz}
//           onComplete={(points) => handleQuizComplete(points)}
//         />
//       )}
//     </div>
//   );
// }

// export default QuizPage;
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DrawingExp from "../../Tracing/components/Page";
import { completeQuiz } from "../../../services/progressService";
import ActivityWrapper from "../../ActivityCompletion/components/ActivityWrapper";
import QuizCard from "../../QuizCard/Page";

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const location = useLocation();
  const { points, card } = location.state;
  useEffect(() => {
    console.log("card", card.quizId);
    fetch(`/dev-data/quiz/${card.quizId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
      });
  }, []);

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
          activityType="drawing"
          json={quiz}
          points={points}
        />
      )}
    </div>
  );
}

export default QuizPage;
