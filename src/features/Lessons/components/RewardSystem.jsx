// import { Bounds, Center, OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { motion, AnimatePresence } from "framer-motion";
// import { Gift, X } from "lucide-react";
// import { useState } from "react";
// import RewardModel from "./RewardModel";

// const RewardSystem = ({ cards }) => {
//   const [openReward, setOpenReward] = useState(null);

//   return (
//     <>
//       {/* FULLSCREEN OVERLAY when clicking an unlocked reward */}
//       <AnimatePresence>
//         {openReward && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-blue-500 bg-opacity-90 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={() => setOpenReward(null)}
//               className="absolute top-6 right-6 text-white hover:scale-110 transition"
//             >
//               <X size={40} />
//             </button>
//             <motion.div
//               className="flex flex-col items-center justify-center"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <Gift className="text-white w-64 h-64 animate-bounce" />
//               <h2 className="text-4xl mt-4 text-white font-bold text-center">
//                 You Unlocked a Reward!
//               </h2>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* REWARD GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
//         {cards.map((lesson, lessonIndex) =>
//           lesson.rewards.map((reward, rewardIndex) => {
//             const rewardKey = `${lessonIndex}-${rewardIndex}`;
//             return (
//               <div
//                 key={rewardKey}
//                 className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden cursor-pointer bg-base-100"
//                 onClick={() => {
//                   if (lesson.completed) setOpenReward(rewardKey);
//                 }}
//               >
//                 <div className="absolute inset-0">
//                   {lesson.completed && (
//                     <div className="absolute inset-0">
//                       <Canvas
//                         className="w-full h-full"
//                         camera={{ position: [0, 1, 2.5], fov: 35 }}
//                       >
//                         <ambientLight intensity={1.6} />
//                         <directionalLight position={[2, 5, 2]} intensity={2} />
//                         <OrbitControls
//                           autoRotate
//                           autoRotateSpeed={1}
//                           enableZoom={false}
//                           enablePan={false}
//                           enableRotate={false}
//                         />
//                         <Center>
//                           <RewardModel url={reward.model} />
//                         </Center>
//                       </Canvas>
//                     </div>
//                   )}
//                 </div>

//                 {!lesson.completed && (
//                   <motion.div
//                     className="absolute inset-0 flex flex-col justify-center items-center bg-accent rounded-2xl"
//                     initial={{ opacity: 1 }}
//                     animate={{ opacity: [0.6, 0.8, 0.6] }}
//                     transition={{ repeat: Infinity, duration: 2 }}
//                   >
//                     <Gift className="w-40 h-40 max-h-[90%] max-w-[90%] text-accent-content animate-bounce" />
//                   </motion.div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// export default RewardSystem;
import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { useState } from "react";
import RewardModel from "./RewardModel";

const RewardSystem = ({ cards }) => {
  const [openReward, setOpenReward] = useState(null);

  return (
    <>
      {/* FULLSCREEN OVERLAY when clicking an unlocked reward */}
      {/* <AnimatePresence>
        {openReward && (
          <motion.div
            className="fixed inset-0 z-50 bg-base-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setOpenReward(null)}
              className="absolute top-6 right-6 text-base-content hover:scale-110 transition z-10"
            >
              <X size={40} />
            </button>

            <Canvas camera={{ position: [0, 1, 2.5], fov: 35 }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[2, 5, 2]} intensity={2} />
              <OrbitControls
                autoRotate
                autoRotateSpeed={1}
                enableZoom={false}
                enablePan={false}
              />
              <Center>
                <RewardModel
                  url={
                    cards
                      .flatMap((lesson) => lesson.rewards)
                      .find(
                        (_, i) => `${Math.floor(i / 3)}-${i % 3}` === openReward
                      )?.model
                  }
                />
              </Center>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* REWARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-[var(--radius-box)] shadow-md place-items-center">
        {cards.map((lesson, lessonIndex) =>
          lesson.rewards.map((reward, rewardIndex) => {
            const rewardKey = `${lessonIndex}-${rewardIndex}`;
            return (
              <div
                key={rewardKey}
                className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden cursor-pointer bg-base-100"
                onClick={() => {
                  if (lesson.completed) setOpenReward(rewardKey);
                }}
              >
                <div className="absolute inset-0">
                  {lesson.completed && (
                    <div className="absolute inset-0">
                      <Canvas
                        className="w-full h-full"
                        camera={{ position: [0, 1, 2.5], fov: 35 }}
                      >
                        <ambientLight intensity={1.6} />
                        <directionalLight position={[2, 5, 2]} intensity={2} />
                        <OrbitControls
                          autoRotate
                          autoRotateSpeed={1}
                          enableZoom={false}
                          enablePan={false}
                          enableRotate={false}
                        />
                        <Center>
                          <RewardModel url={reward.model} />
                        </Center>
                      </Canvas>
                    </div>
                  )}
                </div>

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
            );
          })
        )}
      </div>
    </>
  );
};

export default RewardSystem;
