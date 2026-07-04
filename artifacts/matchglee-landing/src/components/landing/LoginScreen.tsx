import { useState } from "react";
import { X, ArrowRight, Eye, EyeOff } from "lucide-react";
import Logo from "./Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

export default function LoginScreen({ onClose }: { onClose: () => void }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="fixed inset-0 z-[150] bg-[#0A0118] overflow-y-auto">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-[#F0199A]/25 to-[#7132C8]/20 blur-3xl" style={{ animation: "blobFloat 8s ease-in-out infinite" }} />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#7132C8]/25 to-[#F0199A]/15 blur-3xl" style={{ animation: "blobFloat 10s ease-in-out infinite reverse" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#F0199A]/20 to-transparent blur-3xl" style={{ animation: "blobFloat 9s ease-in-out infinite" }} />
      </div>

      <button onClick={onClose} className="fixed top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
        <X className="w-5 h-5" />
      </button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-6"><Logo size="lg" /></div>
        <div className="text-sm text-white/40 mb-8">newhub.app</div>

        <div className="text-center mb-8">
          <div className={`text-sm font-semibold tracking-widest uppercase ${BRAND_GRADIENT_TEXT} mb-3`}>Welcome Back</div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">CONNECT</h1>
          <h1 className={`text-4xl md:text-6xl font-black leading-tight ${BRAND_GRADIENT_TEXT}`}>MEANINGFULLY</h1>
          <p className="text-white/40 mt-5 max-w-sm mx-auto text-sm md:text-base">
            Sign in to continue building meaningful personal and professional connections on NewHub.
          </p>
        </div>

        <form className="w-full max-w-sm space-y-4" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Email address" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#F0199A]/50 transition-colors" />
          <div className="relative">
            <input type={showPass ? "text" : "password"} placeholder="Password" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#F0199A]/50 transition-colors pr-12" />
            <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-white/40 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#F0199A]" /> Remember me
            </label>
            <a href="#" className="hover:text-white/70 transition-colors">Forgot password?</a>
          </div>
          <button type="submit" className={`w-full py-4 rounded-2xl font-bold text-white text-sm ${BRAND_GRADIENT} hover:scale-[1.01] transition-all duration-200 shadow-[0_0_24px_rgba(240,25,154,0.35)] flex items-center justify-center gap-2 mt-2`}>
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="w-full max-w-sm flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/25 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="flex gap-3 mb-8">
          {["G", "in", "🍎"].map((s, i) => (
            <div key={i} className="w-14 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 text-sm hover:bg-white/10 hover:text-white transition-all cursor-pointer font-semibold">
              {s}
            </div>
          ))}
        </div>

        <p className="text-white/30 text-sm">
          Don't have an account?{" "}
          <button className={`font-semibold ${BRAND_GRADIENT_TEXT}`}>Create NewHub account →</button>
        </p>
      </div>

      <style>{`
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-24px) scale(1.08)} }
      `}</style>
    </div>
  );
}
