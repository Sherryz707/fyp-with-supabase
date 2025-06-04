import supabase from "./supabase";

export const fetchAllItems = async () => {
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }
  return data;
};
