import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Users, Heart, ArrowRight, Loader2, CheckCircle2, ChevronRight } from "lucide-react";

// --- Hooks ---
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

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

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Mock Data ---
const PROFILES = [
  {
    id: 1,
    name: "Sarah A.",
    profession: "Designer",
    passion: "Trail Runner",
    gradient: "from-pink-500 to-orange-400",
    tags: ["Collaborations", "Friendship"],
    stat: "94% Match",
    delay: 0,
    floatClass: "animate-[float_4s_ease-in-out_infinite]"
  },
  {
    id: 2,
    name: "Marcus K.",
    profession: "VC Partner",
    passion: "Jazz Musician",
    gradient: "from-purple-500 to-indigo-500",
    tags: ["Mentoring"],
    stat: "1.2K Followers",
    delay: 150,
    floatClass: "animate-[float_5s_ease-in-out_infinite_0.5s]"
  },
  {
    id: 3,
    name: "Priya R.",
    profession: "Engineer",
    passion: "Ceramicist",
    gradient: "from-teal-400 to-emerald-500",
    tags: ["Friendship", "Collaborations"],
    stat: "88% Alignment",
    delay: 300,
    floatClass: "animate-[float_4.5s_ease-in-out_infinite_1s]"
  },
  {
    id: 4,
    name: "Tolu O.",
    profession: "Product PM",
    passion: "Film Photographer",
    gradient: "from-blue-500 to-cyan-400",
    tags: ["Mentoring", "Events"],
    stat: "850 Followers",
    delay: 100,
    floatClass: "animate-[float_4s_ease-in-out_infinite_0.2s]"
  },
  {
    id: 5,
    name: "Mei L.",
    profession: "Sustainability Lead",
    passion: "Urban Gardener",
    gradient: "from-green-400 to-lime-500",
    tags: ["Collaborations"],
    stat: "92% Match",
    delay: 400,
    floatClass: "animate-[float_5.5s_ease-in-out_infinite_0.8s]"
  },
  {
    id: 6,
    name: "James D.",
    profession: "Consultant",
    passion: "Fiction Writer",
    gradient: "from-rose-400 to-red-500",
    tags: ["Friendship", "Mentoring"],
    stat: "91% Alignment",
    delay: 250,
    floatClass: "animate-[float_4.2s_ease-in-out_infinite_0.4s]"
  },
];

