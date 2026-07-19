import { motion, useReducedMotion } from "framer-motion";

import heroCrowd from "@/assets/hero-crowd.png";

import AnimatedHeadline from "./AnimatedHeadline";
import ScrollHint from "./ScrollHint";

interface HeroSectionProps {
  onGetAccess: () => void;
}

export default function HeroSection({ onGetAccess }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#f8f6ff]
        transition-colors
        duration-500
        dark:bg-[#05070C]
      "
    >
      {/* Continuous hero base */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[linear-gradient(135deg,#ffffff_0%,#faf7ff_46%,#f8f6ff_100%)]
          dark:bg-[linear-gradient(135deg,#05070C_0%,#070311_48%,#0A0118_100%)]
        "
      />

      {/* Purple atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[12%]
          top-[3%]
          z-[1]
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#7132C8]/14
          blur-[155px]
          dark:bg-[#7132C8]/16
        "
      />

      {/* Pink atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[8%]
          right-[12%]
          z-[1]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#F0199A]/10
          blur-[120px]
          dark:bg-[#F0199A]/[0.09]
        "
      />

      {/* Full-bleed crowd artwork */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          overflow-hidden
        "
      >
        <motion.img
          src={heroCrowd}
          alt=""
          draggable={false}
          loading="eager"
          fetchPriority="high"
          initial={
            reduceMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                  scale: 1.035,
                  x: 20,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            select-none
            object-cover
            object-[72%_50%]
          "
        />

        {/* Light-theme text-side blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            dark:hidden
          "
          style={{
            background: `
              linear-gradient(
                90deg,
                #f8f6ff 0%,
                rgba(248,246,255,0.99) 17%,
                rgba(248,246,255,0.93) 30%,
                rgba(248,246,255,0.70) 44%,
                rgba(248,246,255,0.34) 59%,
                rgba(248,246,255,0.08) 74%,
                transparent 88%
              )
            `,
          }}
        />

        {/* Light-theme upper corner blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            dark:hidden
          "
          style={{
            background: `
              radial-gradient(
                circle at 0% 0%,
                rgba(255,255,255,0.96) 0%,
                rgba(255,255,255,0.58) 26%,
                rgba(255,255,255,0.14) 43%,
                transparent 58%
              )
            `,
          }}
        />

        {/* Dark-theme text-side blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            hidden
            dark:block
          "
          style={{
            background: `
              linear-gradient(
                90deg,
                #05070C 0%,
                rgba(5,7,12,0.99) 17%,
                rgba(5,7,12,0.91) 30%,
                rgba(5,7,12,0.68) 44%,
                rgba(5,7,12,0.31) 60%,
                rgba(5,7,12,0.07) 76%,
                transparent 90%
              )
            `,
          }}
        />

        {/* Single cinematic bottom fade */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[8]
            h-[46%]
          "
        >
          {/* Light theme */}
          <div
            className="
              absolute
              inset-0
              dark:hidden
            "
            style={{
              background: `
                linear-gradient(
                  180deg,
                  transparent 0%,
                  rgba(248,246,255,0.01) 12%,
                  rgba(248,246,255,0.06) 27%,
                  rgba(248,246,255,0.16) 43%,
                  rgba(248,246,255,0.34) 59%,
                  rgba(248,246,255,0.62) 76%,
                  rgba(248,246,255,0.88) 91%,
                  #f8f6ff 100%
                )
              `,
            }}
          />

          {/* Dark theme */}
          <div
            className="
              absolute
              inset-0
              hidden
              dark:block
            "
            style={{
              background: `
                linear-gradient(
                  180deg,
                  transparent 0%,
                  rgba(10,1,24,0.01) 12%,
                  rgba(10,1,24,0.06) 27%,
                  rgba(10,1,24,0.16) 43%,
                  rgba(10,1,24,0.34) 59%,
                  rgba(10,1,24,0.62) 76%,
                  rgba(10,1,24,0.88) 91%,
                  #0A0118 100%
                )
              `,
            }}
          />

          {/* Shared purple bloom */}
          <div
            className="
              absolute
              bottom-[-8rem]
              left-1/2
              h-72
              w-[88%]
              -translate-x-1/2
              rounded-[50%]
              bg-[#7132C8]/10
              blur-[120px]
              dark:bg-[#7132C8]/[0.09]
            "
          />
        </div>
      </div>

      {/* Hero content */}
      <div
        className="
          relative
          z-20
          mx-auto
          grid
          min-h-[100svh]
          w-full
          max-w-[1500px]
          grid-cols-1
          items-center
          px-6
          pb-24
          pt-32
          sm:px-8
          md:px-10
          lg:grid-cols-12
          lg:px-14
          xl:px-16
        "
      >
        <div
          className="
            relative
            max-w-[680px]
            lg:col-span-6
            xl:col-span-5
          "
        >
          {/* Headline readability glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-24
              top-1/2
              -z-10
              h-[440px]
              w-[440px]
              -translate-y-1/2
              rounded-full
              bg-white/55
              blur-[110px]
              dark:bg-[#7132C8]/[0.07]
            "
          />

          <AnimatedHeadline onGetAccess={onGetAccess} />
        </div>

        <div
          aria-hidden="true"
          className="
            hidden
            lg:col-span-6
            lg:block
            xl:col-span-7
          "
        />
      </div>

      <div className="relative z-30">
        <ScrollHint />
      </div>
    </section>
  );
}
