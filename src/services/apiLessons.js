import supabase from "./supabase";

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("slug, title, description, image, color");

  if (error) {
    console.error("Error fetching categories:", error);
  } else {
    // Transform the data to match the JSON structure you want
    const categories_json = data.map((c) => ({
      category: c.slug,
      title: c.title,
      description: c.description,
      image: c.image,
      color: c.color,
    }));

    console.log("categ", categories_json); // Use this JSON in your frontend
    return categories_json;
  }
};

// export const fetchSubcategoriesAndLessons = async (categorySlug) => {
//   try {
//     // Get category ID
//     const { data: categoryData, error: categoryError } = await supabase
//       .from("categories")
//       .select("id")
//       .eq("slug", categorySlug)
//       .single();

//     if (categoryError || !categoryData) {
//       throw new Error("Category not found", categoryError, categorySlug);
//     }
//     const categoryId = categoryData.id;

//     // Fetch subcategories
//     const { data: subcategories, error: subcategoryError } = await supabase
//       .from("subcategories")
//       .select("id, name")
//       .eq("category_id", categoryId);

//     if (subcategoryError) {
//       throw subcategoryError;
//     }

//     // Fetch lessons with rewards and progress
//     const { data: lessons, error: lessonError } = await supabase
//       .from("lessons")
//       .select(
//         `id, title, description, image, points, subcategory_id,
//          subcategories(name),
//          user_progress(completed),
//          rewards(image, name)`
//       )
//       .eq("subcategories.category_id", categoryId);

//     if (lessonError) {
//       throw lessonError;
//     }

//     // Transform the data into the required JSON format
//     return {
//       subcategories,
//       lessons: lessons.map((lesson) => ({
//         id: lesson.id,
//         category: lesson.subcategories.name, // Name of the subcategory
//         title: lesson.title,
//         description: lesson.description,
//         image: lesson.image,
//         points: lesson.points,
//         completed: lesson.user_progress?.completed || false,
//         rewards: lesson.rewards || [],
//       })),
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// };
export const fetchSubcategoriesAndLessons = async (categorySlug) => {
  try {
    // Get category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (categoryError || !categoryData) {
      throw new Error("Category not found", categoryError, categorySlug);
    }
    const categoryId = categoryData.id;

    // Fetch subcategories
    const { data: subcategories, error: subcategoryError } = await supabase
      .from("subcategories")
      .select("id, name")
      .eq("category_id", categoryId);

    if (subcategoryError) {
      throw subcategoryError;
    }

    // Fetch lessons with rewards and progress
    const { data: lessons, error: lessonError } = await supabase
      .from("lessons")
      .select(
        `id, title, description, image, points, subcategory_id,
         user_progress(completed),
         rewards(image, name)`
      )
      .in(
        "subcategory_id",
        subcategories.map((sub) => sub.id)
      ); // Only fetch lessons within the category

    if (lessonError) {
      throw lessonError;
    }

    // Transform the data into the required JSON format
    return {
      subcategories,
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        subcategory_id: lesson.subcategory_id, // Store ID instead of name
        title: lesson.title,
        description: lesson.description,
        image: lesson.image,
        points: lesson.points,
        completed: lesson.user_progress?.completed || false,
        rewards: lesson.rewards || [],
      })),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
