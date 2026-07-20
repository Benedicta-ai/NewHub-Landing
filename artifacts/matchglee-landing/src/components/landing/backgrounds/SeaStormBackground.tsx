import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SeaStormBackground() {
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const showVideo = !reduceMotion && !videoFailed;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        bg-[#fbfaff]
        transition-colors
        duration-500
        dark:bg-[#05070C]
      "
    >
      {/* Bright base lighting */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(135deg,#ffffff_0%,#fbf8ff_46%,#f0e9ff_100%)]
          dark:bg-[#05070C]
        "
      />

      {/* Poster fallback */}
      <motion.img
        src="/sea-storm/sea-storm-poster.jpg"
        alt=""
        initial={{
          opacity: 0,
          scale: 1.035,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          object-center
          opacity-[0.42]
          brightness-[1.45]
          contrast-[0.78]
          saturate-[0.68]
          transition-[filter,opacity]
          duration-500
          dark:opacity-100
          dark:brightness-100
          dark:contrast-100
          dark:saturate-100
        "
      />

      {/* Animated storm */}
      {showVideo && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/sea-storm/sea-storm-poster.jpg"
          onError={() => setVideoFailed(true)}
          initial={{
            opacity: 0,
            scale: 1.025,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            select-none
            object-cover
            object-center
            opacity-[0.42]
            brightness-[1.45]
            contrast-[0.78]
            saturate-[0.68]
            transition-[filter,opacity]
            duration-500
            dark:opacity-100
            dark:brightness-100
            dark:contrast-100
            dark:saturate-100
          "
        >
          <source src="/sea-storm/sea-storm-hero.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* White haze softens the storm */}
      <div
        className="
          absolute
          inset-0
          bg-white/20
          dark:bg-transparent
        "
      />

      {/* Text readability on the left */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(90deg,#fbfaff_0%,rgba(251,250,255,0.98)_24%,rgba(251,250,255,0.90)_42%,rgba(251,250,255,0.48)_62%,rgba(251,250,255,0.10)_82%,transparent_100%)]
          dark:bg-[linear-gradient(90deg,#05070C_0%,rgba(5,7,12,0.97)_20%,rgba(5,7,12,0.82)_38%,rgba(5,7,12,0.35)_58%,rgba(5,7,12,0.08)_78%,transparent_100%)]
        "
      />

      {/* Soft mobile overlay */}
      <div
        className="
          absolute
          inset-0
          bg-white/10
          sm:bg-white/[0.06]
          lg:bg-transparent
          dark:bg-black/25
          dark:sm:bg-black/15
          dark:lg:bg-transparent
        "
      />

      {/* Bottom transition into the next section */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(251,250,255,0.02)_0%,transparent_45%,rgba(251,250,255,0.95)_100%)]
          dark:bg-[linear-gradient(180deg,rgba(5,7,12,0.18)_0%,transparent_40%,rgba(5,7,12,0.82)_100%)]
        "
      />

      {/* Lavender ambient lighting */}
      <div
        className="
          absolute
          right-[5%]
          top-[12%]
          h-[540px]
          w-[540px]
          rounded-full
          bg-[#7132C8]/15
          blur-[135px]
          dark:bg-[#7132C8]/10
        "
      />

      {/* Pink ambient lighting */}
      <div
        className="
          absolute
          right-[18%]
          top-[35%]
          h-72
          w-72
          rounded-full
          bg-[#F0199A]/10
          blur-[105px]
          dark:bg-[#F0199A]/[0.07]
        "
      />

      {/* Soft blue atmosphere */}
      <div
        className="
          absolute
          bottom-[8%]
          right-[2%]
          h-80
          w-80
          rounded-full
          bg-blue-400/10
          blur-[120px]
          dark:bg-blue-500/[0.05]
        "
      />
    </div>
  );
}
