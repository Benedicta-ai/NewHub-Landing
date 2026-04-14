import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2, CheckCircle2, UserCircle, Zap, ShieldCheck, Globe, MessageSquare } from "lucide-react";

export function InteractiveQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ focus: "", hurdle: "" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = (key: "focus" | "hurdle", value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    triggerTransition(() => setStep(prev => prev + 1));
  };

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 600); // 600ms transition time
  };

  const handleSkip = () => {
    triggerTransition(() => setStep(4)); // 4 is the traditional view
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("idle");
    setErrorMessage("");

    if (!contactInput.trim()) {
      setFormStatus("error");
      setErrorMessage("This field is required");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInput);
    const isPhone = /^[+]?[0-9]{10,15}$/.test(contactInput);

    if (!isEmail && !isPhone) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid email or phone");
      return;
    }

    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400";
  const glassCard = "bg-white/5 backdrop-blur-md border border-white/10 hover:border-transparent hover:bg-white/10 transition-all duration-300 rounded-3xl relative group overflow-hidden cursor-pointer";
  const glassCardGlow = "absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300";

  // Data
  const features = {
    dual: { icon: <UserCircle className="w-8 h-8 text-pink-400" />, title: "Dual Identity", desc: "Maintain one unified account while effortlessly switching between personal and professional modes." },
    smart: { icon: <Zap className="w-8 h-8 text-purple-400" />, title: "Smart Networking", desc: "Connect based on your true interests and goals, not just a job title." },
    privacy: { icon: <ShieldCheck className="w-8 h-8 text-blue-400" />, title: "Privacy Control", desc: "You decide exactly what to share and with whom. Total control over your narrative." },
    rich: { icon: <Globe className="w-8 h-8 text-indigo-400" />, title: "Rich Profiles", desc: "Showcase your whole story through dynamic highlights and galleries." }
  };

  const getTailoredContent = () => {
    if (answers.focus === "Both, honestly" && answers.hurdle === "I have to pick one version of myself") {
      return {
        message: "That's exactly why MatchGlee exists. You shouldn't have to choose.",
        feats: [features.dual, features.smart]
      };
    }
    if (answers.hurdle === "It feels too transactional") {
      return {
        message: "We're over the transaction, too. Let's build real connections.",
        feats: [features.smart, features.rich]
      };
    }
    if (answers.hurdle === "It's overwhelming and noisy") {
      return {
        message: "Cut through the noise. Find your people, on your terms.",
        feats: [features.privacy, features.smart]
      };
    }
    return {
      message: "Ready for a space that actually gets you?",
      feats: [features.dual, features.rich]
    };
  };

  const tailored = getTailoredContent();

  const renderDots = () => {
    if (step >= 4) return null;
    return (
      <div className="flex gap-2 items-center justify-center mb-8">
        {[0, 1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === step ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' : 
              i < step ? 'w-2 bg-white/40' : 'w-2 bg-white/10'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-[#0A0118] text-white font-sans selection:bg-pink-500/30 overflow-hidden relative flex flex-col">
      
      {/* Background ambient light */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] -left-20 w-[60rem] h-[60rem] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] -right-20 w-[60rem] h-[60rem] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => step < 4 && triggerTransition(() => setStep(0))}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-lg font-bold tracking-tight">Match<span className="text-pink-500">Glee</span></span>
        </div>
        {step < 4 && (
          <button onClick={handleSkip} className="text-sm font-medium text-white/50 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">
            Skip intro
          </button>
        )}
      </header>

      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 transition-transform duration-700 ease-in-out ${
          isTransitioning ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transformOrigin: 'left' }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 pt-4 md:pt-12">
        
        {/* Step 0: Initial Question */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 0 && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
          {renderDots()}
          <h1 className="text-xl md:text-2xl text-center text-white/60 mb-4 font-medium">Before we talk about MatchGlee...</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight leading-tight">
            What describes you <span className={gradientText}>best</span> right now?
          </h2>
          
          <div className="grid gap-4 md:gap-6 md:grid-cols-3 max-w-3xl mx-auto w-full">
            {[
              { id: 'Building my career', icon: '🎯', label: 'Professional focus' },
              { id: 'Exploring my passions', icon: '🌟', label: 'Personal focus' },
              { id: 'Both, honestly', icon: '⚡', label: 'Dual focus' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => handleNext('focus', opt.id)}
                className={`p-8 md:p-10 ${glassCard} flex flex-col items-center text-center gap-4`}
              >
                <div className={glassCardGlow} />
                <span className="text-4xl md:text-5xl relative z-10">{opt.icon}</span>
                <span className="text-xl md:text-2xl font-bold relative z-10">{opt.id}</span>
                <span className="text-sm text-white/50 font-medium relative z-10">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Second Question */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 1 && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
          {renderDots()}
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight leading-tight max-w-2xl mx-auto">
            What do you find hardest about connecting online?
          </h2>
          
          <div className="grid gap-4 max-w-xl mx-auto w-full">
            {[
              "It feels too transactional",
              "I have to pick one version of myself",
              "It's overwhelming and noisy"
            ].map(opt => (
              <button 
                key={opt}
                onClick={() => handleNext('hurdle', opt)}
                className={`p-6 md:p-8 ${glassCard} flex items-center justify-between group`}
              >
                <div className={glassCardGlow} />
                <span className="text-xl md:text-2xl font-medium relative z-10 text-left">{opt}</span>
                <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-pink-400 group-hover:translate-x-2 transition-all relative z-10" />
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Personalized Reveal */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 2 && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
          {renderDots()}
          
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 leading-tight">
              {tailored.message}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tailored.feats.map((feat, i) => (
                <div key={i} className={`p-8 ${glassCard} !cursor-default`}>
                  <div className="mb-6">{feat.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => triggerTransition(() => setStep(3))}
                className="px-8 py-4 rounded-full text-lg font-bold bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                See how it works <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Final CTA */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step === 3 && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
          {renderDots()}
          
          <div className="max-w-xl mx-auto w-full text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to be your <span className={gradientText}>whole self?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12">
              Join the waitlist to get early access when we launch.
            </p>

            {formStatus === "success" ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">You're in!</h3>
                <p className="text-white/60">Stay tuned for something exciting 🚀</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative mb-16">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      placeholder="Your email or phone number"
                      className={`w-full px-6 py-4 rounded-2xl bg-white/5 border ${errorMessage ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-pink-500'} text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all text-lg`}
                      disabled={formStatus === "loading"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className={`px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center sm:min-w-[160px] text-lg
                      ${formStatus === "loading" ? 'bg-white/10 cursor-not-allowed' : `bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]`}
                    `}
                  >
                    {formStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Join Waitlist"}
                  </button>
                </div>
                {errorMessage && <p className="text-red-400 text-sm mt-3 text-left pl-2 absolute -bottom-8">{errorMessage}</p>}
              </form>
            )}

            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
              <div className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Your MatchGlee Profile</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/20">
                  {answers.focus || 'Dual Focus'}
                </span>
                <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium border border-pink-500/20">
                  Values Authenticity
                </span>
                <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/20">
                  Anti-Noise
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Traditional Fallback / Skip Intro */}
        {step === 4 && (
          <div className={`transition-all duration-700 w-full max-w-6xl mx-auto ${!isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                  Where Personal Meets <span className={gradientText}>Professional</span>
                </h1>
                <p className="text-xl text-white/60 mb-10 leading-relaxed">
                  MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between your work persona and your true passions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all">
                    Join Waitlist
                  </button>
                  <button onClick={() => triggerTransition(() => setStep(0))} className="px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/20 hover:bg-white/10 transition-all">
                    Take the Quiz
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center">
                 <div className="w-[300px] md:w-[340px] rounded-[3rem] p-3 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                   <div className="rounded-[2.25rem] overflow-hidden bg-black">
                     <img 
                       src="/__mockup/images/matchglee-app-ui.png" 
                       alt="MatchGlee App" 
                       className="w-full h-auto opacity-80"
                     />
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="mt-24 grid md:grid-cols-3 gap-6 pb-24">
              {Object.values(features).slice(0,3).map((feat, i) => (
                <div key={i} className={`p-8 ${glassCard} !cursor-default`}>
                  <div className="mb-6">{feat.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
