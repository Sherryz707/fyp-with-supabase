// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import RewardModel from "./RewardModel";
// import { motion } from "framer-motion";
// import { Gift } from "lucide-react";

// const RewardSystem = ({ cards }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
//       {cards.map((lesson, lessonIndex) =>
//         lesson.rewards.map((reward, rewardIndex) => {
//           const rewardKey = `${lessonIndex}-${rewardIndex}`;
//           return (
//             <div
//               key={rewardKey}
//               className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden cursor-pointer bg-base-100"
//             >
//               {lesson.completed ? (
//                 <Canvas
//                   shadows
//                   camera={{ position: [0, 1.5, 3], fov: 50 }}
//                   style={{
//                     background:
//                       "radial-gradient(circle at top, #ffe7f3, #e0f7fa)", // Whimsical background
//                     borderRadius: "1rem",
//                   }}
//                 >
//                   <ambientLight intensity={0.9} />
//                   <directionalLight position={[2, 5, 2]} castShadow />
//                   <RewardModel name={reward} scale={1.5} />
//                   <OrbitControls enableZoom={true} enablePan={true} />
//                 </Canvas>
//               ) : (
//                 <motion.div
//                   className="absolute inset-0 flex flex-col justify-center items-center bg-accent rounded-2xl"
//                   initial={{ opacity: 1 }}
//                   animate={{ opacity: [0.6, 0.8, 0.6] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                 >
//                   <Gift className="w-40 h-40 max-h-[90%] max-w-[90%] text-accent-content animate-bounce" />
//                 </motion.div>
//               )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default RewardSystem;
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RewardModel from "./RewardModel";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { addNewRewardItem } from "../../../services/roomService";

const RewardSystem = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
      {cards.map((lesson, lessonIndex) =>
        lesson.rewards.map((reward, rewardIndex) => {
          const rewardKey = `${lessonIndex}-${rewardIndex}`;
          return (
            <div
              key={rewardKey}
              className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden cursor-pointer bg-base-100"
            >
              {lesson.completed ? (
                <Canvas
                  shadows
                  camera={{ position: [0, 1.5, 3], fov: 50 }}
                  style={{
                    background:
                      "radial-gradient(circle at top, #ffe7f3, #e0f7fa)",
                    borderRadius: "1rem",
                  }}
                >
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[2, 5, 2]} castShadow />
                  <RewardModel
                    name={reward.name}
                    scale={1.5}
                    type={reward.type}
                  />
                  <OrbitControls enableZoom={true} enablePan={true} />
                </Canvas>
              ) : (
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
          );
        })
      )}
    </div>
  );
};

export default RewardSystem;
