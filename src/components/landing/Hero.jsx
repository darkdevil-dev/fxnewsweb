import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { PLAY_STORE_URL } from "./links";
import Ticker from "./Ticker";

const HEADLINE = "The forex economic calendar, live to the second.".split(" ");
const EASE = [0.22, 1, 0.36, 1];

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};

const word = {
  hidden: { opacity: 0, y: 22, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero() {
  const x = useMotionValue(50);
  const y = useMotionValue(24);
  const sx = useSpring(x, { stiffness: 45, damping: 20 });
  const sy = useSpring(y, { stiffness: 45, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgba(0,0,0,0.07), transparent 70%)`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section id="overview" className="scroll-mt-20 px-4 pt-1 sm:px-6">
      <div
        onMouseMove={handleMove}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#E9E9E9] bg-white sm:rounded-[2rem]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [-40, 40, -40], y: [0, 34, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#EDEDED] blur-[70px] sm:h-96 sm:w-96"
          />
          <motion.div
            animate={{ x: [40, -40, 40], y: [10, -26, 10], scale: [1, 1.12, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#F1F1F1] blur-[70px] sm:h-80 sm:w-80"
          />
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#F4F4F4,transparent)]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#F2F2F2_1px,transparent_1px),linear-gradient(to_bottom,#F4F4F4_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

          <div className="absolute inset-y-0 left-1/2 flex w-full max-w-5xl -translate-x-1/2 justify-between px-8 sm:px-14">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="h-full w-px origin-top bg-[#F1F1F1]"
              />
            ))}
          </div>

          <motion.div
            initial={{ x: "-40%", opacity: 0 }}
            animate={{ x: "140%", opacity: [0, 1, 0] }}
            transition={{ duration: 5, delay: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
            className="absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#C9C9C9] to-transparent"
          />

          <motion.div style={{ background: glow }} className="absolute inset-0" />
        </div>

        <div className="relative px-5 py-14 text-center sm:px-10 sm:py-24">
          <motion.div
            {...fade(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white/80 px-3 py-1.5 text-[11.5px] font-medium text-[#5A5A5A] backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f1f1f] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1f1f1f]" />
            </span>
            Android app, now on Google Play
          </motion.div>

          <motion.h1
            variants={line}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-3xl text-[clamp(1.95rem,5.4vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1f1f1f]"
          >
            {HEADLINE.map((w, i) => (
              <motion.span key={i} variants={word} className="mr-[0.26em] inline-block">
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            {...fade(0.55)}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.65] text-[#737373] sm:mt-6 sm:text-[17px]"
          >
            Rate decisions, CPI prints and payrolls in one clean feed. Each release
            is rated for market impact, so you know what matters, with an alert the
            moment the number crosses.
          </motion.p>

          <motion.div {...fade(0.68)} className="mt-8 flex justify-center sm:mt-9">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#262626] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111] hover:shadow-[0_14px_34px_-14px_rgba(0,0,0,0.55)] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Play className="relative h-4 w-4" />
              <span className="relative">Download on Google Play</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p
            {...fade(0.8)}
            className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#B0B0B0]"
          >
            Free download · No account needed
          </motion.p>
        </div>

        <Ticker />
      </div>
    </section>
  );
}