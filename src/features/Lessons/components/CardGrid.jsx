import { Gift, Lock } from "lucide-react"; // Using Lucide React for icons
import { useNavigate, useParams } from "react-router-dom";

const CardGrid = ({
  points,
  cards,
  onQuizComplete,
  pointsEarned,
  activeTab,
  setPoints,
  lessonId,
}) => {
  console.log("active tab", activeTab, lessonId);
  const { category } = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md w-full">
      {/* Points Earned Tab */}
      <div className="text-lg font-bold bg-info text-info-content px-4 py-2 rounded-[var(--radius-field)] w-fit mb-10">
        Total Points: {pointsEarned}/{points} pts
      </div>

      {/* Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative bg-primary text-primary-content p-4 rounded-[var(--radius-box)] shadow-lg overflow-hidden ${
              card.locked ? "opacity-50" : ""
            }`}
          >
            {/* Lock Icon for Locked Quizzes */}
            {card.locked && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
            )}

            {/* Gift Badge - Only if the lesson has rewards */}
            {card.rewards?.length > 0 && (
              <div
                className={`absolute top-0.5 right-0 bg-accent text-accent-content px-4 py-4 rounded-full flex items-center justify-center shadow-md ${
                  card.completed
                    ? "bg-success text-success-content"
                    : "bg-accent text-accent-content hover:brightness-110"
                }`}
              >
                <Gift className="w-10 h-10" />
              </div>
            )}

            {/* Lesson Image */}
            <img
              src="https://placehold.co/300x300"
              alt={card.title}
              className="w-full h-56 object-cover rounded-[var(--radius-box)]"
            />

            {/* Title & Description */}
            <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
            <p className="text-neutral-content mt-1">{card.description}</p>
            <p className="text-sm font-semibold mt-2">Points: {card.points}</p>

            {/* Play Now Button */}
            <button
              // onClick={() => onQuizComplete(index)}
              onClick={() =>
                navigate(`/${category}/${activeTab.slug}/quiz/${card.quizId}`, {
                  replace: true,
                  state: {
                    points: card.points,
                    card: card,
                  },
                })
              }
              className={`mt-4 px-4 py-2 rounded-[var(--radius-field)] font-bold transition ${
                card.completed
                  ? "bg-success text-success-content cursor-not-allowed"
                  : card.locked
                    ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                    : "bg-accent text-accent-content hover:brightness-110"
              }`}
              disabled={card.completed || card.locked}
            >
              {card.completed
                ? "Completed"
                : card.locked
                  ? "Locked"
                  : "Play Now"}
            </button>
            {/* Play Again */}
            {!card.unlocked && card.completed && (
              <button
                onClick={() => setPoints((prev) => prev + card.points)}
                className={`mt-4 px-4 py-2 ml-4 rounded-[var(--radius-field)] font-bold transition bg-accent text-accent-content hover:brightness-110`}
              >
                Play Again!
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
