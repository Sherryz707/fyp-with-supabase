import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lesson from "./Lesson";
import { useAuth } from "../../../context/AuthContext";
import { fetchSubcategoriesByParent } from "../../../services/categoriesService";

const LessonDashboard = () => {
  const { category, activeTabParam } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ subcategories: [], lessons: [] });
  const [activeTab, setActiveTab] = useState(null);

  const { userProgress } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessons = await fetchSubcategoriesByParent(category);

        // Extract unique subcategories
        const subcategoryMap = new Map();
        lessons.forEach((lesson) => {
          if (!subcategoryMap.has(lesson.category)) {
            subcategoryMap.set(lesson.category, {
              id: lesson.category,
              name: lesson.category.replace("-", " "), // optional display name
            });
          }
        });

        const subcategories = Array.from(subcategoryMap.values());

        setData({ subcategories, lessons });

        setActiveTab(
          subcategories.find((s) => s.id === activeTabParam) ||
            subcategories[0] ||
            null
        );
      } catch (error) {
        console.error("Error loading lessons:", error.message);
      }
    };

    loadData();
  }, [category, activeTabParam]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-4 bg-base-200">
        <h2 className="text-xl font-bold capitalize">
          {category.replace("-", " ")}
        </h2>
        <nav>
          {data.subcategories.map((sub, index) => {
            const isFirst = index === 0;
            const subLessons = data.lessons.filter(
              (l) => l.category === sub.id
            );

            let isUnlocked = isFirst;
            if (!isFirst) {
              const prevSub = data.subcategories[index - 1];
              const prevLessons = data.lessons.filter(
                (l) => l.category === prevSub.id
              );
              // console.log("user progress");
              const completedPrev = prevLessons.every((lesson) =>
                (userProgress || []).some(
                  (p) => p.lessonid === lesson.id && p.completed
                )
              );
              isUnlocked = completedPrev;
            }

            return (
              <button
                key={sub.id}
                onClick={() => isUnlocked && setActiveTab(sub)}
                disabled={!isUnlocked}
                className={`block w-full text-left px-4 py-2 rounded-md transition
                  ${
                    activeTab?.id === sub.id
                      ? "bg-primary text-primary-content"
                      : isUnlocked
                        ? "hover:bg-accent hover:text-primary-content"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {sub.name}
                {!isUnlocked && " 🔒"}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab && (
          <Lesson
            key={activeTab.id}
            lessons={data.lessons.filter((l) => l.category === activeTab.id)}
            userProgress={userProgress || []}
            activeTab={activeTab}
          />
        )}
      </main>
    </div>
  );
};

export default LessonDashboard;
