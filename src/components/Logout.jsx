import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear auth
    navigate("/login"); // Redirect to login
  }, [logout, navigate]);

  return null; // You could show a loading spinner if desired
};

export default Logout;
