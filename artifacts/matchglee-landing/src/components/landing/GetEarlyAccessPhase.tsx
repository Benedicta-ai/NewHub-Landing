import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Logo from "./Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

export default function GetEarlyAccessPhase({ onDone }: { onDone: () => void }) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle"); setErrorMsg("");
    if (!input.trim()) { setStatus("error"); setErrorMsg("This field is required"); return; }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    const isPhone = /^[+]?[0-9]{10,15}$/.test(input);
    if (!isEmail && !isPhone) { setStatus("error"); setErrorMsg("Please enter a valid email or phone number"); return; }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0118] text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-[#F0199A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40rem] h-[40rem] bg-[#7132C8]/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 mb-10"><Logo size="lg" /></div>
      <div className="relative z-10 max-w-lg w-full text-center">
        {status === "success" ? (
          <div className="space-y-6">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-black">You're in! 🚀</h2>
            <p className="text-white/50">We'll let you know the moment NewHub opens up.</p>
            <button onClick={onDone} className={`px-8 py-4 rounded-full font-bold text-white ${BRAND_GRADIENT} hover:scale-105 transition-transform`}>
              Back to NewHub
            </button>
          </div>
        ) : (
          <>
            <div className="text-5xl mb-6">✨</div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Get Early <span className={BRAND_GRADIENT_TEXT}>Access</span>
            </h2>
            <p className="text-white/45 mb-10">You're all set. Be the first to experience NewHub.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-full bg-white/5 border border-white/15">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Email or phone number"
                  disabled={status === "loading"}
                  className={`flex-1 px-6 py-4 text-sm rounded-full bg-transparent border-none ${status === "error" ? "text-red-300" : "text-white"} placeholder:text-white/25 focus:outline-none`}
                />
                <button type="submit" disabled={status === "loading"} className={`px-7 py-4 text-sm font-bold rounded-full text-white ${BRAND_GRADIENT} hover:scale-[1.03] transition-transform whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2 min-w-[150px]`}>
                  {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get Access <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
              {status === "error" && <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>}
            </form>
            <button onClick={onDone} className="mt-8 text-white/30 text-sm hover:text-white/60 transition-colors">
              Skip for now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
