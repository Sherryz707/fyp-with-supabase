import { useState } from "react";
import CardGrid from "./CardGrid";
import RewardSystem from "./RewardSystem";

const cardsData = [
  {
    title: "Math Quiz",
    description: "Test your math skills in a fun way!",
    image: "/images/math-quiz.jpg",
    points: 50,
    completed: false,
    rewards: [],
  },
  {
    title: "Math Quiz",
    description: "Test your math skills in a fun way!",
    image: "/images/math-quiz.jpg",
    points: 50,
    completed: false,
    rewards: [
      { image: "https://placehold.co/300x300", name: "Math Champion Badge" },
    ],
  },
  {
    title: "Word Puzzle",
    description: "Solve the words and earn rewards.",
    image: "/images/word-puzzle.jpg",
    points: 40,
    completed: false,
    rewards: [],
  },
  {
    title: "Memory Game",
    description: "Match the cards to win points.",
    image: "/images/memory-game.jpg",
    points: 30,
    completed: false,
    rewards: [
      { image: "https://placehold.co/300x300", name: "Memory Master Trophy" },
    ],
  },
];

const Lesson = () => {
  const [cards, setCards] = useState(cardsData);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [pointsEarned, setPoints] = useState(0);
  // Handles marking a quiz as completed
  const handleQuizCompletion = (index) => {
    if (!cards[index].completed) {
      const updatedCards = [...cards];
      updatedCards[index].completed = true;
      setCards(updatedCards);
      setCompletedQuizzes((prev) => prev + 1);
      setPoints((prev) => prev + cards[index].points);
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
        />
      </main>
    </div>
  );
};

export default Lesson;
