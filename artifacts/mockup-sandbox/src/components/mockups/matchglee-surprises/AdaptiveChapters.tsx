import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Circle, CheckCircle2, Loader2, Sparkles } from "lucide-react";

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

export type QuizAnswers = { focus: string; hurdle: string };

// ===================== QUIZ PHASE =====================

function QuizPhase({ onComplete }: { onComplete: (answers: QuizAnswers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ focus: "", hurdle: "" });
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
        <button onClick={() => onComplete({ focus: "Both, honestly", hurdle: "I have to pick one version of myself" })} className="text-sm text-white/40 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">
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
              onClick={() => onComplete(answers)}
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

function Chapter1({ onVisible, answers }: { onVisible: (id: string) => void, answers: QuizAnswers }) {
  const ref = useChapterObserver(onVisible, "ch-1");
  const [vRef, isVisible] = useVisible();

  let line1 = "You wake up. You're a designer. A trail runner. A parent. A jazz fan. An entrepreneur.";
  if (answers.focus === "Building my career") line1 = "You wake up. You're a founder. An engineer. A pitch deck. A deliverable. You're building something, every day.";
  else if (answers.focus === "Exploring my passions") line1 = "You wake up. You're a ceramicist. A trail runner. A weekend chef. A jazz listener. You contain multitudes.";

  let line2 = "But online... you have to pick.";
  if (answers.hurdle === "It feels too transactional") line2 = "But every app wants to reduce you to a transaction.";
  else if (answers.hurdle === "It's overwhelming and noisy") line2 = "But the internet is a room where everyone shouts and no one listens.";

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-1" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-black" style={{ scrollSnapAlign: "start" }}>
      <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-1000 ${isVisible ? "opacity-10" : "opacity-0"}`}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${Math.random() * 60 + 10}vh`, animation: `pulse ${Math.random() * 2 + 1}s infinite`, animationDelay: `${Math.random()}s` }} />
        ))}
      </div>
      <div ref={vRef} className="z-10 text-center max-w-5xl space-y-10">
        <div className={`text-4xl md:text-7xl font-bold text-white transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {line1}
        </div>
        <div className={`text-3xl md:text-5xl font-medium text-white/70 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "800ms" }}>
          {line2}
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
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-2" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]" style={{ scrollSnapAlign: "start" }}>
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
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-3" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-[#FAFAFF]" style={{ scrollSnapAlign: "start" }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] -left-10 w-[40rem] h-[40rem] bg-[#C4B5FD] rounded-full blur-[120px] mix-blend-multiply opacity-[0.08]" />
        <div className="absolute top-[20%] -right-10 w-[35rem] h-[35rem] bg-[#FDA4AF] rounded-full blur-[100px] mix-blend-multiply opacity-[0.06]" />
      </div>

      <div ref={vRef} className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-4">
          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-14 h-14 rounded-2xl object-cover mx-auto shadow-[0_0_40px_rgba(196,181,253,0.5)]" />
          </div>
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${pearlGradientText} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            Meet MatchGlee.
          </h2>
          <p className={`text-lg font-medium ${pearlBody} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "450ms" }}>
            One profile. Every version of you. Authentically.
          </p>
          <div className={`h-px w-24 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} style={{ transitionDelay: "650ms" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "700ms" }}>
          <h3 className={`text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4 ${pearlHeading}`}>
            Where Personal Meets <span className={pearlGradientText}>Professional</span> — Seamlessly
          </h3>
          <p className={`text-lg md:text-xl mb-10 leading-relaxed max-w-xl ${pearlBody}`}>
            MatchGlee helps you connect, express, and grow — all in one space. No more choosing between your work persona and your true passions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className={`flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 text-white shadow-[0_4px_14px_rgba(196,181,253,0.4)] cursor-pointer`}>
              Get Started <ArrowRight className="w-4 h-4" />
            </span>
            <span className={`px-7 py-3.5 rounded-full text-base font-semibold bg-white border border-[#C4B5FD] ${pearlBody} shadow-sm cursor-pointer`}>
              Learn More
            </span>
          </div>
        </div>

        <div className={`relative flex justify-center items-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: "900ms" }}>
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
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
    </section>
  );
}

function Chapter4({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-4");
  const [vRef, isVisible] = useVisible();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-4" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-gradient-to-b from-[#FAFAFF] to-white" style={{ scrollSnapAlign: "start" }}>
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
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-5" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-[#F8F5FF]" style={{ scrollSnapAlign: "start" }}>
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

function Chapter6({ onVisible, answers }: { onVisible: (id: string) => void, answers: QuizAnswers }) {
  const ref = useChapterObserver(onVisible, "ch-6");
  const [vRef, isVisible] = useVisible();

  let p1 = "A new kind of profile.";
  let p2 = "One that flexes to what matters.";
  let p3 = "Your whole self, undivided.";

  if (answers.focus === "Building my career") {
    p1 = "Professional mode first. Personal when you're ready. You, always.";
    p2 = "Connect with people who get what you're building.";
    p3 = "Your work, visible to the right people.";
  } else if (answers.focus === "Exploring my passions") {
    p1 = "Personal mode first. Professional when it matters. You, always.";
    p2 = "Connect over shared obsessions, not job titles.";
    p3 = "Your passions, your community, your terms.";
  }

  const features = [
    { title: "Fluid Identity", desc: p1, icon: "💧" },
    { title: "Contextual Matching", desc: p2, icon: "🎯" },
    { title: "No Compromises", desc: p3, icon: "✨" }
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-6" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]" style={{ scrollSnapAlign: "start" }}>
      <div ref={vRef} className="max-w-5xl w-full mx-auto space-y-12 z-10">
        <h2 className={`text-4xl md:text-6xl font-bold text-white text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-1000 ease-out hover:bg-white/10 hover:-translate-y-2 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`} style={{ transitionDelay: `${200 + i * 200}ms` }}>
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter7({ onVisible, answers }: { onVisible: (id: string) => void, answers: QuizAnswers }) {
  const ref = useChapterObserver(onVisible, "ch-7");
  const [vRef, isVisible] = useVisible();

  let community = [
    { name: "Alex K.", roles: "Designer & Parent", pos: "top-1/4 left-1/4", delay: 0 },
    { name: "Jordan M.", roles: "Eng & Runner", pos: "top-1/3 right-1/4", delay: 200 },
    { name: "Taylor S.", roles: "Founder & Jazz Fan", pos: "bottom-1/3 left-1/3", delay: 400 },
    { name: "Casey R.", roles: "Chef & Developer", pos: "bottom-1/4 right-1/3", delay: 600 }
  ];

  if (answers.focus === "Building my career") {
    community = [
      { name: "Kai L.", roles: "VC & Jazz", pos: "top-1/4 left-1/4", delay: 0 },
      { name: "Priya R.", roles: "Eng & Ceramics", pos: "top-1/3 right-1/4", delay: 200 },
      { name: "Alex K.", roles: "Founder & Runner", pos: "bottom-1/3 left-1/3", delay: 400 },
      { name: "Jordan M.", roles: "PM & Parent", pos: "bottom-1/4 right-1/3", delay: 600 }
    ];
  } else if (answers.focus === "Exploring my passions") {
    community = [
      { name: "Maya T.", roles: "Ceramicist & UX", pos: "top-1/4 left-1/4", delay: 0 },
      { name: "James B.", roles: "Chef & Designer", pos: "top-1/3 right-1/4", delay: 200 },
      { name: "Taylor S.", roles: "Jazz Fan & Founder", pos: "bottom-1/3 left-1/3", delay: 400 },
      { name: "Casey R.", roles: "Runner & Eng", pos: "bottom-1/4 right-1/3", delay: 600 }
    ];
  }

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-7" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-black" style={{ scrollSnapAlign: "start" }}>
      <div ref={vRef} className="absolute inset-0">
        {community.map((p, i) => (
          <div key={i} className={`absolute ${p.pos} bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ transitionDelay: `${p.delay}ms` }}>
            <div className="text-white font-bold mb-1">{p.name}</div>
            <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{p.roles}</div>
          </div>
        ))}
      </div>
      <div className={`relative z-10 text-center max-w-4xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "800ms" }}>
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6">
          Find your people.
        </h2>
        <p className="text-2xl text-white/50">
          All of them.
        </p>
      </div>
    </section>
  );
}

function Chapter8({ onVisible, answers }: { onVisible: (id: string) => void, answers: QuizAnswers }) {
  const ref = useChapterObserver(onVisible, "ch-8");
  const [vRef, isVisible] = useVisible();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  let cta = "Your chapter starts here.";
  if (answers.focus === "Building my career") cta = "Your career finds its humanity here.";
  else if (answers.focus === "Exploring my passions") cta = "Your passions find their network here.";

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="ch-8" className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]" style={{ scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
      <div ref={vRef} className={`relative z-10 text-center max-w-2xl w-full transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-8">
          {cta}
        </h2>
        <p className="text-xl text-white/60 mb-12">
          Join the waitlist for early access.
        </p>
        
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex p-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white px-6 focus:outline-none placeholder:text-white/30"
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[120px]"
              >
                {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> :
                 status === "success" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                 "Join"}
              </button>
            </div>
          </div>
          {status === "error" && <p className="text-red-400 text-sm mt-4">Please enter a valid email address.</p>}
          {status === "success" && <p className="text-green-400 text-sm mt-4">You're on the list! We'll be in touch.</p>}
        </form>
      </div>
    </section>
  );
}

