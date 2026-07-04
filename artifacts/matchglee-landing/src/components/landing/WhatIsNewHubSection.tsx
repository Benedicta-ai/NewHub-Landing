import Carousel from "./Carousel";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";

const items = [
  { icon: "👤", title: "Personal", desc: "Connect with people beyond work." },
  { icon: "💼", title: "Professional", desc: "Grow your network and discover opportunities." },
  { icon: "🌐", title: "Communities", desc: "Find your people and share what you love." },
];

export default function WhatIsNewHubSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/8 bg-white/5 text-sm font-semibold tracking-[0.2em] uppercase text-white/40">
            What Is NewHub
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Three sides. <span className={BRAND_GRADIENT_TEXT}>One you.</span>
          </h2>
        </div>
        <Carousel items={items} />
      </div>
    </section>
  );
}
