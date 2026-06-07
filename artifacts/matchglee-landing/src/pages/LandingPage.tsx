import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, Loader2, Zap, Star } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

// Brand colours extracted from attached wordmark:
// "Match" = hot-pink #F0199A  →  "Glee" = deep-purple #7132C8
// Gradient left-to-right across the full wordmark
const BRAND_GRADIENT = "bg-gradient-to-r from-[#F0199A] to-[#7132C8]";
const BRAND_GRADIENT_TEXT = `text-transparent bg-clip-text ${BRAND_GRADIENT}`;

// ===================== SHARED =====================

function useVisible(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible] as const;
}

function useChapterObserver(onVisible: (id: string) => void, id: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(id); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [id, onVisible]);
  return ref;
}

// ===================== LOGO + WORDMARK =====================

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const imgSize = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-12 h-12" : "w-9 h-9";
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={`${BASE}images/matchglee-logo-new.png`}
        alt="MatchGlee logo"
        className={`${imgSize} object-contain`}
      />
      <span className={`${textSize} font-black tracking-tight ${BRAND_GRADIENT_TEXT}`}>
        MatchGlee
      </span>
    </div>
  );
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

  const personalizedMessage = (() => {
    if (answers.focus === "Both, honestly" && answers.hurdle === "I have to pick one version of myself")
      return "That's exactly why MatchGlee exists. You shouldn't have to choose.";
    if (answers.hurdle === "It feels too transactional")
      return "We're over the transaction, too. Let's build real connections.";
    if (answers.hurdle === "It's overwhelming and noisy")
      return "Cut through the noise. Find your people, on your terms.";
    return "Ready for a space that actually gets you?";
  })();

  const card = "bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 rounded-3xl relative group overflow-hidden cursor-pointer";
  const glow = `absolute inset-0 ${BRAND_GRADIENT} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`;

  const ProgressDots = () => (
    <div className="flex gap-2 items-center justify-center mb-10">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
          i === step ? `w-8 ${BRAND_GRADIENT}` :
          i < step ? "w-2 bg-white/40" : "w-2 bg-white/10"
        }`} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0118] text-white font-sans overflow-hidden relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] -left-20 w-[60rem] h-[60rem] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] -right-20 w-[60rem] h-[60rem] bg-pink-600/8 rounded-full blur-[120px]" />
      </div>
      <div className={`fixed inset-0 z-50 ${BRAND_GRADIENT} transition-transform duration-700 ease-in-out ${isTransitioning ? "translate-x-0" : "translate-x-full"}`} />

      <header className="relative z-20 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <button onClick={onComplete} className="text-sm text-white/40 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">
          Skip intro
        </button>
      </header>

      <main className="flex-1 flex flex-col relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 pt-4">
        {/* Step 0 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 0 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <p className="text-lg text-center text-white/50 mb-4 font-medium">Before we talk about MatchGlee...</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-tight leading-tight">
            What describes you <span className={BRAND_GRADIENT_TEXT}>best</span> right now?
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3 max-w-3xl mx-auto w-full">
            {[
              { id: "Building my career", icon: "🎯", label: "Professional focus" },
              { id: "Exploring my passions", icon: "🌟", label: "Personal focus" },
              { id: "Both, honestly", icon: "⚡", label: "Dual focus" }
            ].map(opt => (
              <button key={opt.id} onClick={() => { setAnswers(p => ({ ...p, focus: opt.id })); triggerTransition(() => setStep(1)); }} className={`p-8 ${card} flex flex-col items-center text-center gap-4`}>
                <div className={glow} />
                <span className="text-4xl relative z-10">{opt.icon}</span>
                <span className="text-xl font-bold relative z-10">{opt.id}</span>
                <span className="text-sm text-white/50 font-medium relative z-10">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 1 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight leading-tight max-w-2xl mx-auto">
            What's hardest about connecting online?
          </h2>
          <div className="grid gap-4 max-w-xl mx-auto w-full">
            {["It feels too transactional", "I have to pick one version of myself", "It's overwhelming and noisy"].map(opt => (
              <button key={opt} onClick={() => { setAnswers(p => ({ ...p, hurdle: opt })); triggerTransition(() => setStep(2)); }} className={`p-6 md:p-8 ${card} flex items-center justify-between`}>
                <div className={glow} />
                <span className="text-xl font-medium relative z-10 text-left">{opt}</span>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-pink-400 group-hover:translate-x-1 transition-all relative z-10" />
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 2 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <div className="max-w-3xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 leading-tight">{personalizedMessage}</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-14">
              <span className="px-5 py-2.5 rounded-full bg-[#F0199A]/20 text-pink-300 text-sm font-medium border border-[#F0199A]/30">{answers.focus || "Dual Focus"}</span>
              <span className="px-5 py-2.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">Values Authenticity</span>
              <span className="px-5 py-2.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">Anti-Noise</span>
            </div>
            <button onClick={() => triggerTransition(() => setStep(3))} className={`px-8 py-4 rounded-full text-lg font-bold bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto`}>
              See how it unfolds <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 3 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <div className="max-w-xl mx-auto w-full text-center">
            <div className="text-7xl mb-8 animate-pulse">✨</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your story <span className={BRAND_GRADIENT_TEXT}>begins</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              We've built a space tailored for someone exactly like you.
            </p>
            <button onClick={onComplete} className={`px-10 py-5 rounded-full text-xl font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_40px_rgba(240,25,154,0.5)] transition-all duration-300 flex items-center gap-3 mx-auto`}>
              Enter MatchGlee <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ===================== CINEMATIC INTRO (Ch1 + Ch2) =====================

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [activeChapter, setActiveChapter] = useState("ch-1");
  const [ch2Seen, setCh2Seen] = useState(false);

  const handleVisible = (id: string) => {
    setActiveChapter(id);
    if (id === "ch-2") setCh2Seen(true);
  };

  // Ch1 -------------------------------------------------------
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
        {/* vertical bar bg */}
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

  // Ch2 -------------------------------------------------------
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

        {/* CTA shown once ch-2 is fully seen */}
        <div className={`mt-14 flex flex-col items-center gap-4 transition-all duration-1000 ease-out ${ch2Seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "1400ms" }}>
          <button
            onClick={onComplete}
            className={`px-10 py-5 rounded-full text-xl font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_40px_rgba(240,25,154,0.5)] transition-all duration-300 flex items-center gap-3`}
          >
            There's a better way <ArrowRight className="w-6 h-6" />
          </button>
          <span className="text-white/25 text-sm tracking-widest uppercase">Enter MatchGlee</span>
        </div>
      </section>
    );
  };

  return (
    <div className="w-full h-screen overflow-y-scroll font-sans relative bg-black" style={{ scrollSnapType: "y mandatory" }}>
      {/* chapter dots */}
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

// ===================== NAVBAR =====================

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0118]/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#cta" className={`px-5 py-2 rounded-full ${BRAND_GRADIENT} text-white font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(240,25,154,0.3)]`}>
            Get Early Access
          </a>
        </div>
      </div>
    </nav>
  );
}

