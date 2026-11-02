import React from "react";
import { motion } from "framer-motion";

const ITEMS = [
  "ECB decision",
  "US CPI",
  "Non-farm payrolls",
  "FOMC minutes",
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "XAU/USD",
  "Retail sales",
  "Manufacturing PMI",
  "BoJ policy",
  "UK GDP",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-t border-[#F0F0F0] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-8 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#A0A0A0]"
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
            <span className="h-1 w-1 rounded-full bg-[#D6D6D6]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}