// Framer Motion animation variants — centralised for consistency

export const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100, delay },
  },
});

export const slideInFromLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 20, stiffness: 100, delay },
  },
});

export const slideInFromRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 20, stiffness: 100, delay },
  },
});

export const textVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1.25, delay },
  },
});

export const cardHover = {
  rest: { scale: 1, boxShadow: "0px 0px 0px rgba(145,94,255,0)" },
  hover: {
    scale: 1.04,
    boxShadow: "0px 20px 60px rgba(145,94,255,0.3)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};
