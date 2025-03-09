import { useState } from "react";

const categories = [
  { id: "dashboard", name: "Dashboard" },
  { id: "settings", name: "Settings" },
  { id: "profile", name: "Profile" },
  { id: "analytics", name: "Analytics" },
];

const Lessons = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 transition ${
                activeTab === category.id ? "bg-gray-700" : ""
              }
              `}
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
        {activeTab === "settings" && <h1 className="text-2xl">Settings</h1>}
        {activeTab === "profile" && <h1 className="text-2xl">Profile</h1>}
        {activeTab === "analytics" && <h1 className="text-2xl">Analytics</h1>}
      </main>
    </div>
  );
};

export default Lessons;
