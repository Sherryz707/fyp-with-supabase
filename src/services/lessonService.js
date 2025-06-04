import supabase from "./supabase";

export const getQuizById = async (quizId) => {
  console.log("quizId");
  const { data, error } = await supabase
    .from("quizzes")
    .select("quizid, data")
    .eq("quizid", quizId)
    .single();
  console.log("quizzes", data);
  if (error) {
    console.error(`Error fetching quiz ${quizId}:`, error.message);
    throw new Error(error.message);
  }

  return data;
};
