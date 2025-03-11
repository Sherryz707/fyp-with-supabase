import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ScanFace, Globe } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-base-100"
      >
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary">
            Sign Up
          </h2>
          <p className="text-sm text-center text-base-content mb-4">
            Create your account
          </p>

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
              />
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary text-primary-content py-2 rounded-box mt-4"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-sm text-base-content mt-4">
            or sign up with
          </p>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mt-3">
            <button className="bg-info p-2 rounded-full shadow-md">
              <Globe className="text-info-content" />
            </button>
            <button className="bg-secondary p-2 rounded-full shadow-md">
              <ScanFace className="text-secondary-content" />
            </button>
          </div>

          <p className="text-center text-sm text-base-content mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
