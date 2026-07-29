import {
  motion,
  useReducedMotion,
} from "framer-motion";

import TiltedCard from "./effects/TiltedCard";

const privacyImage =
  "/tilted-cards/privacy-first.webp";

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
    imageAlt:
      "Keys representing personal privacy and control",
    delay: 0.05,
  },
  {
    title: "Meaningful Connection",
    image:
      meaningfulConnectionImage,
    imageAlt:
      "Hands connected through a shared thread",
    delay: 0.15,
  },
  {
    title:
      "Everything in One Place",
    image:
      everythingInOnePlaceImage,
    imageAlt:
      "People connected through one shared network",
    delay: 0.25,
  },
];

interface ReasonCardProps {
  reason: ReasonCardData;
}

function ReasonCard({
  reason,
}: ReasonCardProps) {
  const reduceMotion =
    Boolean(useReducedMotion());

  return (
    <motion.div
      initial={
        reduceMotion
          ? {
              opacity: 0,
            }
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
        duration:
          reduceMotion
            ? 0
            : 0.7,
        delay:
          reduceMotion
            ? 0
            : reason.delay,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="nh-built-around-card"
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
              <div className="nh-built-around-card__label">
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
      className="nh-built-around-cards"
    >
      <div className="nh-built-around-cards__inner">
        <div className="nh-built-around-cards__grid">
          {reasons.map(
            (reason) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
              />
            ),
          )}
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
            delay: 0.25,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="nh-built-around-cards__closing"
        >
          <p>
            Grow without compromise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
