// components/ActivityWrapper.js
import React, { useState } from "react";
import ActivityCompletion from "./ActivityCompletion";
import { completeQuiz } from "../../../services/progressService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ActivityWrapper = ({ ActivityComponent, activityType, ...props }) => {
  const currentUser = "demo-user"; // In real app, get from auth context
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams();
  const { points, card } = location.state;
  const [isCompleted, setIsCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const handleQuizComplete = () => {
    // For demo, we'll hardcode activeTab - in real app pass this as prop
    setIsCompleted(true);
    setPointsEarned(points);
    completeQuiz(card, points, currentUser);
    // Optionally notify parent component or update state
  };
  const handleRestart = () => {
    setIsCompleted(false);
    setPointsEarned(0);
  };

  const handleNextActivity = () => {
    console.log("activities: ", category);
    // Implement your navigation logic here
    navigate(`/${category}`, { replace: true });
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

  return <ActivityComponent onComplete={handleQuizComplete} {...props} />;
};

export default ActivityWrapper;
