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

// Modern Device Card Frame - Compact & Clean
function DeviceCard({ screen, onSelect }) {
  const Icon = screen.icon;

  return (
    <div
      onClick={() => onSelect(screen)}
      className="group relative flex-shrink-0 cursor-pointer select-none"
    >
      {/* Entire Device Chassis hovers as one physical phone unit */}
      <div className="relative w-[155px] sm:w-[180px] md:w-[200px] overflow-hidden rounded-[1.9rem] sm:rounded-[2.1rem] border-[4.5px] sm:border-[5px] border-[#1C1E22] bg-[#0E1013] p-1 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.03)] ring-1 ring-black/10 transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-[1.03] group-hover:border-[#383D45] group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.1)]">
        {/* Top Speaker / Sensor Notch */}
        <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2 flex items-center justify-center">
          <div className="h-3 w-14 sm:w-16 rounded-full bg-black/95 shadow-inner ring-1 ring-white/10 flex items-center justify-between px-1.5">
            <span className="h-1 w-1 rounded-full bg-blue-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 ring-1 ring-neutral-700" />
          </div>
        </div>

        {/* Screen Bezel & Image Container */}
        <div className="relative aspect-[9/19.8] w-full overflow-hidden rounded-[1.55rem] sm:rounded-[1.75rem] bg-[#08090A]">
          <img
            src={`/screenshots/${screen.file}`}
            alt={screen.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />

          {/* Subtle top reflection overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/35" />

          {/* Hover Expand Trigger Badge */}
          <div className="absolute inset-x-2.5 bottom-2.5 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-lg border border-white/20 bg-black/80 px-2.5 py-1.5 text-white shadow-lg backdrop-blur-md">
              <span className="text-[10.5px] font-medium tracking-tight">Inspect</span>
              <Maximize2 className="h-3 w-3 text-white/90" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption details below device */}
      <div className="mt-2.5 px-1 text-left transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-wider text-[#6B7280]">
            <Icon className="h-2.5 w-2.5 text-[#4B5563]" />
            {screen.kicker}
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="rounded-full bg-neutral-100 px-1 py-0.2 text-[8.5px] sm:text-[9px] font-medium text-neutral-600">
            {screen.badge}
          </span>
        </div>
        <h4 className="mt-0.5 text-[12px] sm:text-[13px] font-semibold leading-tight text-[#111827]">
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

          <h2 className="mx-auto mt-4 w-full text-[clamp(0.92rem,4.2vw,3.1rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-[#0F172A]">
            <span className="block whitespace-nowrap">Real-Time Economic Calendar.</span>
            <span className="block whitespace-nowrap text-[#64748B]">Ahead of Every Market Release.</span>
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

      {/* Centered Gallery Container - Stay in the middle, not full screen */}
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden rounded-[2rem] border border-black/[0.05] bg-gradient-to-b from-neutral-50/60 via-white to-neutral-50/40 py-6 sm:py-8 shadow-xs [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <motion.div
            animate={
              shouldReduceMotion || isPaused
                ? {}
                : { x: ["0%", "-50%"] }
            }
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-start gap-4 sm:gap-6 px-4"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScreen(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-[2rem] border border-black/[0.08] bg-white p-5 shadow-2xl md:flex-row md:items-center md:gap-8 md:p-7 md:overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedScreen(null)}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-[#4B5563] transition-colors hover:bg-neutral-200 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Contained Phone Mockup - Scaled to fit viewport height so it never cuts off */}
              <div className="flex flex-shrink-0 items-center justify-center py-2 md:py-0">
                <div className="relative h-[min(480px,64vh)] aspect-[9/19.5] overflow-hidden rounded-[2.2rem] border-[5px] border-[#1C1E22] bg-[#0E1012] p-1 shadow-2xl ring-1 ring-black/20">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-3 w-16 rounded-full bg-black/95 px-1.5 flex items-center justify-between ring-1 ring-white/10">
                      <span className="h-1 w-1 rounded-full bg-blue-500/60" />
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                    </div>
                  </div>

                  {/* Scrollable Screen inside frame so entire 2400px image can be examined */}
                  <div className="relative h-full w-full overflow-y-auto rounded-[1.8rem] bg-white scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <img
                      src={`/screenshots/${selectedScreen.file}`}
                      alt={selectedScreen.title}
                      className="w-full object-contain object-top"
                    />
                  </div>

                  {/* Scroll indicator hint at bottom of phone */}
                  <div className="pointer-events-none absolute inset-x-2 bottom-1.5 z-20 flex justify-center">
                    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-xs">
                      Scroll to explore
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature Details Panel */}
              <div className="mt-5 flex flex-1 flex-col justify-between text-left md:mt-0">
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

                  <div className="mt-5 space-y-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-4">
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

                {/* Lightbox Navigation & Direct View */}
                <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs font-mono text-[#9CA3AF]">
                    Use ← and → keys to switch
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`/screenshots/${selectedScreen.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>Full screen</span>
                    </a>
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

