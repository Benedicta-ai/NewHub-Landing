import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

const steps = [
  { n: "01", title: "Intro", desc: "Get started with a quick introduction." },
  { n: "02", title: "Quiz", desc: "Answer a few questions to personalize your experience." },
  { n: "03", title: "Chapter 1", desc: "Explore insights designed just for you." },
  { n: "04", title: "Chapter 2", desc: "Dive deeper into meaningful connections." },
  { n: "05", title: "Get Early Access", desc: "You're all set. Be first to experience NewHub." },
];

export default function TakeUpAQuizSection({ onStart }: { onStart: () => void }) {
  return (
    <section id="quiz" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-white/8 bg-white/5 text-sm font-semibold tracking-[0.2em] uppercase text-white/40">
            Take Up A Quiz
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            A journey, <span className={BRAND_GRADIENT_TEXT}>not a form.</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">A few questions. Two short chapters. Then your invite.</p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4 mb-14">
          <div className="hidden sm:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-[#F0199A]/40 via-[#7132C8]/40 to-[#F0199A]/40" />
          {steps.map(s => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full ${BRAND_GRADIENT} flex items-center justify-center text-white font-black text-lg mb-4 shadow-[0_0_24px_rgba(240,25,154,0.35)] relative z-10`}>
                {s.n}
              </div>
              <h3 className="text-white font-bold mb-1">{s.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed px-2">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className={`px-9 py-4 rounded-full text-base font-bold text-white ${BRAND_GRADIENT} hover:scale-105 hover:shadow-[0_0_30px_rgba(240,25,154,0.4)] transition-all duration-300`}
          >
            Start The Journey
          </button>
        </div>
      </div>
    </section>
  );
}