function CinematicPhase({ answers }: { answers: QuizAnswers }) {
  const [activeChapter, setActiveChapter] = useState("ch-1");

  return (
    <div className="relative w-full h-[100svh] overflow-y-auto overflow-x-hidden font-sans" style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}>
      
      {/* Personalized Badge */}
      <div className="fixed top-6 right-6 z-50 pointer-events-none transition-all duration-500 opacity-100 translate-y-0">
        <div className="flex flex-col items-end gap-2">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg shadow-black/50">
            <Sparkles className="w-3 h-3 text-pink-400" /> Personalized for you
          </div>
          <div className="flex gap-2">
            {answers.focus && (
              <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full border border-purple-500/30">
                {answers.focus}
              </span>
            )}
            {answers.hurdle && (
              <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-pink-500/20 text-pink-200 rounded-full border border-pink-500/30">
                {answers.hurdle === "It feels too transactional" ? "Real connection" : 
                 answers.hurdle === "I have to pick one version of myself" ? "Authenticity" : "Anti-Noise"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 transition-all duration-300" style={{ width: `${(parseInt(activeChapter.split("-")[1]) / 8) * 100}%` }} />
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {[1,2,3,4,5,6,7,8].map(i => (
          <a key={i} href={`#ch-${i}`} className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/20 ${activeChapter === `ch-${i}` ? "bg-white scale-125" : "bg-transparent hover:bg-white/50"}`} aria-label={`Go to chapter ${i}`} />
        ))}
      </div>

      <Chapter1 onVisible={setActiveChapter} answers={answers} />
      <Chapter2 onVisible={setActiveChapter} />
      <Chapter3 onVisible={setActiveChapter} />
      <Chapter4 onVisible={setActiveChapter} />
      <Chapter5 onVisible={setActiveChapter} />
      <Chapter6 onVisible={setActiveChapter} answers={answers} />
      <Chapter7 onVisible={setActiveChapter} answers={answers} />
      <Chapter8 onVisible={setActiveChapter} answers={answers} />
    </div>
  );
}

// ===================== MAIN EXPORT =====================

export function AdaptiveChapters() {
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({ focus: "", hurdle: "" });

  if (!quizDone) {
    return <QuizPhase onComplete={(answers) => { setQuizAnswers(answers); setQuizDone(true); }} />;
  }

  return <CinematicPhase answers={quizAnswers} />;
}
