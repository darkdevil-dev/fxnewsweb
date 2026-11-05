import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Bell,
  Clock,
  Filter,
  BarChart3,
  Flame,
  CheckCircle2,
} from "lucide-react";

const SCREENS = [
  {
    id: 1,
    file: "1.png",
    kicker: "CALENDAR FEED",
    icon: Clock,
    title: "Live Economic Timeline",
    subtitle: "Real-time feed of market-moving central bank decisions, CPI prints & payroll releases.",
    badge: "Live Updates",
    accent: "from-blue-500/10 to-indigo-500/5",
  },
  {
    id: 2,
    file: "2.png",
    kicker: "IMPACT RATINGS",
    icon: Flame,
    title: "Volatility & Impact Categorization",
    subtitle: "Instantly distinguish high, medium, and low volatility events before you execute a trade.",
    badge: "Risk Clarity",
    accent: "from-amber-500/10 to-red-500/5",
  },
  {
    id: 3,
    file: "3.png",
    kicker: "EVENT DETAILS",
    icon: BarChart3,
    title: "Consensus vs Actual Breakdown",
    subtitle: "Deep-dive event metrics displaying actual, forecast consensus and previous prints side by side.",
    badge: "Deviation View",
    accent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    id: 4,
    file: "4.png",
    kicker: "WATCHLIST",
    icon: Filter,
    title: "Multi-Currency Filters",
    subtitle: "Filter the calendar to your traded pairs: USD, EUR, GBP, JPY, CAD, AUD, and crosses.",
    badge: "Targeted Focus",
    accent: "from-purple-500/10 to-pink-500/5",
  },
  {
    id: 5,
    file: "5.png",
    kicker: "PUSH ENGINE",
    icon: Bell,
    title: "Instant Release Alerts",
    subtitle: "Sub-second push notifications triggered the millisecond official numbers cross the wire.",
    badge: "<200ms Trigger",
    accent: "from-rose-500/10 to-orange-500/5",
  },
  {
    id: 6,
    file: "6.png",
    kicker: "GLOBAL SYNC",
    icon: Smartphone,
    title: "Local Timezone Sync",
    subtitle: "Automatic timezone conversion calibrated directly to your regional desk clock.",
    badge: "Zero Math",
    accent: "from-cyan-500/10 to-blue-500/5",
  },
];

// Apple Device Card Frame
function DeviceFrame({ screen, onSelect }) {
  const Icon = screen.icon;

  return (
    <div
      onClick={() => onSelect(screen)}
      className="group relative flex-shrink-0 cursor-pointer select-none transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Device Outer Chassis - Apple Titanium Finish */}
      <div className="relative w-[240px] sm:w-[270px] overflow-hidden rounded-[2.2rem] sm:rounded-[2.4rem] border-[5px] sm:border-[6px] border-[#202225] bg-[#121316] p-1.5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-black/10 transition-all duration-300 group-hover:border-[#2C2F33] group-hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.22)]">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 flex items-center justify-center">
          <div className="h-4 w-20 sm:w-22 rounded-full bg-black/95 shadow-inner ring-1 ring-white/10 flex items-center justify-between px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
            <span className="h-2 w-2 rounded-full bg-neutral-900 ring-1 ring-neutral-700" />
          </div>
        </div>

        {/* Screen Bezel & Image Container */}
        <div className="relative aspect-[9/19.8] w-full overflow-hidden rounded-[1.8rem] sm:rounded-[1.95rem] bg-[#0E1012]">
          <img
            src={`/screenshots/${screen.file}`}
            alt={screen.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Frosted Glass Overlay Gradient (Apple subtle top glare) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />

          {/* Hover Action Badge: Click to expand */}
          <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-xl border border-white/20 bg-black/75 px-3 py-2 text-white shadow-lg backdrop-blur-md">
              <span className="text-[11.5px] font-medium tracking-tight">Expand view</span>
              <Maximize2 className="h-3.5 w-3.5 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption pill below device */}
      <div className="mt-3.5 px-2 text-left">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
            <Icon className="h-3 w-3 text-[#4B5563]" />
            {screen.kicker}
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9.5px] font-medium text-neutral-600">
            {screen.badge}
          </span>
        </div>
        <h4 className="mt-1 text-[13.5px] font-semibold leading-tight text-[#111827]">
          {screen.title}
        </h4>
      </div>
    </div>
  );
}

