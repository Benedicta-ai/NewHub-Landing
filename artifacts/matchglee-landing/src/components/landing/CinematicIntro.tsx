import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useVisible, useChapterObserver } from "@/lib/hooks";
import { BRAND_GRADIENT } from "@/lib/brand";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [activeChapter, setActiveChapter] = useState("ch-1");
  const [ch2Seen, setCh2Seen] = useState(false);

  const handleVisible = (id: string) => {
    setActiveChapter(id);
    if (id === "ch-2") setCh2Seen(true);
  };

  const Ch1 = () => {
    const ref = useChapterObserver(handleVisible, "ch-1");
    const [vRef, isVisible] = useVisible(0.2);
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id="ch-1"
        className="relative w-full h-screen flex flex-col justify-center items-center p-6 bg-black"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-1000 ${isVisible ? "opacity-10" : "opacity-0"}`}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 bg-white rounded-full"
              style={{ height: `${(i * 17 + 23) % 60 + 10}vh`, animation: `pulse ${(i % 3) + 1}s infinite`, animationDelay: `${(i * 0.1) % 1}s` }} />
          ))}
        </div>
        <div ref={vRef} className="z-10 text-center max-w-5xl space-y-10">
          <div className={`text-4xl md:text-7xl font-bold text-white transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            You wake up. You're a designer. A trail runner. A parent. A jazz fan. An entrepreneur.
          </div>
          <div className={`text-3xl md:text-5xl font-medium text-white/70 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "800ms" }}>
            But online... you have to pick.
          </div>
          <div className={`text-2xl md:text-4xl font-medium text-white/40 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "1600ms" }}>
            One profile. One persona. One version of you.
          </div>
        </div>
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${isVisible ? "opacity-40" : "opacity-0"} animate-bounce`} style={{ transitionDelay: "2400ms" }}>
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>
    );
  };

  const Ch2 = () => {
    const ref = useChapterObserver(handleVisible, "ch-2");
    const [vRef, isVisible] = useVisible(0.2);
    const profiles = [
      { label: "Professional only", color: "from-blue-600/30 to-blue-900/30", delay: 0 },
      { label: "Personal only",     color: "from-pink-600/30 to-pink-900/30", delay: 200 },
      { label: "Side hustle only",  color: "from-purple-600/30 to-purple-900/30", delay: 400 },
      { label: "Weekend only",      color: "from-emerald-600/30 to-emerald-900/30", delay: 600 }
    ];
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id="ch-2"
        className="relative w-full h-screen flex flex-col justify-center items-center p-6 bg-[#0A0118]"
        style={{ scrollSnapAlign: "start" }}
      >
        <div ref={vRef} className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {profiles.map((p, i) => (
            <div key={i} className={`aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-b ${p.color} p-4 flex flex-col justify-end transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"}`} style={{ transitionDelay: `${p.delay}ms` }}>
              <div className="w-12 h-12 rounded-full bg-white/20 mb-3 animate-pulse" />
              <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/10 rounded mb-6" />
              <div className="text-sm font-bold text-white uppercase tracking-wide">{p.label}</div>
            </div>
          ))}
        </div>
        <div className={`text-4xl md:text-7xl font-bold text-white text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "800ms" }}>
          Exhausting, isn't it?
        </div>
        <div className={`mt-14 flex flex-col items-center gap-4 transition-all duration-1000 ease-out ${ch2Seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "1400ms" }}>
          <button
            onClick={onComplete}
            className={`px-10 py-5 rounded-full text-xl font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_40px_rgba(240,25,154,0.5)] transition-all duration-300 flex items-center gap-3`}
          >
            There's a better way <ArrowRight className="w-6 h-6" />
          </button>
          <span className="text-white/25 text-sm tracking-widest uppercase">Get Early Access</span>
        </div>
      </section>
    );
  };

  return (
    <div className="w-full h-screen overflow-y-scroll font-sans relative bg-black" style={{ scrollSnapType: "y mandatory" }}>
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {["ch-1", "ch-2"].map((id, i) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center justify-end gap-2"
            aria-label={`Chapter ${i + 1}`}
          >
            <span className={`text-xs font-bold transition-opacity duration-300 ${activeChapter === id ? "opacity-100" : "opacity-0 group-hover:opacity-50"} text-white`}>{i + 1}</span>
            <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${activeChapter === id ? `scale-150 ${BRAND_GRADIENT} border-transparent` : "border-white/30 hover:scale-125"}`} />
          </button>
        ))}
      </div>
      <Ch1 />
      <Ch2 />
    </div>
  );
}
