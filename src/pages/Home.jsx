import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import AppleMotionGallery from "@/components/landing/AppleMotionGallery";
import Highlights from "@/components/landing/Highlights";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-body text-[#1f1f1f] antialiased selection:bg-neutral-900 selection:text-white">
      <Header />
      <main>
        <Hero />
        <AppleMotionGallery />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}
