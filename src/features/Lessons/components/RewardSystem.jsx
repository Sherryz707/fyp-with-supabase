// import { motion } from "framer-motion";
// import { Gift } from "lucide-react";
// const RewardSystem = ({ cards }) => {
//   return (
//     <div className="grid grid-cols-3 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
//       {cards.map((lesson, lessonIndex) =>
//         lesson.rewards.map((reward, rewardIndex) => (
//           <div
//             key={`${lessonIndex}-${rewardIndex}`}
//             className="relative w-48 h-48 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden"
//           >
//             <img
//               src={reward.image}
//               alt={reward.name}
//               className={`w-full h-full object-cover transition rounded-2xl ${
//                 lesson.completed ? "blur-0" : "blur-lg"
//               }`}
//             />
//             {!lesson.completed && (
//               <motion.div
//                 className="absolute inset-0 flex flex-col justify-center items-center rounded-2xl bg-accent"
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: [0.6, 0.8, 0.6] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//               >
//                 <Gift className="w-5/6 h-5/6 max-h-[90%] max-w-[90%] text-accent-content animate-bounce" />
//               </motion.div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default RewardSystem;
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const RewardSystem = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
      {cards.map((lesson, lessonIndex) =>
        lesson.rewards.map((reward, rewardIndex) => (
          <div
            key={`${lessonIndex}-${rewardIndex}`}
            className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden "
          >
            <img
              src={reward.image}
              alt={reward.name}
              className={`w-full h-full object-cover transition rounded-2xl ${
                lesson.completed ? "blur-0" : "blur-lg"
              }`}
            />
            {!lesson.completed && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center bg-accent rounded-2xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Gift className="w-40 h-40 max-h-[90%] max-w-[90%] text-accent-content animate-bounce" />
              </motion.div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RewardSystem;
