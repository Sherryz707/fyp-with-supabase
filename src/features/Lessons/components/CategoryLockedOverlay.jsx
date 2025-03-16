import { X } from "lucide-react"; // Using Lucide React for the close icon

const CategoryLockedOverlay = ({
  lockedCategory,
  currentCategory,
  lessonsLock,
  onClose,
}) => {
  const pointsNeeded =
    currentCategory.requiredPoints - currentCategory.totalPointsEarned;

  // Filter quizzes that can be redone to earn points
  const recommendedQuizzes = lessonsLock.filter((l) => l.completed && l.points > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-11/12 max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Overlay Content */}
        <h2 className="text-2xl font-bold mb-4">
          {lockedCategory.name} is Locked
        </h2>
        <p className="text-lg mb-4">
          You need <span className="font-bold">{pointsNeeded} more points</span>{" "}
          to unlock this category.
        </p>

        {/* Recommended Quizzes */}
        <h3 className="text-xl font-semibold mb-2">Recommended Quizzes</h3>
        <div className="space-y-2">
          {recommendedQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-base-200 rounded"
            >
              <span>{quiz.title}</span>
              <span className="font-bold">+{quiz.points} points</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLockedOverlay;
