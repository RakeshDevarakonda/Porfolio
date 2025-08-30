"use client";
import { motion } from "framer-motion";

const skills = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express",
  "Next.js",
  "Docker",
  "Redis",
  "GraphQL",
  "RestApi"
];

export default function SkillsMarquee() {
  
  const loopSkills = [...skills, ...skills, ...skills];

  return (
    <div className="overflow-hidden w-full py-6 space-y-6">
      {/* Left → Right */}
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["-100%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {loopSkills.map((skill, index) => (
          <span
            key={`left-${index}`}
            className="text-white text-xl font-semibold px-4 py-2 bg-gray-800 rounded-xl shadow-lg"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* Right → Left */}
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {loopSkills.map((skill, index) => (
          <span
            key={`right-${index}`}
            className="text-white text-xl font-semibold px-4 py-2 bg-gray-800 rounded-xl shadow-lg"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
