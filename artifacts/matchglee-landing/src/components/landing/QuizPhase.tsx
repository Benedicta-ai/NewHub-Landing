import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

export default function QuizPhase({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ focus: "", hurdle: "" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (cb: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => { cb(); setIsTransitioning(false); }, 600);
  };

  const personalizedMessage = (() => {
    if (answers.focus === "Both, honestly" && answers.hurdle === "I have to pick one version of myself")
      return "That's exactly why NewHub exists. You shouldn't have to choose.";
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

      <header className="relative z-20 w-full p-6 flex items-center max-w-7xl mx-auto">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 pt-4">
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 0 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <p className="text-lg text-center text-white/50 mb-4 font-medium">Before we talk about NewHub...</p>
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

        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 2 && !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none absolute"}`}>
          <ProgressDots />
          <div className="max-w-3xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 leading-tight">{personalizedMessage}</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-14">
              <span className="px-5 py-2.5 rounded-full bg-[#F0199A]/20 text-pink-300 text-sm font-medium border border-[#F0199A]/30">{answers.focus || "Dual Focus"}</span>
              <span className="px-5 py-2.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">Values Authenticity</span>
              <span className="px-5 py-2.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">Anti-Noise</span>
            </div>
            <button onClick={() => triggerTransition(() => setStep(3))} className="px-8 py-4 rounded-full text-lg font-bold bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto">
              See how it unfolds <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

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
              Continue <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
