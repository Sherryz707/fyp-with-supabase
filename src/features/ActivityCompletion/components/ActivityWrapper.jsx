// components/ActivityWrapper.js
import React, { useState } from "react";
import ActivityCompletion from "./ActivityCompletion";
import { completeQuiz } from "../../../services/progressService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ActivityWrapper = ({ ActivityComponent, activityType, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { category } = useParams();
  const { points, card, replay } = location.state;
  const [isCompleted, setIsCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const handleQuizComplete = (pointsEarn) => {
    setIsCompleted(true);
    setPointsEarned(pointsEarn);
    // completeQuiz(card, pointsEarn, currentUser);
    if (!replay) {
      completeQuiz(card, pointsEarn, user);
    } else {
      console.log("Replay mode: skipping progress update.");
    }
  };
  const handleRestart = () => {
    setIsCompleted(false);
    setPointsEarned(0);
  };

  const handleNextActivity = () => {
    console.log("activities: ", category);
    // Implement your navigation logic here
    navigate(`/${category}`);
    console.log("Proceeding to next activity");
  };

  if (isCompleted) {
    return (
      <ActivityCompletion
        activityType={activityType}
        points={pointsEarned}
        onRestart={handleRestart}
        onNextActivity={handleNextActivity}
      />
    );
  }

  return (
    <ActivityComponent
      onComplete={handleQuizComplete}
      {...props}
      points={points}
    />
  );
};

export default ActivityWrapper;
