import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Loader2, CheckCircle2 } from "lucide-react";

// ===================== HOOKS =====================

function useChapterObserver(onVisible: (id: string) => void, id: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(id);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [id, onVisible]);
  return ref;
}

function useVisible() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return [ref, isVisible] as const;
}

// ===================== CHAPTERS =====================

function Chapter1({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-1");
  const [vRef, isVisible] = useVisible();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-1"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 text-white"
      style={{
        scrollSnapAlign: "start",
        backgroundColor: "#1A0035",
        backgroundImage: "radial-gradient(circle at center, rgba(255, 191, 0, 0.15) 0%, rgba(26, 0, 53, 1) 70%)"
      }}
    >
      <div ref={vRef} className="z-10 text-center max-w-4xl space-y-12 flex flex-col items-center">
        <div className={`text-3xl md:text-5xl font-bold transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          It's six months from now.
        </div>
        <div className={`text-2xl md:text-4xl font-medium text-white/80 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "1000ms" }}>
          You just got a message from someone who found you — not your job title. Your obsession.
        </div>
        <div className={`text-xl md:text-3xl font-medium text-white/60 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "2000ms" }}>
          She's a ceramicist AND a product director. She saw both sides of you.
        </div>
        <div className={`text-3xl md:text-5xl font-bold transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "3000ms" }}>
          This is MatchGlee.
        </div>
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-90"}`} style={{ transitionDelay: "4000ms" }}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-20 h-20 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.6)]" />
        </div>
      </div>
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${isVisible ? "opacity-60" : "opacity-0"} animate-bounce`} style={{ transitionDelay: "4500ms" }}>
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}

function Chapter2({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-2");
  const [vRef, isVisible] = useVisible();

  const pearlCardStyle = "bg-white text-black p-6 rounded-3xl border border-white/20 shadow-[0_10px_40px_rgba(255,255,255,0.1)] w-full md:w-[320px]";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-2"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 text-white bg-[#120028]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div ref={vRef} className="z-10 w-full max-w-5xl flex flex-col items-center gap-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
          {/* Card 1 */}
          <div className={`${pearlCardStyle} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            <div className="text-xs uppercase tracking-widest text-purple-500 font-bold mb-4">You</div>
            <div className="font-bold text-2xl mb-2">Marcus T.</div>
            <div className="text-gray-600 mb-6">Engineer by day. Jazz musician by night.</div>
            <div className="text-sm font-medium text-gray-400">Open to:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Collaborations</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Friendships</span>
            </div>
          </div>

          {/* Connection Line */}
          <div className={`hidden md:block absolute top-1/2 left-[320px] right-[320px] h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-1000 ease-out origin-left ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} style={{ transitionDelay: "600ms" }} />

          {/* Card 2 */}
          <div className={`${pearlCardStyle} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`} style={{ transitionDelay: "1200ms" }}>
            <div className="text-xs uppercase tracking-widest text-pink-500 font-bold mb-4">Her</div>
            <div className="font-bold text-2xl mb-2">Priya R.</div>
            <div className="text-gray-600 mb-6">Product Director & Ceramicist.</div>
            <div className="text-sm font-medium text-gray-400">Open to:</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Co-founders</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Creative Partnerships</span>
            </div>
          </div>
        </div>

        <div className={`text-xl md:text-3xl font-medium text-center max-w-2xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "1800ms" }}>
          You found each other through MatchGlee. Because you showed up as your whole self.
        </div>
      </div>
    </section>
  );
}

function Chapter3({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-3");
  const [vRef, isVisible] = useVisible();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-3"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 text-white bg-black"
      style={{ scrollSnapAlign: "start" }}
    >
      <div ref={vRef} className="z-10 text-center max-w-4xl space-y-10 flex flex-col items-center font-mono">
        <div className={`text-2xl md:text-4xl text-gray-400 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          But today...
        </div>
        <div className={`text-2xl md:text-4xl transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1000ms" }}>
          You have LinkedIn. And Instagram. And a separate portfolio site. And a dating app for networking.
        </div>
        <div className={`text-3xl md:text-5xl font-bold transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "2500ms" }}>
          Four apps. Four versions of you. None of them complete.
        </div>
        <div className={`text-xl md:text-3xl text-pink-500 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "4000ms" }}>
          Sound familiar?
        </div>
      </div>
    </section>
  );
}

