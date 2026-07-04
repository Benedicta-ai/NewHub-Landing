import Logo from "./Logo";
import { BRAND_GRADIENT } from "@/lib/brand";

const avatarColors = [
  "from-[#F0199A] to-[#7132C8]",
  "from-blue-400 to-[#7132C8]",
  "from-emerald-400 to-blue-400",
  "from-orange-400 to-[#F0199A]",
  "from-indigo-400 to-[#7132C8]",
];

export default function JoinFooter({ onJoin }: { onJoin: () => void }) {
  return (
    <>
      <section className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatarColors.map((c, i) => (
                <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} border-2 border-[#0A0118]`} />
              ))}
            </div>
            <p className="text-white/60 text-sm">Join thousands of professionals and individuals building real connections.</p>
          </div>
          <button
            onClick={onJoin}
            className={`px-7 py-3.5 rounded-full text-sm font-bold text-white ${BRAND_GRADIENT} hover:scale-105 transition-transform shadow-[0_0_24px_rgba(240,25,154,0.3)] whitespace-nowrap`}
          >
            Join NewHub
          </button>
        </div>
      </section>

      <footer className="relative py-14 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo size="sm" />
            <p className="text-white/30 text-sm mt-4 max-w-xs">Where Professional Meets Personal — Seamlessly.</p>
          </div>
          <div>
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Quick Links</div>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#quiz" className="hover:text-white transition-colors">Feedback</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div>
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Connect</div>
            <div className="flex gap-3">
              {["𝕏", "in", "◎"].map((s, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/50 text-sm hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 text-center text-white/20 text-xs">
          © 2026 NewHub. All rights reserved.
        </div>
      </footer>
    </>
  );
}
