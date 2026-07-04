import Carousel from "./Carousel";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";

const items = [
  { title: "Dual Personalities", desc: "Be your professional best while staying true to yourself." },
  { title: "Authentic Networking", desc: "Real connections, not transactional small talk." },
  { title: "Communities", desc: "Micro-spaces where your people already are." },
  { title: "Professional Identity", desc: "Your career, presented with context and nuance." },
  { title: "Personal Identity", desc: "Passions and quirks, fully in the frame." },
  { title: "Creator Economy", desc: "Turn your side projects into real opportunities." },
  { title: "Career Growth", desc: "Mentorship and momentum, without the noise." },
  { title: "Meaningful Relationships", desc: "Depth over volume, always." },
];

export default function BuiltForAllSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/8 bg-white/5 text-sm font-semibold tracking-[0.2em] uppercase text-white/40">
            Built For All Of You
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Every side of you, <span className={BRAND_GRADIENT_TEXT}>in one place.</span>
          </h2>
        </div>
        <Carousel items={items} />
      </div>
    </section>
  );
}
