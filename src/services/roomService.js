import supabase from "./supabase";

// Fetch all items for the current user
export const fetchAllItems = async (userId) => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("id", { ascending: false });

  if (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }

  return data.map((item) => ({
    name: item.name,
    size: [item.size_x, item.size_y],
    wall: item.is_wall,
    walkable: item.is_walkable,
    type: item.type,
  }));
};

// Fetch all map items for the current user
export const fetchAllMapItems = async (userId) => {
  const { data, error } = await supabase
    .from("map_items")
    .select(
      `
      grid_position_x,
      grid_position_y,
      rotation,
      created_at,
      items!inner(
        name,
        size_x,
        size_y,
        type,
        is_wall,
        is_walkable
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch map items:", error);
    return [];
  }

  return data.map(
    ({ items, grid_position_x, grid_position_y, rotation, created_at }) => {
      const base = {
        name: items.name,
        size: [items.size_x, items.size_y],
        type: items.type,
        gridPosition: [grid_position_x, grid_position_y],
        rotation,
      };

      if (items.is_wall) {
        base.is_wall = items.is_wall;
      }
      if (items.is_walkable) {
        base.is_walkable = items.is_walkable;
      }

      return base;
    }
  );
};

// // Add a new map item for the current user
// export const addMapItem = async ({
//   itemId,
//   position,
//   rotation = 0,
//   userId,
// }) => {
//   const [x, y] = position;

//   const { data, error } = await supabase
//     .from("map_items")
//     .insert([
//       {
//         user_id: userId,
//         item_id: itemId,
//         grid_position_x: x,
//         grid_position_y: y,
//         rotation,
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     console.error("Failed to add map item:", error);
//     return null;
//   }

//   return data;
// };

// // Delete a map item by ID
// export const deleteMapItem = async (id) => {
//   const { error } = await supabase.from("map_items").delete().eq("id", id);

//   if (error) {
//     console.error(`Failed to delete map item with id ${id}:`, error);
//     return false;
//   }

//   return true;
// };

// Update position and rotation of a map item
// export const updateMapItem = async (id, { position, rotation }) => {
//   const updates = {};
//   if (position) {
//     const [x, y] = position;
//     updates.grid_position_x = x;
//     updates.grid_position_y = y;
//   }
//   if (rotation !== undefined) {
//     updates.rotation = rotation;
//   }

//   const { data, error } = await supabase
//     .from("map_items")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(`Failed to update map item with id ${id}:`, error);
//     return null;
//   }

//   return data;
// };

// Update all map items for the current user
export async function updateMapItems(newItems, userId) {
  try {
    // Delete all map_items for this user
    const { error: deleteError } = await supabase
      .from("map_items")
      .delete()
      .eq("user_id", userId);

    if (deleteError) throw deleteError;

    // Insert new items
    const formattedItems = newItems.map((item) => ({
      user_id: userId,
      item_id: item.name,
      grid_position_x: item.gridPosition[0],
      grid_position_y: item.gridPosition[1],
      rotation: item.rotation,
    }));

    const { error: insertError } = await supabase
      .from("map_items")
      .insert(formattedItems);

    if (insertError) throw insertError;

    return { success: true };
  } catch (err) {
    console.error("Map update failed:", err);
    return { success: false, error: err };
  }
}

// Add a new reward item for the current user
export const addNewRewardItem = async ({
  name,
  type = "glb",
  is_wall = false,
  is_walkable = false,
  size_x = 3,
  size_y = 3,
  userId,
}) => {
  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        user_id: userId,
        name,
        type,
        is_wall,
        is_walkable,
        size_x,
        size_y,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to add new reward item:", error);
    return null;
  }
  return data;
};

export async function createBaseItemsForUser(userId) {
  const baseItems = [
    ["washer", 2, 2, false, false, "glb"],
    ["toiletSquare", 2, 2, false, false, "glb"],
    ["trashcan", 1, 1, false, false, "glb"],
    ["bathroomCabinetDrawer", 2, 2, false, false, "glb"],
    ["bathtub", 4, 2, false, false, "glb"],
    ["bathroomMirror", 2, 1, true, false, "glb"],
    ["bathroomCabinet", 2, 1, true, false, "glb"],
    ["bathroomSink", 2, 2, false, false, "glb"],
    ["showerRound", 2, 2, false, false, "glb"],
    ["tableCoffee", 4, 2, false, false, "glb"],
    ["loungeSofaCorner", 5, 5, false, false, "glb"],
    ["bear", 2, 1, true, false, "glb"],
    ["loungeSofaOttoman", 2, 2, false, false, "glb"],
    ["tableCoffeeGlassSquare", 2, 2, false, false, "glb"],
    ["loungeDesignSofaCorner", 5, 5, false, false, "glb"],
    ["loungeDesignSofa", 5, 2, false, false, "glb"],
    ["loungeSofa", 5, 2, false, false, "glb"],
    ["bookcaseOpenLow", 2, 1, false, false, "glb"],
    ["kitchenBar", 2, 1, false, false, "glb"],
    ["bookcaseClosedWide", 3, 1, false, false, "glb"],
    ["bedSingle", 3, 5, false, false, "glb"],
    ["bench", 2, 1, false, false, "glb"],
    ["bedDouble", 5, 5, false, false, "glb"],
    ["benchCushionLow", 2, 1, false, false, "glb"],
    ["loungeChair", 2, 2, false, false, "glb"],
    ["cabinetBedDrawer", 1, 1, false, false, "glb"],
    ["cabinetBedDrawerTable", 1, 1, false, false, "glb"],
    ["table", 4, 2, false, false, "glb"],
    ["tableCrossCloth", 4, 2, false, false, "glb"],
    ["plant", 1, 1, false, false, "glb"],
    ["plantSmall", 1, 1, false, false, "glb"],
    ["rugRounded", 6, 4, false, true, "glb"],
    ["rugRound", 4, 4, false, true, "glb"],
    ["rugSquare", 4, 4, false, true, "glb"],
    ["rugRectangle", 8, 4, false, true, "glb"],
    ["televisionVintage", 4, 2, false, false, "glb"],
    ["televisionModern", 4, 2, false, false, "glb"],
    ["kitchenCabinetCornerRound", 2, 2, false, false, "glb"],
    ["kitchenCabinetCornerInner", 2, 2, false, false, "glb"],
    ["kitchenCabinet", 2, 2, false, false, "glb"],
    ["kitchenBlender", 1, 1, false, false, "glb"],
    ["dryer", 2, 2, false, false, "glb"],
    ["chairCushion", 1, 1, false, false, "glb"],
    ["chair", 1, 1, false, false, "glb"],
    ["deskComputer", 3, 2, false, false, "glb"],
    ["desk", 3, 2, false, false, "glb"],
    ["chairModernCushion", 1, 1, false, false, "glb"],
    ["chairModernFrameCushion", 1, 1, false, false, "glb"],
    ["kitchenMicrowave", 1, 1, false, false, "glb"],
    ["coatRackStanding", 1, 1, false, false, "glb"],
    ["kitchenSink", 2, 2, false, false, "glb"],
    ["lampRoundFloor", 1, 1, false, false, "glb"],
    ["lampRoundTable", 1, 1, false, false, "glb"],
    ["lampSquareFloor", 1, 1, false, false, "glb"],
    ["lampSquareTable", 1, 1, false, false, "glb"],
    ["toaster", 1, 1, false, false, "glb"],
    ["kitchenStove", 2, 2, false, false, "glb"],
    ["laptop", 1, 1, false, false, "glb"],
    ["radio", 1, 1, false, false, "glb"],
    ["speaker", 1, 1, false, false, "glb"],
    ["speakerSmall", 1, 1, false, false, "glb"],
    ["stoolBar", 1, 1, false, false, "glb"],
    ["stoolBarSquare", 1, 1, false, false, "glb"],
    ["Henry", 2, 2, false, false, "gltf"],
  ];

  const formatted = baseItems.map(
    ([name, size_x, size_y, is_wall, is_walkable, type]) => ({
      name,
      size_x,
      size_y,
      is_wall,
      is_walkable,
      type,
      user_id: userId,
    })
  );

  const { error } = await supabase.from("items").insert(formatted);

  if (error) {
    console.error("Failed to insert base items:", error);
    return { success: false, error };
  }

  return { success: true };
}
const baseItemsToPlace = [
  { name: "cabinetBedDrawerTable", gridPosition: [13, 19] },
  { name: "cabinetBedDrawer", gridPosition: [19, 19] },
  { name: "bedDouble", gridPosition: [14, 15] },
  { name: "plant", gridPosition: [12, 20], rotation: 90 }, // Optional rotation
];
export async function placeBaseItemsOnMap(userId, itemsWithGridPositions) {
  // Step 1: Fetch the user's items (needed to validate & get names)
  const { data: existingItems, error: fetchError } = await supabase
    .from("items")
    .select("name")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching user items:", fetchError);
    return { success: false, error: fetchError };
  }

  const itemNameSet = new Set(existingItems.map((item) => item.name));

  // Step 2: Filter out missing item names or map them for insertion
  const insertData = itemsWithGridPositions
    .filter(({ name }) => itemNameSet.has(name))
    .map(({ name, gridPosition, rotation = 0 }) => ({
      user_id: userId,
      item_id: name,
      grid_position_x: gridPosition[0],
      grid_position_y: gridPosition[1],
      rotation,
    }));

  if (insertData.length === 0) {
    return { success: false, error: "No valid items to insert" };
  }

  // Step 3: Insert into map_items
  const { error: insertError } = await supabase
    .from("map_items")
    .insert(insertData);

  if (insertError) {
    console.error("Error inserting into map_items:", insertError);
    return { success: false, error: insertError };
  }

  return { success: true };
}
