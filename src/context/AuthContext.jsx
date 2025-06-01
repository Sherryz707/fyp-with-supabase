import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Load user from localStorage on first load
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (user && !error) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
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
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("user", JSON.stringify(session.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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
    const { error: dbError } = await supabase.from("users").insert([
      {
        username: name,
        email,
        gender,
      },
    ]);

    if (dbError) {
      throw new Error(dbError.message);
    }

    const newUser = { email, name, gender };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const getCurrentUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      return null;
    }
    const { data, error } = await supabase.auth.getUser();
    console.log("curr user", data);
    if (error) throw new Error(error.message);
    return data?.user;
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, loading, getCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