// ===================== HERO =====================

function HeroSection() {
  const [ref, isVisible] = useVisible(0.1);
  const tags = ["Designer 🎨", "Jazz Fan 🎷", "Trail Runner 🏃", "Entrepreneur 💡", "Ceramicist 🏺", "Weekend Chef 🍳"];
  const badges = [
    { name: "Alex liked your portfolio ✨", avatar: "from-[#F0199A] to-[#7132C8]",  pos: "right-[-20px] top-[15%]" },
    { name: "Marcus wants to collab 🎸",    avatar: "from-blue-400 to-[#7132C8]",   pos: "left-[-30px] top-[32%]" },
    { name: "Sarah sent you a Glee 🌟",     avatar: "from-emerald-400 to-blue-500", pos: "right-[10px] bottom-[25%]" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-20 px-6 bg-[#0A0118] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-[#F0199A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-[#7132C8]/10 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* left */}
        <div className="space-y-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F0199A]/30 bg-[#F0199A]/10 text-pink-300 text-sm font-semibold transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="w-2 h-2 rounded-full bg-[#F0199A] animate-pulse" />
            10,000+ people already waiting
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "150ms" }}>
            Where Personal Meets{" "}
            <span className={BRAND_GRADIENT_TEXT}>Professional</span>
            {" "}— Seamlessly
          </h1>
          <p className={`text-xl text-white/60 leading-relaxed max-w-lg transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
            MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between who you are and what you do.
          </p>
          <div className={`flex flex-wrap gap-3 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "450ms" }}>
            <a href="#cta" className={`px-8 py-4 rounded-full text-base font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.4)] transition-all duration-300 flex items-center gap-2`}>
              Get Early Access <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#features" className="px-8 py-4 rounded-full text-base font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300">
              See How It Works
            </a>
          </div>
          <div className={`flex flex-wrap gap-2 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "600ms" }}>
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium backdrop-blur-sm">{tag}</span>
            ))}
          </div>
        </div>

        {/* right: phone + badges */}
        <div className={`relative flex justify-center items-center transition-all duration-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: "500ms" }}>
          <div className="absolute w-[280px] h-[280px] bg-gradient-to-br from-[#F0199A]/25 to-[#7132C8]/20 rounded-full blur-[60px]" />
          <div className="relative z-10 w-[240px] md:w-[280px]" style={{ animation: "phoneFloat 4s ease-in-out infinite" }}>
            <div className="rounded-[3rem] p-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_40px_80px_-10px_rgba(113,50,200,0.5)]">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/50 border border-white/10 rounded-full z-20" />
              <div className="rounded-[2.25rem] overflow-hidden bg-[#0A0118] border border-white/10">
                <img src={`${BASE}images/matchglee-app-ui.png`} alt="MatchGlee App" className="w-full h-auto" />
              </div>
            </div>
          </div>
          {badges.map((badge, i) => (
            <div key={i} className={`absolute ${badge.pos} z-20`} style={{ animation: `badgeFloat ${4 + i}s ease-in-out ${i * 1.2}s infinite` }}>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl whitespace-nowrap">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${badge.avatar} flex-shrink-0`} />
                <span className="text-white text-xs font-medium">{badge.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

      <style>{`
        @keyframes phoneFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-18px) rotate(1deg)} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </section>
  );
}

// ===================== VIBE CHECK =====================

function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto" style={{ perspective: "1200px" }}>
      <button
        onClick={() => setFlipped(f => !f)}
        className="w-full relative"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", height: "340px" }}
        aria-label="Flip card"
      >
        {/* Front: LinkedIn */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white border border-[#E0E0E0] shadow-xl flex flex-col p-6" style={{ backfaceVisibility: "hidden" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">J</div>
            <div>
              <div className="font-bold text-gray-900 text-sm">James Laurent</div>
              <div className="text-xs text-gray-500">Product Lead @ TechCorp · San Francisco</div>
            </div>
            <div className="ml-auto"><div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">Connect</div></div>
          </div>
          <div className="h-px bg-gray-100 mb-4" />
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Experience</div>
          <div className="space-y-2 mb-4">
            {["Product Lead · TechCorp · 3 yrs", "Sr. PM · StartupXYZ · 2 yrs"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{item}</div>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {["Strategy", "B2B SaaS", "Leadership"].map(s => <span key={s} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{s}</span>)}
          </div>
          <div className="mt-4 text-center text-xs text-gray-400">Tap to see the real James →</div>
        </div>
        {/* Back: MatchGlee */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A0A2E] via-[#2D0A3E] to-[#0A1228] border border-white/10 shadow-xl flex flex-col p-6" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-12 h-12 rounded-full ${BRAND_GRADIENT} flex items-center justify-center text-white font-bold text-lg`}>J</div>
            <div>
              <div className="font-bold text-white text-sm">James Laurent</div>
              <div className={`text-xs ${BRAND_GRADIENT_TEXT}`}>Consultant · Weekend Chef · Vinyl Collector</div>
            </div>
          </div>
          <div className="h-px bg-white/10 mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            {["🍳 Cooking", "🎵 Jazz", "🏄 Surf", "📸 Photography", "🌿 Sustainable Living"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium">{tag}</span>
            ))}
          </div>
          <div className="mt-auto p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className={`text-xs ${BRAND_GRADIENT_TEXT} font-semibold mb-1`}>Latest Glee</div>
            <div className="text-white/70 text-sm">"Found the perfect sourdough starter after 6 months of trying 🥖🔥"</div>
          </div>
          <div className="mt-3 text-center text-xs text-white/30">← Tap to see the professional side</div>
        </div>
      </button>
    </div>
  );
}

