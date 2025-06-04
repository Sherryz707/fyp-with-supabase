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
  const { user: authUser, userProgress } = useAuth();
  const [progressData, setProgressData] = useState([]);

  // Load progress once the user is authenticated
  useEffect(() => {
    if (userProgress) {
      setProgressData(userProgress);
    }
  }, [userProgress.authUser]);

  if (!authUser) return <p className="p-6">Loading profile...</p>;

  // 💡 Dynamically compute everything from progressData
  const exp = progressData.reduce(
    (sum, entry) => sum + (entry.pointsearned || 0),
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
                  📘 Lesson #{lesson.lessonid}
                </h4>
                <p className="text-sm text-gray-600">
                  Category: {lesson.categoryid}
                </p>
                <p className="text-sm text-gray-600">
                  Subcategory: {lesson.subcategoryid}
                </p>
                <p className="mt-2 text-primary font-bold">
                  🏅 {lesson.pointsearned} Points
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Last done: {lesson.lastupdated}
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
