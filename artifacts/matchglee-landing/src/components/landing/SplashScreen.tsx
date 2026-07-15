import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_GRADIENT_TEXT, LOGO_SRC } from "@/lib/brand";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"lines" | "glow" | "dissolve">("lines");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glow"), 700);
    const t2 = setTimeout(() => setPhase("dissolve"), 2200);
    const t3 = setTimeout(() => onFinish(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        onClick={onFinish}
      >
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -12, 0] }}
              transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.2 }}
            />
          ))}
        </div>

        <motion.div
          className="absolute left-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent to-[#F0199A]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: phase === "lines" ? "38%" : "0%", opacity: phase === "lines" ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/2 h-[2px] bg-gradient-to-l from-transparent to-[#7132C8]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: phase === "lines" ? "38%" : "0%", opacity: phase === "lines" ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        />

        <motion.div
          className="relative z-10"
          initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
          animate={
            phase === "dissolve"
              ? { scale: 1.5, opacity: 0, filter: "blur(24px)" }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: phase === "glow" ? "drop-shadow(0 0 36px rgba(240,25,154,0.55))" : "blur(0px)",
                }
          }
          transition={{ duration: phase === "dissolve" ? 0.9 : 1, ease: "easeOut" }}
        >
          <img src={LOGO_SRC} alt="NewHub" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
        </motion.div>

        <motion.div
          className={`mt-5 text-2xl md:text-3xl font-black tracking-tight ${BRAND_GRADIENT_TEXT} relative z-10`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === "dissolve" ? 0 : 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          NewHub
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
