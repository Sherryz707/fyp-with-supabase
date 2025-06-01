// services/categoryService.js
import supabase from "./supabase";

// Fetch all categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, title, description, image, color")
    .order("title");

  if (error) throw new Error("Failed to fetch categories: " + error.message);
  return data;
};

// Fetch subcategories by parentCat ID
export const fetchSubcategoriesByParent = async (parentCatId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select(
      `id, category, parentCat, title, description, image, points, completed, locked, "order", rewards, quizId`
    )
    .eq("parentCat", parentCatId)
    .order("category", { ascending: true })
    .order("order", { ascending: true, nullsLast: true })
    .order("title", { ascending: true });

  if (error) throw new Error("Failed to fetch subcategories: " + error.message);
  return data;
};
