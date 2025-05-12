const PROGRESS_FILE = "/dev-data/user-progress.json";

export const fetchUserProgress = async (userId) => {
  try {
    const response = await fetch(PROGRESS_FILE);
    const data = await response.json();
    const user = data.users.find((u) => u.userId === userId);
    return user ? user.progress : { lessons: {}, subcategories: {} };
  } catch (error) {
    console.error("Error loading progress:", error);
    return { lessons: {}, subcategories: {} };
  }
};

export const saveUserProgress = async (userId, progress) => {
  // In a real app, this would be an API call to your backend
  console.log("Simulating save for:", userId, progress);
  // For prototyping, you can use localStorage as a temporary solution:
  localStorage.setItem(`user-progress-${userId}`, JSON.stringify(progress));
};
export const completeQuiz = (card, pointsEarned, currentUser) => {
  console.log(
    "points needed",
    card,
    "points earnede:",
    pointsEarned,
    pointsEarned == card.points
  );
  const { id: lessonId, category: categoryId, parentCat, points } = card;
  const progressItem = {
    categoryId: parentCat,
    subcategoryId: categoryId,
    lessonId: lessonId,
    completed: pointsEarned == points,
    pointsEarned,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  // For localStorage persistence (temporary solution)
  const userKey = `userProgress-${currentUser}`;
  const existingProgress = JSON.parse(localStorage.getItem(userKey) || "[]");

  const existingIndex = existingProgress.findIndex(
    (item) => item.lessonId === lessonId
  );
  const updatedProgress =
    existingIndex >= 0
      ? existingProgress.map((item, index) =>
          index === existingIndex ? progressItem : item
        )
      : [...existingProgress, progressItem];

  localStorage.setItem(userKey, JSON.stringify(updatedProgress));

  return updatedProgress;
};

// For initial load
export const loadUserProgress = (currentUser) => {
  const userKey = `userProgress-${currentUser}`;
  return JSON.parse(localStorage.getItem(userKey) || "[]");
};
