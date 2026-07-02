import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ChevronDown, CheckCircle2, Loader2, X,
  Users, Briefcase, Globe, MessageCircle, HelpCircle,
  BookOpen, Star, Shield, LayoutGrid, Twitter,
  Linkedin, Instagram, Circle
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const PG = "bg-gradient-to-r from-[#F0199A] to-[#7132C8]";
const PGT = `text-transparent bg-clip-text ${PG}`;

// ===================== SHARED =====================

function useVisible(threshold = 0.12) {
  const [v, setV] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

function useChapterObserver(onVisible: (id: string) => void, id: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onVisible(id); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [id, onVisible]);
  return ref;
}

// ===================== LOGO =====================

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const img = size === "sm" ? "w-6 h-6" : "w-7 h-7";
  const txt = size === "sm" ? "text-sm" : "text-base";
  return (
    <div className="flex items-center gap-2">
      <img src={`${BASE}images/matchglee-logo-new.png`} alt="NewHub" className={`${img} object-contain`} />
      <span className={`${txt} font-black tracking-tight ${PGT}`}>NewHub</span>
    </div>
  );
}

// ===================== LOGIN MODAL =====================

function LoginModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-[#0F0824] border border-white/10 rounded-3xl p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        <Logo size="sm" />
        <h2 className="text-2xl font-black text-white mt-5 mb-1">{tab === "signin" ? "Welcome back" : "Join NewHub"}</h2>
        <p className="text-white/40 text-sm mb-7">{tab === "signin" ? "Sign in to continue." : "Create your account."}</p>
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8 mb-6">
          {(["signin", "signup"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? `${PG} text-white` : "text-white/40 hover:text-white/70"}`}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {tab === "signup" && (
            <input type="text" placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F0199A]/50 transition-colors" />
          )}
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F0199A]/50 transition-colors" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F0199A]/50 transition-colors" />
          <button className={`w-full py-3.5 rounded-xl font-bold text-white text-sm ${PG} hover:opacity-90 transition-all mt-1 shadow-[0_0_20px_rgba(240,25,154,0.25)]`}>
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>
        <div className="mt-5 flex items-center gap-3"><div className="flex-1 h-px bg-white/8" /><span className="text-white/20 text-xs">or</span><div className="flex-1 h-px bg-white/8" /></div>
        <button className="mt-4 w-full py-3 rounded-xl border border-white/10 text-white/50 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-all flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

// ===================== QUIZ =====================

function QuizPhase({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ focus: "", hurdle: "" });
  const [transitioning, setTransitioning] = useState(false);

  const go = (cb: () => void) => { setTransitioning(true); setTimeout(() => { cb(); setTransitioning(false); }, 550); };

  const msg = answers.hurdle === "It feels too transactional"
    ? "We're over the transaction, too."
    : answers.hurdle === "I have to pick one version of myself"
    ? "That's exactly why NewHub exists."
    : "Cut through the noise. Find your people.";

  const card = "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 rounded-2xl relative group overflow-hidden cursor-pointer";

  const Dots = () => (
    <div className="flex gap-2 justify-center mb-10">
      {[0,1,2,3].map(i => <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i===step?`w-8 ${PG}`:i<step?"w-2 bg-white/40":"w-2 bg-white/10"}`} />)}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans flex flex-col">
      <div className={`fixed inset-0 z-50 ${PG} transition-transform duration-600 ease-in-out ${transitioning?"translate-x-0":"translate-x-full"}`} />
      <header className="p-6"><Logo /></header>
      <main className="flex-1 flex flex-col max-w-4xl mx-auto px-6 pb-12 w-full">
        {/* Step 0 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step===0&&!transitioning?"opacity-100":"opacity-0 pointer-events-none absolute"}`}>
          <Dots /><p className="text-center text-white/40 mb-3">Before we talk about NewHub...</p>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">What describes you <span className={PGT}>best</span> right now?</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
            {[{id:"Building my career",icon:"🎯",sub:"Professional"},{id:"Exploring my passions",icon:"🌟",sub:"Personal"},{id:"Both, honestly",icon:"⚡",sub:"Both"}].map(o=>(
              <button key={o.id} onClick={()=>{setAnswers(p=>({...p,focus:o.id}));go(()=>setStep(1));}} className={`p-7 ${card} flex flex-col items-center text-center gap-3`}>
                <span className="text-3xl">{o.icon}</span>
                <span className="font-bold text-lg">{o.id}</span>
                <span className="text-sm text-white/40">{o.sub}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Step 1 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step===1&&!transitioning?"opacity-100":"opacity-0 pointer-events-none absolute"}`}>
          <Dots />
          <h2 className="text-3xl md:text-5xl font-black text-center mb-10">What's hardest about<br/>connecting online?</h2>
          <div className="grid gap-3 max-w-lg mx-auto w-full">
            {["It feels too transactional","I have to pick one version of myself","It's overwhelming and noisy"].map(o=>(
              <button key={o} onClick={()=>{setAnswers(p=>({...p,hurdle:o}));go(()=>setStep(2));}} className={`p-6 ${card} flex items-center justify-between`}>
                <span className="font-medium text-left">{o}</span>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#F0199A] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
        {/* Step 2 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step===2&&!transitioning?"opacity-100":"opacity-0 pointer-events-none absolute"}`}>
          <Dots />
          <h2 className="text-3xl md:text-5xl font-black text-center mb-8">{msg}</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <span className="px-4 py-2 rounded-full bg-[#F0199A]/15 text-pink-300 text-sm border border-[#F0199A]/25">{answers.focus||"Dual Focus"}</span>
            <span className="px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 text-sm border border-purple-500/25">Values Authenticity</span>
          </div>
          <button onClick={()=>go(()=>setStep(3))} className={`mx-auto px-8 py-4 rounded-full font-bold text-white ${PG} hover:scale-105 transition-all flex items-center gap-2`}>See how it unfolds <ArrowRight className="w-4 h-4" /></button>
        </div>
        {/* Step 3 */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ${step===3&&!transitioning?"opacity-100":"opacity-0 pointer-events-none absolute"}`}>
          <Dots />
          <div className="text-center">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-4xl md:text-6xl font-black mb-5">Your story <span className={PGT}>begins</span></h2>
            <p className="text-white/50 mb-10">We've built a space tailored for someone exactly like you.</p>
            <button onClick={onComplete} className={`mx-auto px-10 py-4 rounded-full font-bold text-white ${PG} hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.4)] transition-all flex items-center gap-2`}>Continue <ChevronDown className="w-5 h-5 animate-bounce" /></button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ===================== CINEMATIC =====================

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState("ch-1");
  const [ch2Seen, setCh2Seen] = useState(false);
  const handle = (id: string) => { setActive(id); if (id==="ch-2") setCh2Seen(true); };

  const Ch1 = () => {
    const ref = useChapterObserver(handle, "ch-1");
    const [vr, vis] = useVisible(0.2);
    return (
      <section ref={ref as React.RefObject<HTMLElement>} id="ch-1" className="relative w-full h-screen flex flex-col justify-center items-center p-6 bg-black" style={{scrollSnapAlign:"start"}}>
        <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-1000 ${vis?"opacity-10":"opacity-0"}`}>
          {[...Array(18)].map((_,i)=><div key={i} className="w-1 bg-white rounded-full" style={{height:`${(i*17+23)%60+10}vh`,animation:`pulse ${(i%3)+1}s infinite`,animationDelay:`${(i*0.1)%1}s`}} />)}
        </div>
        <div ref={vr} className="z-10 text-center max-w-5xl space-y-8">
          <div className={`text-4xl md:text-6xl font-bold text-white transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>You wake up. You're a designer. A trail runner. A parent. A jazz fan. An entrepreneur.</div>
          <div className={`text-2xl md:text-4xl text-white/70 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"800ms"}}>But online... you have to pick.</div>
          <div className={`text-xl md:text-3xl text-white/35 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"1600ms"}}>One profile. One persona. One version of you.</div>
        </div>
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${vis?"opacity-40":"opacity-0"} animate-bounce`} style={{transitionDelay:"2400ms"}}><ChevronDown className="w-8 h-8 text-white" /></div>
      </section>
    );
  };

  const Ch2 = () => {
    const ref = useChapterObserver(handle, "ch-2");
    const [vr, vis] = useVisible(0.2);
    const profiles = [{label:"Professional only",color:"from-blue-600/30 to-blue-900/30"},{label:"Personal only",color:"from-pink-600/30 to-pink-900/30"},{label:"Side hustle only",color:"from-purple-600/30 to-purple-900/30"},{label:"Weekend only",color:"from-emerald-600/30 to-emerald-900/30"}];
    return (
      <section ref={ref as React.RefObject<HTMLElement>} id="ch-2" className="relative w-full h-screen flex flex-col justify-center items-center p-6 bg-[#050508]" style={{scrollSnapAlign:"start"}}>
        <div ref={vr} className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {profiles.map((p,i)=><div key={i} className={`aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-b ${p.color} p-4 flex flex-col justify-end transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-16"}`} style={{transitionDelay:`${i*200}ms`}}><div className="w-10 h-10 rounded-full bg-white/20 mb-2 animate-pulse" /><div className="h-3 w-3/4 bg-white/20 rounded mb-2" /><div className="h-2 w-1/2 bg-white/10 rounded mb-5" /><div className="text-xs font-bold text-white uppercase tracking-wide">{p.label}</div></div>)}
        </div>
        <div className={`text-4xl md:text-6xl font-bold text-white text-center transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"800ms"}}>Exhausting, isn't it?</div>
        <div className={`mt-12 flex flex-col items-center gap-4 transition-all duration-1000 ${ch2Seen?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{transitionDelay:"1400ms"}}>
          <button onClick={onComplete} className={`px-9 py-4 rounded-full font-bold text-white ${PG} hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.4)] transition-all flex items-center gap-2`}>There's a better way <ArrowRight className="w-5 h-5" /></button>
          <span className="text-white/20 text-xs tracking-widest uppercase">Enter NewHub</span>
        </div>
      </section>
    );
  };

  return (
    <div className="w-full h-screen overflow-y-scroll font-sans bg-black" style={{scrollSnapType:"y mandatory"}}>
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {["ch-1","ch-2"].map((id,i)=>(
          <button key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})} className="group flex items-center justify-end gap-2">
            <span className={`text-xs font-bold transition-opacity ${active===id?"opacity-100":"opacity-0 group-hover:opacity-40"} text-white`}>{i+1}</span>
            <div className={`w-2.5 h-2.5 rounded-full border transition-all ${active===id?`scale-150 ${PG} border-transparent`:"border-white/30"}`} />
          </button>
        ))}
      </div>
      <Ch1 /><Ch2 />
    </div>
  );
}

