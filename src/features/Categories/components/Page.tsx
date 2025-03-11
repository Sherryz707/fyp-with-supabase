import { motion } from "framer-motion";
import React from "react";

const categories = [
  {
    title: "Learn English Alphabets",
    description: "Master A to Z with fun and engaging activities!",
    image: "https://placehold.co/300x300",
    color: "bg-primary",
  },
  {
    title: "Learn Numbers",
    description: "Count your way to success from 1 to 100!",
    image: "https://placehold.co/300x300",
    color: "bg-secondary",
  },
  {
    title: "Learn Urdu Alphabets",
    description: "Explore the beauty of Urdu script with interactive lessons!",
    image: "https://placehold.co/300x300",
    color: "bg-accent",
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`card shadow-xl p-6 rounded-2xl cursor-pointer transition-all duration-300 ${category.color}`}
          >
            <img
              src={category.image}
              alt={category.title}
              className="rounded-xl w-full h-64 object-cover shadow-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-primary-content">
                {category.title}
              </h3>
              <p className="text-base-content/80 mt-2">
                {category.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
