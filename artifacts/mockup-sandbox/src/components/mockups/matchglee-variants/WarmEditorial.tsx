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

export function WarmEditorial() {
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
  const gradientBg = "bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400";
  const solidCard = "bg-white border border-[#F0EBE1] shadow-sm rounded-2xl";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#2C2C2C] font-sans selection:bg-[#C4622D]/20 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
      `}} />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#E8E1D5] py-3 shadow-sm" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
            <span className="text-2xl font-bold tracking-tight font-['Playfair_Display']">Match<span className="text-[#C4622D]">Glee</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-[15px] font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">Features</a>
            <a href="#story" className="text-[15px] font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">Story</a>
            <a href="#mission" className="text-[15px] font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">Mission</a>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a href="#updates" className="text-[15px] font-medium text-[#2C2C2C] hover:text-[#C4622D] transition-colors">
              Get Updates
            </a>
            <a href="#updates" className={`text-[15px] font-medium px-6 py-2.5 rounded-full text-white ${gradientBg} shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#2C2C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[#FAF8F4] border-b border-[#E8E1D5] transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="flex flex-col gap-4 px-6">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#5A5A5A]">Features</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#5A5A5A]">Story</a>
            <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#5A5A5A]">Mission</a>
            <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-[#E8E1D5]">
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium px-5 py-3 rounded-xl border border-[#C4622D] text-[#C4622D]">Get Updates</a>
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className={`text-center font-medium px-5 py-3 rounded-xl text-white ${gradientBg}`}>Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="max-w-2xl lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8E1D5]/50 border border-[#D9CDB8] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#C4622D] animate-pulse" />
              <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">Now accepting early access</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight mb-8 text-[#1A1A1A]">
              Where Personal Meets <span className="text-[#C4622D] italic">Professional</span> — Seamlessly.
            </h1>
            <p className="text-lg md:text-xl text-[#5A5A5A] mb-10 leading-relaxed font-light">
              MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between your work persona and your true passions.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#updates" className={`flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium text-white ${gradientBg} shadow-lg shadow-purple-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#updates" className="px-8 py-4 rounded-full text-[15px] font-medium text-[#C4622D] border-2 border-[#C4622D]/20 hover:border-[#C4622D] hover:bg-[#C4622D]/5 transition-all duration-300">
                Get Updates
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="relative lg:h-[650px] flex justify-center items-center">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E8E1D5]/40 rounded-[100%] blur-3xl -z-10" />
            
            {/* Phone Mockup Container */}
            <div className="relative z-10 w-[300px] md:w-[340px] rounded-[3rem] p-3 bg-white border border-[#E8E1D5] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-white border border-[#E8E1D5] rounded-full z-20 shadow-sm" />
              <div className="rounded-[2.25rem] overflow-hidden bg-[#FAF8F4] relative border border-[#F0EBE1]">
                <img 
                  src="/__mockup/images/matchglee-app-ui.png" 
                  alt="MatchGlee App Interface" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute -right-6 md:-right-12 top-32 w-52 p-4 bg-white border border-[#E8E1D5] shadow-lg rounded-2xl z-20 hidden md:block`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#E8E1D5] flex items-center justify-center overflow-hidden">
                   <UserCircle className="w-6 h-6 text-[#9B6B8A]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">New Connection</div>
                  <div className="text-xs text-[#5A5A5A]">Alex liked your portfolio</div>
                </div>
              </div>
            </div>

            <div className={`absolute -left-6 md:-left-16 bottom-40 w-60 p-4 bg-white border border-[#E8E1D5] shadow-lg rounded-2xl z-20 hidden md:block`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8E1D5] flex items-center justify-center shrink-0 mt-1">
                  <MessageSquare className="w-4 h-4 text-[#C4622D]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2C2C2C]">Sarah A.</div>
                  <div className="text-xs text-[#5A5A5A] mt-1 leading-snug">Let's collaborate on that design project! 🚀</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Organic divider */}
      <div className="w-full h-24 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.62,20.59,106.19,37.38,160.7,46.56,214.86,55.7,268.53,64.21,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Brand Story Section */}
      <section id="story" className="py-24 px-6 relative bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-12 text-[#1A1A1A]">
              The Story of <span className="italic text-[#9B6B8A]">MatchGlee</span>
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl text-[#4A4A4A] leading-relaxed font-light max-w-3xl mx-auto text-left">
              <p className="first-letter:text-6xl first-letter:font-['Playfair_Display'] first-letter:text-[#C4622D] first-letter:mr-3 first-letter:float-left">
                In a world where networking feels forced and social platforms feel overwhelming, MatchGlee was born to bridge the gap.
              </p>
              <p>
                We realized people aren't just professionals or just individuals — they are both. Your passions, your work, your vibe — everything deserves a space that feels natural.
              </p>
              <p>
                MatchGlee isn't just about connecting profiles. It's about connecting people — authentically. Whether you're sharing your story, showcasing your work, or finding your tribe — <span className="font-medium text-[#2C2C2C] border-b-2 border-[#D97706]/30 pb-1">MatchGlee lets you do it your way.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 px-6 relative bg-[#4A7560] text-[#FAF8F4]">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-8 px-4 py-2 border border-[#FAF8F4]/30 rounded-full text-xs font-semibold tracking-widest uppercase">
              Our Mission
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.3] md:leading-[1.3]">
              To create a platform where <span className="italic text-[#D9CDB8]">personal expression</span> and <span className="italic text-[#D9CDB8]">professional identity</span> coexist effortlessly — empowering meaningful connections without boundaries.
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Organic divider from dark to light */}
      <div className="w-full h-24 overflow-hidden bg-[#FAF8F4] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-[#4A7560] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.62,20.59,106.19,37.38,160.7,46.56,214.86,55.7,268.53,64.21,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">Everything You Need to <span className="italic text-[#C4622D]">Connect</span></h2>
              <p className="text-lg md:text-xl text-[#5A5A5A] max-w-2xl mx-auto font-light">Powerful features designed to help you express your full self and build a network that matters.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100} className="lg:col-span-2">
              <div className={`h-full p-10 ${solidCard} hover:shadow-md transition-shadow duration-300 bg-white`}>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] border border-[#E8E1D5] flex items-center justify-center mb-8">
                  <UserCircle className="w-7 h-7 text-[#9B6B8A]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-4 text-[#1A1A1A]">Dual Identity</h3>
                <p className="text-[#5A5A5A] text-lg leading-relaxed font-light">Switch between personal and professional modes effortlessly. Control what different connections see while maintaining one unified account.</p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className={`h-full p-10 ${solidCard} hover:shadow-md transition-shadow duration-300 bg-white`}>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] border border-[#E8E1D5] flex items-center justify-center mb-8">
                  <Zap className="w-7 h-7 text-[#D97706]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-[#1A1A1A]">Smart Networking</h3>
                <p className="text-[#5A5A5A] leading-relaxed font-light text-lg">Connect based on interests, goals, and intent, not just job titles.</p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className={`h-full p-10 ${solidCard} hover:shadow-md transition-shadow duration-300 bg-white`}>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] border border-[#E8E1D5] flex items-center justify-center mb-8">
                  <ShieldCheck className="w-7 h-7 text-[#4A7560]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-[#1A1A1A]">Privacy Control</h3>
                <p className="text-[#5A5A5A] leading-relaxed font-light text-lg">You decide exactly what to share and with whom. Total transparency, total control.</p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className={`h-full p-10 ${solidCard} hover:shadow-md transition-shadow duration-300 bg-white`}>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] border border-[#E8E1D5] flex items-center justify-center mb-8">
                  <Globe className="w-7 h-7 text-[#C4622D]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-[#1A1A1A]">Interactive Profiles</h3>
                <p className="text-[#5A5A5A] leading-relaxed font-light text-lg">Highlights, galleries, and dynamic content that tells your whole story.</p>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className={`h-full p-10 ${solidCard} hover:shadow-md transition-shadow duration-300 bg-white`}>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] border border-[#E8E1D5] flex items-center justify-center mb-8">
                  <MessageSquare className="w-7 h-7 text-[#9B6B8A]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-[#1A1A1A]">Real-Time Chat</h3>
                <p className="text-[#5A5A5A] leading-relaxed font-light text-lg">Communicate and connect instantly with built-in rich messaging tools.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* UI Showcase Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-white border-y border-[#E8E1D5]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">Experience <span className="italic text-[#9B6B8A]">MatchGlee</span></h2>
            </div>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto flex justify-center">
            {/* Main UI */}
            <FadeIn delay={200} className="relative z-10">
               <div className="w-[320px] md:w-[400px] rounded-[2.5rem] p-3 bg-white border border-[#E8E1D5] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
                 <div className="rounded-[2rem] overflow-hidden bg-[#FAF8F4] border border-[#F0EBE1]">
                   <img 
                     src="/__mockup/images/matchglee-app-ui.png" 
                     alt="MatchGlee Profile UI" 
                     className="w-full h-auto"
                   />
                 </div>
               </div>
            </FadeIn>

            {/* Floating Stat Cards */}
            <FadeIn delay={400} className={`absolute top-1/4 -left-2 md:-left-16 w-40 md:w-48 p-5 bg-white border border-[#E8E1D5] rounded-2xl shadow-lg z-20`}>
              <div className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-1">1.2K</div>
              <div className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">Followers</div>
              <div className="mt-4 h-1.5 w-full bg-[#FAF8F4] rounded-full overflow-hidden">
                <div className="h-full bg-[#C4622D] w-[70%]" />
              </div>
            </FadeIn>

            <FadeIn delay={600} className={`absolute bottom-1/4 -right-2 md:-right-16 w-40 md:w-48 p-5 bg-white border border-[#E8E1D5] rounded-2xl shadow-lg z-20`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E8E1D5] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#4A7560]" />
                </div>
                <div className="text-2xl font-['Playfair_Display'] font-bold text-[#1A1A1A]">82%</div>
              </div>
              <div className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">Alignment</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Updates Section */}
      <section id="updates" className="py-32 px-6 relative bg-[#FAF8F4]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className={`p-10 md:p-16 bg-white border border-[#E8E1D5] rounded-3xl shadow-sm text-center relative`}>
              <div className="relative z-10">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">Be the First to Know</h2>
                <p className="text-lg text-[#5A5A5A] mb-12 max-w-lg mx-auto font-light">
                  MatchGlee is launching soon. Drop your email or phone number to get early access and exclusive updates.
                </p>

                {formStatus === "success" ? (
                  <div className="bg-[#4A7560]/10 border border-[#4A7560]/30 text-[#4A7560] rounded-2xl p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 mb-4" />
                    <p className="text-lg font-medium">You're in! Stay tuned for something exciting 🚀</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                    <div className="flex flex-col gap-4">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          placeholder="Your email or phone number"
                          className={`w-full px-6 py-4 rounded-xl bg-[#FAF8F4] border ${errorMessage ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#E8E1D5] focus:border-[#C4622D] focus:ring-[#C4622D]/20'} text-[#2C2C2C] placeholder:text-[#888] focus:outline-none focus:ring-4 transition-all`}
                          disabled={formStatus === "loading"}
                        />
                        {errorMessage && (
                          <p className="text-red-500 text-sm mt-2 text-left ml-2 absolute -bottom-6 left-0">{errorMessage}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className={`w-full py-4 rounded-xl font-medium text-[15px] transition-all duration-300 flex items-center justify-center mt-2
                          ${formStatus === "loading" ? 'bg-[#E8E1D5] text-[#888] cursor-not-allowed' : `bg-[#C4622D] text-white hover:bg-[#A85121] shadow-md hover:shadow-lg`}
                        `}
                      >
                        {formStatus === "loading" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Get Updates"
                        )}
                      </button>
                    </div>
                  </form>
                )}
                <p className="text-xs text-[#888] mt-8 font-medium uppercase tracking-wider">We respect your privacy. No spam, ever.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E1D5] bg-white relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
            <div className="flex items-center gap-3">
              <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-10 h-10 rounded-xl object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
              <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#1A1A1A]">Match<span className="text-[#C4622D]">Glee</span></span>
            </div>

            <div className="flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">About</a>
              <a href="#" className="text-sm font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">Privacy</a>
              <a href="#" className="text-sm font-medium text-[#5A5A5A] hover:text-[#C4622D] transition-colors">Terms</a>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-[#888] hover:text-[#C4622D] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-[#888] hover:text-[#C4622D] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-[#888] hover:text-[#C4622D] transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="text-center text-sm text-[#888] font-light">
            &copy; {new Date().getFullYear()} MatchGlee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