// ===================== NAVBAR =====================

function Navbar({ onFeedback, onLogin }: { onFeedback: () => void; onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?"bg-black/80 backdrop-blur-xl border-b border-white/5":"bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        {/* center pill nav */}
        <div className="hidden md:flex items-center gap-0 bg-[#111111] border border-white/10 rounded-full px-2 py-1.5">
          <a href="#about" onClick={e=>{e.preventDefault();document.getElementById("about")?.scrollIntoView({behavior:"smooth"});}} className="px-5 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all font-medium">About</a>
          <button onClick={onFeedback} className="px-5 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all font-medium">Feedback</button>
          <button onClick={onLogin} className="px-5 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all font-medium">Login / Sign In</button>
        </div>
        {/* mobile */}
        <button onClick={onLogin} className={`md:hidden px-4 py-1.5 rounded-full text-sm font-semibold text-white ${PG}`}>Sign In</button>
      </div>
    </nav>
  );
}

// ===================== 3D ANIMATED BLOB CANVAS =====================

function BlobCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── helpers ─────────────────────────────────────────────

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    /** Smooth closed blob: returns array of screen-space [x,y] points */
    function blobPts(
      cx: number, cy: number, r: number,
      n: number, time: number, speed: number
    ): [number, number][] {
      return Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * Math.PI * 2;
        const w =
          Math.sin(time * speed       + i * 1.31) * 0.26 +
          Math.sin(time * speed * 0.7 + i * 2.17) * 0.14 +
          Math.sin(time * speed * 1.4 + i * 0.73) * 0.09;
        const rad = r * (1 + w);
        return [cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad];
      });
    }

    /** Draw smooth closed blob through pts using quadratic catmull-rom approximation */
    function strokeBlob(
      pts: [number, number][],
      colors: string[],
      opacity: number,
      blurPx: number
    ) {
      const n = pts.length;
      if (!n) return;
      const minX = Math.min(...pts.map(p => p[0]));
      const maxX = Math.max(...pts.map(p => p[0]));
      const minY = Math.min(...pts.map(p => p[1]));
      const maxY = Math.max(...pts.map(p => p[1]));
      const grad = ctx.createLinearGradient(minX, minY, maxX, maxY);
      colors.forEach((c, i) => grad.addColorStop(i / Math.max(colors.length - 1, 1), c));

      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(lerp(pts[n-1][0], pts[0][0], 0.5), lerp(pts[n-1][1], pts[0][1], 0.5));
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const q = pts[(i + 1) % n];
        ctx.quadraticCurveTo(p[0], p[1], lerp(p[0], q[0], 0.5), lerp(p[1], q[1], 0.5));
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    /** Draw one pass of a ribbon path */
    function ribbonPath(
      cpts: [number, number][],
      colorA: string, colorB: string,
      lineW: number, opacity: number, blurPx: number
    ) {
      if (cpts.length < 2) return;
      const grad = ctx.createLinearGradient(
        cpts[0][0], cpts[0][1],
        cpts[cpts.length - 1][0], cpts[cpts.length - 1][1]
      );
      grad.addColorStop(0, colorA);
      grad.addColorStop(1, colorB);

      ctx.save();
      ctx.filter = blurPx > 0 ? `blur(${blurPx}px)` : "none";
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(cpts[0][0], cpts[0][1]);
      for (let i = 1; i < cpts.length - 1; i++) {
        const mx = lerp(cpts[i][0], cpts[i + 1][0], 0.5);
        const my = lerp(cpts[i][1], cpts[i + 1][1], 0.5);
        ctx.quadraticCurveTo(cpts[i][0], cpts[i][1], mx, my);
      }
      ctx.lineTo(cpts[cpts.length - 1][0], cpts[cpts.length - 1][1]);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lineW;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();
    }

    /** Full 3-layer tube ribbon: glow + body + highlight */
    function drawRibbon(
      normPts: [number, number][],
      colorA: string, colorB: string,
      baseW: number, time: number,
      freq: number, ampX: number, ampY: number, phase: number
    ) {
      // Animate control points
      const cpts: [number, number][] = normPts.map(([nx, ny], i) => {
        const ax = Math.sin(time * freq       + phase + i * 1.73) * ampX * W;
        const ay = Math.cos(time * freq * 0.8 + phase + i * 2.09) * ampY * H;
        return [nx * W + ax, ny * H + ay];
      });

      ribbonPath(cpts, colorA, colorB, baseW * 3.5, 0.25, 18); // outer glow
      ribbonPath(cpts, colorA, colorB, baseW,       0.85,  2); // body
      ribbonPath(cpts,                               // 3D highlight line
        "rgba(255,255,255,0.75)", "rgba(255,255,255,0.15)",
        baseW * 0.18, 0.6, 0
      );
    }

    // ── ribbon configs ──────────────────────────────────────
    const RIBBONS: Array<{
      pts: [number, number][]; ca: string; cb: string;
      w: number; freq: number; ax: number; ay: number; phase: number;
    }> = [
      { pts: [[0.43,0.82],[0.61,0.20],[0.76,0.60],[0.98,0.08]], ca:"#FF6B35", cb:"#F0199A", w:26, freq:0.38, ax:0.04, ay:0.07, phase:0.0  },
      { pts: [[0.50,0.06],[0.70,0.54],[0.84,0.16],[1.04,0.70]], ca:"#06B6D4", cb:"#7132C8", w:20, freq:0.27, ax:0.03, ay:0.09, phase:1.6  },
      { pts: [[0.46,0.75],[0.60,0.10],[0.74,0.52],[0.95,0.00]], ca:"#10B981", cb:"#2563EB", w:15, freq:0.44, ax:0.05, ay:0.05, phase:3.1  },
      { pts: [[0.52,0.95],[0.66,0.40],[0.80,0.75],[1.00,0.35]], ca:"#7132C8", cb:"#F0199A", w:12, freq:0.32, ax:0.04, ay:0.06, phase:4.7  },
    ];

    // ── main loop ───────────────────────────────────────────
    let t = 0;
    let raf: number;

    function frame() {
      t += 0.009;
      ctx.clearRect(0, 0, W, H);

      // Ambient radial glow (back layer)
      const grd = ctx.createRadialGradient(W * 0.80, H * 0.35, 0, W * 0.80, H * 0.35, W * 0.38);
      grd.addColorStop(0,   "rgba(113,50,200,0.45)");
      grd.addColorStop(0.45,"rgba(240,25,154,0.20)");
      grd.addColorStop(1,   "transparent");
      ctx.save(); ctx.filter = "blur(55px)"; ctx.globalAlpha = 1;
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Secondary cyan glow
      const grd2 = ctx.createRadialGradient(W * 0.65, H * 0.65, 0, W * 0.65, H * 0.65, W * 0.22);
      grd2.addColorStop(0, "rgba(6,182,212,0.30)");
      grd2.addColorStop(1, "transparent");
      ctx.save(); ctx.filter = "blur(45px)"; ctx.globalAlpha = 1;
      ctx.fillStyle = grd2; ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Large morphing blob (background)
      const blob = blobPts(W * 0.76, H * 0.36, W * 0.23, 12, t, 0.65);
      strokeBlob(blob, ["#F0199A","#7132C8","#2563EB","#10B981"], 0.72, 28);

      // Medium secondary blob (mid depth)
      const blob2 = blobPts(W * 0.60, H * 0.55, W * 0.13, 9, t + 2.1, 0.9);
      strokeBlob(blob2, ["#7132C8","#2563EB","#06B6D4"], 0.45, 18);

      // Animated 3D ribbons (front layers)
      RIBBONS.forEach(r => drawRibbon(r.pts, r.ca, r.cb, r.w, t, r.freq, r.ax, r.ay, r.phase));

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ===================== HERO =====================

function HeroSection({ onJoin }: { onJoin: () => void }) {
  const [ref, vis] = useVisible(0.05);
  const stats = [
    { val: "+65k", label: "active users" },
    { val: "+1.5b", label: "connections made" },
    { val: "+300k", label: "communities\nand interests" },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center bg-black overflow-hidden pt-20">
      <BlobCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-24">
        <div ref={ref} className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* left copy */}
          <div className="max-w-2xl">
            <h1 className={`text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.0] text-white mb-4 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>
              Where Professional<br />Meets Personal,<br /><span className={PGT}>Seamlessly.</span>
            </h1>
            <p className={`text-white/50 text-base leading-relaxed max-w-sm mb-8 transition-all duration-1000 ${vis?"opacity-100":"opacity-0"}`} style={{transitionDelay:"300ms"}}>
              NewHub is a modern social platform that helps you build meaningful professional and personal connections in one place.
            </p>
            <div className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"450ms"}}>
              <a href="#cta" onClick={e=>{e.preventDefault();document.getElementById("cta")?.scrollIntoView({behavior:"smooth"});}} className={`px-7 py-3.5 rounded-full font-bold text-white text-sm ${PG} hover:scale-105 hover:shadow-[0_0_24px_rgba(240,25,154,0.4)] transition-all`}>
                Join NewHub
              </a>
              <a href="#what" onClick={e=>{e.preventDefault();document.getElementById("what")?.scrollIntoView({behavior:"smooth"});}} className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* right: stats */}
          <div className={`flex flex-col gap-6 transition-all duration-1000 ${vis?"opacity-100 translate-x-0":"opacity-0 translate-x-8"}`} style={{transitionDelay:"500ms"}}>
            {stats.map((s,i)=>(
              <div key={i} className="flex items-start gap-3">
                <span className="text-white/30 text-lg leading-none mt-1">+</span>
                <div>
                  <div className={`text-3xl font-black ${PGT}`}>{s.val.replace("+","")}</div>
                  <div className="text-white/40 text-sm whitespace-pre-line leading-snug">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className={`mt-20 flex justify-center transition-all duration-1000 ${vis?"opacity-30":"opacity-0"}`} style={{transitionDelay:"800ms"}}>
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ===================== WHAT IS NEWHUB =====================

function WhatSection() {
  const [ref, vis] = useVisible();
  const items = [
    { icon: <Users className="w-6 h-6" />, title: "Personal", desc: "Connect with people beyond work." },
    { icon: <Briefcase className="w-6 h-6" />, title: "Professional", desc: "Grow your network and discover opportunities." },
    { icon: <Globe className="w-6 h-6" />, title: "Communities", desc: "Find your people and share what you love." },
  ];
  return (
    <section id="what" className="relative py-24 px-6 bg-[#050508]">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`text-center mb-14 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">What is NewHub?</h2>
          <p className="text-white/40 text-base">A platform to connect, collaborate, and grow — both personally and professionally.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i)=>(
            <div key={i} className={`p-7 rounded-2xl bg-[#0E0E14] border border-white/8 hover:border-white/15 hover:-translate-y-1 transition-all duration-500 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{transitionDelay:`${i*120}ms`}}>
              <div className={`w-11 h-11 rounded-xl ${PG} flex items-center justify-center text-white mb-5`}>{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== HOW IT WORKS =====================

function HowSection({ onFeedback }: { onFeedback: () => void }) {
  const [ref, vis] = useVisible();
  const steps = [
    { icon: <MessageCircle className="w-5 h-5" />, title: "Intro", desc: "Get started with a quick introduction." },
    { icon: <HelpCircle className="w-5 h-5" />, title: "Quiz", desc: "Answer a few questions to personalize your experience." },
    { icon: <BookOpen className="w-5 h-5" />, title: "Chapter 1", desc: "Explore insights designed just for you." },
    { icon: <BookOpen className="w-5 h-5" />, title: "Chapter 2", desc: "Dive deeper and unlock meaningful connections." },
    { icon: <Star className="w-5 h-5" />, title: "Get Early Access", desc: "You're all set! Be the first to experience NewHub." },
  ];
  return (
    <section className="py-24 px-6 bg-[#050508]">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`text-center mb-14 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-black text-white">How NewHub Works</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((s,i)=>(
            <React.Fragment key={i}>
              <button
                onClick={i < 4 ? onFeedback : undefined}
                className={`group relative p-5 rounded-2xl bg-[#0E0E14] border border-white/8 ${i<4?"hover:border-white/20 cursor-pointer":"cursor-default"} text-left transition-all duration-500 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
                style={{transitionDelay:`${i*100}ms`}}
              >
                <div className={`w-9 h-9 rounded-xl ${PG} flex items-center justify-center text-white mb-4`}>{s.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1.5">{s.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
                {i < 4 && (
                  <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${PG} flex items-center justify-center z-10 shadow-md`}>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== WHY NEWHUB =====================

function WhySection() {
  const [ref, vis] = useVisible();
  const items = [
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "Your data is protected with enterprise-grade security and privacy first approach." },
    { icon: <Users className="w-6 h-6" />, title: "Meaningful Connections", desc: "We focus on quality connections that help you grow personally and professionally." },
    { icon: <LayoutGrid className="w-6 h-6" />, title: "All in One Place", desc: "Everything you need to connect, collaborate, and grow — in one seamless platform." },
  ];
  return (
    <section className="py-24 px-6 bg-[#050508]">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`text-center mb-14 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-black text-white">Why NewHub?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item,i)=>(
            <div key={i} className={`p-7 rounded-2xl bg-[#0E0E14] border border-white/8 hover:border-white/15 transition-all duration-500 flex flex-col ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{transitionDelay:`${i*120}ms`}}>
              <div className={`w-11 h-11 rounded-xl ${PG} flex items-center justify-center text-white mb-5`}>{item.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed flex-1">{item.desc}</p>
              <button className={`mt-6 w-9 h-9 rounded-full border border-white/15 hover:${PG} hover:border-transparent flex items-center justify-center text-white/40 hover:text-white transition-all duration-300`}>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== SOCIAL PROOF BANNER =====================

function SocialBanner({ onJoin }: { onJoin: () => void }) {
  const [ref, vis] = useVisible();
  const colors = ["from-[#F0199A] to-[#7132C8]","from-blue-400 to-purple-500","from-emerald-400 to-blue-400","from-orange-400 to-pink-500","from-indigo-400 to-cyan-400"];
  return (
    <section className="py-8 px-6 bg-[#050508]">
      <div ref={ref} className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-7 rounded-2xl bg-[#0E0E14] border border-white/8 transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
        <div className="flex items-center gap-5">
          <div className="flex -space-x-2">
            {colors.map((c,i)=><div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} border-2 border-[#0E0E14]`} />)}
          </div>
          <span className={`text-lg font-black ${PGT}`}>+65k</span>
        </div>
        <p className="text-white font-semibold text-lg text-center md:text-left max-w-md">
          Join thousands of professionals and individuals building real connections.
        </p>
        <a href="#cta" onClick={e=>{e.preventDefault();document.getElementById("cta")?.scrollIntoView({behavior:"smooth"});}} className={`px-7 py-3 rounded-full font-bold text-white text-sm ${PG} hover:scale-105 hover:shadow-[0_0_20px_rgba(240,25,154,0.35)] transition-all whitespace-nowrap flex-shrink-0`}>
          Join NewHub
        </a>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================

function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email.includes("@")) { setSent(true); setEmail(""); } };

  return (
    <footer className="bg-[#050508] border-t border-white/5 px-6 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* brand */}
          <div>
            <Logo />
            <p className="text-white/30 text-sm mt-3 leading-relaxed">Where Professional<br />Meets Personal.</p>
          </div>
          {/* quick links */}
          <div>
            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["About","Feedback","Privacy","Terms","Contact"].map(l=>(
                <li key={l}><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          {/* connect */}
          <div>
            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex gap-3">
              {[<Twitter className="w-4 h-4" />, <Linkedin className="w-4 h-4" />, <Instagram className="w-4 h-4" />, <Circle className="w-4 h-4" />].map((icon,i)=>(
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/40 hover:text-white transition-all">{icon}</a>
              ))}
            </div>
          </div>
          {/* newsletter */}
          <div>
            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Stay in the loop</h4>
            <p className="text-white/30 text-sm mb-4">Get updates on new features and early access.</p>
            {sent ? (
              <div className="flex items-center gap-2 text-green-400 text-sm"><CheckCircle2 className="w-4 h-4" /> You're on the list!</div>
            ) : (
              <form onSubmit={submit} className="flex gap-2">
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter your email" className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-xs focus:outline-none focus:border-white/25 transition-colors" />
                <button type="submit" className={`px-3 py-2 rounded-lg font-bold text-white text-xs ${PG} hover:opacity-90 transition-all whitespace-nowrap`}>Get Early Access</button>
              </form>
            )}
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2026 NewHub. All rights reserved.</p>
          <div className="flex gap-5 text-white/20 text-xs">
            {["Privacy","Terms","Contact"].map(l=><a key={l} href="#" className="hover:text-white/50 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===================== CTA SECTION =====================

function CTASection() {
  const [ref, vis] = useVisible();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"error"|"success">("idle");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setStatus("idle"); setErr("");
    if (!input.trim()) { setStatus("error"); setErr("Required"); return; }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || /^[+]?[0-9]{10,15}$/.test(input);
    if (!ok) { setStatus("error"); setErr("Please enter a valid email or phone"); return; }
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setInput(""); }, 1400);
  };

  return (
    <section id="cta" className="py-28 px-6 bg-[#050508] relative overflow-hidden">
      <div className={`absolute inset-0 ${PG} opacity-[0.07]`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(113,50,200,0.12),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F0199A]/30 to-transparent" />
      <div ref={ref} className={`relative z-10 max-w-xl mx-auto text-center transition-all duration-1000 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Your chapter starts here.</h2>
        <p className="text-white/35 mb-10 text-base">Join the waitlist. Be first.</p>
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 text-green-400"><CheckCircle2 className="w-10 h-10" /><span className="font-medium">You're in! Stay tuned 🚀</span></div>
        ) : (
          <form onSubmit={submit}>
            <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Email or phone number" disabled={status==="loading"} className={`flex-1 px-5 py-3.5 text-sm rounded-full bg-transparent border-none ${status==="error"?"text-red-300":"text-white"} placeholder:text-white/25 focus:outline-none`} />
              <button type="submit" disabled={status==="loading"} className={`px-6 py-3.5 text-sm font-bold rounded-full text-white ${PG} transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-w-[150px] hover:opacity-90`}>
                {status==="loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get Early Access <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
            {status==="error" && <p className="mt-2 text-red-400 text-xs text-center">{err}</p>}
            <p className="mt-4 text-white/15 text-xs">No spam, ever.</p>
          </form>
        )}
      </div>
    </section>
  );
}

// ===================== MAIN PAGE =====================

function MainPage({ onFeedback, onLogin }: { onFeedback: () => void; onLogin: () => void }) {
  return (
    <div className="min-h-screen font-sans bg-black">
      <Navbar onFeedback={onFeedback} onLogin={onLogin} />
      <HeroSection onJoin={()=>document.getElementById("cta")?.scrollIntoView({behavior:"smooth"})} />
      <WhatSection />
      <HowSection onFeedback={onFeedback} />
      <WhySection />
      <SocialBanner onJoin={()=>document.getElementById("cta")?.scrollIntoView({behavior:"smooth"})} />
      <CTASection />
      <Footer />
    </div>
  );
}

// ===================== ROOT =====================

export default function LandingPage() {
  const [phase, setPhase] = useState<"main"|"quiz"|"cinematic">("main");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} />}
      {phase==="main" && <MainPage onFeedback={()=>setPhase("quiz")} onLogin={()=>setShowLogin(true)} />}
      {phase==="quiz" && <QuizPhase onComplete={()=>setPhase("cinematic")} />}
      {phase==="cinematic" && <CinematicIntro onComplete={()=>setPhase("main")} />}
    </>
  );
}
