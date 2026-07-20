import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointerClick,
  Move,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";
import InfiniteGallery from "./effects/InfiniteGallery";

const newHubImages = [
  { src: "/infinity-canvas/canvas-01.webp", alt: "Your only limit is you", width: 731, height: 912 },
  { src: "/infinity-canvas/canvas-02.webp", alt: "Person walking through golden light", width: 736, height: 1227 },
  { src: "/infinity-canvas/canvas-03.webp", alt: "Be the energy you want to attract", width: 736, height: 1104 },
  { src: "/infinity-canvas/canvas-04.webp", alt: "Professional team celebrating together", width: 736, height: 1104 },
  { src: "/infinity-canvas/canvas-05.webp", alt: "Community over competition", width: 736, height: 736 },
  { src: "/infinity-canvas/canvas-06.webp", alt: "Personal identity and self connection", width: 735, height: 665 },
  { src: "/infinity-canvas/canvas-07.webp", alt: "Diverse team celebrating", width: 735, height: 638 },
  { src: "/infinity-canvas/canvas-08.webp", alt: "Individual standing out from a crowd", width: 540, height: 720 },
  { src: "/infinity-canvas/canvas-09.webp", alt: "Collaborative professional workspace", width: 736, height: 1104 },
  { src: "/infinity-canvas/canvas-10.webp", alt: "Friends sharing a meaningful conversation", width: 736, height: 1308 },
  { src: "/infinity-canvas/canvas-11.webp", alt: "Creative team working together", width: 736, height: 920 },
  { src: "/infinity-canvas/canvas-12.webp", alt: "Together we can overcome anything", width: 736, height: 920 },
  { src: "/infinity-canvas/canvas-13.webp", alt: "Your vision, our mission", width: 736, height: 1104 },
  { src: "/infinity-canvas/canvas-14.webp", alt: "Diverse hands joined in teamwork", width: 736, height: 920 },
  { src: "/infinity-canvas/canvas-15.webp", alt: "Colleagues connecting outdoors", width: 735, height: 673 },
  { src: "/infinity-canvas/canvas-16.webp", alt: "Think bigger", width: 332, height: 498 },
  { src: "/infinity-canvas/canvas-17.webp", alt: "Professional team collaborating", width: 736, height: 1349 },
  { src: "/infinity-canvas/canvas-18.webp", alt: "Friends sharing a supportive group hug", width: 640, height: 641 },
  { src: "/infinity-canvas/canvas-19.webp", alt: "Community editorial collage", width: 586, height: 734 },
  { src: "/infinity-canvas/canvas-20.webp", alt: "People forming a connected circle", width: 736, height: 815 },
  { src: "/infinity-canvas/canvas-21.webp", alt: "Community embracing one another", width: 725, height: 1000 },
  { src: "/infinity-canvas/canvas-22.webp", alt: "Professional presenting to a team", width: 736, height: 1041 },
  { src: "/infinity-canvas/canvas-23.webp", alt: "Hands connected through a network", width: 736, height: 1030 },
  { src: "/infinity-canvas/canvas-24.webp", alt: "In the right eyes you will be art", width: 736, height: 979 },
];

const identityPills = ["Personal", "Professional", "Communities"];

export default function WhatIsNewHubSection() {
  const [isCanvasActive, setIsCanvasActive] = useState(false);

  useEffect(() => {
    if (!isCanvasActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCanvasActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCanvasActive]);

  return (
    <section
      id="what-is-newhub"
      className="relative isolate overflow-hidden bg-transparent py-24 sm:py-28 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-9 max-w-3xl text-center sm:mb-11"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7132C8]/15 bg-white/70 px-5 py-2.5 shadow-[0_10px_35px_rgba(78,48,140,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
            <Sparkles className="h-3.5 w-3.5 text-[#F0199A]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#746f88] dark:text-white/45 sm:text-[11px]">
              What is NewHub?
            </span>
          </div>

          <h2 className="text-[34px] font-black leading-tight tracking-[-0.05em] text-[#17152a] dark:text-white sm:text-[43px] md:text-[52px]">
            Three sides. <span className={BRAND_GRADIENT_TEXT}>One complete you.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d6a80] dark:text-white/48 sm:text-base">
            Explore personal expression, professional growth and communities in one free-moving visual space.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {identityPills.map((pill, index) => (
              <span
                key={pill}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  index === 0
                    ? "border-[#F0199A]/20 bg-[#F0199A]/[0.07] text-[#C91B83] dark:text-pink-300"
                    : index === 1
                      ? "border-[#7132C8]/20 bg-[#7132C8]/[0.07] text-[#7132C8] dark:text-purple-300"
                      : "border-blue-500/20 bg-blue-500/[0.07] text-blue-600 dark:text-blue-300"
                }`}
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[620px] w-full sm:h-[720px] lg:h-[820px]"
        onClick={() => {
          if (!isCanvasActive) setIsCanvasActive(true);
        }}
      >
        <InfiniteGallery
          width="100%"
          height="100%"
          images={newHubImages}
          density={5}
          imageWidth={220}
          imageHeight={220}
          rounded={2}
          dragSpeed={20}
          driftAmount={20}
          friction={10}
          backgroundColor="transparent"
          active={isCanvasActive}
        />

        {!isCanvasActive && (
          <button
            type="button"
            onClick={() => setIsCanvasActive(true)}
            className="absolute left-1/2 top-5 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#7132C8]/15 bg-white/85 px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#302a40] shadow-[0_12px_35px_rgba(78,48,140,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-black/55 dark:text-white/80 dark:hover:bg-black/70"
            aria-label="Activate the Infinity Canvas"
          >
            <MousePointerClick className="h-3.5 w-3.5 text-[#7132C8] dark:text-purple-300" />
            Click to explore
          </button>
        )}

        {isCanvasActive && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 px-4 pt-4 sm:px-7 lg:px-10">
            <div className="pointer-events-none inline-flex flex-wrap items-center gap-3 rounded-full border border-[#7132C8]/15 bg-white/85 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4f485d] shadow-[0_10px_30px_rgba(78,48,140,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-black/55 dark:text-white/75 dark:shadow-none">
              <span className="inline-flex items-center gap-1.5">
                <Move className="h-3.5 w-3.5" /> Drag freely
              </span>
              <span className="h-3 w-px bg-[#7132C8]/20 dark:bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <ZoomIn className="h-3.5 w-3.5" /> Scroll to zoom
              </span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsCanvasActive(false);
              }}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#7132C8]/15 bg-white/85 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4f485d] shadow-[0_10px_30px_rgba(78,48,140,0.1)] backdrop-blur-xl transition hover:bg-white dark:border-white/10 dark:bg-black/55 dark:text-white/80 dark:shadow-none dark:hover:bg-black/75"
              aria-label="Release the page scroll"
            >
              <X className="h-3.5 w-3.5" /> Release scroll
            </button>
          </div>
        )}
      </motion.div>

      <p className="relative z-10 mx-auto mt-2 max-w-2xl px-5 text-center text-xs leading-6 text-[#8b879d] dark:text-white/30 sm:px-7 sm:text-sm lg:px-10">
        Click the canvas to activate it. Use “Release scroll” or press Esc to return to normal page scrolling.
      </p>
    </section>
  );
}
