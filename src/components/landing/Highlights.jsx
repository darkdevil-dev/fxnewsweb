import React from "react";
import { motion } from "framer-motion";
import { CalendarClock, Activity, BellRing } from "lucide-react";

const ITEMS = [
  {
    icon: CalendarClock,
    title: "Economic calendar",
    copy: "Rate decisions, CPI prints and payrolls on one timeline.",
  },
  {
    icon: Activity,
    title: "Impact ratings",
    copy: "See how hard a release can hit before you commit.",
  },
  {
    icon: BellRing,
    title: "Release alerts",
    copy: "A push notification the moment the number crosses.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Highlights() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3 sm:gap-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: EASE }}
              className="rounded-2xl border border-[#EDEDED] bg-white p-5 transition-colors hover:border-[#DFDFDF]"
            >
              <Icon className="h-4 w-4 text-[#3A3A3A]" strokeWidth={1.7} />
              <h2 className="mt-4 text-[14px] font-semibold text-[#1f1f1f]">
                {item.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#7A7A7A]">
                {item.copy}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}