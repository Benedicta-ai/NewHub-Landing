import { useEffect, useState } from "react";
import Logo from "./Logo";
import { BRAND_GRADIENT } from "@/lib/brand";

export default function Navbar({ onFeedback, onLogin }: { onFeedback: () => void; onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0118]/70 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6 md:gap-8 text-sm">
          <a
            href="#about"
            className="text-white/60 hover:text-white transition-colors font-medium"
            onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            About
          </a>
          <button onClick={onFeedback} className="text-white/60 hover:text-white transition-colors font-medium">
            Feedback
          </button>
          <button
            onClick={onLogin}
            className={`px-5 py-2 rounded-full ${BRAND_GRADIENT} text-white font-semibold hover:scale-105 transition-transform shadow-[0_0_16px_rgba(240,25,154,0.25)] text-sm`}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
