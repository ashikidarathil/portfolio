import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import { projects } from "../../constants";
import { fadeIn, staggerContainer } from "../../utils/motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", index * 0.1)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -12 }}
      className="group relative rounded-3xl overflow-hidden cursor-default transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(245,158,11,0.1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
        e.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Gradient header */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        <motion.div
          animate={hovered ? { scale: 1.3, rotate: 8 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="select-none flex items-center justify-center"
        >
          {project.emoji.startsWith("/") || project.emoji.match(/\.(jpeg|jpg|gif|png|svg)$/) != null ? (
            <img 
              src={project.emoji} 
              alt={project.title} 
              className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
            />
          ) : (
            <span className="text-6xl">{project.emoji}</span>
          )}
        </motion.div>

        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm flex items-center justify-center gap-4"
              style={{ background: "rgba(6,10,20,0.65)" }}
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.05, type: "spring" }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.4)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.2)"}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: "rgba(20,184,166,0.2)", border: "1px solid rgba(20,184,166,0.5)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(20,184,166,0.4)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(20,184,166,0.2)"}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={16} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-display font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-4 opacity-75">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{
                background: "rgba(245,158,11,0.08)",
                color: "#f59e0b",
                border: "1px solid rgba(245,158,11,0.18)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom links bar */}
      <div
        className="px-6 pb-5 flex gap-5 pt-4"
        style={{ borderTop: "1px solid rgba(245,158,11,0.08)" }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-secondary text-xs transition-all duration-300 animated-underline"
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = ""}
        >
          <FaGithub size={14} /> Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-secondary text-xs transition-all duration-300 animated-underline"
          onMouseEnter={e => e.currentTarget.style.color = "#14b8a6"}
          onMouseLeave={e => e.currentTarget.style.color = ""}
        >
          <FaExternalLinkAlt size={12} /> Live Demo
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <SectionWrapper
      id="projects"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #060a14 0%, #0d1526 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="// my work"
          title="Featured Projects"
          subtitle="A selection of things I've built that I'm proud of."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ashikidarathil/"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 gradient-border hover:bg-white/5"
          >
            <FaGithub size={20} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
