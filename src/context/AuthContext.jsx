import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load user from localStorage on first load
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: userdb, error } = await supabase
          .from("users") // your database table name
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (userdb && !error) {
          setUser(userdb);
          localStorage.setItem("user", JSON.stringify(userdb));
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }

      setLoading(false);
    };

    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const handleAuthChange = async () => {
          if (session?.user) {
            const { data: userdb, error } = await supabase
              .from("users") // your database table name
              .select("*")
              .eq("id", session.user.id)
              .single();
            setUser(userdb);
            localStorage.setItem("user", JSON.stringify(userdb));
            await fetchUserProgress(session.user.id);
          } else {
            setUser(null);
            setUserProgress([]);
            localStorage.removeItem("user");
          }
        };

        handleAuthChange();
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProgress = async (userId) => {
    console.log("userid", userId);
    const { data, error } = await supabase
      .from("progress")
      .select(
        "id, userid, categoryid, subcategoryid, lessonid, completed, pointsearned, lastupdated"
      )
      .eq("userid", userId);

    if (error) {
      console.error("Failed to fetch user progress:", error.message);
    } else {
      setUserProgress(data);
    }
  };
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    }

    return null;
  };

  const signup = async ({ email, password, name, gender }) => {
    // 1. Sign up using Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // 2. Insert into `users` table
    const { data, error: dbError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        username: name,
        email,
        gender,
      },
    ]);

    if (dbError) {
      throw new Error(dbError.message);
    }

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const getCurrentUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return null;

    const { data, error } = await supabase
      .from("users") // your database table name
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching DB user:", error);
      throw new Error(error.message);
    }

    return data;
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    setUser(null);
    localStorage.removeItem("user");
  };
  const saveUserProgress = async (card, pointsEarned) => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
    console.log("users", card, "pts", pointsEarned);
    const { id: lessonId, category: categoryId, parentCat, points } = card;
    // const progressItem = {
    //   categoryId: parentCat,
    //   subcategoryId: categoryId,
    //   lessonId: lessonId,
    //   completed: pointsEarned >= points,
    //   pointsEarned,
    //   lastUpdated: new Date().toISOString().split("T")[0],
    // };
    console.log(categoryId, lessonId);
    const { data: existing, error: fetchError } = await supabase
      .from("progress")
      .select("id")
      .eq("userid", user.id)
      .eq("categoryid", parentCat)
      .eq("subcategoryid", categoryId)
      .eq("lessonid", lessonId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing progress:", fetchError.message);
      return;
    }

    const payload = {
      userid: user.id,
      categoryid: card.parentcat,
      subcategoryid: card.category,
      lessonid: card.id,
      completed: pointsEarned >= points,
      pointsearned: pointsEarned,
      lastupdated: new Date().toISOString().split("T")[0],
    };
    console.log("payload", payload);
    if (existing) {
      // Update
      const { error: updateError } = await supabase
        .from("progress")
        .update(payload)
        .eq("id", existing.id);
      if (updateError) {
        console.error("Failed to update progress:", updateError.message);
      }
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from("progress")
        .insert([payload]);
      if (insertError) {
        console.error("Failed to insert progress:", insertError.message);
      }
      await insertRewardItemIfNotExists(card.rewards);
    }

    // Refresh local state
    await fetchUserProgress(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loading,
        getCurrentUser,
        logout,
        userProgress,
        saveUserProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const insertRewardItemIfNotExists = async (input) => {
  const rewards = Array.isArray(input) ? input : [input];

  const itemsToInsert = [];

  for (const reward of rewards) {
    const { name, type, size_x, size_y, walkable, wall } = reward;

    const item = {
      name,
      type,
      size_x,
      size_y,
    };

    if (walkable !== undefined) item.is_walkable = walkable;
    if (wall !== undefined) item.is_wall = wall;

    itemsToInsert.push(item);
  }

  if (itemsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("items")
      .insert(itemsToInsert);

    if (insertError) {
      console.error("Error inserting items:", insertError.message);
    }
  }
};
