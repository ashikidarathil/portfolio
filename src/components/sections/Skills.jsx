import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import { skills, skillCategories } from "../../constants";
import { fadeIn, staggerContainer } from "../../utils/motion";

const SkillBar = ({ name, level, color, index }) => (
  <motion.div
    variants={fadeIn("up", index * 0.05)}
    className="rounded-xl p-4 group transition-all duration-300"
    style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(245,158,11,0.08)",
    }}
    whileHover={{
      borderColor: "rgba(245,158,11,0.3)",
      background: "rgba(245,158,11,0.04)",
      scale: 1.01,
    }}
  >
    <div className="flex justify-between items-center mb-3">
      <span className="text-white font-medium text-sm">{name}</span>
      <span
        className="text-xs font-mono px-2 py-0.5 rounded-md"
        style={{
          color: "#f59e0b",
          background: "rgba(245,158,11,0.1)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        {level}%
      </span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: index * 0.05 + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
      />
    </div>
  </motion.div>
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <SectionWrapper
      id="skills"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d1526 0%, #060a14 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="// my stack"
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to craft exceptional digital experiences."
        />

        {/* Category Filters */}
        <motion.div
          variants={staggerContainer(0.05)}
          className="flex flex-nowrap overflow-x-auto gap-3 mb-4 pb-10 pt-2 no-scrollbar scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { type: "spring", damping: 20, stiffness: 100 } 
                }
              }}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-secondary hover:text-white"
              }`}
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #f59e0b, #f97316)",
                      boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(245,158,11,0.12)",
                    }
              }
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer(0.04, 0.1)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech cloud */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          className="mt-16 text-center"
        >
          <p className="text-secondary/40 text-xs mb-6 font-mono tracking-widest">// also familiar with</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["AWS", "Vercel", "Redux", "Zustand", "Linux", "Nginx"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-1.5 rounded-full text-secondary text-xs font-mono cursor-default transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(245,158,11,0.1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#f59e0b";
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)";
                    e.currentTarget.style.background = "rgba(245,158,11,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
