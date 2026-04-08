import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import { experiences } from "../../constants";
import { fadeIn } from "../../utils/motion";

const ExperienceCard = ({ exp, index, isLast }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex gap-4 md:gap-0 md:grid md:grid-cols-2 md:gap-8 mb-8">
      {/* Left column (even items) */}
      <div className={`${isLeft ? "md:pr-16 md:text-right" : "md:order-last md:pl-16"} flex-1 md:block`}>
        <motion.div
          variants={fadeIn(isLeft ? "right" : "left", index * 0.1)}
          whileHover={{ y: -6 }}
          className="rounded-2xl p-6 transition-all duration-400 group relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(245,158,11,0.1)",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)";
            e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Glow corner */}
          <div
            className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${exp.color}20, transparent 70%)`,
            }}
          />

          {/* Period badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{
              background: `${exp.color}15`,
              color: exp.color,
              border: `1px solid ${exp.color}35`,
            }}
          >
            {exp.period}
          </span>
          <h3 className="text-white font-display font-bold text-lg mb-1">
            {exp.title}
          </h3>
          <p className="font-semibold mb-3 text-sm" style={{ color: exp.color }}>
            {exp.company ? '@' + exp.company : '' }
          </p>
          <p className="text-secondary text-sm leading-relaxed mb-4 opacity-75">
            {exp.description}
          </p>
          <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono"
                style={{
                  background: `${exp.color}10`,
                  color: exp.color,
                  border: `1px solid ${exp.color}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center Timeline */}
      <div className="hidden md:flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className="w-5 h-5 rounded-full border-4 z-10 timeline-dot"
          style={{
            background: exp.color,
            borderColor: "#060a14",
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
            className="w-px flex-1"
            style={{ background: "linear-gradient(to bottom, rgba(245,158,11,0.4), transparent)" }}
          />
        )}
      </div>

      {/* Mobile timeline dot */}
      <div className="flex md:hidden flex-col items-center">
        <div
          className="w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 timeline-dot"
          style={{ background: exp.color, borderColor: "#060a14" }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 ml-0.5"
            style={{ minHeight: "40px", background: "linear-gradient(to bottom, rgba(245,158,11,0.4), transparent)" }}
          />
        )}
      </div>

      {/* Right spacer */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

const Experience = () => {
  return (
    <SectionWrapper
      id="experience"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #060a14 0%, #0d1526 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="// my journey"
          title="Work Experience"
          subtitle="A timeline of my professional growth and key milestones."
          centered
        />

        <div className="relative mt-16">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
