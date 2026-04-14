import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Circle } from "lucide-react";

function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.5, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
}

const Chapter = ({ 
  children, 
  id, 
  bg, 
  onVisible 
}: { 
  children: React.ReactNode; 
  id: string; 
  bg: string;
  onVisible: (id: string) => void;
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
  
  useEffect(() => {
    if (isIntersecting) {
      onVisible(id);
    }
  }, [isIntersecting, id, onVisible]);

  return (
    <section 
      id={id}
      ref={ref}
      className={`relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 ${bg}`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {children}
    </section>
  );
};

const FadeText = ({ text, delay = 0, isVisible }: { text: string; delay?: number; isVisible: boolean }) => {
  return (
    <div
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {text}
    </div>
  );
};

// Chapter 1
const Chapter1 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#000000]"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* CSS Sound Wave */}
      <div className={`absolute inset-0 flex items-center justify-center gap-2 opacity-20 transition-opacity duration-1000 ${isVisible ? 'opacity-20' : 'opacity-0'}`}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-white rounded-full animate-pulse"
            style={{ 
              height: `${Math.random() * 60 + 10}vh`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random()}s`
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center max-w-5xl space-y-12 md:space-y-20">
        <div className={`text-4xl md:text-7xl font-bold text-white transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          You wake up. You're a designer. A trail runner. A parent. A jazz fan. An entrepreneur.
        </div>
        <div className={`text-3xl md:text-5xl font-medium text-white/70 transition-all duration-1000 ease-out delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          But online... you have to pick.
        </div>
        <div className={`text-2xl md:text-4xl font-medium text-white/40 transition-all duration-1000 ease-out delay-2000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          One profile. One persona. One version of you.
        </div>
      </div>
      
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-3000 ${isVisible ? 'opacity-50' : 'opacity-0'} animate-bounce`}>
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

// Chapter 2
const Chapter2 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 px-4">
        {[
          { label: "Professional only", color: "from-blue-600/40 to-blue-900/40", delay: 0 },
          { label: "Personal only", color: "from-pink-600/40 to-pink-900/40", delay: 200 },
          { label: "Side hustle only", color: "from-purple-600/40 to-purple-900/40", delay: 400 },
          { label: "Weekend only", color: "from-emerald-600/40 to-emerald-900/40", delay: 600 }
        ].map((item, i) => (
          <div 
            key={i}
            className={`aspect-[3/4] md:aspect-[2/3] rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b ${item.color} p-4 md:p-6 flex flex-col justify-end transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
            style={{ transitionDelay: `${item.delay}ms` }}
          >
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/20 mb-4 animate-pulse" />
            <div className="h-4 md:h-6 w-3/4 bg-white/20 rounded mb-2" />
            <div className="h-3 md:h-4 w-1/2 bg-white/10 rounded mb-auto" />
            
            <div className="mt-8 text-sm md:text-lg font-bold text-white tracking-wide uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className={`text-4xl md:text-7xl font-bold text-white text-center transition-all duration-1000 ease-out delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Exhausting, isn't it?
      </div>
    </section>
  );
};

// Chapter 3
const Chapter3 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#1A0035]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-purple-900/50 via-pink-900/20 to-[#1A0035] transition-opacity duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="z-10 text-center flex flex-col items-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-[2rem] object-cover mx-auto mb-8 shadow-[0_0_50px_rgba(236,72,153,0.5)]" />
        </div>
        
        <h2 className={`text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mb-6 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Meet MatchGlee.
        </h2>
        
        <p className={`text-2xl md:text-4xl font-medium text-white/80 mb-16 transition-all duration-1000 delay-600 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          One profile. Every version of you. Authentically.
        </p>

        <div className={`relative transition-all duration-1000 delay-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-[100px] opacity-30" />
          <div className="relative w-[280px] md:w-[340px] rounded-[2.5rem] p-2 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="rounded-[2rem] overflow-hidden bg-black">
              <img 
                src="/__mockup/images/matchglee-app-ui.png" 
                alt="MatchGlee App" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Chapter 4
const Chapter4 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  const lines = [
    "Personal mode. Professional mode. You, always.",
    "Connect by intent, not algorithm.",
    "Your story. Your audience. Your control."
  ];

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-start p-6 md:p-20 bg-[#080818]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-6xl mx-auto w-full space-y-16 md:space-y-24">
        {lines.map((line, i) => (
          <div key={i} className="relative inline-block">
            <h3 
              className={`text-3xl md:text-6xl lg:text-7xl font-bold text-white transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
              style={{ transitionDelay: `${i * 600}ms` }}
            >
              {line}
            </h3>
            <div 
              className={`absolute -bottom-4 md:-bottom-8 left-0 h-1 md:h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent transition-all duration-1000 ease-out`}
              style={{ 
                width: isVisible ? '100%' : '0%',
                transitionDelay: `${(i * 600) + 400}ms`
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Chapter 5
const Chapter5 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0D0122]"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Floating Cards Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const delay = Math.random() * 1000;
          const duration = Math.random() * 20000 + 20000;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          return (
            <div 
              key={i}
              className={`absolute p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-40 scale-100' : 'opacity-0 scale-50'}`}
              style={{ 
                left: `${left}%`, 
                top: `${top}%`,
                transitionDelay: `${delay}ms`,
                animation: `float ${duration}ms infinite alternate ease-in-out`
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500`} />
                <div>
                  <div className="h-3 w-20 bg-white/20 rounded mb-1" />
                  <div className="h-2 w-16 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="z-10 text-center relative">
        <div className={`absolute inset-0 bg-purple-500/20 blur-[120px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        
        <h2 className={`text-5xl md:text-8xl font-bold text-white mb-6 relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          You're not alone in this.
        </h2>
        <p className={`text-2xl md:text-4xl text-pink-400 font-medium relative z-10 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          10,000+ people already waiting.
        </p>

        <div className={`mt-16 flex justify-center transition-all duration-1000 delay-600 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
           <div className="w-[200px] md:w-[260px] rounded-[2rem] p-2 bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rotate-[-5deg] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden bg-black">
                <img 
                  src="/__mockup/images/matchglee-app-ui.png" 
                  alt="MatchGlee App" 
                  className="w-full h-auto opacity-70"
                />
              </div>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, -30px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
};

// Chapter 6
const Chapter6 = ({ id, onVisible }: { id: string, onVisible: (id: string) => void }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isVisible) onVisible(id);
  }, [isVisible, id, onVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    if (!input.trim()) {
      setStatus("error");
      setErrorMsg("This field is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;

    if (!emailRegex.test(input) && !phoneRegex.test(input)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email or phone number");
      return;
    }

    // Simulate API
    setStatus("success");
    setInput("");
  };

  return (
    <section 
      id={id}
      ref={ref}
      className="relative w-full h-[100vh] min-h-screen overflow-hidden flex flex-col justify-center items-center p-6 bg-[#0A0118]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-[#0A0118] to-[#0A0118] transition-opacity duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

      <div className="z-10 text-center max-w-2xl w-full flex flex-col items-center">
        <h2 className={`text-6xl md:text-8xl font-bold text-white mb-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Your chapter starts here.
        </h2>

        <div className={`w-full transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {status === "success" ? (
            <div className="text-2xl text-green-400 font-medium p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
              You're in! Stay tuned for something exciting 🚀
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Email or phone number"
                  className={`flex-1 px-8 py-5 md:py-6 text-lg md:text-xl rounded-full bg-white/5 border ${status === 'error' ? 'border-red-500' : 'border-white/20'} text-white placeholder:text-white/40 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all`}
                />
                <button 
                  type="submit"
                  className="px-10 py-5 md:py-6 text-lg md:text-xl font-bold rounded-full text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:scale-105 transition-transform whitespace-nowrap shadow-[0_0_30px_rgba(236,72,153,0.3)]"
                >
                  Get Updates
                </button>
              </div>
              {status === "error" && (
                <div className="absolute -bottom-8 left-6 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}
            </form>
          )}
        </div>

        <div className={`mt-32 flex flex-col items-center gap-4 transition-all duration-1000 delay-600 ease-out transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee" className="w-12 h-12 rounded-xl object-cover grayscale opacity-50" />
          <div className="text-white/40 text-sm font-medium">© 2026 MatchGlee</div>
        </div>
      </div>
    </section>
  );
};

export function CinematicStory() {
  const [activeChapter, setActiveChapter] = useState("chapter-1");
  
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="w-full h-screen overflow-y-scroll bg-black font-sans selection:bg-pink-500/30"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Scroll Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const id = `chapter-${num}`;
          const isActive = activeChapter === id;
          return (
            <button
              key={num}
              onClick={() => handleScrollTo(id)}
              className="group flex items-center justify-end gap-2"
              aria-label={`Go to chapter ${num}`}
            >
              <span className={`text-xs font-bold text-white transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                {num}
              </span>
              <Circle 
                className={`w-3 h-3 transition-all duration-300 ${isActive ? 'fill-pink-500 text-pink-500 scale-150 shadow-[0_0_10px_rgba(236,72,153,1)]' : 'text-white/40 hover:text-white/80'}`} 
              />
            </button>
          );
        })}
      </div>

      <Chapter1 id="chapter-1" onVisible={setActiveChapter} />
      <Chapter2 id="chapter-2" onVisible={setActiveChapter} />
      <Chapter3 id="chapter-3" onVisible={setActiveChapter} />
      <Chapter4 id="chapter-4" onVisible={setActiveChapter} />
      <Chapter5 id="chapter-5" onVisible={setActiveChapter} />
      <Chapter6 id="chapter-6" onVisible={setActiveChapter} />
    </div>
  );
}
