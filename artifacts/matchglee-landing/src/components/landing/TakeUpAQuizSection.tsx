import { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import {
  BRAND_GRADIENT,
  BRAND_GRADIENT_TEXT,
} from "@/lib/brand";

interface QuizStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: QuizStep[] = [
  {
    number: "01",
    title: "Intro",
    description: "Meet NewHub.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Quiz",
    description: "Share what matters.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Chapter 1",
    description: "Explore your identity.",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Chapter 2",
    description: "Discover your connections.",
    icon: BookOpen,
  },
  {
    number: "05",
    title: "Get Early Access",
    description: "Join before launch.",
    icon: CheckCircle2,
  },
];

interface QuizStackCardProps {
  step: QuizStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

function QuizStackCard({
  step,
  index,
  total,
  progress,
  reduceMotion,
}: QuizStackCardProps) {
  const Icon = step.icon;

  /*
    Each card enters during its own part of the scroll.

    Card 1 is already visible when the sticky scene begins.
    Later cards travel upward into the same stack.
  */
  const start =
    index === 0
      ? 0
      : 0.08 + index * 0.155;

  const end =
    index === 0
      ? 0.01
      : start + 0.13;

  const initialY =
    index === 0
      ? 0
      : 330 + index * 24;

  const stackedY = index * 14;

  const finalScale =
    1 - (total - 1 - index) * 0.006;

  const y = useTransform(
    progress,
    [start, end],
    [initialY, stackedY],
  );

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.025),
      Math.max(0.01, start + 0.025),
    ],
    [
      index === 0 ? 1 : 0,
      1,
    ],
  );

  const scale = useTransform(
    progress,
    [start, end],
    [
      index === 0 ? finalScale : 0.985,
      finalScale,
    ],
  );

  return (
    <motion.article
      style={
        reduceMotion
          ? {
              y: stackedY,
              opacity: 1,
              scale: finalScale,
              zIndex: index + 10,
            }
          : {
              y,
              opacity,
              scale,
              zIndex: index + 10,
            }
      }
      className="
        absolute
        inset-x-0
        top-0
        mx-auto
        max-w-[860px]
        overflow-hidden
        rounded-[24px]
        border
        border-[#7132C8]/15
        bg-white/95
        shadow-[0_18px_55px_rgba(78,48,140,0.12)]
        will-change-transform
        dark:border-white/10
        dark:bg-[#120923]/95
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.34)]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#F0199A]/55
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-[12.5rem]
          flex-col
          justify-center
          gap-6
          p-6
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-8
        "
      >
        <div className="flex items-center gap-5">
          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              text-white
              shadow-[0_10px_28px_rgba(113,50,200,0.24)]
              ${BRAND_GRADIENT}
            `}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#817b91]
                dark:text-white/35
              "
            >
              Step {step.number}
            </span>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                tracking-[-0.04em]
                text-[#17152a]
                dark:text-white
                sm:text-3xl
              "
            >
              {step.title}
            </h3>
          </div>
        </div>

        <p
          className="
            max-w-[280px]
            text-sm
            font-medium
            leading-6
            text-[#6d6a80]
            dark:text-white/45
            sm:text-right
          "
        >
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

interface TakeUpAQuizSectionProps {
  onStart: () => void;
}

export default function TakeUpAQuizSection({
  onStart,
}: TakeUpAQuizSectionProps) {
  const reduceMotion = Boolean(
    useReducedMotion(),
  );

  const stageRef =
    useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  return (
    <section
      id="quiz"
      className="
        relative
        isolate
        bg-transparent
        px-5
        py-24
        sm:px-7
        sm:py-28
        lg:px-10
        lg:py-36
      "
    >
      {/* Decorative background lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[42%]
            h-[700px]
            w-[min(1050px,115vw)]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#7132C8]/10
            blur-[175px]
            dark:bg-[#7132C8]/[0.07]
          "
        />

        <div
          className="
            absolute
            -left-36
            top-[15%]
            h-80
            w-80
            rounded-full
            bg-[#F0199A]/10
            blur-[125px]
            dark:bg-[#F0199A]/[0.06]
          "
        />

        <div
          className="
            absolute
            -right-32
            bottom-[5%]
            h-80
            w-80
            rounded-full
            bg-blue-400/10
            blur-[125px]
            dark:bg-blue-500/[0.06]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1080px]
        "
      >
        {/*
          One continuous sticky scene.

          The title and cards remain inside this same
          container, so their distance cannot change.

          When this stage ends, the complete scene
          scrolls upward as one unit.
        */}
        <div
          ref={stageRef}
          className="
            relative
            h-[315vh]
            sm:h-[335vh]
          "
        >
          <div
            className="
              sticky
              top-[70px]
              flex
              h-[calc(100vh-70px)]
              w-full
              flex-col
              items-center
              justify-center
              sm:top-[76px]
              sm:h-[calc(100vh-76px)]
              lg:top-[82px]
              lg:h-[calc(100vh-82px)]
            "
          >
            <div className="w-full">
              {/* Heading */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.45,
                }}
                transition={{
                  duration:
                    reduceMotion ? 0 : 0.75,

                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mx-auto
                  max-w-3xl
                  text-center
                "
              >
                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#7132C8]/15
                    bg-white/65
                    px-5
                    py-2.5
                    shadow-[0_10px_35px_rgba(78,48,140,0.08)]
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-white/[0.035]
                    dark:shadow-none
                  "
                >
                  <Sparkles
                    className="
                      h-3.5
                      w-3.5
                      text-[#F0199A]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-[#746f88]
                      dark:text-white/45
                      sm:text-[11px]
                    "
                  >
                    Take up a quiz
                  </span>
                </div>

                <h2
                  className="
                    text-[34px]
                    font-black
                    leading-tight
                    tracking-[-0.05em]
                    text-[#17152a]
                    dark:text-white
                    sm:text-[43px]
                    md:text-[52px]
                  "
                >
                  A journey,{" "}

                  <span
                    className={
                      BRAND_GRADIENT_TEXT
                    }
                  >
                    not a form.
                  </span>
                </h2>

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-2xl
                    text-sm
                    leading-7
                    text-[#6d6a80]
                    dark:text-white/48
                    sm:text-base
                  "
                >
                  Two chapters. One clearer picture.
                </p>
              </motion.div>

              {/*
                Fixed title-to-card gap.

                Because both elements are inside the same
                sticky scene, this gap remains unchanged
                during stacking and during the final exit.
              */}
              <div
                className="
                  relative
                  mx-auto
                  mt-10
                  h-[13rem]
                  w-full
                  sm:mt-12
                "
              >
                {steps.map(
                  (step, index) => (
                    <QuizStackCard
                      key={step.number}
                      step={step}
                      index={index}
                      total={steps.length}
                      progress={scrollYProgress}
                      reduceMotion={reduceMotion}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA follows immediately after the scene */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration:
              reduceMotion ? 0 : 0.65,
          }}
          className="
            relative
            z-50
            mt-8
            text-center
            sm:mt-10
          "
        >
          <button
            type="button"
            onClick={onStart}
            className={`
              group
              inline-flex
              min-h-14
              items-center
              justify-center
              gap-3
              rounded-full
              px-8
              py-4
              text-sm
              font-bold
              text-white
              shadow-[0_16px_40px_rgba(240,25,154,0.24)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:shadow-[0_20px_50px_rgba(240,25,154,0.36)]
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-[#F0199A]/20
              ${BRAND_GRADIENT}
            `}
          >
            Start Quiz

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>

          <p
            className="
              mt-4
              text-xs
              text-[#918d9f]
              dark:text-white/28
            "
          >
            Complete both chapters for early access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
