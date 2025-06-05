import supabase from "./supabase";

export const fetchAllItems = async () => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
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

// Fetch all map items
export const fetchAllMapItems = async () => {
  const { data, error } = await supabase.from("map_items").select(`
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
    `);

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

      // Add optional properties only if they are not null or undefined
      if (
        items.is_wall !== null &&
        items.is_wall !== undefined &&
        items.is_wall != false
      ) {
        base.is_wall = items.is_wall;
      }
      if (
        items.is_walkable !== null &&
        items.is_walkable !== undefined &&
        items.is_walkable != false
      ) {
        base.is_walkable = items.is_walkable;
      }

      return base;
    }
  );
};

// Add a new map item
export const addMapItem = async ({ itemId, position, rotation = 0 }) => {
  const [x, y] = position;

  const { data, error } = await supabase
    .from("map_items")
    .insert([
      {
        item_id: itemId,
        grid_position_x: x,
        grid_position_y: y,
        rotation,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to add map item:", error);
    return null;
  }

  return data;
};

// Delete a map item by ID
export const deleteMapItem = async (id) => {
  const { error } = await supabase.from("map_items").delete().eq("id", id);

  if (error) {
    console.error(`Failed to delete map item with id ${id}:`, error);
    return false;
  }

  return true;
};

// Update position and rotation of a map item
export const updateMapItem = async (id, { position, rotation }) => {
  const updates = {};
  if (position) {
    const [x, y] = position;
    updates.grid_position_x = x;
    updates.grid_position_y = y;
  }
  if (rotation !== undefined) {
    updates.rotation = rotation;
  }

  const { data, error } = await supabase
    .from("map_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Failed to update map item with id ${id}:`, error);
    return null;
  }

  return data;
};

export async function updateMapItems(newItems) {
  try {
    // Step 1: Delete all existing map_items
    const { error: deleteError } = await supabase
      .from("map_items")
      .delete()
      .neq("id", 0);
    if (deleteError) throw deleteError;

    // Step 2: Insert new items
    const formattedItems = newItems.map((item) => ({
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

export const addNewRewardItem = async ({
  name,
  type = "glb", // default type if you want
  is_wall = false,
  is_walkable = false,
  size_x = 3,
  size_y = 3,
}) => {
  const { data, error } = await supabase
    .from("items")
    .insert([
      {
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
