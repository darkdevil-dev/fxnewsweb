import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import AppMotionGallery from "@/components/landing/AppMotionGallery";
import Highlights from "@/components/landing/Highlights";
import Footer from "@/components/landing/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white font-body text-[#1f1f1f] antialiased selection:bg-neutral-900 selection:text-white">
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <AppMotionGallery />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}
