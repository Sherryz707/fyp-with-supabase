// // components/ActivityCompletion.js
// import React from "react";
// import Confetti from "react-confetti";

// const ActivityCompletion = ({
//   activityType,
//   points,
//   onRestart,
//   onNextActivity,
// }) => {
//   const activityTitles = {
//     quiz: "Quiz Completed!",
//     game: "Game Over!",
//     drawing: "Artwork Finished!",
//     default: "Activity Completed!",
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <Confetti
//         width={window.innerWidth}
//         height={window.innerHeight}
//         recycle={false}
//       />

//       <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center z-10">
//         <h1 className="text-3xl font-bold mb-6 text-blue-600">
//           {activityTitles[activityType] || activityTitles.default}
//         </h1>

//         <div className="text-xl mb-4">
//           You earned <span className="font-bold text-blue-500">{points}</span>{" "}
//           points!
//         </div>

//         <div className="flex flex-col space-y-3 mt-6">
//           <button
//             onClick={onRestart}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Try Again
//           </button>
//           <button
//             onClick={onNextActivity}
//             className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//           >
//             End Game
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivityCompletion;
// components/ActivityCompletion.js
import React from "react";
import Confetti from "react-confetti";

const ActivityCompletion = ({
  activityType,
  points,
  onRestart,
  onNextActivity,
}) => {
  const activityTitles = {
    quiz: "Quiz Completed!",
    game: "Game Over!",
    drawing: "Artwork Finished!",
    default: "Activity Completed!",
  };

  const getActivityColor = () => {
    switch (activityType) {
      case "quiz":
        return "bg-primary text-primary-content";
      case "game":
        return "bg-secondary text-secondary-content";
      case "drawing":
        return "bg-accent text-accent-content";
      default:
        return "bg-neutral text-neutral-content";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-100">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />

      <div
        className={`rounded-3xl shadow-xl p-8 max-w-md w-full text-center ${getActivityColor()}`}
      >
        <h1 className="text-3xl font-bold mb-6">
          {activityTitles[activityType] || activityTitles.default}
        </h1>

        <div className="text-xl mb-4 bg-base-100 rounded-box p-4 text-base-content">
          You earned <span className="font-bold text-primary">{points}</span>{" "}
          points!
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button onClick={onRestart} className="btn btn-primary">
            Try Again
          </button>
          <button onClick={onNextActivity} className="btn btn-success">
            End Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCompletion;
