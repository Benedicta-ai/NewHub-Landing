import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Circle, CheckCircle2, Loader2 } from "lucide-react";

// ===================== SHARED HOOK =====================

function useChapterObserver(onVisible: (id: string) => void, id: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(id); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [id, onVisible]);
  return ref;
}

function useVisible() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return [ref, isVisible] as const;
}

// ===================== QUIZ PHASE =====================

function QuizPhase({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ focus: "", hurdle: "" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (cb: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => { cb(); setIsTransitioning(false); }, 600);
  };

  const handleFocus = (value: string) => {
    setAnswers(prev => ({ ...prev, focus: value }));
    triggerTransition(() => setStep(1));
  };

  const handleHurdle = (value: string) => {
    setAnswers(prev => ({ ...prev, hurdle: value }));
    triggerTransition(() => setStep(2));
  };

  const personalizedMessage = (() => {
    if (answers.focus === "Both, honestly" && answers.hurdle === "I have to pick one version of myself")
      return "That's exactly why MatchGlee exists. You shouldn't have to choose.";
    if (answers.hurdle === "It feels too transactional")
      return "We're over the transaction, too. Let's build real connections.";
    if (answers.hurdle === "It's overwhelming and noisy")
      return "Cut through the noise. Find your people, on your terms.";
    return "Ready for a space that actually gets you?";
  })();

  const g = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400";
  const card = "bg-white/5 backdrop-blur-md border border-white/10 hover:border-transparent hover:bg-white/10 transition-all duration-300 rounded-3xl relative group overflow-hidden cursor-pointer";
  const glow = "absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl";

  const dots = (
    <div className="flex gap-2 items-center justify-center mb-8">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
          i === step ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500" :
          i < step ? "w-2 bg-white/40" : "w-2 bg-white/10"
        }`} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0118] text-white font-sans overflow-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] -left-20 w-[60rem] h-[60rem] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] -right-20 w-[60rem] h-[60rem] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className={`fixed inset-0 z-50 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 transition-transform duration-700 ease-in-out ${isTransitioning ? "translate-x-0" : "translate-x-full"}`} style={{ transformOrigin: "left" }} />

      <header className="relative z-20 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-lg font-bold">Match<span className="text-pink-500">Glee</span></span>
        </div>
        <button onClick={onComplete} className="text-sm text-white/40 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">
          Skip intro
        </button>
      </header>

      <main className="flex-1 flex flex-col relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 pt-4 md:pt-8">

        {/* Step 0: Focus */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 0 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          {dots}
          <p className="text-lg md:text-xl text-center text-white/50 mb-4 font-medium">Before we talk about MatchGlee...</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-tight leading-tight">
            What describes you <span className={g}>best</span> right now?
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3 max-w-3xl mx-auto w-full">
            {[
              { id: "Building my career", icon: "🎯", label: "Professional focus" },
              { id: "Exploring my passions", icon: "🌟", label: "Personal focus" },
              { id: "Both, honestly", icon: "⚡", label: "Dual focus" }
            ].map(opt => (
              <button key={opt.id} onClick={() => handleFocus(opt.id)} className={`p-8 ${card} flex flex-col items-center text-center gap-4`}>
                <div className={glow} />
                <span className="text-4xl relative z-10">{opt.icon}</span>
                <span className="text-xl font-bold relative z-10">{opt.id}</span>
                <span className="text-sm text-white/50 font-medium relative z-10">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Hurdle */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 1 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          {dots}
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight leading-tight max-w-2xl mx-auto">
            What's hardest about connecting online?
          </h2>
          <div className="grid gap-4 max-w-xl mx-auto w-full">
            {[
              "It feels too transactional",
              "I have to pick one version of myself",
              "It's overwhelming and noisy"
            ].map(opt => (
              <button key={opt} onClick={() => handleHurdle(opt)} className={`p-6 md:p-8 ${card} flex items-center justify-between`}>
                <div className={glow} />
                <span className="text-xl font-medium relative z-10 text-left">{opt}</span>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-pink-400 group-hover:translate-x-1 transition-all relative z-10" />
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Reveal */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 2 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          {dots}
          <div className="max-w-3xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 leading-tight">
              {personalizedMessage}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center mb-14">
              <span className="px-5 py-2.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">{answers.focus || "Dual Focus"}</span>
              <span className="px-5 py-2.5 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium border border-pink-500/30">Values Authenticity</span>
              <span className="px-5 py-2.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">Anti-Noise</span>
            </div>
            <button
              onClick={() => triggerTransition(() => setStep(3))}
              className="px-8 py-4 rounded-full text-lg font-bold bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              See how it unfolds <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step 3: Bridge to Cinematic */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 3 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          {dots}
          <div className="max-w-xl mx-auto w-full text-center">
            <div className="text-7xl mb-8 animate-pulse">✨</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your story <span className={g}>begins</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              We've built a journey tailored for someone exactly like you. Scroll through MatchGlee's world.
            </p>
            <button
              onClick={onComplete}
              className="px-10 py-5 rounded-full text-xl font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Begin <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
            <p className="text-xs text-white/30 mt-6 tracking-widest uppercase">Scroll to experience MatchGlee</p>
          </div>
        </div>

      </main>
    </div>
  );
}

// ===================== CINEMATIC CHAPTERS =====================

function Chapter1({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-1");
  const [vRef, isVisible] = useVisible();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-1" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-black" style={{ scrollSnapAlign: "start" }}>
      <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-1000 ${isVisible ? "opacity-10" : "opacity-0"}`}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${Math.random() * 60 + 10}vh`, animation: `pulse ${Math.random() * 2 + 1}s infinite`, animationDelay: `${Math.random()}s` }} />
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
}

function Chapter2({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-2");
  const [vRef, isVisible] = useVisible();
  const profiles = [
    { label: "Professional only", color: "from-blue-600/30 to-blue-900/30", delay: 0 },
    { label: "Personal only", color: "from-pink-600/30 to-pink-900/30", delay: 200 },
    { label: "Side hustle only", color: "from-purple-600/30 to-purple-900/30", delay: 400 },
    { label: "Weekend only", color: "from-emerald-600/30 to-emerald-900/30", delay: 600 }
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-2" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]" style={{ scrollSnapAlign: "start" }}>
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
    </section>
  );
}

// ---- IRIDESCENT PEARL CHAPTERS (3, 4, 5) ----

const pearlGradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400";
const pearlCard = "bg-white border border-[#E9E5FF] shadow-[0_4px_24px_rgba(196,181,253,0.15)] rounded-3xl";
const pearlHeading = "text-[#1A1035]";
const pearlBody = "text-[#4A4566]";

function Chapter3({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-3");
  const [vRef, isVisible] = useVisible();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-3" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#FAFAFF]" style={{ scrollSnapAlign: "start" }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] -left-10 w-[40rem] h-[40rem] bg-[#C4B5FD] rounded-full blur-[120px] mix-blend-multiply opacity-[0.08]" />
        <div className="absolute top-[20%] -right-10 w-[35rem] h-[35rem] bg-[#FDA4AF] rounded-full blur-[100px] mix-blend-multiply opacity-[0.06]" />
      </div>

      <div ref={vRef} className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-16 h-16 rounded-2xl object-cover mb-8 shadow-[0_4px_20px_rgba(196,181,253,0.3)]" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E5FF] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
            <span className={`text-xs font-medium ${pearlBody}`}>Meet MatchGlee</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 ${pearlHeading}`}>
            Where Personal Meets <span className={pearlGradientText}>Professional</span> — Seamlessly
          </h2>
          <p className={`text-lg md:text-xl mb-10 leading-relaxed max-w-xl ${pearlBody}`}>
            MatchGlee helps you connect, express, and grow — all in one space. No more choosing between your work persona and your true passions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className={`flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 text-white shadow-[0_4px_14px_rgba(196,181,253,0.4)]`}>
              Get Started <ArrowRight className="w-4 h-4" />
            </span>
            <span className={`px-7 py-3.5 rounded-full text-base font-semibold bg-white border border-[#C4B5FD] ${pearlBody} shadow-sm`}>
              Learn More
            </span>
          </div>
        </div>

        <div className={`relative flex justify-center items-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: "300ms" }}>
          <div className="relative z-10 w-[270px] md:w-[320px] rounded-[3rem] p-3 bg-white border border-[#E9E5FF] shadow-[0_20px_60px_-15px_rgba(196,181,253,0.4)] md:-rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FAFAFF] border border-[#E9E5FF] rounded-full z-20" />
            <div className="rounded-[2.25rem] overflow-hidden bg-white border border-[#E9E5FF]">
              <img src="/__mockup/images/matchglee-app-ui.png" alt="MatchGlee App" className="w-full h-auto" />
            </div>
          </div>
          <div className={`absolute -right-4 top-16 w-48 p-4 ${pearlCard} z-20 hidden md:block`} style={{ animation: "bounce 4s infinite" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FDA4AF] to-[#C4B5FD]" />
              <div>
                <div className={`text-xs font-bold ${pearlHeading}`}>New Connection</div>
                <div className={`text-[10px] ${pearlBody}`}>Alex liked your portfolio ✨</div>
              </div>
            </div>
          </div>
          <div className={`absolute -left-10 bottom-20 w-52 p-4 ${pearlCard} z-20 hidden md:block`} style={{ animation: "bounce 5s infinite 0.5s" }}>
            <div className={`text-xs font-bold ${pearlHeading} mb-1`}>Sarah A.</div>
            <div className={`text-[10px] ${pearlBody}`}>Let's collaborate on that design project! ✨</div>
          </div>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
    </section>
  );
}

function Chapter4({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-4");
  const [vRef, isVisible] = useVisible();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-4" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-gradient-to-b from-[#FAFAFF] to-white" style={{ scrollSnapAlign: "start" }}>
      <div className="max-w-4xl mx-auto w-full">
        <div ref={vRef} className={`p-8 md:p-14 ${pearlCard} relative overflow-hidden transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F3F0FF] rounded-full blur-[40px] opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FFF0F2] rounded-full blur-[40px] opacity-60" />
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 relative z-10 ${pearlHeading}`}>
            The Story of <span className={pearlGradientText}>MatchGlee</span>
          </h2>
          <div className={`space-y-6 text-lg md:text-xl leading-relaxed relative z-10 border-l-2 border-[#FDA4AF] pl-6 md:pl-10 py-2 ${pearlBody}`}>
            <p className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`} style={{ transitionDelay: "200ms" }}>
              In a world where networking feels forced and social platforms feel overwhelming, MatchGlee was born to bridge the gap.
            </p>
            <p className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`} style={{ transitionDelay: "500ms" }}>
              We realized people aren't just professionals or just individuals — they are both. Your passions, your work, your vibe — everything deserves a space that feels natural.
            </p>
            <p className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`} style={{ transitionDelay: "800ms" }}>
              MatchGlee isn't just about connecting profiles. It's about connecting people — authentically. Whether you're sharing your story, showcasing your work, or finding your tribe — <span className={`font-semibold ${pearlHeading}`}>MatchGlee lets you do it your way.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter5({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-5");
  const [vRef, isVisible] = useVisible();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-5" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#F8F5FF]" style={{ scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50" />
      <div ref={vRef} className="max-w-5xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className={`inline-block mb-8 px-5 py-2 rounded-full border border-[#E9E5FF] bg-white shadow-sm text-sm font-semibold tracking-[0.2em] uppercase text-[#C4B5FD]`}>
            Our Mission
          </div>
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${pearlHeading} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "200ms" }}>
          To create a platform where{" "}
          <span className={pearlGradientText}>personal expression</span>{" "}
          and{" "}
          <span className={pearlGradientText}>professional identity</span>{" "}
          coexist effortlessly — empowering meaningful connections without boundaries.
        </h2>
        <div className={`mt-12 flex justify-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "600ms" }}>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400" />
        </div>
      </div>
    </section>
  );
}

// ---- BACK TO DARK ----

function Chapter6({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-6");
  const [vRef, isVisible] = useVisible();
  const lines = [
    "Personal mode. Professional mode. You, always.",
    "Connect by intent, not algorithm.",
    "Your story. Your audience. Your control."
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-6" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-start p-6 md:p-20 bg-[#080818]" style={{ scrollSnapAlign: "start" }}>
      <div ref={vRef} className="max-w-6xl mx-auto w-full space-y-14 md:space-y-20">
        {lines.map((line, i) => (
          <div key={i} className="relative inline-block">
            <h3 className={`text-3xl md:text-6xl lg:text-7xl font-bold text-white transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`} style={{ transitionDelay: `${i * 500}ms` }}>
              {line}
            </h3>
            <div className={`absolute -bottom-3 md:-bottom-6 left-0 h-1 md:h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent transition-all duration-1000 ease-out`} style={{ width: isVisible ? "100%" : "0%", transitionDelay: `${(i * 500) + 300}ms` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Chapter7({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-7");
  const [vRef, isVisible] = useVisible();
  const profiles = [
    { name: "Sarah A.", role: "Designer & trail runner", color: "from-purple-400 to-pink-500" },
    { name: "Marcus K.", role: "VC partner & jazz musician", color: "from-blue-400 to-purple-500" },
    { name: "Priya R.", role: "Engineer & ceramicist", color: "from-pink-400 to-orange-400" },
    { name: "Tolu B.", role: "Photographer & marketer", color: "from-emerald-400 to-blue-400" },
    { name: "James L.", role: "Consultant & weekend chef", color: "from-orange-400 to-pink-400" },
    { name: "Mei C.", role: "Founder & sustainability advocate", color: "from-indigo-400 to-purple-500" }
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-7" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0D0122]" style={{ scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {profiles.map((p, i) => (
          <div key={i} className={`absolute p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-1000 ${isVisible ? "opacity-30 scale-100" : "opacity-0 scale-50"}`}
            style={{ left: `${(i % 3) * 33 + 2}%`, top: `${Math.floor(i / 3) * 40 + 10}%`, transitionDelay: `${i * 150}ms`, animation: `gentleFloat ${4 + i}s infinite alternate ease-in-out` }}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold`}>{p.name[0]}</div>
              <div>
                <div className="text-white/80 text-xs font-medium">{p.name}</div>
                <div className="text-white/40 text-[10px]">{p.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={vRef} className="z-10 text-center relative">
        <div className={`absolute inset-0 bg-purple-500/20 blur-[120px] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} />
        <h2 className={`text-5xl md:text-8xl font-bold text-white mb-6 relative z-10 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          You're not alone in this.
        </h2>
        <p className={`text-2xl md:text-4xl text-pink-400 font-medium relative z-10 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "300ms" }}>
          10,000+ people already waiting.
        </p>
      </div>
      <style>{`@keyframes gentleFloat { from{transform:translate(0,0)} to{transform:translate(10px,-15px)} }`}</style>
    </section>
  );
}

function Chapter8({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-8");
  const [vRef, isVisible] = useVisible();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle"); setErrorMsg("");
    if (!input.trim()) { setStatus("error"); setErrorMsg("This field is required"); return; }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    const isPhone = /^[+]?[0-9]{10,15}$/.test(input);
    if (!isEmail && !isPhone) { setStatus("error"); setErrorMsg("Please enter a valid email or phone number"); return; }
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setInput(""); }, 1500);
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-8" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]" style={{ scrollSnapAlign: "start" }}>
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-[#0A0118] to-[#0A0118] transition-opacity duration-2000 ${isVisible ? "opacity-100" : "opacity-0"}`} />
      <div ref={vRef} className="z-10 text-center max-w-2xl w-full flex flex-col items-center">
        <h2 className={`text-6xl md:text-8xl font-bold text-white mb-16 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Your chapter starts here.
        </h2>
        <div className={`w-full transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "300ms" }}>
          {status === "success" ? (
            <div className="text-xl text-green-400 font-medium p-8 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
              You're in! Stay tuned for something exciting 🚀
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Email or phone number"
                  disabled={status === "loading"}
                  className={`flex-1 px-8 py-5 text-lg rounded-full bg-white/5 border ${status === "error" ? "border-red-500" : "border-white/20"} text-white placeholder:text-white/40 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all`}
                />
                <button type="submit" disabled={status === "loading"} className="px-10 py-5 text-lg font-bold rounded-full text-white bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:scale-105 transition-transform whitespace-nowrap shadow-[0_0_30px_rgba(236,72,153,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]">
                  {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Updates"}
                </button>
              </div>
              {status === "error" && <p className="absolute -bottom-7 left-6 text-red-400 text-sm">{errorMsg}</p>}
            </form>
          )}
        </div>
        <div className={`mt-20 flex flex-col items-center gap-3 transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "600ms" }}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-10 h-10 rounded-xl object-cover grayscale opacity-40" />
          <div className="text-white/30 text-sm">© 2026 MatchGlee</div>
        </div>
      </div>
    </section>
  );
}

// ===================== CINEMATIC PHASE =====================

function CinematicPhase() {
  const [activeChapter, setActiveChapter] = useState("ch-1");
  const chapterIds = ["ch-1", "ch-2", "ch-3", "ch-4", "ch-5", "ch-6", "ch-7", "ch-8"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-screen overflow-y-scroll font-sans selection:bg-pink-500/30 relative" style={{ scrollSnapType: "y mandatory" }}>

      {/* Chapter Navigation Dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {chapterIds.map((id, i) => {
          const isActive = activeChapter === id;
          const isPearl = i >= 2 && i <= 4;
          return (
            <button key={id} onClick={() => scrollTo(id)} className="group flex items-center justify-end gap-2" aria-label={`Chapter ${i + 1}`}>
              <span className={`text-xs font-bold transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"} ${isPearl && isActive ? "text-[#7C3AED]" : "text-white"}`}>{i + 1}</span>
              <Circle className={`w-3 h-3 transition-all duration-300 ${isActive ? `scale-150 ${isPearl ? "fill-[#C4B5FD] text-[#C4B5FD]" : "fill-pink-500 text-pink-500"}` : `${isPearl && activeChapter.match(/ch-[345]/) ? "text-[#C4B5FD]/50" : "text-white/30"} hover:scale-125`}`} />
            </button>
          );
        })}
      </div>

      <Chapter1 onVisible={setActiveChapter} />
      <Chapter2 onVisible={setActiveChapter} />
      <Chapter3 onVisible={setActiveChapter} />
      <Chapter4 onVisible={setActiveChapter} />
      <Chapter5 onVisible={setActiveChapter} />
      <Chapter6 onVisible={setActiveChapter} />
      <Chapter7 onVisible={setActiveChapter} />
      <Chapter8 onVisible={setActiveChapter} />
    </div>
  );
}

// ===================== ROOT EXPORT =====================

export function CombinedExperience() {
  const [quizDone, setQuizDone] = useState(false);

  if (!quizDone) {
    return <QuizPhase onComplete={() => setQuizDone(true)} />;
  }

  return <CinematicPhase />;
}
