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

export function IridescentPearl() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissions, setSubmissions] = useState<{type: 'email'|'phone', value: string, submittedAt: Date}[]>([]);

  useEffect(() => {
    // Inject Plus Jakarta Sans font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(link);
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

  const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400";
  const gradientBg = "bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400";
  const lightCard = "bg-white border border-[#E9E5FF] shadow-[0_4px_24px_rgba(196,181,253,0.15)] rounded-3xl";
  const headingFont = "font-['Plus_Jakarta_Sans'] text-[#1A1035]";
  const bodyText = "text-[#4A4566]";

  return (
    <div className="min-h-screen bg-[#FAFAFF] font-sans selection:bg-pink-200 overflow-x-hidden">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] -left-10 w-[40rem] h-[40rem] bg-[#C4B5FD] rounded-full blur-[120px] mix-blend-multiply opacity-[0.08] animate-pulse duration-10000" />
        <div className="absolute top-[20%] -right-10 w-[35rem] h-[35rem] bg-[#FDA4AF] rounded-full blur-[100px] mix-blend-multiply opacity-[0.06]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-[#6EE7B7] rounded-full blur-[120px] mix-blend-multiply opacity-[0.05]" />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-[#E9E5FF] py-3 shadow-sm" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
            <span className={`text-xl font-bold tracking-tight ${headingFont}`}>Match<span className="text-pink-400">Glee</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Features</a>
            <a href="#story" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Story</a>
            <a href="#mission" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Mission</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#updates" className={`text-sm font-medium px-5 py-2.5 rounded-full border border-[#C4B5FD] text-[#4A4566] hover:bg-[#F3F0FF] hover:text-[#1A1035] transition-colors`}>
              Get Updates
            </a>
            <a href="#updates" className={`text-sm font-medium px-5 py-2.5 rounded-full ${gradientBg} text-white hover:shadow-[0_4px_14px_rgba(253,164,175,0.4)] transition-all duration-300`}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#1A1035]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E9E5FF] shadow-lg py-4 px-6 flex flex-col gap-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium ${bodyText} hover:text-[#1A1035]`}>Features</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium ${bodyText} hover:text-[#1A1035]`}>Story</a>
            <a href="#mission" onClick={() => setMobileMenuOpen(false)} className={`text-lg font-medium ${bodyText} hover:text-[#1A1035]`}>Mission</a>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#E9E5FF]">
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium px-5 py-3 rounded-xl border border-[#C4B5FD] text-[#4A4566]">Get Updates</a>
              <a href="#updates" onClick={() => setMobileMenuOpen(false)} className={`text-center font-medium px-5 py-3 rounded-xl ${gradientBg} text-white`}>Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E5FF] shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
              <span className={`text-xs font-medium ${bodyText}`}>Now accepting early access</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 ${headingFont}`}>
              Where Personal Meets <span className={gradientText}>Professional</span> — Seamlessly
            </h1>
            <p className={`text-lg md:text-xl mb-10 leading-relaxed max-w-xl ${bodyText}`}>
              MatchGlee helps you connect, express, and grow — all in one space designed for real people. No more choosing between your work persona and your true passions.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#updates" className={`flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold ${gradientBg} text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,181,253,0.5)] transition-all duration-300`}>
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#updates" className={`px-8 py-4 rounded-full text-base font-semibold bg-white border border-[#C4B5FD] ${bodyText} hover:bg-[#F3F0FF] hover:text-[#1A1035] hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300`}>
                Get Updates
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="relative lg:h-[600px] flex justify-center items-center">
            {/* Phone Mockup Container */}
            <div className="relative z-10 w-[300px] md:w-[340px] rounded-[3rem] p-3 bg-white border border-[#E9E5FF] shadow-[0_20px_60px_-15px_rgba(196,181,253,0.4)] transform md:rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#FAFAFF] border border-[#E9E5FF] rounded-full z-20 shadow-inner" />
              <div className="rounded-[2.25rem] overflow-hidden bg-white relative border border-[#E9E5FF]">
                <img 
                  src="/__mockup/images/matchglee-app-ui.png" 
                  alt="MatchGlee App Interface" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute -right-10 top-20 w-48 p-4 ${lightCard} animate-[bounce_4s_infinite] z-20 hidden md:block`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FDA4AF] to-[#C4B5FD]" />
                <div>
                  <div className={`text-xs font-bold ${headingFont}`}>New Connection</div>
                  <div className={`text-[10px] ${bodyText}`}>Alex liked your portfolio</div>
                </div>
              </div>
            </div>

            <div className={`absolute -left-16 bottom-32 w-56 p-4 ${lightCard} animate-[bounce_5s_infinite_0.5s] z-20 hidden md:block`}>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#C4B5FD] mt-1" />
                <div>
                  <div className={`text-xs font-bold ${headingFont}`}>Sarah A.</div>
                  <div className={`text-[10px] ${bodyText} mt-1`}>Let's collaborate on that design project! ✨</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E9E5FF] to-transparent w-full" />

      {/* Brand Story Section */}
      <section id="story" className="py-24 px-6 relative bg-gradient-to-b from-[#FAFAFF] to-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className={`p-8 md:p-14 ${lightCard} relative overflow-hidden`}>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F3F0FF] rounded-full blur-[40px] opacity-60" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FFF0F2] rounded-full blur-[40px] opacity-60" />
              
              <h2 className={`text-3xl md:text-4xl font-bold mb-10 relative z-10 ${headingFont}`}>
                The Story of <span className={gradientText}>MatchGlee</span>
              </h2>
              
              <div className={`space-y-6 text-lg md:text-xl leading-relaxed relative z-10 border-l-2 border-[#FDA4AF] pl-6 md:pl-10 py-2 ${bodyText}`}>
                <p>
                  In a world where networking feels forced and social platforms feel overwhelming, MatchGlee was born to bridge the gap.
                </p>
                <p>
                  We realized people aren't just professionals or just individuals — they are both. Your passions, your work, your vibe — everything deserves a space that feels natural.
                </p>
                <p>
                  MatchGlee isn't just about connecting profiles. It's about connecting people — authentically. Whether you're sharing your story, showcasing your work, or finding your tribe — <span className="font-semibold text-[#1A1035]">MatchGlee lets you do it your way.</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[60vh] bg-[#F8F5FF]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50 z-0" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className={`inline-block mb-8 px-5 py-2 rounded-full border border-[#E9E5FF] bg-white shadow-sm text-sm font-semibold tracking-[0.2em] uppercase text-[#C4B5FD] ${headingFont}`}>
              Our Mission
            </div>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight ${headingFont}`}>
              To create a platform where <span className={gradientText}>personal expression</span> and <span className={gradientText}>professional identity</span> coexist effortlessly — empowering meaningful connections without boundaries.
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E9E5FF] to-transparent w-full" />

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${headingFont}`}>Everything You Need to <span className={gradientText}>Connect</span></h2>
              <p className={`text-xl max-w-2xl mx-auto ${bodyText}`}>Powerful features designed to help you express your full self and build a network that matters.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100} className="lg:col-span-2">
              <div className={`h-full p-10 ${lightCard} group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,181,253,0.2)] transition-all duration-500`}>
                <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-8 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <UserCircle className="w-8 h-8 text-[#C4B5FD]" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${headingFont}`}>Dual Identity</h3>
                <p className={`text-lg leading-relaxed ${bodyText}`}>Switch between personal and professional modes effortlessly. Control what different connections see while maintaining one unified account.</p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className={`h-full p-10 ${lightCard} group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,181,253,0.2)] transition-all duration-500`}>
                <div className="w-16 h-16 rounded-2xl bg-[#FFF0F2] flex items-center justify-center mb-8 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <Zap className="w-8 h-8 text-[#FDA4AF]" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${headingFont}`}>Smart Networking</h3>
                <p className={`leading-relaxed ${bodyText}`}>Connect based on interests, goals, and intent, not just job titles.</p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className={`h-full p-10 ${lightCard} group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,181,253,0.2)] transition-all duration-500`}>
                <div className="w-16 h-16 rounded-2xl bg-[#E6FFFA] flex items-center justify-center mb-8 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <ShieldCheck className="w-8 h-8 text-[#6EE7B7]" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${headingFont}`}>Privacy Control</h3>
                <p className={`leading-relaxed ${bodyText}`}>You decide exactly what to share and with whom. Total transparency, total control.</p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className={`h-full p-10 ${lightCard} group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,181,253,0.2)] transition-all duration-500`}>
                <div className="w-16 h-16 rounded-2xl bg-[#F8F5FF] flex items-center justify-center mb-8 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <Globe className="w-8 h-8 text-[#A78BFA]" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${headingFont}`}>Interactive Profiles</h3>
                <p className={`leading-relaxed ${bodyText}`}>Highlights, galleries, and dynamic content that tells your whole story.</p>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className={`h-full p-10 ${lightCard} group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(196,181,253,0.2)] transition-all duration-500`}>
                <div className="w-16 h-16 rounded-2xl bg-[#E0F2FE] flex items-center justify-center mb-8 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <MessageSquare className="w-8 h-8 text-[#38BDF8]" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${headingFont}`}>Real-Time Chat</h3>
                <p className={`leading-relaxed ${bodyText}`}>Communicate and connect instantly with built-in rich messaging tools.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* UI Showcase Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20 relative z-20">
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${headingFont}`}>Experience <span className={gradientText}>MatchGlee</span></h2>
            </div>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto flex justify-center">
            {/* Main UI */}
            <FadeIn delay={200} className="relative z-10">
               <div className="w-[320px] md:w-[400px] rounded-[2.5rem] p-2 bg-white border border-[#E9E5FF] shadow-[0_20px_60px_-15px_rgba(196,181,253,0.3)]">
                 <div className="rounded-[2rem] overflow-hidden bg-white border border-[#E9E5FF]">
                   <img 
                     src="/__mockup/images/matchglee-app-ui.png" 
                     alt="MatchGlee Profile UI" 
                     className="w-full h-auto"
                   />
                 </div>
               </div>
            </FadeIn>

            {/* Floating Stat Cards */}
            <FadeIn delay={400} className={`absolute top-1/4 -left-4 md:-left-20 w-40 md:w-56 p-6 ${lightCard} z-20`}>
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${headingFont}`}>1.2K</div>
              <div className={`text-xs font-semibold uppercase tracking-[0.15em] text-[#C4B5FD]`}>Followers</div>
              <div className="mt-4 h-1.5 w-full bg-[#F3F0FF] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FDA4AF] to-[#C4B5FD] w-[70%]" />
              </div>
            </FadeIn>

            <FadeIn delay={600} className={`absolute bottom-1/4 -right-4 md:-right-20 w-40 md:w-56 p-6 ${lightCard} z-20`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E6FFFA] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#6EE7B7]" />
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${headingFont}`}>82%</div>
              </div>
              <div className={`text-xs font-semibold uppercase tracking-[0.15em] text-[#6EE7B7]`}>Alignment</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Updates Section */}
      <section id="updates" className="py-32 px-6 relative bg-[#FAFAFF]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className={`p-10 md:p-16 ${lightCard} text-center relative overflow-hidden group`}>
              
              <div className="relative z-10">
                <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${headingFont}`}>Be the First to Know</h2>
                <p className={`text-lg mb-12 max-w-lg mx-auto ${bodyText}`}>
                  MatchGlee is launching soon. Drop your email or phone number to get early access and exclusive updates.
                </p>

                {formStatus === "success" ? (
                  <div className="bg-[#E6FFFA] border border-[#A7F3D0] text-[#047857] rounded-2xl p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 mb-4 text-[#34D399]" />
                    <p className="text-lg font-medium">You're in! Stay tuned for something exciting ✨</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          placeholder="Your email or phone number"
                          className={`w-full px-6 py-4 rounded-xl md:rounded-full bg-white border ${errorMessage ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' : 'border-[#E9E5FF] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]/20'} text-[#1A1035] placeholder:text-[#CBD5E1] shadow-sm focus:outline-none focus:ring-2 transition-all`}
                          disabled={formStatus === "loading"}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className={`px-8 py-4 rounded-xl md:rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center min-w-[150px] shadow-sm
                          ${formStatus === "loading" ? 'bg-[#CBD5E1] cursor-not-allowed' : `${gradientBg} hover:shadow-[0_8px_20px_rgba(196,181,253,0.4)] hover:-translate-y-0.5`}
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
                      <p className="text-red-400 text-sm mt-2 text-left ml-4 absolute -bottom-8 left-0 font-medium">{errorMessage}</p>
                    )}
                  </form>
                )}
                <p className={`text-xs mt-10 ${bodyText}`}>We respect your privacy. No spam, ever.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F3F0FF] pt-16 pb-8 px-6 border-t border-[#E9E5FF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <img src="/__mockup/images/matchglee-logo.jpeg" alt="MatchGlee Logo" className="w-8 h-8 rounded-lg object-cover shadow-sm mix-blend-multiply" />
              <span className={`text-xl font-bold tracking-tight ${headingFont}`}>Match<span className="text-[#C4B5FD]">Glee</span></span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Privacy Policy</a>
              <a href="#" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Terms of Service</a>
              <a href="#" className={`text-sm font-medium ${bodyText} hover:text-[#1A1035] transition-colors`}>Contact</a>
            </div>

            <div className="flex items-center gap-5">
              <a href="#" className={`text-[#4A4566] hover:text-[#C4B5FD] transition-colors`}><Twitter className="w-5 h-5" /></a>
              <a href="#" className={`text-[#4A4566] hover:text-[#FDA4AF] transition-colors`}><Instagram className="w-5 h-5" /></a>
              <a href="#" className={`text-[#4A4566] hover:text-[#6EE7B7] transition-colors`}><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="text-center text-sm text-[#4A4566]/70">
            © {new Date().getFullYear()} MatchGlee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
