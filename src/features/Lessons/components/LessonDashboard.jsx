import { useState } from "react";
import Lesson from "./Lesson";

const cardsData = [
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
      { image: "https://placehold.co/300x300", name: "Bonus Star" },
    ],
  },
];

const categories = [
  { id: "A Alphabet", name: "A Alphabet" },
  { id: "B Alphabet", name: "B Alphabet" },
];

const totalQuizzes = cardsData.length; // Total number of quizzes

const LessonDashboard = () => {
  const [activeTab, setActiveTab] = useState("A Alphabet");
  const [cards, setCards] = useState(cardsData);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-4 bg-base-200">
        <h2 className="text-xl font-bold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <nav>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-md hover:bg-accent hover:text-primary-content transition ${
                activeTab === category.id
                  ? "bg-primary text-primary-content"
                  : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <h1 className="text-2xl">Welcome to the Dashboard</h1>
        )}
        {activeTab === "A Alphabet" && <Lesson key={activeTab} />}
        {activeTab === "B Alphabet" && <Lesson key={activeTab} />}
      </main>
    </div>
  );
};

export default LessonDashboard;