// --- Components ---
const ProfileCard = ({ profile }: { profile: typeof PROFILES[0] }) => {
  return (
    <div className={`p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl ${profile.floatClass} hover:scale-105 transition-transform duration-300 cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-lg">{profile.name.charAt(0)}</span>
        </div>
        <div className="text-xs font-semibold text-white/50 bg-black/20 px-2 py-1 rounded-full">
          {profile.stat}
        </div>
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{profile.name}</h3>
      <p className="text-white/70 text-sm mb-4">
        {profile.profession} <span className="text-pink-400">&</span> {profile.passion}
      </p>
      <div className="flex flex-wrap gap-2">
        {profile.tags.map(tag => (
          <span key={tag} className="text-xs font-medium text-white/80 px-2.5 py-1 rounded-full bg-white/10 border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export function PeopleFirst() {
  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("idle");
    setErrorMessage("");

    if (!contactInput.trim()) {
      setFormStatus("error");
      setErrorMessage("This field is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;

    if (!emailRegex.test(contactInput) && !phoneRegex.test(contactInput)) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid email or phone number");
      return;
    }

    setFormStatus("loading");

    setTimeout(() => {
      setFormStatus("success");
      setContactInput("");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400";
  const gradientBg = "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500";

  return (
    <div className="min-h-screen bg-[#0D0A16] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* Custom Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}} />

      {/* Floating Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0D0A16]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="Logo" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-bold text-sm tracking-tight">MatchGlee</span>
        </div>
        <div className="w-px h-4 bg-white/20 hidden sm:block" />
        <a href="#updates" className="text-sm font-medium text-white/80 hover:text-white hidden sm:block">Sign In</a>
        <a href="#updates" className={`text-sm font-semibold px-4 py-1.5 rounded-full ${gradientBg} shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform`}>
          Join Waitlist
        </a>
      </nav>

      {/* SECTION 1: The Network First */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <FadeIn>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-medium text-white/60 mb-2">You're already seeing the network.</h1>
              <p className="text-lg text-white/40">Real people, multi-dimensional lives.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PROFILES.map((profile) => (
              <FadeIn key={profile.id} delay={profile.delay}>
                <ProfileCard profile={profile} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: The Hook */}
      <section className="py-24 px-6 relative z-20 bg-[#0D0A16]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-10">
              This is MatchGlee.<br/>
              Where your <span className={gradientText}>whole self</span> connects.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#updates" className={`px-8 py-4 rounded-full text-base font-semibold ${gradientBg} hover:scale-105 transition-all shadow-xl shadow-pink-500/20`}>
                Get Started
              </a>
              <a href="#updates" className="px-8 py-4 rounded-full text-base font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                Get Updates
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3: The Conversation Story */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0D0A16] to-[#161224] relative">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="bg-white text-black rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
              
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <div className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">How it happens</div>
                  <h3 className="text-3xl font-bold">Connections that make sense.</h3>
                </div>

                <div className="space-y-6">
                  {/* Bubble 1 */}
                  <div className="flex items-end gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-5 py-3 max-w-[85%] text-[15px] leading-relaxed">
                      Hey Marcus! I saw on your <span className="font-semibold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">Personal profile</span> you're into jazz, and your <span className="font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Pro profile</span> says you're in VC.
                    </div>
                  </div>

                  {/* Bubble 2 */}
                  <div className="flex items-end gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-transparent flex-shrink-0" />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%] text-[15px] leading-relaxed">
                      I'm a designer building a music investment tool. Think we'd align well!
                    </div>
                  </div>

                  {/* Bubble 3 */}
                  <div className="flex items-end gap-3 justify-end mt-4">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-5 py-3 max-w-[85%] text-[15px] leading-relaxed">
                      Sarah, that sounds incredible. It's rare to find someone merging those two worlds.
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                  </div>

                  {/* System Message */}
                  <div className="flex justify-center my-6">
                    <div className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-xs font-medium text-gray-500 flex items-center gap-2">
                      <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                      Marcus scheduled a Collaboration Session
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 4: Micro-Stories */}
      <section className="py-24 px-6 bg-[#0D0A16]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-white">Dual Identity</h4>
                <p className="text-white/60 leading-relaxed">
                  "Tolu was tired of being 'just an engineer' online. He joined MatchGlee and found people who wanted to know about his photography too."
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={150}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-white">Smart Networking</h4>
                <p className="text-white/60 leading-relaxed">
                  "Mei only wanted to connect with people who were serious about sustainability. MatchGlee matched her by intent."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-white">Privacy Control</h4>
                <p className="text-white/60 leading-relaxed">
                  "James shares his personal work with friends and keeps his consulting separate. One account, total control."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 5: Get Updates Form */}
      <section id="updates" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Add yourself to the mix.</h2>
              <p className="text-lg text-white/60 mb-10">
                We're selecting early members. Leave your contact and we'll let you know when your spot is ready.
              </p>

              {formStatus === "success" ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-6 flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 mb-3" />
                  <p className="text-lg font-medium">You're in! Stay tuned for something exciting 🚀</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder="Email or phone number"
                        className={`w-full px-6 py-4 rounded-full bg-black/40 border ${errorMessage ? 'border-red-500' : 'border-white/20 focus:border-pink-500'} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all`}
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className={`px-8 py-4 rounded-full font-semibold text-white transition-all flex items-center justify-center min-w-[140px]
                        ${formStatus === "loading" ? 'bg-white/10 cursor-not-allowed' : `${gradientBg} hover:scale-105 shadow-lg shadow-pink-500/20`}
                      `}
                    >
                      {formStatus === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join"}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-sm text-white/40 bg-[#0D0A16]">
        <p>© {new Date().getFullYear()} MatchGlee. All rights reserved.</p>
      </footer>
    </div>
  );
}
