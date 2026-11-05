import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Clock,
  Flame,
  BarChart3,
  Filter,
  Bell,
  Smartphone,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const SCREENS = [
  {
    id: 1,
    file: "1.png",
    kicker: "LIVE CALENDAR",
    icon: Clock,
    title: "Real-Time Event Feed",
    subtitle: "Central bank rate decisions, CPI inflation prints and payroll data streamed live to the exact release second.",
    badge: "Live Data Feed",
  },
  {
    id: 2,
    file: "2.png",
    kicker: "VOLATILITY RATINGS",
    icon: Flame,
    title: "Market Impact Categorization",
    subtitle: "High, medium, and low market impact tags indicate expected volatility before currency releases cross.",
    badge: "Risk Indicator",
  },
  {
    id: 3,
    file: "3.png",
    kicker: "CONSENSUS & ACTUALS",
    icon: BarChart3,
    title: "Forecast vs Actual Breakdown",
    subtitle: "Side-by-side view comparing market consensus forecasts, previous prints, and live published actuals.",
    badge: "Variance View",
  },
  {
    id: 4,
    file: "4.png",
    kicker: "CURRENCY FILTERS",
    icon: Filter,
    title: "Multi-Currency Watchlist",
    subtitle: "Filter releases by currency: focus exclusively on USD, EUR, GBP, JPY, CAD, AUD, or custom pairs.",
    badge: "Targeted Pairs",
  },
  {
    id: 5,
    file: "5.png",
    kicker: "INSTANT ALERTS",
    icon: Bell,
    title: "Sub-Second Push Notifications",
    subtitle: "Native push notifications fired the millisecond official numbers cross the global wire.",
    badge: "<200ms Trigger",
  },
  {
    id: 6,
    file: "6.png",
    kicker: "LOCAL TIMEZONE",
    icon: Smartphone,
    title: "Automatic Timezone Calibration",
    subtitle: "Automatic global time conversion synchronized directly with your local trading desk clock.",
    badge: "Local Sync",
  },
];

// Modern Device Card Frame
function DeviceCard({ screen, onSelect }) {
  const Icon = screen.icon;

  return (
    <div
      onClick={() => onSelect(screen)}
      className="group relative flex-shrink-0 cursor-pointer select-none transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Device Outer Chassis */}
      <div className="relative w-[210px] sm:w-[250px] md:w-[270px] overflow-hidden rounded-[2.2rem] border-[5px] sm:border-[6px] border-[#1E2024] bg-[#0E1013] p-1.5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/10 transition-all duration-300 group-hover:border-[#2C3036] group-hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.2)]">
        {/* Top Speaker / Sensor Notch */}
        <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 flex items-center justify-center">
          <div className="h-3.5 sm:h-4 w-18 sm:w-22 rounded-full bg-black/95 shadow-inner ring-1 ring-white/10 flex items-center justify-between px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
            <span className="h-2 w-2 rounded-full bg-neutral-900 ring-1 ring-neutral-700" />
          </div>
        </div>

        {/* Screen Bezel & Image Container */}
        <div className="relative aspect-[9/19.8] w-full overflow-hidden rounded-[1.8rem] bg-[#08090A]">
          <img
            src={`/screenshots/${screen.file}`}
            alt={screen.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Subtle top reflection overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/35" />

          {/* Hover Expand Trigger Badge */}
          <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-xl border border-white/20 bg-black/80 px-3 py-2 text-white shadow-lg backdrop-blur-md">
              <span className="text-[11.5px] font-medium tracking-tight">Inspect screen</span>
              <Maximize2 className="h-3.5 w-3.5 text-white/90" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption details below device */}
      <div className="mt-3.5 px-1.5 text-left">
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

export default function AppMotionGallery() {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Single horizontal row: all 6 screens duplicated for infinite continuous loop
  const galleryItems = [...SCREENS, ...SCREENS];

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
    <section id="features" className="scroll-mt-20 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header: Focused 100% on app features & trading value */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#4B5563] shadow-xs backdrop-blur">
            <Calendar className="h-3.5 w-3.5 text-neutral-800" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Live App Experience
            </span>
          </div>

          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#0F172A]">
            Real-Time Economic Calendar. <br className="hidden sm:inline" />
            <span className="text-[#64748B]">Ahead of Every Market Release.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4B5563] sm:text-[16.5px]">
            Track central bank rate decisions, US Non-Farm Payrolls, and inflation prints the instant they break.
            Compare consensus forecasts with live actual figures and receive sub-second push alerts directly on your Android device.
          </p>

          {/* Interactive hint */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF]">
            <span>Hover to pause</span>
            <span>•</span>
            <span>Click any screen to view details</span>
          </div>
        </div>
      </div>

      {/* Single Continuous Horizontal Motion Row */}
      <div className="mt-12 sm:mt-16">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <motion.div
            animate={
              shouldReduceMotion || isPaused
                ? {}
                : { x: ["0%", "-50%"] }
            }
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-start gap-5 sm:gap-7 px-4"
          >
            {galleryItems.map((screen, idx) => (
              <DeviceCard
                key={`gallery-${screen.id}-${idx}`}
                screen={screen}
                onSelect={setSelectedScreen}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Screen Detail Lightbox Modal */}
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

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto sm:overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl sm:flex-row sm:items-center sm:gap-8 sm:p-8"
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
              <div className="relative mx-auto w-[220px] sm:w-[270px] flex-shrink-0">
                <div className="relative overflow-hidden rounded-[2.3rem] border-[6px] border-[#1C1E22] bg-[#0E1012] p-1.5 shadow-2xl ring-1 ring-black/20">
                  {/* Speaker pill */}
                  <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-4 w-20 rounded-full bg-black/95 px-2 flex items-center justify-between ring-1 ring-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
                      <span className="h-2 w-2 rounded-full bg-neutral-800" />
                    </div>
                  </div>

                  <div className="relative aspect-[9/19.8] w-full overflow-hidden rounded-[1.9rem] bg-black">
                    <img
                      src={`/screenshots/${selectedScreen.file}`}
                      alt={selectedScreen.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Feature Details Panel */}
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
                      <span className="text-[#6B7280]">Trading Feature</span>
                      <span className="font-semibold text-[#111827]">{selectedScreen.badge}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Platform</span>
                      <span className="font-semibold text-[#111827]">Android App (Google Play)</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#6B7280]">Data Refresh Rate</span>
                      <span className="font-semibold text-emerald-600">Real-Time (Sub-second)</span>
                    </div>
                  </div>
                </div>

                {/* Lightbox Navigation */}
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
