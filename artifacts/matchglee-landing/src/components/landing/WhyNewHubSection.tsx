import Carousel from "./Carousel";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";

const items = [
  { icon: "✨", title: "Meaningful Connections", desc: "We focus on quality over quantity, always." },
  { icon: "🛡️", title: "Privacy", desc: "Your data is protected with enterprise-grade security." },
  { icon: "📦", title: "Everything in One Place", desc: "Connect, collaborate, and grow — seamlessly." },
  { icon: "📈", title: "Growth", desc: "Momentum for your career and your creative life." },
  { icon: "🪞", title: "Identity", desc: "One profile, every side of you." },
];

export default function WhyNewHubSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/8 bg-white/5 text-sm font-semibold tracking-[0.2em] uppercase text-white/40">
            Why NewHub
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Built different, <span className={BRAND_GRADIENT_TEXT}>on purpose.</span>
          </h2>
        </div>
        <Carousel items={items} />
      </div>
    </section>
  );
}
