import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Shield, Users, Sparkles, CheckCircle2, Loader2, Circle, X } from "lucide-react";

type Phase = "quiz" | "map" | "chapter" | "waitlist";
type Theme = "dual" | "networking" | "privacy" | "community";

export function ChapterMap() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [quizAnswer, setQuizAnswer] = useState<Theme | null>(null);
  const [activeChapter, setActiveChapter] = useState<Theme | null>(null);
  const [visitedChapters, setVisitedChapters] = useState<Set<Theme>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const handleQuizSelect = (theme: Theme) => {
    setQuizAnswer(theme);
    setIsWiping(true);
    setTimeout(() => {
      setPhase("map");
      setIsWiping(false);
    }, 800);
  };

  const handleChapterOpen = (theme: Theme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChapter(theme);
      setVisitedChapters(prev => new Set(prev).add(theme));
      setPhase("chapter");
      setIsTransitioning(false);
    }, 50);
  };

  const handleBackToMap = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChapter(null);
      setPhase("map");
      setIsTransitioning(false);
    }, 300);
  };

  const handleGoToWaitlist = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChapter(null);
      setPhase("waitlist");
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-[#0A0118] text-white font-sans overflow-hidden flex flex-col">
      <style>{`
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-animated-gradient {
          background: linear-gradient(-45deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1), rgba(59,130,246,0.1));
          background-size: 400% 400%;
          animation: gradient-rotate 15s ease infinite;
        }
      `}</style>
      
      {/* Wipe Transition */}
      <div 
        className="fixed inset-0 z-50 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 pointer-events-none transition-transform duration-700 ease-in-out" 
        style={{ 
          transform: isWiping ? "translateX(0)" : "translateX(100%)",
          transformOrigin: "right"
        }} 
      />

      {/* Phase 1: Quiz */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${phase === "quiz" && !isWiping ? "opacity-100 z-10" : "opacity-0 pointer-events-none -z-10"}`}>
        <div className="h-full flex flex-col justify-center items-center p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
            What do you want <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">more</span> of in your online life?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <QuizCard icon="🎭" title="More authenticity" onClick={() => handleQuizSelect("dual")} />
            <QuizCard icon="🎯" title="Better connections" onClick={() => handleQuizSelect("networking")} />
            <QuizCard icon="🛡" title="More control" onClick={() => handleQuizSelect("privacy")} />
            <QuizCard icon="👥" title="Real community" onClick={() => handleQuizSelect("community")} />
          </div>
        </div>
      </div>

      {/* Phase 2: Map */}
      <div className={`absolute inset-0 bg-animated-gradient transition-opacity duration-500 ${phase === "map" || phase === "chapter" ? "opacity-100 z-0" : "opacity-0 pointer-events-none"}`}>
        <header className="w-full p-6 flex items-center justify-between z-20 relative">
           <div className="flex items-center gap-3">
             <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-10 h-10 rounded-xl" />
             <span className="font-bold text-xl">MatchGlee</span>
           </div>
           <span className="text-white/50 text-sm font-medium tracking-wide uppercase">Your Journey</span>
        </header>

        <div className="flex flex-col items-center justify-center h-[calc(100%-88px)] p-6 z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            <MapCard 
              theme="dual" 
              title="The Double Life" 
              tagline="Two modes. One you."
              icon={<div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500" />}
              isRecommended={quizAnswer === "dual"}
              isVisited={visitedChapters.has("dual")}
              onClick={() => handleChapterOpen("dual")}
            />
            <MapCard 
              theme="networking" 
              title="Your People" 
              tagline="Find your tribe."
              icon={<Sparkles className="w-8 h-8 text-blue-400" />}
              isRecommended={quizAnswer === "networking"}
              isVisited={visitedChapters.has("networking")}
              onClick={() => handleChapterOpen("networking")}
            />
            <MapCard 
              theme="privacy" 
              title="Your Rules" 
              tagline="You control the story."
              icon={<Shield className="w-8 h-8 text-purple-400" />}
              isRecommended={quizAnswer === "privacy"}
              isVisited={visitedChapters.has("privacy")}
              onClick={() => handleChapterOpen("privacy")}
            />
            <MapCard 
              theme="community" 
              title="The Waitlist" 
              tagline="10,000 already here."
              icon={<Users className="w-8 h-8 text-pink-400" />}
              isRecommended={quizAnswer === "community"}
              isVisited={visitedChapters.has("community")}
              onClick={() => handleChapterOpen("community")}
            />
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            {visitedChapters.size >= 2 && (
              <button 
                onClick={handleGoToWaitlist}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 animate-in fade-in zoom-in"
              >
                Unlock Final Chapter <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={handleGoToWaitlist}
              className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              Skip to Waitlist <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Phase 3: Chapter Views */}
      <div 
        className={`absolute inset-0 z-30 transition-transform duration-300 ease-in-out ${phase === "chapter" ? (isTransitioning ? "translate-x-full" : "translate-x-0") : "translate-x-full"}`}
      >
        <div className="h-full w-full bg-[#0A0118] relative">
          <div className="absolute top-0 left-0 p-6 z-40">
            <button onClick={handleBackToMap} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 bg-white/5 rounded-full backdrop-blur-md">
              <ArrowLeft className="w-4 h-4" /> Back to map
            </button>
          </div>
          
          {activeChapter === "dual" && <DualIdentityChapter onJoin={handleGoToWaitlist} />}
          {activeChapter === "networking" && <NetworkingChapter onJoin={handleGoToWaitlist} />}
          {activeChapter === "privacy" && <PrivacyChapter onJoin={handleGoToWaitlist} />}
          {activeChapter === "community" && <CommunityChapter onJoin={handleGoToWaitlist} />}
        </div>
      </div>

      {/* Phase 4: Waitlist */}
      <div className={`absolute inset-0 bg-[#0A0118] z-50 flex items-center justify-center p-6 transition-opacity duration-500 ${phase === "waitlist" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />
        <button onClick={() => setPhase("map")} className="absolute top-6 left-6 text-white/50 hover:text-white"><X className="w-8 h-8" /></button>
        <WaitlistForm />
      </div>

    </div>
  );
}

// --- Components ---

function QuizCard({ icon, title, onClick }: { icon: string, title: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm group"
    >
      <span className="text-5xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xl font-medium">{title}</span>
    </button>
  );
}

function MapCard({ theme, title, tagline, icon, isRecommended, isVisited, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative p-8 rounded-3xl text-left flex flex-col justify-between min-h-[200px] transition-all duration-300 group overflow-hidden
        ${isRecommended ? "scale-105 shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-white/10 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10"}
        backdrop-blur-md border border-white/10
      `}
    >
      {isRecommended && (
        <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-purple-500 to-pink-500 -z-10 opacity-50" />
      )}
      
      <div className="flex justify-between items-start z-10 w-full">
        <div>{icon}</div>
        {isRecommended && <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">⭐ For you</span>}
        {isVisited && !isRecommended && <span className="text-white/40"><CheckCircle2 className="w-5 h-5" /></span>}
      </div>

      <div className="z-10 mt-8">
        <h3 className="text-2xl font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors">{title}</h3>
        <p className="text-white/60 text-sm">{tagline}</p>
      </div>
    </button>
  );
}

function DualIdentityChapter({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0118] to-[#0A0118]">
      <div className="max-w-3xl w-full text-center space-y-12">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          You're not one thing. And you shouldn't have to pretend to be.
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
          <div className="w-64 p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <div className="w-16 h-16 rounded-full bg-blue-500/40 mb-4" />
            <div className="h-4 w-3/4 bg-blue-400/30 rounded mb-2" />
            <div className="h-3 w-1/2 bg-blue-400/20 rounded" />
            <div className="mt-6 text-sm font-bold text-blue-300 uppercase tracking-widest text-left">Professional</div>
          </div>
          <div className="hidden md:block w-12 h-px bg-white/20" />
          <div className="w-64 p-6 rounded-2xl bg-gradient-to-br from-pink-600/20 to-pink-900/20 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            <div className="w-16 h-16 rounded-full bg-pink-500/40 mb-4" />
            <div className="h-4 w-3/4 bg-pink-400/30 rounded mb-2" />
            <div className="h-3 w-1/2 bg-pink-400/20 rounded" />
            <div className="mt-6 text-sm font-bold text-pink-300 uppercase tracking-widest text-left">Personal</div>
          </div>
        </div>

        <p className="text-xl text-white/60">
          Switch between personal and professional modes. One account. Infinite you.
        </p>

        <button onClick={onJoin} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
          Join Waitlist <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function NetworkingChapter({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#0A0118]">
      <div className="max-w-3xl w-full text-center space-y-12">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          The right people are out there.<br/>MatchGlee finds them.
        </h2>
        
        <div className="relative h-64 w-full flex items-center justify-center my-8">
          <div className="absolute w-full h-full animate-pulse opacity-50 flex items-center justify-center">
            <svg width="300" height="200" viewBox="0 0 300 200">
              <path d="M 50 100 Q 150 20 250 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 50 100 Q 150 180 250 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 250 50 L 250 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
          <div className="absolute left-[calc(50%-120px)] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md z-10 flex items-center justify-center"><Circle className="w-8 h-8 text-white/50" /></div>
          <div className="absolute right-[calc(50%-120px)] top-[calc(50%-60px)] -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 backdrop-blur-md z-10 flex items-center justify-center"><Users className="w-8 h-8 text-blue-400" /></div>
          <div className="absolute right-[calc(50%-120px)] bottom-[calc(50%-60px)] translate-y-1/2 w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/50 backdrop-blur-md z-10 flex items-center justify-center"><Sparkles className="w-8 h-8 text-pink-400" /></div>
        </div>

        <p className="text-xl text-white/60">
          Connect by intent, passion, and values — not just proximity or job title.
        </p>

        <button onClick={onJoin} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
          Join Waitlist <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function PrivacyChapter({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#0A0118]">
      <div className="max-w-3xl w-full text-center space-y-12">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Your story. Your audience.<br/>Your rules.
        </h2>
        
        <div className="flex justify-center py-12">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
            <Shield className="w-full h-full text-white/80 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1} />
          </div>
        </div>

        <p className="text-xl text-white/60">
          Choose exactly who sees your professional side, your personal side, or both. Full control.
        </p>

        <button onClick={onJoin} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
          Join Waitlist <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function CommunityChapter({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#0A0118]">
      <div className="max-w-4xl w-full text-center space-y-12">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          They refused to choose too.
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 py-8 relative">
          {[
            { n: "Alex", p: "Developer", v: "Musician", c: "bg-blue-500/10 border-blue-500/20" },
            { n: "Sam", p: "Founder", v: "Painter", c: "bg-pink-500/10 border-pink-500/20" },
            { n: "Jordan", p: "Teacher", v: "Runner", c: "bg-purple-500/10 border-purple-500/20" },
            { n: "Casey", p: "Designer", v: "Chef", c: "bg-emerald-500/10 border-emerald-500/20" },
            { n: "Riley", p: "Writer", v: "Gamer", c: "bg-amber-500/10 border-amber-500/20" }
          ].map((u,i) => (
            <div key={i} className={`px-6 py-4 rounded-2xl backdrop-blur-sm border ${u.c} flex flex-col items-start min-w-[140px]`}>
               <div className="font-bold text-lg">{u.n}</div>
               <div className="text-xs text-white/50">{u.p} & {u.v}</div>
            </div>
          ))}
        </div>

        <p className="text-xl text-white/60">
          10,000+ early members. All of them complex. All of them whole.
        </p>

        <button onClick={onJoin} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
          Join Waitlist <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!val.trim()) {
      setStatus("error");
      setErrorMsg("This field is required");
      return;
    }
    if (!val.includes("@") && val.length < 10) {
      setStatus("error");
      setErrorMsg("Please enter a valid email or phone number");
      return;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="text-center space-y-6 max-w-md w-full relative z-10 animate-in zoom-in">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-bold">You're in!</h2>
        <p className="text-white/60 text-lg">Stay tuned for something exciting 🚀</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-10 max-w-lg w-full relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Your chapter in the story starts here.
      </h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Email or phone number" 
            value={val}
            onChange={(e) => { setVal(e.target.value); setStatus("idle"); }}
            className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${status === "error" ? "border-red-500" : "border-white/10 focus:border-purple-500"} text-white placeholder:text-white/30 outline-none transition-colors text-lg`}
          />
          {status === "error" && <p className="text-red-400 text-sm text-left mt-2 pl-2">{errorMsg}</p>}
        </div>
        <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all hover:scale-[1.02]">
          Secure your spot
        </button>
      </form>
    </div>
  );
}
