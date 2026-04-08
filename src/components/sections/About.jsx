import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import { aboutCards, personalInfo } from "../../constants";
import { fadeIn, staggerContainer } from "../../utils/motion";
import {
  FaGraduationCap,
  FaTools,
  FaLightbulb,
  FaRocket,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const iconMap = {
  FaGraduationCap,
  FaTools,
  FaLightbulb,
  FaRocket,
};

const AboutCard = ({ card, index }) => (
  <motion.div
    variants={fadeIn("up", index * 0.1)}
    whileHover={{ y: -10 }}
    className="relative rounded-2xl p-6 flex flex-col gap-4 cursor-default group overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(245,158,11,0.1)",
      backdropFilter: "blur(10px)",
      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
      e.currentTarget.style.boxShadow = "0 20px 60px rgba(245,158,11,0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* Corner accent */}
    <div
      className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(245,158,11,0.15), transparent 70%)",
      }}
    />
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.1))",
        border: "1px solid rgba(245,158,11,0.2)",
      }}
    >
      {(() => {
        const Icon = iconMap[card.icon];
        return Icon ? <Icon className="text-accent" /> : card.icon;
      })()}
    </div>
    <h3 className="text-white font-display font-bold text-lg">{card.title}</h3>
    <p className="text-secondary text-sm leading-relaxed opacity-75">
      {card.description}
    </p>
  </motion.div>
);

const About = () => {
  return (
    <SectionWrapper
      id="about"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #060a14 0%, #0d1526 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="// about me"
          title="Who I Am"
          subtitle="A passionate developer who loves building things that live on the internet."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <motion.div variants={fadeIn("right", 0.1)}>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-6 opacity-80">
              {personalInfo.bio}
            </p>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-8 opacity-80">
              My approach focuses on{" "}
              <span className="text-accent font-semibold">
                building real-world applications
              </span>{" "}
              with{" "}
              <span style={{ color: "#14b8a6" }} className="font-semibold">
                strong backend logic
              </span>
              . I'm continuously learning and improving by working on projects
              like a salon booking system and e-commerce platform using the MERN
              stack.
            </p>

            <div className="flex flex-wrap gap-4">
              <div
                className="flex items-center gap-2 text-secondary text-sm px-4 py-2 rounded-xl"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}
              >
                <FaMapMarkerAlt className="text-accent text-xs" />{" "}
                {personalInfo.location}
              </div>
              <div
                className="flex items-center gap-2 text-secondary text-sm px-4 py-2 rounded-xl"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}
              >
                <FaEnvelope className="text-accent text-xs" />{" "}
                {personalInfo.email}
              </div>
            </div>
          </motion.div>

          {/* Visual — Animated Code Block */}
          <motion.div variants={fadeIn("left", 0.2)} className="relative">
            <div
              className="rounded-2xl p-6 font-mono text-sm overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(245,158,11,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-3 text-secondary/30 text-xs font-mono">
                  developer.js
                </span>
              </div>
              {/* Code */}
              <div className="text-secondary/60 text-xs leading-7">
                <p>
                  <span style={{ color: "#fb923c" }}>const</span>{" "}
                  <span style={{ color: "#14b8a6" }}>developer</span> = {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-accent">name</span>:{" "}
                  <span className="text-green-400">"{personalInfo.name}"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-accent">title</span>:{" "}
                  <span className="text-green-400">"{personalInfo.title}"</span>
                  ,
                </p>
                <p className="pl-4">
                  <span className="text-accent">location</span>:{" "}
                  <span className="text-green-400">
                    "{personalInfo.location}"
                  </span>
                  ,
                </p>
                <p className="pl-4">
                  <span className="text-accent">passion</span>: [
                </p>
                <p className="pl-8">
                  <span className="text-green-400">
                    "Building real world applications"
                  </span>
                  ,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">
                    "Backend development & APIs"
                  </span>
                  ,
                </p>
                <p className="pl-8">
                  <span className="text-green-400">
                    "Database design & system building"
                  </span>
                  ,
                </p>

                <p className="pl-4">],</p>
                <p className="pl-4">
                  <span className="text-accent">available</span>:{" "}
                  <span style={{ color: "#fbbf24" }}>true</span>,
                </p>
                <p>{"}"}</p>
              </div>
            </div>
            {/* Decorative orbs */}
            <div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.25), transparent)",
              }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full blur-2xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(20,184,166,0.25), transparent)",
              }}
            />
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutCards.map((card, i) => (
            <AboutCard key={card.id} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