function VibeCheckSection() {
  const [ref, isVisible] = useVisible();
  return (
    <section className="relative py-28 px-6 bg-[#F8F5FF] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(240,25,154,0.06),transparent)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-[#E9E5FF] bg-white shadow-sm text-sm font-semibold tracking-[0.2em] uppercase text-[#7132C8]">
            The Vibe Check
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1035] leading-tight">
            No more corporate robots.<br />
            <span className={BRAND_GRADIENT_TEXT}>Just real humans connecting.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Vision */}
          <div className={`bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(113,50,200,0.1)] border border-[#E9E5FF] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "150ms" }}>
            <div className={`w-12 h-12 rounded-2xl ${BRAND_GRADIENT} flex items-center justify-center mb-6`}>
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F0199A] mb-3">Our Vision</div>
            <h3 className="text-xl font-black text-[#1A1035] mb-4 leading-tight">No More Corporate Robots</h3>
            <p className="text-[#4A4566] leading-relaxed text-sm">
              Professional networking was built for a world that doesn't exist anymore. People have passions, quirks, side projects, and entire inner lives. MatchGlee is redefining what it means to connect professionally — with your full personality intact.
            </p>
          </div>
          {/* Flip Card */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "300ms" }}>
            <div className="text-center mb-6">
              <div className="text-sm text-[#4A4566] font-medium">See both sides of you</div>
              <div className={`text-xs ${BRAND_GRADIENT_TEXT} mt-1`}>↓ Tap the card to flip</div>
            </div>
            <FlipCard />
          </div>
          {/* Mission */}
          <div className={`bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(113,50,200,0.1)] border border-[#E9E5FF] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "450ms" }}>
            <div className={`w-12 h-12 rounded-2xl ${BRAND_GRADIENT} flex items-center justify-center mb-6`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#7132C8] mb-3">Our Mission</div>
            <h3 className="text-xl font-black text-[#1A1035] mb-4 leading-tight">Bridging the Gap</h3>
            <p className="text-[#4A4566] leading-relaxed text-sm">
              To create a fluid, authentic space where personal expression and professional ambition coexist effortlessly. Connect over shared creativity, side-hustles, and genuine human energy — without losing your personal joy, your <em>glee</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== FEATURES =====================

const features = [
  {
    icon: "⚡",
    title: "Dual Profiles",
    desc: "Seamlessly toggle between your work identity and personal interests. One tap — full context switch. Your colleagues see the strategist. Your community sees the person."
  },
  {
    icon: "🤝",
    title: "Authentic Networking",
    desc: "Connect over mutual side-hustles, creative projects, or career ambitions. MatchGlee surfaces the overlap between who you are and who others are — making every intro feel natural."
  },
  {
    icon: "🌀",
    title: "Glee Spaces",
    desc: "Vibrant micro-communities built for casual, low-pressure professional mentorship. Find your niche — where your creativity meets your career and everyone brings their whole self."
  }
];

function FeaturesSection() {
  const [ref, isVisible] = useVisible();
  return (
    <section id="features" className="relative py-28 px-6 bg-[#0A0118] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#F0199A]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-[#7132C8]/8 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
            Core Features
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Built for the full you.{" "}
            <span className={BRAND_GRADIENT_TEXT}>All of you.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`group relative rounded-3xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/8 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(113,50,200,0.4)] cursor-default transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className={`absolute inset-0 rounded-3xl ${BRAND_GRADIENT} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-5xl mb-6">{f.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== COMMUNITY =====================

const communityProfiles = [
  { name: "Sarah A.",  role: "Designer & trail runner",           color: "from-[#F0199A] to-[#7132C8]",  tag: "🎨 Design" },
  { name: "Marcus K.", role: "VC partner & jazz musician",        color: "from-blue-400 to-[#7132C8]",    tag: "🎷 Music" },
  { name: "Priya R.",  role: "Engineer & ceramicist",             color: "from-pink-400 to-orange-400",   tag: "🏺 Craft" },
  { name: "Tolu B.",   role: "Photographer & marketer",           color: "from-emerald-400 to-blue-400",  tag: "📸 Lens" },
  { name: "James L.",  role: "Consultant & weekend chef",         color: "from-orange-400 to-[#F0199A]",  tag: "🍳 Cook" },
  { name: "Mei C.",    role: "Founder & sustainability advocate", color: "from-indigo-400 to-[#7132C8]",  tag: "🌿 Green" }
];

function CommunitySection() {
  const [ref, isVisible] = useVisible();
  return (
    <section id="community" className="relative py-28 px-6 bg-[#0D0122] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(113,50,200,0.08),transparent)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
            Community
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Your people are{" "}
            <span className={BRAND_GRADIENT_TEXT}>already here.</span>
          </h2>
          <p className="text-xl font-medium" style={{ background: "linear-gradient(to right, #F0199A, #7132C8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            10,000+ people already waiting to connect.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {communityProfiles.map((p, i) => (
            <div key={i} className={`group p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-white/8 hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex-shrink-0`} />
                <div>
                  <div className="text-white font-bold text-sm">{p.name}</div>
                  <div className="text-white/40 text-xs">{p.role}</div>
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium border border-white/10">{p.tag}</span>
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "700ms" }}>
          {[{ value: "10K+", label: "Early members" }, { value: "40+", label: "Industries represented" }, { value: "130+", label: "Cities worldwide" }].map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className={`text-3xl md:text-4xl font-black ${BRAND_GRADIENT_TEXT} mb-1`}>{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== CTA =====================

function CTASection() {
  const [ref, isVisible] = useVisible();
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
    <section id="cta" className="relative py-32 px-6 overflow-hidden bg-[#0A0118]">
      <div className={`absolute inset-0 ${BRAND_GRADIENT} opacity-10`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(113,50,200,0.15),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F0199A]/50 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-6xl md:text-8xl mb-8">✨</div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Your chapter<br />starts here.
          </h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            Join the waitlist and be first to experience a platform built around all of who you are.
          </p>
        </div>
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "300ms" }}>
          {status === "success" ? (
            <div className="text-xl text-green-400 font-medium p-8 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
              You're in! Stay tuned for something exciting 🚀
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full p-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Your email or phone number"
                  disabled={status === "loading"}
                  className={`flex-1 px-6 py-4 text-base rounded-full bg-transparent border-none ${status === "error" ? "text-red-300" : "text-white"} placeholder:text-white/30 focus:outline-none`}
                />
                <button type="submit" disabled={status === "loading"} className={`px-8 py-4 text-base font-bold rounded-full text-white ${BRAND_GRADIENT} hover:scale-[1.03] transition-transform whitespace-nowrap shadow-[0_0_30px_rgba(240,25,154,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]`}>
                  {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get Early Access <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
              {status === "error" && <p className="mt-3 text-red-400 text-sm text-center">{errorMsg}</p>}
              <p className="mt-4 text-white/25 text-xs">No spam, ever. Unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <Logo size="sm" />
        <div className="text-white/20 text-xs">© 2026 MatchGlee. All rights reserved.</div>
        <div className="flex items-center gap-5 text-white/25 text-xs">
          <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/50 transition-colors">Contact</a>
        </div>
      </div>
    </section>
  );
}

// ===================== MAIN PAGE =====================

function MainPage() {
  return (
    <div className="min-h-screen font-sans bg-[#0A0118]">
      <Navbar />
      <HeroSection />
      <VibeCheckSection />
      <FeaturesSection />
      <CommunitySection />
      <CTASection />
    </div>
  );
}

// ===================== ROOT =====================

export default function LandingPage() {
  const [phase, setPhase] = useState<"quiz" | "cinematic" | "main">("quiz");

  if (phase === "quiz") return <QuizPhase onComplete={() => setPhase("cinematic")} />;
  if (phase === "cinematic") return <CinematicIntro onComplete={() => setPhase("main")} />;
  return <MainPage />;
}
