import React from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "../../constants";
import {
  FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram,
} from "react-icons/fa";

const iconMap = { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram };

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative py-10 px-4"
      style={{ background: "#060a14", borderTop: "1px solid rgba(245,158,11,0.08)" }}
    >
      {/* Amber gradient top line */}
      <div className="neon-line mb-8" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-white text-xl">
            {personalInfo.name.split(" ")[1]}
            <span className="text-accent">.</span>dev
          </p>
          <p className="text-secondary text-sm mt-1 opacity-60">
            Building the future, one commit at a time.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
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
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(245,158,11,0.1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#f59e0b";
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                  e.currentTarget.style.background = "rgba(245,158,11,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                aria-label={link.name}
              >
                {Icon && <Icon size={18} />}
              </motion.a>
            );
          })}
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollTop}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.25)",
            color: "#f59e0b",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.08)"}
        >
          ↑ Top
        </motion.button>
      </div>

      <p className="text-center text-secondary/30 text-xs mt-8">
        © {new Date().getFullYear()} {personalInfo.name}
      </p>
    </footer>
  );
};

export default Footer;
