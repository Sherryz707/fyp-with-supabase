// const CardGrid = ({ points, cards, onQuizComplete }) => {
//   return (
//     <div className="bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md w-full">
//       {/* Points Earned Tab */}
//       <div className="text-lg font-bold bg-primary text-primary-content px-4 py-2 rounded-[var(--radius-field)] w-fit mb-4">
//         Total Points: {points} pts
//       </div>

//       {/* Grid for Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className="bg-base-100 text-base-content p-4 rounded-[var(--radius-box)] shadow"
//           >
//             <img
//               //   src={card.image}
//               src="https://placehold.co/300x300"
//               alt={card.title}
//               className="w-full h-32 object-cover rounded-[var(--radius-box)]"
//             />
//             <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
//             <p className="text-neutral-content mt-1">{card.description}</p>
//             <p className="text-sm font-semibold mt-2">Points: {card.points}</p>

//             {/* Play Now Button */}
//             <button
//               onClick={() => onQuizComplete(index)}
//               className={`mt-2 px-4 py-2 rounded-[var(--radius-field)] font-bold transition ${
//                 card.completed
//                   ? "bg-success text-success-content cursor-not-allowed"
//                   : "bg-primary text-primary-content hover:brightness-110"
//               }`}
//               disabled={card.completed}
//             >
//               {card.completed ? "Completed" : "Play Now"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardGrid;
import { Gift } from "lucide-react"; // Using Lucide React for a cute gift icon

const CardGrid = ({ points, cards, onQuizComplete, pointsEarned }) => {
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
            className="relative bg-primary text-primary-content p-4 rounded-[var(--radius-box)] shadow-lg overflow-hidden"
          >
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
              onClick={() => onQuizComplete(index)}
              className={`mt-4 px-4 py-2 rounded-[var(--radius-field)] font-bold transition ${
                card.completed
                  ? "bg-success text-success-content cursor-not-allowed"
                  : "bg-accent text-accent-content hover:brightness-110"
              }`}
              disabled={card.completed}
            >
              {card.completed ? "Completed" : "Play Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
