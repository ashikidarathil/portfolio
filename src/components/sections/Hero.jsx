import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "../../constants";
import StarFieldCanvas from "../canvas/Stars";
import HeroCanvas from "../canvas/HeroObjects";
import {
  FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram,
} from "react-icons/fa";

const iconMap = { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram };

// Simple typewriter hook
function useTypewriter(words, typeSpeed = 80, deleteSpeed = 50, pause = 2000) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setText(words[index].substring(0, subIndex));
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

// Aurora floating orbs — amber and teal
const AuroraOrbs = () => {
  const orbs = [
    { color: "rgba(245,158,11,0.12)", size: 500, x: 15, y: 20, delay: 0 },
    { color: "rgba(249,115,22,0.08)", size: 350, x: 75, y: 60, delay: 2 },
    { color: "rgba(20,184,166,0.10)", size: 400, x: 55, y: 10, delay: 4 },
    { color: "rgba(245,158,11,0.06)", size: 600, x: 85, y: 40, delay: 1 },
  ];

  return (
    <div className="particles-bg overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 10 + i * 2,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating dots — amber particles
const Particles = () => {
  const dots = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    color: i % 3 === 0 ? "rgba(20,184,166,0.5)" : i % 3 === 1 ? "rgba(245,158,11,0.5)" : "rgba(249,115,22,0.4)",
  }));

  return (
    <div className="particles-bg">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            background: dot.color,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const dynamicText = useTypewriter(personalInfo.subtitles);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060a14 0%, #0d1526 50%, #060a14 100%)" }}
    >
      {/* Aurora orbs */}
      <AuroraOrbs />

      {/* Star field background */}
      <Suspense fallback={null}>
        <StarFieldCanvas />
      </Suspense>

      {/* 3D Floating objects */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Floating particles */}
      <Particles />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(245,158,11,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.25)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
            </span>
            <span className="text-accent-light text-sm font-medium tracking-wide">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-teal font-mono text-base tracking-[0.3em] mb-3 uppercase"
          >
            Hello World, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-4"
          >
            <span className="text-white">{personalInfo.name.split(" ")[0]} </span>
            <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
          </motion.h1>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-24 h-0.5 mb-5 rounded-full"
            style={{
              background: "linear-gradient(90deg, #f59e0b, #f97316, #14b8a6)",
              transformOrigin: "left",
            }}
          />

          {/* Dynamic title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-xl sm:text-2xl md:text-3xl text-secondary font-medium">
              {dynamicText}
            </span>
            <span className="cursor text-accent text-2xl font-thin">|</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8 opacity-80"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="magnetic-btn px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-lg transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,158,11,0.5)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.3)"}
            >
              ✦ View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="gradient-border px-8 py-4 rounded-2xl text-white font-semibold text-base hover:bg-accent/5 transition-all duration-300"
            >
              ◈ Let's Talk
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-5 pb-20"
          >
            <span className="text-secondary/40 text-xs font-mono tracking-widest uppercase">Connect</span>
            <div className="w-8 h-px bg-white/10" />
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-secondary transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(245,158,11,0.15)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#f59e0b";
                      e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)";
                      e.currentTarget.style.background = "rgba(245,158,11,0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.borderColor = "rgba(245,158,11,0.15)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    aria-label={link.name}
                  >
                    {Icon && <Icon size={18} />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm">
            {[
              { value: "1.5+", label: "Years Exp." },
              { value: "3+", label: "Projects" },
              // { value: "1+", label: "Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-center sm:text-left"
              >
                <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                  {stat.value}
                </p>
                <p className="text-secondary/60 text-xs sm:text-sm mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1.5 text-secondary/40 hover:text-accent transition-colors group"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <div
          className="w-px h-8 transition-all duration-300 group-hover:opacity-100 opacity-40"
          style={{ background: "linear-gradient(to bottom, #f59e0b, transparent)" }}
        />
      </motion.button>
    </section>
  );
};

export default Hero;
