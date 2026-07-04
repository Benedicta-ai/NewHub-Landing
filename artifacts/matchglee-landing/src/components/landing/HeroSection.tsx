import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = true;

  const scrollToQuiz = () => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-[#F0199A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-[#7132C8]/10 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-7">
          <div className={`text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-white/40 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            They blend in.
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.02] tracking-tight text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "150ms" }}>
            One <span className={BRAND_GRADIENT_TEXT}>Stands Out.</span>
          </h1>
          <p className={`text-lg text-white/45 leading-relaxed max-w-md transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
            Where Professional Meets Personal — Seamlessly.
          </p>
          <div className={`flex flex-wrap gap-3 pt-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "450ms" }}>
            <button
              onClick={scrollToQuiz}
              className={`px-8 py-4 rounded-full text-base font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.4)] transition-all duration-300 flex items-center gap-2`}
            >
              Get Early Access To The App <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`relative flex justify-center items-center transition-all duration-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: "500ms" }}>
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="rounded-full bg-white/[0.04]" style={{ filter: "blur(1px)" }} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`absolute w-40 h-40 rounded-full ${BRAND_GRADIENT} blur-3xl opacity-60`} style={{ animation: "pulseGlow 4s ease-in-out infinite" }} />
              <div className={`relative w-28 h-28 rounded-full ${BRAND_GRADIENT} shadow-[0_0_90px_20px_rgba(240,25,154,0.45)]`} style={{ animation: "floatOrb 5s ease-in-out infinite" }} />
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white/70"
                style={{
                  top: `${20 + (i * 37) % 60}%`,
                  left: `${10 + (i * 53) % 80}%`,
                  animation: `floatParticle ${3 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.05)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.5} 50%{opacity:0.85} }
        @keyframes floatParticle { 0%,100%{transform:translate(0,0);opacity:0.3} 50%{transform:translate(6px,-10px);opacity:0.9} }
      `}</style>
    </section>
  );
}
