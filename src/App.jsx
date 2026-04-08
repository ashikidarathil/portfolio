import React, { Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

// Loading fallback
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "#060a14" }}>
    <div className="flex flex-col items-center gap-5">
      {/* Amber spinner */}
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: "#f59e0b", borderRightColor: "rgba(245,158,11,0.3)" }}
        />
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "#14b8a6",
            borderRightColor: "rgba(20,184,166,0.3)",
            animationDirection: "reverse",
            animationDuration: "0.8s",
          }}
        />
      </div>
      <p className="text-secondary text-sm font-mono tracking-widest opacity-60">Loading Portfolio...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative overflow-x-hidden" style={{ background: "#060a14" }}>
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Ambient top glow — amber */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(245,158,11,0.06) 0%, transparent 60%)",
        }}
      />
      {/* Bottom teal glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 80% 100%, rgba(20,184,166,0.05) 0%, transparent 60%)",
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Suspense fallback={<LoadingScreen />}>
          <Hero />
        </Suspense>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
