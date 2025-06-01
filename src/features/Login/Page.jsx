import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(form.email, form.password);
      if (user) {
        navigate("/category");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://placehold.co/600x800')" }}
      ></motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-base-100"
      >
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Welcome Back!
          </h2>
          <p className="text-base-content mb-6">Login to continue</p>

          {error && <p className="text-error text-sm mb-4">{error}</p>}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm text-base-content mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-neutral-content" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-field border border-neutral bg-base-300"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm text-base-content mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-neutral-content" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-field border border-neutral bg-base-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary text-primary-content py-3 rounded-box mt-4"
          >
            Login
          </motion.button>

          <p className="text-center text-sm text-base-content mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign Up
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
