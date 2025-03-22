import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lesson from "./Lesson";

const LessonDashboard = () => {
  const { category } = useParams();
  const [data, setData] = useState({ subcategories: [], lessons: [] });
  const [activeTab, setActiveTab] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch the JSON data from the public folder
        const response = await fetch("/dev-data/english-alphabets.json"); // Path to your JSON file in the public folder
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the JSON response
        const result = await response.json();

        // Update state with the fetched data
        if (result) {
          setData(result);
          console.log("result", result); // Log the fetched data
          setActiveTab(
            result.subcategories.length > 0 ? result.subcategories[0] : null
          );
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    loadData();
  }, [category]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-4 bg-base-200">
        <h2 className="text-xl font-bold">{category.replace("-", " ")}</h2>
        <nav>
          {data.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveTab(sub)}
              className={`block w-full text-left px-4 py-2 rounded-md hover:bg-accent hover:text-primary-content transition ${
                activeTab?.id === sub.id
                  ? "bg-primary text-primary-content"
                  : ""
              }`}
            >
              {sub.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab && (
          <Lesson
            key={activeTab.id}
            lessons={data.lessons.filter(
              (l) => l.category === activeTab.id // Filter by category name
            )}
            setUserProgress={setUserProgress}
            userProgress={userProgress}
            data={data}
            activeTab={activeTab}
          />
        )}
      </main>
    </div>
  );
};

export default LessonDashboard;
