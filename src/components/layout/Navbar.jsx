import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "../../constants";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-amber-500/10 shadow-lg shadow-black/40"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "rgba(6,10,20,0.75)", backdropFilter: "blur(20px)" } : {}}
      >
        {/* Amber accent line on scroll */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-white text-lg shadow-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                }}
              >
                {personalInfo.name.charAt(9)}
              </div>
              <span className="font-display font-bold text-white text-lg hidden sm:block group-hover:text-accent transition-colors duration-300">
                {personalInfo.name.split(" ")[1]}
                <span className="text-accent">.</span>dev
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group animated-underline ${
                    active === link.id
                      ? "text-accent"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={personalInfo.resumeLink}
                className="magnetic-btn px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.45)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,158,11,0.25)"}
              >
                <div className="flex items-center gap-2">
                  <span>Resume</span>
                  <HiOutlineDocumentDownload size={18} className="translate-y-[0.5px]" />
                </div>
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white rounded-full origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-72 flex flex-col pt-24 pb-8 px-6 md:hidden"
            style={{
              background: "rgba(6,10,20,0.97)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(245,158,11,0.12)",
            }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }}
            />

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    active === link.id
                      ? "text-amber-400"
                      : "text-secondary hover:text-white hover:bg-white/5"
                  }`}
                  style={
                    active === link.id
                      ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }
                      : {}
                  }
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href={personalInfo.resumeLink}
                className="block w-full text-center px-5 py-3 rounded-xl text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Download Resume</span>
                  <HiOutlineDocumentDownload size={20} />
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
