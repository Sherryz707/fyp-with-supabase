// import { useState } from "react";
// import { Edit, Camera, Home, Trophy, Users, Settings } from "lucide-react";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     exp: 1200,
//     nextExp: 1500,
//     title: "Math Master",
//     bio: "Lifelong learner, puzzle solver, and math enthusiast!",
//     badges: [
//       { name: "Math Champion", image: "https://placehold.co/100x100" },
//       { name: "Memory Master", image: "https://placehold.co/100x100" },
//     ],
//     friends: ["Alice", "Bob", "Charlie"],
//   });

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* User Info Section */}
//       <div className="bg-base-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center">
//         {/* Profile Picture */}
//         <div className="relative w-24 h-24 sm:w-32 sm:h-32">
//           <img
//             src="https://avatar.iran.liara.run/public"
//             alt="Profile"
//             className="rounded-full border-4 border-primary w-full h-full object-cover"
//           />
//           <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-md">
//             <Camera className="w-5 h-5 text-white" />
//           </button>
//         </div>

//         {/* User Details */}
//         <div className="sm:ml-6 text-center sm:text-left">
//           <h2 className="text-2xl font-bold">{user.name}</h2>
//           <p className="text-primary font-semibold">{user.title}</p>

//           {/* EXP Progress Bar */}
//           <div className="w-full bg-gray-300 rounded-full mt-2">
//             <div
//               className="bg-primary text-xs font-bold text-white text-center p-1 rounded-full"
//               style={{ width: `${(user.exp / user.nextExp) * 100}%` }}
//             >
//               {user.exp} / {user.nextExp} EXP
//             </div>
//           </div>

//           {/* Bio */}
//           <p className="mt-2 text-gray-600 text-sm italic">"{user.bio}"</p>
//         </div>
//       </div>

//       {/* Build Home Button */}
//       <div className="text-center mt-6">
//         <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
//           <Home className="w-5 h-5" />
//           Build Your Home
//         </button>
//       </div>

//       {/* Achievements & Badges */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">🏆 Achievements</h3>
//         <div className="flex gap-4 mt-4">
//           {user.badges.map((badge, index) => (
//             <div key={index} className="text-center">
//               <img
//                 src={badge.image}
//                 alt={badge.name}
//                 className="w-16 h-16 rounded-lg shadow-md"
//               />
//               <p className="text-sm mt-1">{badge.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Completed & In-Progress Lessons */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">📜 Lessons</h3>
//         <div className="mt-4 bg-base-200 p-4 rounded-lg shadow-md">
//           <p>Math Quiz - ✅ Completed</p>
//           <p>Word Puzzle - ⏳ In Progress</p>
//           <p>Memory Game - 🔒 Locked</p>
//         </div>
//       </div>

//       {/* Rewards & Inventory */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">🎁 Rewards & Inventory</h3>
//         <div className="mt-4 bg-base-200 p-4 rounded-lg shadow-md">
//           <p>You have unlocked: Math Champion Badge</p>
//           <p>Upcoming Reward: Solve 3 more puzzles for 'Puzzle Pro' Badge</p>
//         </div>
//       </div>

//       {/* Friends & Leaderboard */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">👥 Friends & Leaderboard</h3>
//         <div className="mt-4 flex gap-4">
//           {user.friends.map((friend, index) => (
//             <div key={index} className="p-2 bg-gray-200 rounded-lg shadow-md">
//               {friend}
//             </div>
//           ))}
//         </div>
//         <button className="mt-2 text-primary font-semibold">
//           View Leaderboard
//         </button>
//       </div>

//       {/* Settings */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">⚙️ Settings</h3>
//         <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 mt-4">
//           <Settings className="w-5 h-5" />
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
const jobTitles = [
  "police",
  "doctor",
  "designer",
  "chef",
  "farmer",
  "firefighters",
  "operator",
  "lawyer",
  "teacher",
  "astronomer",
];
const badgeMeta = [
  {
    level: 0,
    name: "The Initiate",
    caption: "Every legend starts with a single step.",
  },
  {
    level: 2,
    name: "Spark Seeker",
    caption: "Your curiosity is lighting the way.",
  },
  {
    level: 4,
    name: "The Enlightened",
    caption: "You're not just learning — you're evolving.",
  },
  {
    level: 6,
    name: "Mind Maestro",
    caption: "You've reached the summit of mastery.",
  },
];
import { useState, useEffect } from "react";
import { Camera, Home } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { loadUserProgress } from "../../../services/progressService";
import { Link } from "react-router-dom";

