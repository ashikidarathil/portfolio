import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion";

const SectionWrapper = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    variants={staggerContainer(0.1, 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    className={`relative z-0 ${className}`}
  >
    {children}
  </motion.section>
);

export default SectionWrapper;
