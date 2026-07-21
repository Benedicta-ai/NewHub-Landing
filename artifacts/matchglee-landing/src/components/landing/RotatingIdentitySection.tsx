import {
  motion,
  useReducedMotion,
} from "framer-motion";

import CurvedLoop from "@/components/CurvedLoop";
import RotatingText from "@/components/RotatingText";

const rotatingWords = [
  "Connect",
  "Grow",
  "Belong",
  "Express",
  "Build",
];

const curvedMessage =
  "One profile for every side of you . Connect personally . Grow professionally . Belong meaningfully . Express authentically . Build communities . Discover opportunities . Create lasting relationships . Protect your privacy . Share your journey . Find your people . Build your future . ";

export default function RotatingIdentitySection() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      aria-label="What NewHub helps you do"
      className="
        relative
        isolate
        overflow-hidden
        bg-transparent
        py-7
        sm:py-8
        lg:py-10
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[250px]
          w-[min(900px,120vw)]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#7132C8]/10
          blur-[115px]
          dark:bg-[#7132C8]/[0.07]
        "
      />

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration:
            reduceMotion ? 0 : 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          h-[210px]
          w-full
          sm:h-[235px]
          lg:h-[250px]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[3%]
            z-20
            flex
            w-[96%]
            -translate-x-1/2
            flex-col
            items-center
            justify-center
            gap-2
            px-4
            text-center
            sm:flex-row
            sm:gap-2.5
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[22px]
              font-black
              leading-tight
              tracking-[-0.045em]
              text-[#17152a]
              dark:text-white
              sm:text-[25px]
              md:text-[27px]
              lg:text-[29px]
            "
          >
            NewHub is where you
          </span>

          <RotatingText
            texts={rotatingWords}
            mainClassName="
              min-h-[34px]
              min-w-[108px]
              items-center
              justify-center
              overflow-hidden
              rounded-[9px]
              bg-gradient-to-r
              from-[#F0199A]
              via-[#B838E8]
              to-[#7132C8]
              px-3.5
              py-1.5
              text-[17px]
              font-black
              leading-none
              tracking-[-0.035em]
              text-white
              shadow-[0_9px_22px_rgba(180,45,210,0.2)]
              sm:min-h-[36px]
              sm:min-w-[116px]
              sm:text-[18px]
              md:min-w-[124px]
              md:text-[19px]
            "
            staggerFrom="last"
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "-120%",
              opacity: 0,
            }}
            staggerDuration={0.025}
            splitLevelClassName="
              overflow-hidden
              pb-0.5
            "
            elementLevelClassName="text-white"
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
            }}
            rotationInterval={2400}
            splitBy="characters"
            auto
            loop
            pauseOnHover
            respectReducedMotion
          />
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[0]
            left-1/2
            h-[105px]
            w-screen
            max-w-none
            -translate-x-1/2
            overflow-visible
            opacity-90
            sm:h-[122px]
            lg:h-[136px]
          "
        >
          <CurvedLoop
            marqueeText={curvedMessage}
            speed={0.5}
            curveAmount={118}
            direction="right"
            interactive={false}
            respectReducedMotion
            className="newhub-curved-text"
          />
        </div>
      </motion.div>
    </section>
  );
}
