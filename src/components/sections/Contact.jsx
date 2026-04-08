import React, { useState, Suspense, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import { contactInfo } from "../../constants";
import { fadeIn } from "../../utils/motion";
import GlobeCanvas from "../canvas/Globe";
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt 
} from "react-icons/fa";

const iconMap = {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt
};

const InputField = ({ label, name, type = "text", placeholder, value, onChange, rows, error, options }) => (
  <div className="flex flex-col gap-2 relative">
    <label className="text-secondary text-sm font-medium opacity-80">{label}</label>
    {options ? (
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl text-white text-sm bg-transparent outline-none transition-all appearance-none cursor-pointer ${
            error ? "border-red-500/50" : ""
          }`}
          style={{
            background: "rgba(255,255,255,0.025)",
            border: error ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(245,158,11,0.12)",
            color: value ? "#e2e8f0" : "#94a3b8",
          }}
          onFocus={e => {
            if(!error) {
              e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(245,158,11,0.08)";
            }
          }}
          onBlur={e => {
            if(!error) {
              e.currentTarget.style.borderColor = "rgba(245,158,11,0.12)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          <option value="" disabled className="bg-[#060a14] text-secondary">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#060a14] text-white">
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    ) : rows ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-white text-sm bg-transparent outline-none resize-none transition-all ${
          error ? "border-red-500/50" : ""
        }`}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: error ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(245,158,11,0.12)",
          color: "#e2e8f0",
        }}
        onFocus={e => {
          if(!error) {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(245,158,11,0.08)";
          }
        }}
        onBlur={e => {
          if(!error) {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.12)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-white text-sm bg-transparent outline-none transition-all ${
          error ? "border-red-500/50" : ""
        }`}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: error ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(245,158,11,0.12)",
          color: "#e2e8f0",
        }}
        onFocus={e => {
          if(!error) {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(245,158,11,0.08)";
          }
        }}
        onBlur={e => {
          if(!error) {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.12)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      />
    )}
    {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
  </div>
);

import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", customSubject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setErrors({});
        if (status === "error") setStatus("idle");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [status]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject) {
      newErrors.subject = "Please select a subject.";
    } else if (form.subject === "Other" && (!form.customSubject || !form.customSubject.trim())) {
      newErrors.customSubject = "Please specify your subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");
    
    try {
      const result = await emailjs.send(
        "service_05lretg",     
        "template_ge9twqb",   
        {
          from_name: form.name,
          to_name: "Muhammed Ashik",  
          from_email: form.email,
          to_email: "ashikidarathil@gmail.com",
          subject: form.subject === "Other" ? form.customSubject : form.subject,
          message: form.message,
        },
        "XKZinwi3tgAY0Lzoz"      
      );

      if (result.status === 200) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", customSubject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <SectionWrapper
      id="contact"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #0d1526 0%, #060a14 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="// get in touch"
          title="Let's Work Together"
          subtitle="Got a project in mind? Let's talk about how we can make it happen."
          centered
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          {/* Left — Form */}
          <motion.div variants={fadeIn("right", 0.1)} style={{ width: "100%", minWidth: 0 }} className="overflow-hidden">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@email.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="flex flex-col gap-5">
                <InputField
                  label="Subject"
                  name="subject"
                  placeholder="Select an inquiry type"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  options={[
                    "Website Design & Development",
                    "UI/UX Design",
                    "Mobile App Development",
                    "Freelance Project Inquiry",
                    "Full-time Opportunity",
                    "Just saying Hi!",
                    "Other"
                  ]}
                />
                
                {form.subject === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: -20 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InputField
                      label="Please Specify Subject"
                      name="customSubject"
                      placeholder="Type your subject here..."
                      value={form.customSubject}
                      onChange={handleChange}
                      error={errors.customSubject}
                    />
                  </motion.div>
                )}
              </div>
              
              <InputField
                label="Message"
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                error={errors.message}
              />

              {status === "error" && (
                <div className="p-3 rounded-lg text-sm text-red-500 bg-red-500/10 border border-red-500/20 text-center">
                  Something went wrong. Please try again later.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                whileHover={status === "idle" ? { y: -2 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 text-white mt-2 block"
                style={
                  status === "success"
                    ? { background: "rgba(20,184,166,0.2)", border: "1px solid rgba(20,184,166,0.4)", color: "#2dd4bf" }
                    : status === "sending"
                    ? { background: "rgba(245,158,11,0.15)", color: "#f59e0b", cursor: "not-allowed" }
                    : {
                        background: "linear-gradient(135deg, #f59e0b, #f97316)",
                        boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
                      }
                }
                onMouseEnter={e => status === "idle" && (e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,158,11,0.5)")}
                onMouseLeave={e => status === "idle" && (e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.3)")}
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </span>
                ) : status === "success" ? (
                  "✓ Message Sent!"
                ) : (
                  "Send Message →"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right — Globe + Info */}
          <motion.div variants={fadeIn("left", 0.2)} style={{ width: "100%", minWidth: 0 }} className="flex flex-col gap-8">
            {/* 3D Globe */}
            <div
              className="h-64 lg:h-80 rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(245,158,11,0.12)",
              }}
            >
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-secondary">Loading 3D...</div>}>
                <GlobeCanvas />
              </Suspense>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(245,158,11,0.1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
                    e.currentTarget.style.background = "rgba(245,158,11,0.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-accent text-xl transition-all duration-300"
                    style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    {(() => {
                      const Icon = iconMap[item.icon];
                      return Icon ? <Icon /> : item.icon;
                    })()}
                  </div>
                  <div>
                    <p className="text-secondary/50 text-xs font-mono uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;

