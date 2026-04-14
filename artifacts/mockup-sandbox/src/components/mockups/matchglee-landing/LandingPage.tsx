import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  MessageSquare, 
  UserCircle, 
  ShieldCheck, 
  Globe, 
  Zap,
  Twitter,
  Instagram,
  Linkedin,
  Loader2,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

// Intersection Observer Hook for animations
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

// Fade in component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState<{type: 'email'|'phone', value: string, submittedAt: Date}[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    const isEmail = emailRegex.test(contactInput);
    const isPhone = phoneRegex.test(contactInput);

    if (!isEmail && !isPhone) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid email or phone number");
      return;
    }

    setFormStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setSubmissions(prev => [
        ...prev, 
        { type: isEmail ? 'email' : 'phone', value: contactInput, submittedAt: new Date() }
      ]);
      setContactInput("");
      
      // Reset success state after a while
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400";
  const gradientBg = "bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#60A5FA]";
  const glassCard = "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl";

  return (
    <div className="min-h-screen bg-[#0A0118] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] -left-10 w-[40rem] h-[40rem] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute top-[20%] -right-10 w-[35rem] h-[35rem] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0A0118]/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-xl font-bold tracking-tight">Match<span className="text-pink-500">Glee</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#story" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Story</a>
            <a href="#mission" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Mission</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#updates" className="text-sm font-medium px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              Get Updates
            </a>
            <a href="#updates" className={`text-sm font-medium px-5 py-2.5 rounded-full ${gradientBg} hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300`}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0118]/95 backdrop-blur-xl border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Features</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Story</a>
            <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Mission</a>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium px-5 py-3 rounded-xl border border-white/20">Get Updates</a>
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className={`text-center font-medium px-5 py-3 rounded-xl ${gradientBg}`}>Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80">Now accepting early access</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Where Personal Meets <span className={gradientText}>Professional</span> — Seamlessly
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
              MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between your work persona and your true passions.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#updates" className={`flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold ${gradientBg} hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300`}>
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#updates" className="px-8 py-4 rounded-full text-base font-semibold bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Get Updates
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="relative lg:h-[600px] flex justify-center items-center">
            {/* Phone Mockup Container */}
            <div className="relative z-10 w-[300px] md:w-[340px] rounded-[3rem] p-3 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 transform md:rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
              <div className="rounded-[2.25rem] overflow-hidden bg-black relative">
                <img 
                  src="/__mockup/images/matchglee-app-ui.png" 
                  alt="MatchGlee App Interface" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute -right-10 top-20 w-48 p-4 ${glassCard} animate-[bounce_4s_infinite] z-20 hidden md:block`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400" />
                <div>
                  <div className="text-xs font-bold">New Connection</div>
                  <div className="text-[10px] text-white/60">Alex liked your portfolio</div>
                </div>
              </div>
            </div>

            <div className={`absolute -left-16 bottom-32 w-56 p-4 ${glassCard} animate-[bounce_5s_infinite_0.5s] z-20 hidden md:block`}>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <div className="text-xs font-bold text-white/90">Sarah A.</div>
                  <div className="text-[10px] text-white/60 mt-1">Let's collaborate on that design project! 🚀</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className={`p-8 md:p-12 ${glassCard} relative overflow-hidden`}>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-[50px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/30 rounded-full blur-[50px]" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative z-10">
                The Story of <span className={gradientText}>MatchGlee</span>
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed font-light relative z-10 border-l-4 border-pink-500 pl-6 md:pl-8 py-2">
                <p>
                  In a world where networking feels forced and social platforms feel overwhelming, MatchGlee was born to bridge the gap.
                </p>
                <p>
                  We realized people aren't just professionals or just individuals — they are both. Your passions, your work, your vibe — everything deserves a space that feels natural.
                </p>
                <p>
                  MatchGlee isn't just about connecting profiles. It's about connecting people — authentically. Whether you're sharing your story, showcasing your work, or finding your tribe — <span className="text-white font-medium">MatchGlee lets you do it your way.</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-6 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-[#0A0118] z-0" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-semibold tracking-widest uppercase text-white/80">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight">
              To create a platform where <span className={gradientText}>personal expression</span> and <span className={gradientText}>professional identity</span> coexist effortlessly — empowering meaningful connections without boundaries.
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything You Need to <span className={gradientText}>Connect</span></h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">Powerful features designed to help you express your full self and build a network that matters.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FadeIn delay={100} className="lg:col-span-2">
              <div className={`h-full p-8 ${glassCard} group hover:bg-white/15 transition-colors duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <UserCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Dual Identity</h3>
                <p className="text-white/60 text-lg leading-relaxed">Switch between personal and professional modes effortlessly. Control what different connections see while maintaining one unified account.</p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className={`h-full p-8 ${glassCard} group hover:bg-white/15 transition-colors duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Networking</h3>
                <p className="text-white/60 leading-relaxed">Connect based on interests, goals, and intent, not just job titles.</p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className={`h-full p-8 ${glassCard} group hover:bg-white/15 transition-colors duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy Control</h3>
                <p className="text-white/60 leading-relaxed">You decide exactly what to share and with whom. Total transparency, total control.</p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className={`h-full p-8 ${glassCard} group hover:bg-white/15 transition-colors duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Profiles</h3>
                <p className="text-white/60 leading-relaxed">Highlights, galleries, and dynamic content that tells your whole story.</p>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className={`h-full p-8 ${glassCard} group hover:bg-white/15 transition-colors duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-Time Chat</h3>
                <p className="text-white/60 leading-relaxed">Communicate and connect instantly with built-in rich messaging tools.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* UI Showcase Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16 relative z-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Experience <span className={gradientText}>MatchGlee</span></h2>
            </div>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto flex justify-center">
            {/* Main UI */}
            <FadeIn delay={200} className="relative z-10">
               <div className="w-[320px] md:w-[400px] rounded-[2.5rem] p-2 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                 <div className="rounded-[2rem] overflow-hidden bg-black">
                   <img 
                     src="/__mockup/images/matchglee-app-ui.png" 
                     alt="MatchGlee Profile UI" 
                     className="w-full h-auto"
                   />
                 </div>
               </div>
            </FadeIn>

            {/* Floating Stat Cards */}
            <FadeIn delay={400} className={`absolute top-1/4 -left-4 md:-left-20 w-40 md:w-48 p-4 ${glassCard} z-20`}>
              <div className="text-3xl font-bold text-white mb-1">1.2K</div>
              <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Followers</div>
              <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-[70%]" />
              </div>
            </FadeIn>

            <FadeIn delay={600} className={`absolute bottom-1/4 -right-4 md:-right-20 w-40 md:w-48 p-4 ${glassCard} z-20`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold">82%</div>
              </div>
              <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Alignment</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Updates Section */}
      <section id="updates" className="py-32 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className={`p-8 md:p-14 ${glassCard} text-center relative overflow-hidden group`}>
              {/* Animated background glow inside the card */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Be the First to Know</h2>
                <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
                  MatchGlee is launching soon. Drop your email or phone number to get early access and exclusive updates.
                </p>

                {formStatus === "success" ? (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-6 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-10 h-10 mb-3" />
                    <p className="text-lg font-medium">You're in! Stay tuned for something exciting 🚀</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          placeholder="Your email or phone number"
                          className={`w-full px-6 py-4 rounded-xl md:rounded-full bg-white/5 border ${errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-pink-500 focus:ring-pink-500/20'} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 transition-all`}
                          disabled={formStatus === "loading"}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className={`px-8 py-4 rounded-xl md:rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center min-w-[140px]
                          ${formStatus === "loading" ? 'bg-white/10 cursor-not-allowed' : `${gradientBg} hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]`}
                        `}
                      >
                        {formStatus === "loading" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Get Updates"
                        )}
                      </button>
                    </div>
                    {errorMessage && (
                      <p className="text-red-400 text-sm mt-2 text-left ml-4 absolute -bottom-6 left-0">{errorMessage}</p>
                    )}
                  </form>
                )}
                <p className="text-xs text-white/40 mt-8">We respect your privacy. No spam, ever.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 relative">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-8 h-8 rounded-lg object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="text-xl font-bold tracking-tight text-white/80">Match<span className="text-pink-500">Glee</span></span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">About</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms</a>
            </div>

            <div className="flex items-center gap-5">
              <a href="#" className="text-white/40 hover:text-white hover:scale-110 transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-pink-500 hover:scale-110 transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-blue-400 hover:scale-110 transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="text-center text-sm text-white/30 pt-8 border-t border-white/5">
            © 2026 MatchGlee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
