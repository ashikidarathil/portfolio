import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ tag, title, subtitle, centered = false, light = false }) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {tag && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.35em] uppercase mb-3"
          style={{ color: "#14b8a6" }}
        >
          {tag}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed opacity-75"
          style={centered ? { margin: "0 auto" } : {}}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-5 h-0.5 w-16 rounded-full ${centered ? "mx-auto" : ""}`}
        style={{
          background: "linear-gradient(90deg, #f59e0b, #f97316, #14b8a6)",
          transformOrigin: centered ? "center" : "left",
        }}
      />
    </div>
  );
};

export default SectionHeader;
