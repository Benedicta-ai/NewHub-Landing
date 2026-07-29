import {
  useRef,
} from "react";

import {
  useReducedMotion,
} from "framer-motion";

import AnimatedHeadline from "./AnimatedHeadline";
import HeroCinemaCanvas from "./HeroCinemaCanvas";
import HeroSplashCursor from "./HeroSplashCursor";
import ScrollHint from "./ScrollHint";

interface HeroSectionProps {
  onGetAccess: () => void;
}

export default function HeroSection({
  onGetAccess,
}: HeroSectionProps) {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  const reduceMotion =
    useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`
        relative
        isolate
        bg-[#f8f6ff]
        transition-colors
        duration-500
        dark:bg-[#05070C]
        ${
          reduceMotion
            ? "min-h-[100svh]"
            : "h-[420svh] sm:h-[460svh] lg:h-[520svh]"
        }
      `}
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          overflow-hidden
        "
      >
        {/* Theme-compatible base */}
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

        {/* Metal Human scroll cinema */}
        <HeroCinemaCanvas
          sectionRef={sectionRef}
        />

        {/* Left-side readability layer */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-[linear-gradient(90deg,rgba(248,246,255,0.97)_0%,rgba(248,246,255,0.92)_16%,rgba(248,246,255,0.72)_31%,rgba(248,246,255,0.38)_46%,rgba(248,246,255,0.10)_61%,transparent_78%)]
            dark:bg-[linear-gradient(90deg,rgba(5,7,12,0.96)_0%,rgba(5,7,12,0.91)_16%,rgba(5,7,12,0.72)_31%,rgba(5,7,12,0.40)_47%,rgba(5,7,12,0.12)_63%,transparent_80%)]
          "
        />

        {/* Upper navbar fade */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[4]
            h-52
            bg-gradient-to-b
            from-[#f8f6ff]/90
            via-[#f8f6ff]/35
            to-transparent
            dark:from-[#05070C]/90
            dark:via-[#05070C]/35
          "
        />

        {/* Bottom transition into next section */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[4]
            h-[30%]
            bg-gradient-to-t
            from-[#f8f6ff]
            via-[#f8f6ff]/38
            to-transparent
            dark:from-[#0A0118]
            dark:via-[#0A0118]/42
          "
        />

        {/* Existing splash cursor effect */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[8]
          "
        >
          <HeroSplashCursor />
        </div>

        {/* Existing hero content */}
        <div
          className="
            relative
            z-20
            mx-auto
            grid
            h-full
            w-full
            max-w-[1500px]
            grid-cols-1
            items-center
            px-5
            pb-24
            pt-28
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
              max-w-[700px]
              lg:col-span-6
              xl:col-span-5
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-28
                top-1/2
                -z-10
                h-[470px]
                w-[470px]
                -translate-y-1/2
                rounded-full
                bg-white/45
                blur-[115px]
                dark:bg-[#7132C8]/[0.08]
              "
            />

            <AnimatedHeadline
              onGetAccess={
                onGetAccess
              }
            />
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

        {!reduceMotion && (
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-30
            "
          >
            <ScrollHint />
          </div>
        )}
      </div>
    </section>
  );
}
