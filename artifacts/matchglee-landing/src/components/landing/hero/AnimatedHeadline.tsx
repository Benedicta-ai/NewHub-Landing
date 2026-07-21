import {
  motion,
  useReducedMotion,
} from "framer-motion";

import Shuffle from "@/components/Shuffle";
import TextPressure from "@/components/TextPressure";

import CTAButton from "./CTAButton";
import useMousePosition from "./hooks/useMousePosition";
import useViewport from "./hooks/useViewport";

interface AnimatedHeadlineProps {
  onGetAccess: () => void;
}

const shuffleSettings = {
  shuffleDirection: "right" as const,
  duration: 0.35,
  animationMode: "evenodd" as const,
  shuffleTimes: 1,
  ease: "power3.out",
  stagger: 0.03,
  threshold: 0.1,
  rootMargin: "0px",
  triggerOnce: true,
  triggerOnHover: true,
  respectReducedMotion: true,
  loop: false,
  loopDelay: 0,
};

export default function AnimatedHeadline({
  onGetAccess,
}: AnimatedHeadlineProps) {
  const mouse = useMousePosition();

  const {
    width: viewportWidth,
    height: viewportHeight,
  } = useViewport();

  const reduceMotion = useReducedMotion();

  const isMobile = viewportWidth < 640;

  const enableParallax =
    !reduceMotion && viewportWidth >= 1024;

  const translateX = enableParallax
    ? Math.max(
        -10,
        Math.min(
          10,
          (mouse.x - viewportWidth / 2) *
            0.008,
        ),
      )
    : 0;

  const translateY = enableParallax
    ? Math.max(
        -8,
        Math.min(
          8,
          (mouse.y - viewportHeight / 2) *
            0.008,
        ),
      )
    : 0;

  return (
    <motion.div
      animate={{
        x: translateX,
        y: translateY,
      }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 22,
        mass: 0.8,
      }}
      className="
        relative
        z-20
        w-full
        max-w-[760px]
      "
    >
      <h1
        className="
          max-w-full
          font-black
          uppercase
          tracking-[-0.055em]
        "
      >
        {/* They Blend In — Shuffle */}
        <span
          className="
            block
            text-[32px]
            leading-[0.98]
            text-[#17152a]
            dark:text-white
            min-[380px]:text-[35px]
            sm:text-[44px]
            md:text-[50px]
            lg:text-[54px]
            xl:text-[58px]
          "
        >
          <Shuffle
            {...shuffleSettings}
            text="They blend in."
            tag="span"
            textAlign="left"
            className="
              font-black
              uppercase
              leading-[0.98]
              tracking-[-0.055em]
            "
          />
        </span>

        {/* One Stands Out — Text Pressure */}
        <span
          className="
            relative
            mt-3
            block
            h-[48px]
            w-full
            max-w-[350px]
            overflow-hidden
            sm:mt-4
            sm:h-[68px]
            sm:max-w-[520px]
            md:h-[76px]
            md:max-w-[550px]
            lg:h-[82px]
            lg:max-w-[570px]
            xl:h-[88px]
          "
        >
          <TextPressure
            text="One stands out."
            flex={!isMobile}
            alpha={false}
            stroke={false}
            width={!isMobile}
            weight
            italic={false}
            scale={false}
            textColor="#D92DB5"
            strokeColor="#7132C8"
            minFontSize={
              isMobile ? 28 : 42
            }
            maxFontSize={
              isMobile ? 42 : 76
            }
            respectReducedMotion
            className="
              drop-shadow-[0_8px_28px_rgba(240,25,154,0.18)]
            "
          />
        </span>
      </h1>

      <motion.p
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-4
          max-w-[470px]
          text-sm
          font-medium
          leading-6
          text-[#4f4b60]
          dark:text-white/75
          sm:mt-6
          sm:text-base
          sm:leading-7
          md:text-lg
        "
      >
        Personal. Professional. One profile.
      </motion.p>

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 20,
                scale: 0.97,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 sm:mt-8"
      >
        <CTAButton onClick={onGetAccess} />
      </motion.div>
    </motion.div>
  );
}
