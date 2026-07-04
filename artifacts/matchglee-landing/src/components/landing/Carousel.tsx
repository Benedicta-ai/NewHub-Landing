import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

export interface CarouselItem {
  icon?: string;
  title: string;
  desc: string;
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const getOffset = (i: number) => {
    let diff = i - index;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const go = (dir: 1 | -1) => setIndex(i => (i + dir + total) % total);

  return (
    <div className="relative">
      <div className="relative h-[340px] md:h-[380px] flex items-center justify-center" style={{ perspective: "1400px" }}>
        {items.map((item, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null;
          const isCenter = offset === 0;
          return (
            <motion.div
              key={i}
              className="absolute w-[260px] md:w-[320px] rounded-2xl p-7 bg-white/5 border border-white/10 backdrop-blur-md"
              style={{ zIndex: 10 - Math.abs(offset) }}
              animate={{
                x: offset * 220,
                scale: isCenter ? 1 : 0.82,
                opacity: Math.abs(offset) > 1 ? 0 : isCenter ? 1 : 0.35,
                filter: isCenter ? "blur(0px)" : "blur(3px)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
              {item.icon && (
                <div className={`w-12 h-12 rounded-2xl ${BRAND_GRADIENT} flex items-center justify-center text-2xl mb-5`}>
                  {item.icon}
                </div>
              )}
              <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? `w-6 ${BRAND_GRADIENT}` : "w-1.5 bg-white/15"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
