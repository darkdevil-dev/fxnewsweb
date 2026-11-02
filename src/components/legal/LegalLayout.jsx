import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function LegalLayout({ title, updated, intro, sections }) {
  return (
    <div className="min-h-screen bg-white font-body text-[#1f1f1f] antialiased">
      <Header />
      <main className="px-4 sm:px-6">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl rounded-[1.75rem] border border-[#E9E9E9] px-6 py-12 sm:px-10 sm:py-16"
        >
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            {title}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A3A3A3]">
            Last updated {updated}
          </p>
          <p className="mt-7 text-[15px] leading-[1.7] text-[#6B6B6B]">{intro}</p>

          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-[15px] font-semibold text-[#1f1f1f]">{s.h}</h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-[#6B6B6B]">{s.p}</p>
              </section>
            ))}
          </div>
        </motion.article>
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}