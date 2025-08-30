"use client2";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const skills = [
  {
    name: "JavaScript",
    icon: "🟨",
    level: 90,
    description: "ES6+ modern JavaScript development",
  },
  {
    name: "React.js",
    icon: "⚛️",
    level: 85,
    description: "Component-based UI with React, Redux, React Query",
  },
  {
    name: "Next.js",
    icon: "⏭️",
    level: 75,
    description: "SSR and App Router features",
  },
  {
    name: "HTML5",
    icon: "🌐",
    level: 95,
    description: "Semantic markup and accessible web structures",
  },
  {
    name: "CSS3",
    icon: "🎨",
    level: 85,
    description: "Responsive layouts, Flexbox, Grid, animations",
  },
  {
    name: "Node.js",
    icon: "🟢",
    level: 80,
    description: "Server-side JavaScript runtime",
  },
  {
    name: "Express.js",
    icon: "🚂",
    level: 75,
    description: "Backend framework for REST APIs and middleware",
  },
  {
    name: "MongoDB",
    icon: "🍃",
    level: 70,
    description: "NoSQL database design and management",
  },
  {
    name: "MySQL",
    icon: "🐬",
    level: 70,
    description: "Relational database and structured queries",
  },
  {
    name: "Redis",
    icon: "🟥",
    level: 65,
    description: "In-memory caching and real-time apps",
  },
  { name: "Git", icon: "📚", level: 80, description: "Version control system" },
  {
    name: "GitHub",
    icon: "🐙",
    level: 80,
    description: "Collaboration and code hosting",
  },
  {
    name: "Docker",
    icon: "🐳",
    level: 70,
    description: "Containerization for scalable deployments",
  },
  {
    name: "CI/CD (GitHub Actions)",
    icon: "⚙️",
    level: 65,
    description: "Automated pipelines and deployment",
  },
  {
    name: "Jest & Supertest",
    icon: "🧪",
    level: 60,
    description: "Unit testing and API integration testing",
  },
  {
    name: "Python",
    icon: "🐍",
    level: 65,
    description: "General-purpose programming and scripting",
  },
  {
    name: "PHP",
    icon: "🐘",
    level: 60,
    description: "Backend development and dynamic web apps",
  },
  {
    name: "RestAPI",
    icon: "🔗", // link = API connection
    level: 60,
    description: "Backend development and dynamic web apps",
  },
  {
    name: "GraphQL",
    icon: "🔮", // crystal ball = GraphQL (community often uses this)
    level: 60,
    description: "Backend development and dynamic web apps",
  },
];

export default function SkillsSwiperGrid() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          grabCursor={true}
          style={{ paddingBottom: "60px" }}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Desktop
            1280: { slidesPerView: 4 }, // Large desktop
          }}
        >
          {skills.map((skill, index) => (
            <SwiperSlide key={skill.name + index}>
              <SkillCard skill={skill} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
  <motion.div
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    className="h-full"
  >
    <Card className="p-6 h-[280px] bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary flex flex-col justify-between">
      <div className="text-center">
        <motion.div
          className="text-4xl mb-4"
          whileHover={{
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.5 },
          }}
        >
          {skill.icon}
        </motion.div>
        <h3 className="text-lg font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
          {skill.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {skill.description}
        </p>
      </div>
      <div className="mt-4">
        <div className="w-full bg-border rounded-full h-2 mb-2">
          <motion.div
            className="bg-gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.1 }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {skill.level}%
        </span>
      </div>
    </Card>
  </motion.div>
);
