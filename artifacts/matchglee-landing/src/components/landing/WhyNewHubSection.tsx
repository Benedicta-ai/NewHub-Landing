import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { BRAND_GRADIENT_TEXT } from "@/lib/brand";
import TiltedCard from "./effects/TiltedCard";

const privacyImage = "/tilted-cards/privacy-first.webp";
const meaningfulConnectionImage =
  "/tilted-cards/meaningful-connections.webp";
const everythingInOnePlaceImage =
  "/tilted-cards/everything-in-one-place.webp";

interface ReasonCardData {
  title: string;
  image: string;
  imageAlt: string;
  delay: number;
}

const reasons: ReasonCardData[] = [
  {
    title: "Privacy First",
    image: privacyImage,
    imageAlt: "Keys representing personal privacy and control",
    delay: 0.05,
  },
  {
    title: "Meaningful Connection",
    image: meaningfulConnectionImage,
    imageAlt: "Hands connected through a shared thread",
    delay: 0.15,
  },
  {
    title: "Everything in One Place",
    image: everythingInOnePlaceImage,
    imageAlt: "A connected person bringing different parts of life together",
    delay: 0.25,
  },
];

interface ReasonCardProps {
  reason: ReasonCardData;
}

function ReasonCard({ reason }: ReasonCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 34,
              scale: 0.97,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: reason.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0"
    >
      <TiltedCard
        imageSrc={reason.image}
        altText={reason.imageAlt}
        containerHeight="clamp(350px, 32vw, 385px)"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        scaleOnHover={1.025}
        rotateAmplitude={8}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <div className="relative h-full w-full">
            <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
              <div className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold tracking-[-0.01em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:px-5 sm:py-2.5 sm:text-sm">
                {reason.title}
              </div>
            </div>
          </div>
        }
      />
    </motion.div>
  );
}

export default function WhyNewHubSection() {
  return (
    <section
      id="why-newhub"
      className="relative isolate overflow-hidden bg-transparent px-5 py-24 sm:px-7 sm:py-28 lg:px-10 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[53%] h-[650px] w-[min(1100px,115vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7132C8]/10 blur-[175px] dark:bg-[#7132C8]/[0.07]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-[20%] h-80 w-80 rounded-full bg-[#F0199A]/10 blur-[125px] dark:bg-[#F0199A]/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 bottom-[10%] h-80 w-80 rounded-full bg-blue-400/10 blur-[125px] dark:bg-blue-500/[0.06]"
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
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
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-11 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7132C8]/15 bg-white/65 px-5 py-2.5 shadow-[0_10px_35px_rgba(78,48,140,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
            <Sparkles className="h-3.5 w-3.5 text-[#F0199A]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#746f88] dark:text-white/45 sm:text-[11px]">
              Why NewHub?
            </span>
          </div>

          <h2 className="text-[34px] font-black leading-tight tracking-[-0.05em] text-[#17152a] dark:text-white sm:text-[43px] md:text-[52px]">
            Built around{" "}
            <span className={BRAND_GRADIENT_TEXT}>you.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d6a80] dark:text-white/48 sm:text-base">
            Private. Meaningful. Connected.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="mx-auto mt-12 max-w-3xl rounded-[24px] border border-[#7132C8]/15 bg-white/55 px-6 py-5 text-center shadow-[0_16px_50px_rgba(78,48,140,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none sm:px-8"
        >
          <p className="text-sm leading-7 text-[#6f6b81] dark:text-white/42">
            Grow without compromise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