const getLevelData = (exp) => {
  if (exp >= 3000) return { title: "🧠👑 Mastermind Legend", level: 6 };
  if (exp >= 2000) return { title: "🧙 Wisdom Warrior", level: 5 };
  if (exp >= 1500) return { title: "🛡️ Knowledge Knight", level: 4 };
  if (exp >= 1000) return { title: "🏗️ Brain Builder", level: 3 };
  if (exp >= 500) return { title: "⚡ Quick Thinker", level: 2 };
  if (exp >= 100) return { title: "🧠 Curious Learner", level: 1 };
  return { title: "🐣 Noobling", level: 0 };
};
const getBadgesUpToLevel = (level, gender = "male") => {
  return badgeMeta
    .filter((meta) => meta.level <= level)
    .map((meta, i) => {
      const job = jobTitles[i % jobTitles.length]; // cycle jobs if more badges added later
      return {
        ...meta,
        image: `https://avatar.iran.liara.run/public/job/${job}/${gender}`,
      };
    });
};

const Profile = () => {
  const { user: authUser } = useAuth();
  const [progressData, setProgressData] = useState([]);

  // Load progress once the user is authenticated
  useEffect(() => {
    if (authUser?.email) {
      const progress = loadUserProgress(authUser);
      setProgressData(progress);
      console.log("user", authUser);
    }
  }, [authUser]);

  if (!authUser) return <p className="p-6">Loading profile...</p>;

  // 💡 Dynamically compute everything from progressData
  const exp = progressData.reduce(
    (sum, entry) => sum + (entry.pointsEarned || 0),
    0
  );
  const levelData = getLevelData(exp);
  const nextExp = (levelData.level + 1) * 500;
  const gender = authUser?.gender || "male"; // fallback
  const badges = getBadgesUpToLevel(levelData.level, gender);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Info Section */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <img
            src={`https://avatar.iran.liara.run/public/${authUser.gender == "female" ? "girl" : "boy"}`}
            alt="Profile"
            className="rounded-full border-4 border-primary w-full h-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-md">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="sm:ml-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{authUser.name}</h2>
          <p className="text-primary font-semibold">
            {levelData.title} (Lv. {levelData.level})
          </p>

          <div className="mt-2">
            <progress
              className="progress progress-primary w-full h-9"
              value={exp}
              max={nextExp}
            ></progress>
            <div className="text-center text-sm mt-1">
              {exp} / {nextExp} EXP
            </div>
          </div>

          <p className="mt-2 text-gray-600 text-sm italic">
            “Climb the ranks by completing more lessons!”
          </p>
        </div>
      </div>

      {/* Build Home */}
      <div className="text-center mt-6">
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <Home className="w-5 h-5" />
           <Link to="/my-home">Build Your Home</Link>
        </button>
      </div>
      {/* Badge Display */}
      {badges.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-left mb-4">🏅 Your Badges</h3>
          <div className="carousel rounded-box">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="carousel-item flex flex-col items-center px-2"
              >
                <div className="avatar">
                  <div className="mask mask-hexagon-2 w-36 border-4 shadow-lg">
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <p className="text-sm text-primary font-semibold mt-2 text-center">
                  {badge.name}
                  <br />
                  <span className="text-xs text-gray-500 italic">
                    {badge.caption}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Lv. {badge.level}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Learning Stats */}
      {progressData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            📚 Your Learning Adventure
          </h3>

          <div className="mt-4 flex flex-col sm:flex-row gap-6">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl shadow">
              🌟 <strong>Total Points:</strong> {exp}
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl shadow">
              ✅ <strong>Lessons Completed:</strong> {progressData.length}
            </div>
          </div>

          {/* Lessons List */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {progressData.map((lesson, index) => (
              <div
                key={index}
                className="bg-base-200 p-4 rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                <h4 className="font-semibold text-lg mb-1">
                  📘 Lesson #{lesson.lessonId}
                </h4>
                <p className="text-sm text-gray-600">
                  Category: {lesson.categoryId}
                </p>
                <p className="text-sm text-gray-600">
                  Subcategory: {lesson.subcategoryId}
                </p>
                <p className="mt-2 text-primary font-bold">
                  🏅 {lesson.pointsEarned} Points
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Last done: {lesson.lastUpdated}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
