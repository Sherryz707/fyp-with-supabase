import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ScanFace, Globe } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeController";
import { appendWithThemeVariant } from "../../utils/ThemeString";

const Signup = () => {
  const { theme } = useTheme();
  const imageName = appendWithThemeVariant("/imgs/sign_up", theme);
  console.log("theme", theme, "img name", imageName);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loadingToast = toast.loading("Creating your account...");

    try {
      await signup({
        email: form.email,
        password: form.password,
        name: form.name,
        gender: form.gender,
      });

      toast.dismiss(loadingToast);
      toast.success("Account created! Have fun 😊");
      navigate("/category");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message);
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
        style={{ backgroundImage: `url("${imageName}")` }}
      ></motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-base-100"
      >
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary">
            Sign Up
          </h2>
          <p className="text-sm text-center text-base-content mb-4">
            Create your account
          </p>

          {error && <p className="text-error text-sm mb-4">{error}</p>}

          {/* Name Field */}
          <div className="mb-3">
            <label className="block text-sm text-base-content">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-neutral-content" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded-field border border-neutral bg-base-300"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="block text-sm text-base-content">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-neutral-content" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded-field border border-neutral bg-base-300"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="block text-sm text-base-content">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-neutral-content" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 p-2 rounded-field border border-neutral bg-base-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          {/* Gender Field */}
          <div className="mb-3">
            <label className="block text-sm text-base-content">Gender</label>
            <div className="relative">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full pl-3 p-2 rounded-field border border-neutral bg-base-300"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary text-primary-content py-2 rounded-box mt-4"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-sm text-base-content mt-4">
            or sign up with
          </p>

          {/* Social Login (Dummy) */}
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="bg-info p-2 rounded-full shadow-md"
              type="button"
            >
              <Globe className="text-info-content" />
            </button>
            <button
              className="bg-secondary p-2 rounded-full shadow-md"
              type="button"
            >
              <ScanFace className="text-secondary-content" />
            </button>
          </div>

          <p className="text-center text-sm text-base-content mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
