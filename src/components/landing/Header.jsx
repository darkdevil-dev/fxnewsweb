import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRAND, PLAY_STORE_URL } from "./links";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Download", href: PLAY_STORE_URL },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

function NavPill({ size = "md" }) {
  const base =
    size === "sm"
      ? "text-[11.5px] px-2.5 py-1"
      : "text-[13px] px-4 py-1.5";

  return (
    <ul className="flex items-center gap-0.5 rounded-full border border-[#E7E7E7] bg-white/70 px-1.5 py-1.5 backdrop-blur">
      {NAV.map((item) => (
        <li key={item.label}>
          {item.to ? (
            <Link
              to={item.to}
              className={`block rounded-full text-[#5A5A5A] transition-colors hover:bg-[#F4F4F4] hover:text-[#1f1f1f] ${base}`}
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`block rounded-full text-[#5A5A5A] transition-colors hover:bg-[#F4F4F4] hover:text-[#1f1f1f] ${base}`}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        lifted ? "bg-white/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#1f1f1f] sm:text-[17px]">
              {BRAND}
            </span>
          </Link>

          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
            <div className="pointer-events-auto">
              <NavPill />
            </div>
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#262626] px-3.5 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-[#111] sm:px-4 sm:text-[13px]"
          >
            Get the app
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex justify-center pb-3 md:hidden">
          <NavPill size="sm" />
        </div>
      </div>
    </motion.header>
  );
}