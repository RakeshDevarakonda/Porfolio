"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import cmsImg from "../assets/cms.png";
import videoImg from "../assets/videoprogress.png";
import jobportal from "../assets/jobportal.png";
import realtimenotes from "../assets/realtimenotes.png";
import ollama from "../assets/ollama.png";
import truepulse from "../assets/trupluse.png";
import ecomerse from "../assets/Ecomerse.png";
import livechatapp from "../assets/livechatapp.png";
import rentify from "../assets/Rentify.png";

const projects = [
  {
    title: "CMS Platform with Role-Based Access",
    description:
      "A comprehensive content management system with role-based authentication, user management, and dynamic content creation capabilities.",
    image: cmsImg,
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT"],
    githubUrl: "https://github.com/RakeshDevarakonda/CMS-PROJECT",
    category: "Full Stack",
  },
  {
    title: "Video Progress Tracker",
    description:
      "Interactive video streaming platform with progress tracking, user analytics, and real-time updates using WebSockets and Redux state management.",
    image: videoImg,
    tech: ["React.js", "Redux", "WebSockets", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/RakeshDevarakonda/VideoProgressTracker",
    category: "Full Stack",
  },
  {
    title: "Ecomerse Website",
    description:
      "An e-commerce website built using HTML, CSS, and JavaScript, inspired by online shopping platforms.",
    image: ecomerse,
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/RakeshDevarakonda/Ecomerse-Website",
    category: "Frontend",
  },
  {
    title: "Library Management System",
    description:
      "A library management system API with REST and GraphQL endpoints, allowing users to manage books, authors, and borrowers.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    tech: ["Node.js", "Express.js", "MongoDB","RestApi","GraphQl"],
    githubUrl: "https://github.com/RakeshDevarakonda/Libarary-Managemant-RestApi-And-GraphQl",
    category: "Backend",
  },
  {
    title: "JOBPORTALWEBSITE",
    description:
      "A job portal website where recruiters can post jobs and view applications, while candidates can apply for jobs and track their applications.",
    image: jobportal,
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/RakeshDevarakonda/JOBPORTALWEBSITE",
    category: "Full Stack",
  },
  {
    title: "Real-Time-Note-Application",
    description:
      "A real-time collaborative notes application where users can create and join note rooms, similar to Google Docs.",
    image: realtimenotes,
    tech: ["React", "Redux", "Socket.IO", "Node.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/RakeshDevarakonda/Real-Time-Note-Application",
    category: "Full Stack",
  },
  {
    title: "GENAI-WITH-OLLAMA",
    description:
      "A generative AI project integrated with React and Node.js, using Ollama running locally instead of external AI APIs.",
    image: ollama,
    tech: ["React", "Node.js", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/RakeshDevarakonda/GENAI-WITH-OLLAMA",
    category: "Full Stack",
  },
  {
    title: "Polling-System",
    description:
      "A polling system API where users can create questions, add options, vote, and view results. Built with Node.js, Express.js, and MongoDB.",
    image: "https://images.pexels.com/photos/7103170/pexels-photo-7103170.jpeg",
    tech: ["Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/RakeshDevarakonda/Polling-System",
    category: "Backend",
  },
  {
    title: "Live Chat Application",
    description:
      "A real-time chat application built with Node.js, Express.js, EJS, and Socket.IO for instant communication.",
    image: livechatapp,
    tech: ["Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/RakeshDevarakonda/Live_Chat_App",
    category: "Backend",
  },
  {
    title: "Real-Time-Chat-Application-API",
    description:
      "A WhatsApp-like chat API with JWT authentication and group messaging support, built using Node.js and MongoDB.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
    githubUrl:
      "https://github.com/RakeshDevarakonda/Real-Time-Chat-Application-API",
    category: "Backend",
  },
  {
    title: "TruPulse_Project",
    description:
      "An offline notes app that uses IndexedDB for local storage and synchronizes data when online.",
    image: truepulse,
    tech: ["JavaScript", "IndexedDB"],
    githubUrl: "https://github.com/RakeshDevarakonda/TruPulse_Project",
    category: "Full Stack",
  },
  {
    title: "Rentify",
    description:
      "A property rental platform where users can post properties, like, and connect when interest is mutual.",
    image: rentify,
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Email Integration"],
    githubUrl: "https://github.com/RakeshDevarakonda/Rentify",
    category: "Full Stack",
  },
  {
    title: "Book-Review",
    description:
      "A RESTful API for managing books and reviews, with authentication, pagination, and search features.",
    image: "https://images.pexels.com/photos/33609917/pexels-photo-33609917.jpeg",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/RakeshDevarakonda/Book-Review",
    category: "Backend",
  },
];

const ProjectsSwiper = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcase of my recent work and personal projects
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          grabCursor={true}
          style={{ paddingBottom: "50px" }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.title + index}>
              <motion.div
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow-hover h-[500px] flex flex-col">
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1  text-primary text-xs font-medium rounded-full border border-primary/30 bg-black">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-3 overflow-hidden max-h-16">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border hover:border-primary/50 hover:text-primary transition-all duration-300 truncate"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Button */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:scale-105"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsSwiper;
