import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics springs for ultra-smooth fluid movement
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.5 });

  // Slower, softer spring for the ambient luminous light halo
  const haloX = useSpring(mouseX, { stiffness: 100, damping: 24, mass: 0.8 });
  const haloY = useSpring(mouseY, { stiffness: 100, damping: 24, mass: 0.8 });

  useEffect(() => {
    // Only enable on devices that have a precise pointer (mouse / trackpad)
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse || shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detect when hovering interactive elements (buttons, links, cards)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* 1. Large subtle ambient luminous halo that glides across the webpage */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.045)_0%,rgba(16,185,129,0.025)_35%,transparent_70%)] blur-[40px]"
      />

      {/* 2. Precision cursor follower ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isVisible ? (isHovered ? 0.85 : 0.45) : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute h-8 w-8 rounded-full border border-neutral-900/35 bg-neutral-900/[0.03] backdrop-blur-[1px]"
      />

      {/* 3. Tiny center micro-dot */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
          opacity: isVisible ? 0.7 : 0,
        }}
        className="absolute h-1.5 w-1.5 rounded-full bg-neutral-900"
      />
    </div>
  );
}

