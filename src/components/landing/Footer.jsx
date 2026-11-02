import React from "react";
import { Link } from "react-router-dom";
import { BRAND, PLAY_STORE_URL } from "./links";

const LINK = "text-[13px] text-[#5A5A5A] transition-colors hover:text-[#1f1f1f]";

export default function Footer() {
  return (
    <footer className="border-t border-[#F0F0F0] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="flex flex-col gap-9 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 1.5 22.5 21.5H1.5L12 1.5Z" fill="#1f1f1f" />
                <path d="M12 9.5 17.2 20H6.8L12 9.5Z" fill="#fff" />
              </svg>
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#1f1f1f]">
                {BRAND}
              </span>
            </Link>
            <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-[#8A8A8A]">
              Forex news and the economic calendar, timed to the release second.
            </p>
            <p className="mt-3 text-[12.5px] text-[#8A8A8A]">
              © 2026 Amanblaze. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:gap-x-14">
            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B0B0B0]">
                Contact
              </p>
              <a href="mailto:support@amanblaze.in" className={`block ${LINK}`}>
                support@amanblaze.in
              </a>
              <a
                href="https://x.com/BuildByAman"
                target="_blank"
                rel="noreferrer"
                className={`block ${LINK}`}
              >
                Developer on X
              </a>
            </div>

            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B0B0B0]">
                App
              </p>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className={`block ${LINK}`}
              >
                Google Play
              </a>
              <Link to="/privacy" className={`block ${LINK}`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`block ${LINK}`}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden">
        <div className="translate-y-[16%] select-none whitespace-nowrap text-center text-[clamp(3rem,15vw,11rem)] font-semibold leading-[0.78] tracking-[-0.055em] text-[#F5F5F5]">
          {BRAND}
        </div>
      </div>
    </footer>
  );
}