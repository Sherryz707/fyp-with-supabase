import { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import RewardSystem from "./RewardSystem";
import { useAuth } from "../../../context/AuthContext";

const Lesson = ({ lessons, onProgressUpdate, activeTab }) => {
  const [cards, setCards] = useState([]);

  const { userProgress } = useAuth();
  useEffect(() => {
    // Merge progress data into lessons
    const updatedCards = lessons.map((lesson) => ({
      ...lesson,
      completed: userProgress.some(
        (p) => p.lessonid === lesson.id && p.completed
      ),
      locked: calculateLockedState(lesson, lessons, userProgress),
    }));
    console.log("updaetd cards", updatedCards);
    setCards(updatedCards);
  }, [lessons, userProgress]);

  const calculateLockedState = (lesson, allLessons, progress) => {
    console.log(
      "lesson",
      lesson,
      "allLessons",
      allLessons,
      "progress",
      progress
    );
    if (lesson.order === 1) return false;
    if (lesson.order !== null) {
      const prevLesson = allLessons.find((l) => l.order === lesson.order - 1);
      return !progress.some(
        (p) => p.lessonid === prevLesson?.id && p.completed
      );
    }
    // For unordered lessons, check if all ordered lessons are completed
    const orderedLessons = allLessons.filter((l) => l.order !== null);
    return !orderedLessons.every((l) =>
      progress.some((p) => p.lessonid === l.id && p.completed)
    );
  };

  const handleQuizCompletion = (index) => {
    const lesson = cards[index];
    if (!lesson.completed && !lesson.locked) {
      onProgressUpdate(lesson.id, lesson.points);
    }
  };

  // Calculate total points earned in this subcategory
  const pointsEarned = userProgress
    .filter((p) => p.subcategoryid === activeTab.id)
    .reduce((sum, p) => sum + p.pointsearned, 0);

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
          lessonId={cards}
        />
      </main>
    </div>
  );
};

export default Lesson;
