import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Play, Zap, TrendingUp } from "lucide-react";
import { PLAY_STORE_URL } from "./links";
import Ticker from "./Ticker";

const HEADLINE = "The forex economic calendar, live to the second.".split(" ");
const EASE = [0.22, 1, 0.36, 1];

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const word = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse coordinate values (0 to 100% for spotlight, -0.5 to 0.5 for 3D tilt)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Smooth springs for fluid Apple-style motion physics
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });
  const tiltX = useSpring(normY, { stiffness: 100, damping: 24, mass: 0.6 });
  const tiltY = useSpring(normX, { stiffness: 100, damping: 24, mass: 0.6 });

  // 3D subtle tilt transforms
  const rotateX = useTransform(tiltX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [3.5, -3.5]);
  const rotateY = useTransform(tiltY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-3.5, 3.5]);

  // Floating parallax chip transforms
  const chip1X = useTransform(tiltY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-16, 16]);
  const chip1Y = useTransform(tiltX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-12, 12]);
  const chip2X = useTransform(tiltY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [16, -16]);
  const chip2Y = useTransform(tiltX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [12, -12]);

  // Luminous white & soft iris glow (REPLACED old dark/black shadow with bright crystalline glow)
  const spotlightGlow = useMotionTemplate`radial-gradient(680px circle at ${springX}% ${springY}%, rgba(255, 255, 255, 0.95), rgba(243, 246, 255, 0.45) 35%, transparent 70%)`;
  const ambientSheen = useMotionTemplate`radial-gradient(520px circle at ${springX}% ${springY}%, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.03) 45%, transparent 70%)`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const nX = (e.clientX - rect.left) / rect.width - 0.5;
    const nY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
    normX.set(nX);
    normY.set(nY);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(35);
    normX.set(0);
    normY.set(0);
  };

  return (
    <section id="overview" className="scroll-mt-20 px-4 pt-1 sm:px-6">
      <div className="perspective-1000 mx-auto max-w-6xl">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative overflow-hidden rounded-[2rem] border border-[#EBEBEB] bg-gradient-to-b from-white via-[#FCFCFD] to-[#F7F8FA] shadow-[0_12px_44px_-16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-16px_rgba(0,0,0,0.09)] sm:rounded-[2.5rem]"
        >
          {/* Luminous light layer - Clean Apple lighting, no dark muddy blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Soft, light pearlescent ambient glows */}
            <motion.div
              animate={shouldReduceMotion ? {} : { x: [-30, 30, -30], y: [0, 20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-50/60 to-indigo-50/40 blur-[80px]"
            />
            <motion.div
              animate={shouldReduceMotion ? {} : { x: [30, -30, 30], y: [10, -20, 10] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-gradient-to-bl from-emerald-50/50 to-teal-50/30 blur-[80px]"
            />

            {/* Subtle precision technical grid in clean light gray */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#F0F1F3_1px,transparent_1px),linear-gradient(to_bottom,#F0F1F3_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_25%,black,transparent)] opacity-70" />

            {/* Pristine cursor moving light beam & sheen */}
            <motion.div style={{ background: spotlightGlow }} className="absolute inset-0" />
            <motion.div style={{ background: ambientSheen }} className="absolute inset-0" />

            {/* Micro light beam along top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D0D4DC] to-transparent opacity-60" />
          </div>

          {/* Floating Telemetry Chip - Left: US CPI (Responsive desktop) */}
          <motion.div
            style={{ x: chip1X, y: chip1Y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-none absolute left-6 top-16 z-20 hidden rounded-2xl border border-black/[0.06] bg-white/80 p-3.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.06)] backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-tight text-[#111827]">
                  <span>US CPI (MoM)</span>
                  <span className="rounded bg-emerald-100 px-1 py-0.2 text-[9.5px] font-bold text-emerald-700">
                    +0.2%
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6B7280]">Consensus: +0.3% • Low Vol</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Telemetry Chip - Right: ECB Rate Decision (Responsive desktop) */}
          <motion.div
            style={{ x: chip2X, y: chip2Y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="pointer-events-none absolute right-6 top-20 z-20 hidden rounded-2xl border border-black/[0.06] bg-white/80 p-3.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.06)] backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Zap className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-tight text-[#111827]">
                  <span>ECB Rate Call</span>
                  <span className="rounded bg-amber-100 px-1 py-0.2 text-[9.5px] font-bold text-amber-700">
                    HIGH IMPACT
                  </span>
                </div>
                <p className="text-[10.5px] text-[#6B7280]">Push alert sent: 0.18s</p>
              </div>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="relative z-10 px-5 py-14 text-center sm:px-10 sm:py-24">
            {/* Top pill badge */}
            <motion.div
              {...fade(0.04)}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-[#374151] shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Android app • Available on Google Play</span>
            </motion.div>

            {/* Apple-grade High-Impact Typography */}
            <motion.h1
              variants={line}
              initial="hidden"
              animate="show"
              className="mx-auto mt-6 max-w-3xl text-[clamp(2.1rem,5.6vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#0F172A]"
            >
              {HEADLINE.map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.25em] inline-block">
                  {w}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fade(0.5)}
              className="mx-auto mt-5 max-w-xl text-[15.5px] leading-[1.68] text-[#4B5563] sm:mt-6 sm:text-[17.5px]"
            >
              Rate decisions, CPI prints and payrolls in one live, distraction-free feed.
              Every release is rated for market volatility, with instant push alerts the moment the number crosses.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div {...fade(0.65)} className="mt-8 flex justify-center sm:mt-9">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#111827] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.45)] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Play className="relative h-4 w-4 fill-white" />
                <span className="relative">Download on Google Play</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          <Ticker />
        </motion.div>
      </div>
    </section>
  );
}
