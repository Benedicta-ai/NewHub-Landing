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
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export function BoldChromatic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Add Space Grotesk font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
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
      setContactInput("");
      
      // Reset success state after a while
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden" style={{ fontFamily: 'sans-serif' }}>
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#1E0D3C] py-3 shadow-lg" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-10 h-10 rounded-none object-cover border-2 border-white" />
            <span className="text-2xl font-bold tracking-tighter uppercase" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Match<span className="text-[#FF2A85]">Glee</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF2A85] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Features</a>
            <a href="#story" className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF2A85] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Story</a>
            <a href="#mission" className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF2A85] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Mission</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#updates" className="text-sm font-bold uppercase tracking-wider px-6 py-3 border-2 border-white hover:bg-white hover:text-[#1E0D3C] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Get Updates
            </a>
            <a href="#updates" className="text-sm font-bold uppercase tracking-wider px-6 py-3 bg-[#FF2A85] text-white hover:bg-white hover:text-[#FF2A85] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#1E0D3C] border-t-2 border-white py-6 px-6 flex flex-col gap-6 shadow-2xl">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-wider text-white hover:text-[#FF2A85]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Features</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-wider text-white hover:text-[#FF2A85]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Story</a>
            <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-wider text-white hover:text-[#FF2A85]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Mission</a>
            <div className="flex flex-col gap-4 mt-4">
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className="text-center text-lg font-bold uppercase tracking-wider px-6 py-4 border-2 border-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Get Updates</a>
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className="text-center text-lg font-bold uppercase tracking-wider px-6 py-4 bg-[#FF2A85] text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#1E0D3C]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Where Personal Meets <span className="text-[#FF2A85]">Professional</span> — Seamlessly
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 leading-snug font-medium max-w-xl">
              MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between your work persona and your true passions.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#updates" className="flex items-center gap-3 px-8 py-5 text-lg font-bold uppercase tracking-wider bg-white text-[#1E0D3C] hover:bg-[#FF2A85] hover:text-white transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Get Started <ArrowRight strokeWidth={3} className="w-5 h-5" />
              </a>
              <a href="#updates" className="px-8 py-5 text-lg font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-[#1E0D3C] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Get Updates
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="relative lg:h-[600px] flex justify-center items-center">
            {/* Phone Mockup Container */}
            <div className="relative z-10 w-[300px] md:w-[340px] p-4 bg-black border-4 border-white shadow-[20px_20px_0px_0px_#FF2A85] transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="overflow-hidden bg-black relative">
                <img 
                  src="/__mockup/images/matchglee-app-ui.png" 
                  alt="MatchGlee App Interface" 
                  className="w-full h-auto object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="py-32 px-6 bg-[#8B1A5C]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              The Story of <br/>MatchGlee
            </h2>
            
            <div className="space-y-8 text-2xl md:text-4xl font-bold leading-tight">
              <p>
                In a world where networking feels forced and social platforms feel overwhelming, MatchGlee was born to bridge the gap.
              </p>
              <p className="text-[#FFB6C1]">
                We realized people aren't just professionals or just individuals — they are both. Your passions, your work, your vibe — everything deserves a space that feels natural.
              </p>
              <p className="bg-white text-[#8B1A5C] p-4 inline-block transform -rotate-1">
                MatchGlee isn't just about connecting profiles. It's about connecting people — authentically. Whether you're sharing your story, showcasing your work, or finding your tribe — MatchGlee lets you do it your way.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-40 px-6 bg-[#0F2C8A] flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block mb-10 px-6 py-3 border-4 border-white text-xl font-bold tracking-widest uppercase bg-black text-white transform -rotate-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Our Mission
            </div>
            <h2 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter uppercase" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              To create a platform where <span className="text-[#00E5FF]">personal expression</span> and <span className="text-[#FF2A85]">professional identity</span> coexist effortlessly — empowering meaningful connections without boundaries.
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Everything You Need to <span className="text-[#00E5FF]">Connect</span>
              </h2>
              <p className="text-2xl font-bold max-w-3xl border-l-8 border-[#FF2A85] pl-6 py-2">Powerful features designed to help you express your full self and build a network that matters.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100} className="lg:col-span-2">
              <div className="h-full p-10 bg-[#1A1A1A] border-l-8 border-[#FF2A85] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <UserCircle size={120} strokeWidth={1} color="#FF2A85" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tight text-[#FF2A85]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Dual Identity</h3>
                  <p className="text-xl font-medium leading-snug">Switch between personal and professional modes effortlessly. Control what different connections see while maintaining one unified account.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="h-full p-10 bg-[#1A1A1A] border-l-8 border-[#00E5FF] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Zap size={100} strokeWidth={1} color="#00E5FF" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#00E5FF]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Smart Networking</h3>
                  <p className="text-lg font-medium leading-snug">Connect based on interests, goals, and intent, not just job titles.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="h-full p-10 bg-[#1A1A1A] border-l-8 border-[#FFE600] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck size={100} strokeWidth={1} color="#FFE600" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#FFE600]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Privacy Control</h3>
                  <p className="text-lg font-medium leading-snug">You decide exactly what to share and with whom. Total transparency, total control.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="h-full p-10 bg-[#1A1A1A] border-l-8 border-[#FF5E00] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Globe size={100} strokeWidth={1} color="#FF5E00" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#FF5E00]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Interactive Profiles</h3>
                  <p className="text-lg font-medium leading-snug">Highlights, galleries, and dynamic content that tells your whole story.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="h-full p-10 bg-[#1A1A1A] border-l-8 border-[#B5179E] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <MessageSquare size={100} strokeWidth={1} color="#B5179E" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight text-[#B5179E]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Real-Time Chat</h3>
                  <p className="text-lg font-medium leading-snug">Communicate and connect instantly with built-in rich messaging tools.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* UI Showcase Section */}
      <section className="py-32 px-6 bg-[#0D3D3A]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Experience <br/><span className="text-[#FFE600] border-b-8 border-[#FFE600]">MatchGlee</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto flex justify-center">
            {/* Main UI */}
            <FadeIn delay={200} className="relative z-10">
               <div className="w-[320px] md:w-[400px] p-4 bg-white border-8 border-black shadow-[30px_30px_0px_0px_#FFE600] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                 <div className="overflow-hidden bg-black">
                   <img 
                     src="/__mockup/images/matchglee-app-ui.png" 
                     alt="MatchGlee Profile UI" 
                     className="w-full h-auto"
                   />
                 </div>
               </div>
            </FadeIn>

            {/* Floating Stat Cards */}
            <FadeIn delay={400} className="absolute top-1/4 -left-4 md:-left-20 w-48 p-6 bg-black border-4 border-[#00E5FF] shadow-[10px_10px_0px_0px_#00E5FF] z-20 transform rotate-6">
              <div className="text-5xl font-black text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>1.2K</div>
              <div className="text-lg font-bold text-[#00E5FF] uppercase tracking-wider">Followers</div>
            </FadeIn>

            <FadeIn delay={600} className="absolute bottom-1/4 -right-4 md:-right-20 w-48 p-6 bg-black border-4 border-[#FF2A85] shadow-[10px_10px_0px_0px_#FF2A85] z-20 transform -rotate-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-5xl font-black text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>82%</div>
              </div>
              <div className="text-lg font-bold text-[#FF2A85] uppercase tracking-wider">Alignment</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Updates Section */}
      <section id="updates" className="py-40 px-6 bg-[#3D1A8A]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Be the <span className="text-[#FFE600]">First</span><br/> to Know
              </h2>
              <p className="text-2xl font-bold mb-16 max-w-2xl mx-auto">
                MatchGlee is launching soon. Drop your email or phone number to get early access and exclusive updates.
              </p>

              {formStatus === "success" ? (
                <div className="bg-white text-[#3D1A8A] border-8 border-black p-10 flex flex-col items-center justify-center transform rotate-1">
                  <CheckCircle2 className="w-16 h-16 mb-6 text-[#FF2A85]" strokeWidth={3} />
                  <p className="text-3xl font-black uppercase tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>You're in! Stay tuned for something exciting 🚀</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder="YOUR EMAIL OR PHONE NUMBER"
                        className={`w-full px-8 py-6 text-xl font-bold bg-white text-black border-4 ${errorMessage ? 'border-[#FF2A85]' : 'border-black'} placeholder:text-gray-400 placeholder:font-bold focus:outline-none focus:ring-0 shadow-[10px_10px_0px_0px_#000000] rounded-none transition-all`}
                        disabled={formStatus === "loading"}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className={`px-10 py-6 font-black text-xl uppercase tracking-wider text-black border-4 border-black transition-all flex items-center justify-center min-w-[200px] shadow-[10px_10px_0px_0px_#000000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[5px_5px_0px_0px_#000000]
                        ${formStatus === "loading" ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FFE600]'}
                      `}
                      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                    >
                      {formStatus === "loading" ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        "Get Updates"
                      )}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-[#FF2A85] bg-black inline-block px-4 py-2 font-bold text-lg mt-6 text-left border-2 border-white">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] border-t-8 border-[#FF2A85]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <div className="flex items-center gap-4">
              <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-12 h-12 grayscale object-cover border-2 border-white" />
              <span className="text-3xl font-black tracking-tighter uppercase text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Match<span className="text-[#FF2A85]">Glee</span></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-lg font-bold uppercase text-white hover:text-[#00E5FF] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Features</a>
                <a href="#story" className="text-lg font-bold uppercase text-white hover:text-[#00E5FF] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Story</a>
                <a href="#mission" className="text-lg font-bold uppercase text-white hover:text-[#00E5FF] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Mission</a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-lg font-bold uppercase text-white hover:text-[#FFE600] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Privacy Policy</a>
                <a href="#" className="text-lg font-bold uppercase text-white hover:text-[#FFE600] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Terms of Service</a>
                <a href="#" className="text-lg font-bold uppercase text-white hover:text-[#FFE600] transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Contact</a>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="#" className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-[#FF2A85] hover:text-white transition-colors border-2 border-black">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-[#FF2A85] hover:text-white transition-colors border-2 border-black">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-[#FF2A85] hover:text-white transition-colors border-2 border-black">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="pt-10 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 font-bold uppercase text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              &copy; {new Date().getFullYear()} MatchGlee. All rights reserved.
            </p>
            <p className="text-white/60 font-bold uppercase text-sm" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Designed for the real you.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
