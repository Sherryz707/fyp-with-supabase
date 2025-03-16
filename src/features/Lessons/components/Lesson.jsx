import { useState, useEffect, useCallback } from "react";
import CardGrid from "./CardGrid";
import RewardSystem from "./RewardSystem";

const Lesson = ({
  lessons,
  setUserProgress,
  userProgress,
  data,
  activeTab,
}) => {
  const [cards, setCards] = useState(lessons);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [pointsEarned, setPoints] = useState(0);

  // Memoize the calculateLockedState function
  const calculateLockedState = useCallback((quizzes) => {
    return quizzes.map((quiz, index, allQuizzes) => {
      if (quiz.order === 1) {
        // First quiz in the order is always unlocked
        return { ...quiz, locked: false };
      } else if (quiz.order !== null) {
        // For ordered quizzes, check if the previous quiz is completed
        const previousQuiz = allQuizzes.find((q) => q.order === quiz.order - 1);
        return { ...quiz, locked: !previousQuiz?.completed };
      } else {
        // For unordered quizzes, check if all ordered quizzes are completed
        const allOrderedQuizzesCompleted = allQuizzes
          .filter((q) => q.order !== null)
          .every((q) => q.completed);
        return { ...quiz, locked: !allOrderedQuizzesCompleted };
      }
    });
  }, []);

  // Update locked state whenever cards change
  // useEffect(() => {
  //   const updatedCards = calculateLockedState(cards);
  //   setCards(updatedCards);
  // }, [cards, calculateLockedState]);
  useEffect(() => {
    setCards((prevCards) => {
      return calculateLockedState(prevCards);
    });
  }, [calculateLockedState]);

  // Handles marking a quiz as completed
  const handleQuizCompletion = (index) => {
    if (!cards[index].completed && !cards[index].locked) {
      const updatedCards = [...cards];
      updatedCards[index].completed = true;

      // Recalculate locked state after marking the quiz as completed
      const updatedCardsWithLockedState = calculateLockedState(updatedCards);

      setCards(updatedCardsWithLockedState);
      setCompletedQuizzes((prev) => prev + 1);
      setPoints((prev) => prev + cards[index].points);

      // Update user progress in parent state
      setUserProgress((prev) => ({
        ...prev,
        [cards[index].title]: {
          completed: true,
          points: (prev[cards[index].title]?.points || 0) + cards[index].points,
        },
      }));
    }
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex-1 p-6">
        {/* Rewards Section */}
        <div className="mb-8">
          <RewardSystem cards={cards} />
        </div>

        {/* Lessons Section */}
        <CardGrid
          points={cards.reduce((sum, card) => sum + card.points, 0)}
          cards={cards}
          onQuizComplete={handleQuizCompletion}
          pointsEarned={pointsEarned}
          activeTab={activeTab}
          setPoints={setPoints}
        />
      </main>
    </div>
  );
};

export default Lesson;
