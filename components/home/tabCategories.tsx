"use client";
import { useState } from "react";
import { CourseGroup } from "@/components/course/courseGroup";

// Course data matching the design mockup
const courses = [
  {
    id: "1",
    title: "Learn Figma from Basic",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
  {
    id: "2",
    title: "Build Digital Asset",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
  {
    id: "3",
    title: "the Power of Big Data",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e370fa?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
  {
    id: "4",
    title: "Balancing Productivity and...",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
  {
    id: "5",
    title: "Mastering Money Manage...",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
  {
    id: "6",
    title: "From Idea to Startup Succ...",
    instructor: "purepearl studio",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    lessons: 17,
    duration: "2 hours 16 mins",
    comments: 59,
    rating: 4.5,
    level: "Beginner",
    price: 25,
  },
];

const categories = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
];

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        isActive
          ? "bg-[#CCFF33] text-black"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}>
      {label}
    </button>
  );
}

export function TabCategories() {
  const [activeCategory, setActiveCategory] = useState("Featured");

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Discover Your Passion, Build Your Skills
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            At Bytespace Courses, we bring you closer to life-changing
            knowledge. Explore a variety of courses across different fields,
            from technology to the arts, and make a difference in your career
            and life.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-10">
          <div className="overflow-x-auto pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <TabButton
                  key={category}
                  label={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <CourseGroup courses={courses} />
      </div>
    </section>
  );
}
