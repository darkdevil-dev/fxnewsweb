import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Highlights from "@/components/landing/Highlights";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-body text-[#1f1f1f] antialiased">
      <Header />
      <main>
        <Hero />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}