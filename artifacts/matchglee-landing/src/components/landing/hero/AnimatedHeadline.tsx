import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "./CTAButton";
import useMousePosition from "./hooks/useMousePosition";
import useViewport from "./hooks/useViewport";

const subtitle = "Where Professional Meets Personal — Seamlessly.";

interface AnimatedHeadlineProps {
  onGetAccess: () => void;
}

export default function AnimatedHeadline({
  onGetAccess,
}: AnimatedHeadlineProps) {
  const mouse = useMousePosition();
  const { width, height } = useViewport();
  const reduceMotion = useReducedMotion();

  const enableParallax = !reduceMotion && width >= 1024;

  const translateX = enableParallax
    ? Math.max(-10, Math.min(10, (mouse.x - width / 2) * 0.008))
    : 0;

  const translateY = enableParallax
    ? Math.max(-8, Math.min(8, (mouse.y - height / 2) * 0.008))
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
        max-w-[720px]
      "
    >
      <motion.p
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                filter: "blur(8px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mb-5
          text-[13px]
          font-medium
          uppercase
          tracking-[0.32em]
          text-white/65
          sm:text-sm
          md:text-base
        "
      >
        They blend in.
      </motion.p>

      <motion.h1
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 35,
                filter: "blur(14px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          max-w-full
          font-black
          uppercase
          leading-[0.94]
          tracking-[-0.055em]
          text-[44px]
          min-[380px]:text-[48px]
          sm:text-[50px]
          md:text-[56px]
          lg:text-[58px]
          xl:text-[64px]
        "
      >
        <span
          className="
            bg-[linear-gradient(90deg,#ff7547_0%,#f0199a_52%,#8b5cf6_100%)]
            bg-clip-text
            text-transparent
            drop-shadow-[0_8px_28px_rgba(240,25,154,0.14)]
          "
        >
          {/* Mobile */}
          <span className="block sm:hidden">
            <span className="block">One stands</span>
            <span className="block">out.</span>
          </span>

          {/* Desktop */}
          <span className="hidden whitespace-nowrap sm:inline">
            One stands out.
          </span>
        </span>
      </motion.h1>

      <motion.p
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.38,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-6
          max-w-[430px]
          text-base
          leading-7
          text-white/80
          sm:text-lg
          sm:leading-8
          md:text-[20px]
        "
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
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
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-8 sm:mt-10"
      >
        <CTAButton onClick={onGetAccess} />
      </motion.div>
    </motion.div>
  );
}
