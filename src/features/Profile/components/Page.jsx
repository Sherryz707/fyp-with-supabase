import { useState } from "react";
import { Edit, Camera, Home, Trophy, Users, Settings } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    exp: 1200,
    nextExp: 1500,
    title: "Math Master",
    bio: "Lifelong learner, puzzle solver, and math enthusiast!",
    badges: [
      { name: "Math Champion", image: "https://placehold.co/100x100" },
      { name: "Memory Master", image: "https://placehold.co/100x100" },
    ],
    friends: ["Alice", "Bob", "Charlie"],
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Info Section */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <img
            src="https://placehold.co/200x200"
            alt="Profile"
            className="rounded-full border-4 border-primary w-full h-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-md">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Details */}
        <div className="sm:ml-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-primary font-semibold">{user.title}</p>

          {/* EXP Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full mt-2">
            <div
              className="bg-primary text-xs font-bold text-white text-center p-1 rounded-full"
              style={{ width: `${(user.exp / user.nextExp) * 100}%` }}
            >
              {user.exp} / {user.nextExp} EXP
            </div>
          </div>

          {/* Bio */}
          <p className="mt-2 text-gray-600 text-sm italic">"{user.bio}"</p>
        </div>
      </div>

      {/* Build Home Button */}
      <div className="text-center mt-6">
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <Home className="w-5 h-5" />
          Build Your Home
        </button>
      </div>

      {/* Achievements & Badges */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">🏆 Achievements</h3>
        <div className="flex gap-4 mt-4">
          {user.badges.map((badge, index) => (
            <div key={index} className="text-center">
              <img
                src={badge.image}
                alt={badge.name}
                className="w-16 h-16 rounded-lg shadow-md"
              />
              <p className="text-sm mt-1">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed & In-Progress Lessons */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">📜 Lessons</h3>
        <div className="mt-4 bg-base-200 p-4 rounded-lg shadow-md">
          <p>Math Quiz - ✅ Completed</p>
          <p>Word Puzzle - ⏳ In Progress</p>
          <p>Memory Game - 🔒 Locked</p>
        </div>
      </div>

      {/* Rewards & Inventory */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">🎁 Rewards & Inventory</h3>
        <div className="mt-4 bg-base-200 p-4 rounded-lg shadow-md">
          <p>You have unlocked: Math Champion Badge</p>
          <p>Upcoming Reward: Solve 3 more puzzles for 'Puzzle Pro' Badge</p>
        </div>
      </div>

      {/* Friends & Leaderboard */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">👥 Friends & Leaderboard</h3>
        <div className="mt-4 flex gap-4">
          {user.friends.map((friend, index) => (
            <div key={index} className="p-2 bg-gray-200 rounded-lg shadow-md">
              {friend}
            </div>
          ))}
        </div>
        <button className="mt-2 text-primary font-semibold">
          View Leaderboard
        </button>
      </div>

      {/* Settings */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">⚙️ Settings</h3>
        <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 mt-4">
          <Settings className="w-5 h-5" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