export default function AppleMotionGallery() {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Row 1: Screens 1 to 6 (duplicated for seamless loop)
  const row1Items = [...SCREENS, ...SCREENS];

  // Row 2: Alternate order for visual contrast (screens 4, 5, 6, 1, 2, 3 duplicated)
  const altScreens = [SCREENS[3], SCREENS[4], SCREENS[5], SCREENS[0], SCREENS[1], SCREENS[2]];
  const row2Items = [...altScreens, ...altScreens];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedScreen) return;
      if (e.key === "Escape") {
        setSelectedScreen(null);
      } else if (e.key === "ArrowRight") {
        const nextId = selectedScreen.id === 6 ? 1 : selectedScreen.id + 1;
        setSelectedScreen(SCREENS.find((s) => s.id === nextId));
      } else if (e.key === "ArrowLeft") {
        const prevId = selectedScreen.id === 1 ? 6 : selectedScreen.id - 1;
        setSelectedScreen(SCREENS.find((s) => s.id === prevId));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedScreen]);

  return (
    <section id="gallery" className="scroll-mt-24 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Kicker & Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#4B5563] shadow-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-neutral-800" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Apple-Inspired Interface
            </span>
          </div>

          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#0F172A]">
            Engineered for clarity. <br className="hidden sm:inline" />
            <span className="text-[#64748B]">Down to the millisecond.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#64748B] sm:text-[16.5px]">
            Explore the live Android mobile experience. Every screen is purposefully built
            to deliver lightning-fast macroeconomic context without chart clutter.
          </p>

          {/* Quick tips badge */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-[#94A3B8]">
            <span>Hover row to pause</span>
            <span>•</span>
            <span>Click any phone to inspect</span>
          </div>
        </div>
      </div>

      {/* Horizontal Motion Rows Container */}
      <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-10">
        {/* ROW 1: Scrolls to Left */}
        <div
          onMouseEnter={() => setIsPausedRow1(true)}
          onMouseLeave={() => setIsPausedRow1(false)}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <motion.div
            animate={
              shouldReduceMotion || isPausedRow1
                ? {}
                : { x: ["0%", "-50%"] }
            }
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-start gap-6 sm:gap-8 px-4"
          >
            {row1Items.map((screen, idx) => (
              <DeviceFrame
                key={`row1-${screen.id}-${idx}`}
                screen={screen}
                onSelect={setSelectedScreen}
              />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolls to Right (Opposite Direction) */}
        <div
          onMouseEnter={() => setIsPausedRow2(true)}
          onMouseLeave={() => setIsPausedRow2(false)}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <motion.div
            animate={
              shouldReduceMotion || isPausedRow2
                ? {}
                : { x: ["-50%", "0%"] }
            }
            transition={{
              duration: 46,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-start gap-6 sm:gap-8 px-4"
          >
            {row2Items.map((screen, idx) => (
              <DeviceFrame
                key={`row2-${screen.id}-${idx}`}
                screen={screen}
                onSelect={setSelectedScreen}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal (Apple Detail Inspection View) */}
      <AnimatePresence>
        {selectedScreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScreen(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl sm:flex-row sm:items-center sm:gap-8 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedScreen(null)}
                aria-label="Close modal"
                className="absolute right-5 top-5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-[#4B5563] transition-colors hover:bg-neutral-200 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Large Device View */}
              <div className="relative mx-auto w-[230px] sm:w-[280px] flex-shrink-0">
                <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-[#1F2226] bg-[#121316] p-1.5 shadow-2xl ring-1 ring-black/20">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-4 w-22 rounded-full bg-black/95 px-2 flex items-center justify-between ring-1 ring-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
                      <span className="h-2 w-2 rounded-full bg-neutral-800" />
                    </div>
                  </div>

                  <div className="relative aspect-[9/19.8] w-full overflow-hidden rounded-[2rem] bg-black">
                    <img
                      src={`/screenshots/${selectedScreen.file}`}
                      alt={selectedScreen.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Explanation Panel */}
              <div className="mt-6 flex flex-1 flex-col justify-between text-left sm:mt-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Screen 0{selectedScreen.id} • {selectedScreen.kicker}</span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                    {selectedScreen.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                    {selectedScreen.subtitle}
                  </p>

                  <div className="mt-6 space-y-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-4">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Key Capability</span>
                      <span className="font-semibold text-[#111827]">{selectedScreen.badge}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Delivery Channel</span>
                      <span className="font-semibold text-[#111827]">Android Native Notification</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Update Frequency</span>
                      <span className="font-semibold text-emerald-600">Live (Sub-second)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation in Modal */}
                <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-4">
                  <div className="text-xs font-mono text-[#9CA3AF]">
                    Use ← and → keys to switch
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const prevId = selectedScreen.id === 1 ? 6 : selectedScreen.id - 1;
                        setSelectedScreen(SCREENS.find((s) => s.id === prevId));
                      }}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
                      aria-label="Previous screen"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        const nextId = selectedScreen.id === 6 ? 1 : selectedScreen.id + 1;
                        setSelectedScreen(SCREENS.find((s) => s.id === nextId));
                      }}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
                      aria-label="Next screen"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
