import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../../services/categoriesService"; // make sure this path is correct

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading categories...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
        {categories.map((category, index) => (
          <motion.div
            key={category.id || index}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`card shadow-xl p-6 rounded-2xl cursor-pointer transition-all duration-300 ${category.color}`}
            onClick={() => navigate(`/${category.slug}/lessons`)}
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
