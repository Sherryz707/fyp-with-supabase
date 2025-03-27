// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Lesson from "./Lesson";

// const LessonDashboard = () => {
//   const { category } = useParams();
//   const [data, setData] = useState({ subcategories: [], lessons: [] });
//   const [activeTab, setActiveTab] = useState(null);
//   const [userProgress, setUserProgress] = useState({});

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Fetch the JSON data from the public folder
//         const response = await fetch("/dev-data/english-alphabets.json"); // Path to your JSON file in the public folder
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         // Parse the JSON response
//         const result = await response.json();

//         // Update state with the fetched data
//         if (result) {
//           setData(result);
//           console.log("result", result); // Log the fetched data
//           setActiveTab(
//             result.subcategories.length > 0 ? result.subcategories[0] : null
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//       }
//     };

//     loadData();
//   }, [category]);

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Sidebar */}
//       <aside className="w-64 p-4 space-y-4 bg-base-200">
//         <h2 className="text-xl font-bold">{category.replace("-", " ")}</h2>
//         <nav>
//           {data.subcategories.map((sub) => (
//             <button
//               key={sub.id}
//               onClick={() => setActiveTab(sub)}
//               className={`block w-full text-left px-4 py-2 rounded-md hover:bg-accent hover:text-primary-content transition ${
//                 activeTab?.id === sub.id
//                   ? "bg-primary text-primary-content"
//                   : ""
//               }`}
//             >
//               {sub.name}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {activeTab && (
//           <Lesson
//             key={activeTab.id}
//             lessons={data.lessons.filter(
//               (l) => l.category === activeTab.id // Filter by category name
//             )}
//             setUserProgress={setUserProgress}
//             userProgress={userProgress}
//             data={data}
//             activeTab={activeTab}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default LessonDashboard;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lesson from "./Lesson";
import { loadUserProgress } from "../../../services/progressService";

const LessonDashboard = () => {
  const { category, activeTabParam } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ subcategories: [], lessons: [] });
  const [activeTab, setActiveTab] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [currentUser] = useState("demo-user");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load lesson data
        const lessonsResponse = await fetch("/dev-data/english-alphabets.json");
        if (!lessonsResponse.ok) throw new Error("Failed to fetch lessons");
        const lessonsData = await lessonsResponse.json();

        // Load user progress
        // const progressResponse = await fetch("/dev-data/user-progressz.json");
        // let progressData;
        // if (!progressResponse.ok) {
        //   // Load from localStorage instead of user-progress.json
        //   console.log("alt!");
        //   progressData = loadUserProgress(currentUser);
        // } else {
        //   progressData = await progressResponse.json();
        // }
        let progressData = loadUserProgress(currentUser);
        console.log("progress Data!", progressData);
        // const userData = progressData.users.find(
        //   (u) => u.userId === currentUser
        // ) || {
        //   progress: [],
        // };

        // Set initial state
        setData(lessonsData);
        setActiveTab(lessonsData.subcategories[0] || null);
        setUserProgress(progressData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [category, currentUser, activeTabParam]);

  const handleProgressUpdate = (lessonId, points) => {
    const newProgressItem = {
      categoryId: "english-alphabets",
      subcategoryId: activeTab.id,
      lessonId,
      completed: true,
      pointsEarned: points,
      lastUpdated: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    };

    setUserProgress((prev) => {
      // Check if progress for this lesson already exists
      const existingIndex = prev.findIndex(
        (item) => item.lessonId === lessonId
      );

      if (existingIndex >= 0) {
        // Update existing progress
        return prev.map((item, index) =>
          index === existingIndex ? newProgressItem : item
        );
      } else {
        // Add new progress
        return [...prev, newProgressItem];
      }
    });

    // In a real app, you would save to your backend here
    console.log("Updated progress:", newProgressItem);
  };

  // Calculate subcategory points
  const getSubcategoryPoints = (subcategoryId) => {
    return userProgress
      .filter((item) => item.subcategoryId === subcategoryId)
      .reduce((sum, item) => sum + item.pointsEarned, 0);
  };

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
              {sub.name} ({getSubcategoryPoints(sub.id)}/{sub.requiredPoints})
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab && (
          <Lesson
            key={activeTab.id}
            lessons={data.lessons.filter((l) => l.category === activeTab.id)}
            onProgressUpdate={handleProgressUpdate}
            userProgress={userProgress}
            activeTab={activeTab}
          />
        )}
      </main>
    </div>
  );
};

export default LessonDashboard;
