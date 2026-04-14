import React, { useState, useRef, useEffect } from "react";
import { Heart, Briefcase, User, Star, MapPin, Loader2, CheckCircle2, ChevronLeft, ChevronRight, Zap, Target, Image as ImageIcon, Award, Mail, Phone } from "lucide-react";

export function DualScreen() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [contactInput, setContactInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePointerDown = (e: React.PointerEvent | React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    let clientX;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchend", handlePointerUp);
    } else {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    }
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging]);

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
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  // Calculate opacities based on slider position
  // 50 = both 100%
  // 0 = left 0%, right 100%
  // 100 = left 100%, right 0%
  const leftOpacity = sliderPosition < 50 ? (sliderPosition / 50) : 1;
  const rightOpacity = sliderPosition > 50 ? ((100 - sliderPosition) / 50) : 1;

  // Transform scales for the inactive side to shrink slightly
  const leftScale = sliderPosition < 50 ? 0.95 + (sliderPosition / 50) * 0.05 : 1;
  const rightScale = sliderPosition > 50 ? 0.95 + ((100 - sliderPosition) / 50) * 0.05 : 1;

  return (
    <div 
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top Nav (Fixed) */}
      <div className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-none flex items-center justify-center">
        {/* Top nav split background */}
        <div className="absolute inset-0 flex">
          <div 
            className="h-full bg-[#1A0030]/80 backdrop-blur-md transition-all duration-300 ease-out" 
            style={{ width: `${sliderPosition}%` }}
          />
          <div 
            className="h-full bg-[#000F2D]/80 backdrop-blur-md transition-all duration-300 ease-out" 
            style={{ width: `${100 - sliderPosition}%` }}
          />
        </div>
        
        <div className="absolute inset-0 border-b border-white/10" />

        <div className="relative z-10 flex items-center gap-3 pointer-events-auto bg-black/50 px-4 py-2 rounded-full backdrop-blur-xl border border-white/20">
          <img src="/__mockup/images/matchglee-logo.jpeg" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-bold text-xl tracking-tight">Match<span className="text-pink-500">Glee</span></span>
        </div>

        {/* Global Controls */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/20 pointer-events-auto z-50">
          <button 
            onClick={() => setSliderPosition(100)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${sliderPosition > 80 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            Personal
          </button>
          <button 
            onClick={() => setSliderPosition(50)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${sliderPosition > 40 && sliderPosition < 60 ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            Both
          </button>
          <button 
            onClick={() => setSliderPosition(0)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${sliderPosition < 20 ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
          >
            Professional
          </button>
        </div>
      </div>

      {/* Main Split Container */}
      <div 
        ref={containerRef}
        className="flex-1 flex w-full relative pt-20 select-none"
      >
        {/* Left Side (Personal) */}
        <div 
          className="relative bg-gradient-to-b from-[#1A0030] to-[#2D0052] overflow-hidden transition-all duration-[50ms] ease-out will-change-[width]"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Background Elements */}
          <div className="absolute top-20 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />

          <div 
            className="absolute inset-0 w-[50vw] p-8 md:p-16 flex flex-col items-end pt-32 pb-40 overflow-y-auto no-scrollbar pointer-events-auto"
            style={{ opacity: leftOpacity, transform: `scale(${leftScale})`, transformOrigin: 'right center' }}
          >
            <div className="w-full max-w-xl pr-8">
              {/* Hero Personal */}
              <div className="mb-32">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" /> Personal Profile
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight">
                  This is me, <br/>the real me.
                </h1>
                <p className="text-xl text-pink-100/70 mb-10 font-medium max-w-md">
                  A space for my passions, my hobbies, and the people who share them.
                </p>

                {/* Personal Profile Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-pink-500/30 rounded-[2.5rem] p-8 shadow-2xl shadow-pink-500/10">
                  <div className="flex items-center gap-6 mb-8">
                    <img src="/__mockup/images/matchglee-app-ui.png" className="w-24 h-24 rounded-[1.5rem] object-cover border-2 border-pink-400/50" style={{ objectPosition: 'center 20%' }} />
                    <div>
                      <h3 className="text-3xl font-bold mb-1">Sarah A.</h3>
                      <div className="flex items-center gap-2 text-pink-200/80">
                        <MapPin className="w-4 h-4" /> Brooklyn, NY
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-2xl p-4">
                      <div className="text-sm text-pink-300 mb-2 font-medium">Open to:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-pink-500/20 rounded-full text-sm">Friendship</span>
                        <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">Creativity</span>
                        <span className="px-3 py-1 bg-rose-500/20 rounded-full text-sm">Collaborations</span>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-4">
                      <div className="text-sm text-pink-300 mb-2 font-medium">Passions:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 border border-pink-500/30 rounded-full text-sm">Photography 📸</span>
                        <span className="px-3 py-1 border border-pink-500/30 rounded-full text-sm">Ceramics 🏺</span>
                        <span className="px-3 py-1 border border-pink-500/30 rounded-full text-sm">Hiking 🥾</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 1 */}
              <div className="mb-32">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Connect over shared passions</h2>
                <p className="text-lg text-pink-100/70 mb-8">Find people who love what you love. Build genuine friendships based on shared interests and creative energy.</p>
                
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-pink-300">New Match</span>
                    <span className="text-xs px-2 py-1 bg-pink-500/20 rounded-full text-pink-300">98% Passion Match</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400" />
                    <div>
                      <div className="font-bold text-lg">Alex Chen</div>
                      <div className="text-sm text-white/60">Also loves Film Photography & Hiking</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="mb-32">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Share your creative work</h2>
                <p className="text-lg text-pink-100/70 mb-8">Express yourself freely through galleries and highlights that showcase your unique personality.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-[2rem] border border-white/10 flex items-center justify-center">
                    <span className="text-4xl">📸</span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-[2rem] border border-white/10 flex items-center justify-center">
                    <span className="text-4xl">🏺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Divider / Handle */}
        <div 
          className="absolute top-0 bottom-0 w-8 -ml-4 z-40 cursor-col-resize flex justify-center group"
          style={{ left: `${sliderPosition}%` }}
          onPointerDown={handlePointerDown}
        >
          {/* Glowing seam */}
          <div className="w-[2px] h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 shadow-[0_0_15px_rgba(236,72,153,0.8)] relative">
            {/* Drag Handle */}
            <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-transform duration-200 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
              <div className="flex gap-1">
                <div className="w-0.5 h-6 bg-gray-300 rounded-full" />
                <div className="w-0.5 h-6 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Professional) */}
        <div 
          className="relative bg-gradient-to-b from-[#000F2D] to-[#001A4D] overflow-hidden transition-all duration-[50ms] ease-out will-change-[width]"
          style={{ width: `${100 - sliderPosition}%` }}
        >
          {/* Background Elements */}
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />

          <div 
            className="absolute inset-0 w-[50vw] p-8 md:p-16 flex flex-col items-start pt-32 pb-40 overflow-y-auto no-scrollbar pointer-events-auto"
            style={{ right: 0, left: 'auto', opacity: rightOpacity, transform: `scale(${rightScale})`, transformOrigin: 'left center' }}
          >
            <div className="w-full max-w-xl pl-8">
              {/* Hero Professional */}
              <div className="mb-32">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" /> Professional Profile
                </div>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-white leading-tight">
                  This is me, <br/><span className="text-blue-400">at work.</span>
                </h1>
                <p className="text-xl text-blue-100/60 mb-10 font-light max-w-md">
                  A dedicated space for my career, my skills, and my professional network.
                </p>

                {/* Professional Profile Card */}
                <div className="bg-[#0A1930] border border-blue-500/20 rounded-xl p-8 shadow-xl shadow-blue-900/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400" />
                  <div className="flex items-start gap-6 mb-8">
                    <img src="/__mockup/images/matchglee-app-ui.png" className="w-20 h-20 rounded-md object-cover border border-white/10 grayscale hover:grayscale-0 transition-all" style={{ objectPosition: 'center 20%' }} />
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">Sarah Anderson</h3>
                      <div className="text-blue-300 font-medium mb-2">Senior Product Designer at Spotify</div>
                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> New York</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> 500+ Connections</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-white/5 rounded-lg p-4">
                      <div className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Open to:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-sm border border-blue-500/20">Freelance</span>
                        <span className="px-2 py-1 bg-teal-500/10 text-teal-300 rounded text-sm border border-teal-500/20">Mentoring</span>
                        <span className="px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded text-sm border border-indigo-500/20">Partnerships</span>
                      </div>
                    </div>
                    <div className="border border-white/5 rounded-lg p-4">
                      <div className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Top Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-white/80">UI/UX Design •</span>
                        <span className="text-sm text-white/80">Design Systems •</span>
                        <span className="text-sm text-white/80">Prototyping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 1 */}
              <div className="mb-32">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/40 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-3xl font-medium mb-4">Connect over shared goals</h2>
                <p className="text-lg text-blue-100/60 mb-8 font-light">Network with intention. Find collaborators, mentors, and opportunities that align with your career trajectory.</p>
                
                <div className="bg-[#0A1930] border border-white/10 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Suggested Connection</span>
                    <span className="text-xs text-white/40">UX Research</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-600 to-indigo-600" />
                    <div>
                      <div className="font-medium text-white">David Kim</div>
                      <div className="text-sm text-white/50">Lead Researcher at Stripe</div>
                    </div>
                    <button className="ml-auto px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="mb-32">
                <div className="w-12 h-12 bg-teal-500/20 border border-teal-500/40 rounded-lg flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-teal-400" />
                </div>
                <h2 className="text-3xl font-medium mb-4">Showcase your expertise</h2>
                <p className="text-lg text-blue-100/60 mb-8 font-light">Build credibility through endorsements, work history, and professional achievements in a clean, distraction-free environment.</p>
                
                <div className="bg-[#0A1930] border border-white/10 rounded-lg p-5">
                  <div className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-4">Recent Endorsement</div>
                  <p className="text-white/80 italic text-sm mb-4">"Sarah is an exceptional designer who truly understands user needs while balancing business objectives. Her work on the recent redesign was phenomenal."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-700" />
                    <div>
                      <div className="text-sm font-medium">Elena Rodriguez</div>
                      <div className="text-xs text-white/50">Product Manager</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section (Merged) */}
      <div className="relative py-32 px-6 bg-black z-10 border-t border-white/10 flex flex-col items-center">
        {/* Glow behind CTA */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-gradient-to-b from-purple-500/20 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl w-full text-center relative z-10 pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">You don't have to choose.</h2>
          <p className="text-xl text-white/60 mb-12">
            One account. Two powerful profiles. A single seamless experience. Join the future of authentic connection.
          </p>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            {/* Animated border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 -z-10" />
            
            {formStatus === "success" ? (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">You're in!</h3>
                <p className="text-lg">Stay tuned for something exciting 🚀</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      placeholder="Enter email or phone number"
                      className={`w-full px-6 py-4 rounded-xl bg-black/50 border ${errorMessage ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-pink-500'} text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-lg`}
                      disabled={formStatus === "loading"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center min-w-[160px] text-lg
                      ${formStatus === "loading" ? 'bg-white/10 cursor-not-allowed' : 'bg-white text-black hover:scale-105 hover:bg-gray-200'}
                    `}
                  >
                    {formStatus === "loading" ? (
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-sm mt-3 text-left pl-2">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DualScreen;