function Chapter4({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-4");
  const [vRef, isVisible] = useVisible();

  const pearlGradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-4"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 bg-[#FAFAFF] text-black overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      <div ref={vRef} className="z-10 max-w-5xl w-full flex flex-col items-center text-center gap-8 relative">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}`}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-16 h-16 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.5)] mx-auto" />
        </div>
        <h2 className={`text-6xl md:text-8xl font-black tracking-tight ${pearlGradientText} transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} style={{ transitionDelay: "300ms" }}>
          Meet MatchGlee.
        </h2>
        <p className={`text-2xl md:text-4xl font-medium text-gray-700 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "600ms" }}>
          One profile. Every version of you. Authentically.
        </p>
        <div className={`h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 rounded-full transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} style={{ transitionDelay: "900ms" }} />
        
        <div className={`mt-8 relative transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`} style={{ transitionDelay: "1200ms" }}>
          <div className="relative w-[280px] md:w-[320px] rounded-[3rem] p-3 bg-white border border-[#E9E5FF] shadow-[0_20px_60px_-15px_rgba(196,181,253,0.5)] rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="rounded-[2.25rem] overflow-hidden border border-[#E9E5FF]">
              <img src="/__mockup/images/matchglee-app-ui.png" alt="App UI" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter5({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-5");
  const [vRef, isVisible] = useVisible();

  const lines = [
    "Show up whole. Connect with intention.",
    "Personal mode. Professional mode. Yours, always.",
    "Find people who see all of you."
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-5"
      className="relative w-full h-[100dvh] flex flex-col justify-center p-6 md:p-24 text-white bg-[#080818]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div ref={vRef} className="z-10 max-w-4xl space-y-12">
        {lines.map((line, i) => (
          <div key={i} className="relative inline-block">
            <div className={`text-3xl md:text-6xl font-bold transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`} style={{ transitionDelay: `${i * 600}ms` }}>
              {line}
            </div>
            <div className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out origin-left ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} style={{ transitionDelay: `${(i * 600) + 300}ms`, width: "100%" }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Chapter6({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-6");
  const [vRef, isVisible] = useVisible();

  // Floating background cards
  const bgCards = [...Array(12)].map((_, i) => {
    const isLeft = i % 2 === 0;
    return (
      <div 
        key={i} 
        className="absolute w-40 h-56 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-4 flex flex-col justify-end"
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: isLeft ? `${Math.random() * 30}%` : `${Math.random() * 30 + 70}%`,
          transform: `rotate(${Math.random() * 40 - 20}deg) scale(${Math.random() * 0.5 + 0.5})`,
          opacity: 0.3
        }}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 mb-2" />
        <div className="h-2 w-3/4 bg-white/20 rounded mb-1" />
        <div className="h-2 w-1/2 bg-white/10 rounded" />
      </div>
    );
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-6"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 text-white bg-[#0D0122] overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {bgCards}
      </div>

      <div ref={vRef} className="z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 relative">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className={`text-4xl md:text-6xl font-bold transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            They're already here.
          </h2>
          <p className={`text-xl md:text-3xl text-white/70 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "300ms" }}>
            10,000+ people who refused to pick just one version of themselves.
          </p>
        </div>
        <div className={`flex-1 flex justify-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-20 scale-90"}`} style={{ transitionDelay: "600ms" }}>
          <div className="w-[260px] md:w-[300px] rounded-[2.5rem] p-2 bg-black border-4 border-white/10 -rotate-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="rounded-[2rem] overflow-hidden bg-[#111]">
              <img src="/__mockup/images/matchglee-app-ui.png" alt="App UI" className="w-full h-auto opacity-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter7({ onVisible }: { onVisible: (id: string) => void }) {
  const ref = useChapterObserver(onVisible, "ch-7");
  const [vRef, isVisible] = useVisible();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("This field is required");
      return;
    }
    if (!email.includes("@") && !email.match(/^[0-9+()-\s]+$/)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email or phone number");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ch-7"
      className="relative w-full h-[100dvh] flex flex-col justify-center items-center p-6 text-white overflow-hidden"
      style={{ 
        scrollSnapAlign: "start",
        backgroundColor: "#0A0118",
        backgroundImage: "radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, rgba(10, 1, 24, 1) 70%)"
      }}
    >
      <div ref={vRef} className="z-10 max-w-2xl w-full text-center space-y-12">
        <h2 className={`text-5xl md:text-7xl font-bold transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Your future starts now.
        </h2>

        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "300ms" }}>
          {status === "success" ? (
            <div className="bg-white/10 backdrop-blur-md border border-green-500/30 p-8 rounded-3xl flex flex-col items-center gap-4 text-green-400">
              <CheckCircle2 className="w-12 h-12" />
              <div className="text-xl font-bold text-white">You're in! Stay tuned for something exciting 🚀</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading"}
                  className={`w-full px-6 py-4 rounded-full bg-white/5 border ${status === "error" ? "border-red-500" : "border-white/20"} focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-white/40 text-lg`}
                />
                {status === "error" && (
                  <div className="absolute -bottom-6 left-6 text-sm text-red-400">{errorMsg}</div>
                )}
              </div>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="mt-4 w-full px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-bold text-lg flex justify-center items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
              >
                {status === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Request Access"}
              </button>
            </form>
          )}
        </div>

        <div className={`pt-12 flex flex-col items-center gap-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "600ms" }}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-10 h-10 rounded-lg grayscale hover:grayscale-0 transition-all" />
          <div className="text-sm text-white/30">© 2026 MatchGlee. All rights reserved.</div>
        </div>
      </div>
    </section>
  );
}

// ===================== MAIN EXPORT =====================

export function InvertedArc() {
  const [activeChapter, setActiveChapter] = useState("ch-1");

  return (
    <div className="w-full h-[100dvh] bg-black font-sans relative">
      {/* Scroll container */}
      <div className="w-full h-full overflow-y-scroll" style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}>
        <Chapter1 onVisible={setActiveChapter} />
        <Chapter2 onVisible={setActiveChapter} />
        <Chapter3 onVisible={setActiveChapter} />
        <Chapter4 onVisible={setActiveChapter} />
        <Chapter5 onVisible={setActiveChapter} />
        <Chapter6 onVisible={setActiveChapter} />
        <Chapter7 onVisible={setActiveChapter} />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {["ch-1", "ch-2", "ch-3", "ch-4", "ch-5", "ch-6", "ch-7"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeChapter === id ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/20 hover:bg-white/50"}`}
            aria-label={`Go to ${id}`}
          />
        ))}
      </div>
    </div>
  );
}
