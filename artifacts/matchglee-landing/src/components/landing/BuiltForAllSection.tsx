import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  HeartHandshake,
  Network,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import OrbitImages from "@/components/OrbitImages";
import ScrollFloat from "@/components/ScrollFloat";

import dualPersonalitiesImage from "@/assets/newhub_carousel_assets/01_dual_personalities.png";
import authenticNetworkingImage from "@/assets/newhub_carousel_assets/02_authentic_networking.png";
import communitiesImage from "@/assets/newhub_carousel_assets/03_communities.png";
import professionalIdentityImage from "@/assets/newhub_carousel_assets/04_professional_identity.png";
import personalIdentityImage from "@/assets/newhub_carousel_assets/05_personal_identity.png";
import meaningfulRelationshipsImage from "@/assets/newhub_carousel_assets/08_meaningful_relationships.png";


import ImageTrail, {
  type ImageTrailItem,
} from "./effects/ImageTrail";

const imageTrailItems: ImageTrailItem[] = [
  {
    src: "/image-trail/trail-01.webp",
    alt: "Working and creating",
    width: 736,
    height: 728,
  },
  {
    src: "/image-trail/trail-02.webp",
    alt: "Creators collaborating",
    width: 736,
    height: 920,
  },
  {
    src: "/image-trail/trail-03.webp",
    alt: "Personal expression",
    width: 736,
    height: 736,
  },
  {
    src: "/image-trail/trail-04.webp",
    alt: "Professional creativity",
    width: 720,
    height: 815,
  },
  {
    src: "/image-trail/trail-05.webp",
    alt: "Community and individuality",
    width: 564,
    height: 564,
  },
  {
    src: "/image-trail/trail-06.webp",
    alt: "People building together",
    width: 736,
    height: 736,
  },
  {
    src: "/image-trail/trail-07.webp",
    alt: "Original identity",
    width: 735,
    height: 796,
  },
  {
    src: "/image-trail/trail-08.webp",
    alt: "Healthy habits and personal growth",
    width: 482,
    height: 479,
  },
  {
    src: "/image-trail/trail-09.webp",
    alt: "Media and culture",
    width: 736,
    height: 736,
  },
];

interface OrbitFeature {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const orbitFeatures: OrbitFeature[] = [
  {
    title: "Meaningful Relationships",
    description:
      "Build genuine connections around shared interests, goals and experiences.",
    image: meaningfulRelationshipsImage,
    icon: HeartHandshake,
  },
  {
    title: "Dual Personality",
    description:
      "Bring your personal and professional identities together in one profile.",
    image: dualPersonalitiesImage,
    icon: Sparkles,
  },
  {
    title: "Authentic Networking",
    description:
      "Connect through transparent profiles and conversations that feel genuine.",
    image: authenticNetworkingImage,
    icon: Network,
  },
  {
    title: "Communities",
    description:
      "Discover spaces created around shared interests, ideas and experiences.",
    image: communitiesImage,
    icon: Network,
  },
  {
    title: "Professional Identity",
    description:
      "Showcase your skills, achievements, projects and professional journey.",
    image: professionalIdentityImage,
    icon: Sparkles,
  },
  {
    title: "Personal Identity",
    description:
      "Express your interests, personality, memories and everyday experiences.",
    image: personalIdentityImage,
    icon: HeartHandshake,
  },
];

export default function BuiltForAllSection() {
  const reduceMotion =
    Boolean(useReducedMotion());

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(null);

  const selectedFeature =
    selectedIndex === null
      ? null
      : orbitFeatures[selectedIndex];

  const SelectedIcon =
    selectedFeature?.icon ?? Sparkles;

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        selectedIndex !== null
      ) {
        setSelectedIndex(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedIndex]);

  const handleItemClick = (
    index: number,
  ) => {
    setSelectedIndex(
      selectedIndex === index
        ? null
        : index,
    );
  };

  return (
    <section
      id="built-for-all"
      className="
        relative
        isolate
        -mt-px
        overflow-hidden
        bg-transparent
        px-5
        pb-6
        pt-24
        sm:px-7
        sm:pb-6
        sm:pt-28
        lg:px-10
        lg:pb-8
        lg:pt-32
      "
    >
      {/* Restored image trail */}
      <ImageTrail
        items={imageTrailItems}
        threshold={80}
      />

      {/* Hero-to-section transition */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[2]
          h-[460px]
        "
      >
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
                #f8f6ff 0%,
                rgba(248,246,255,0.99) 13%,
                rgba(248,246,255,0.94) 27%,
                rgba(248,246,255,0.82) 43%,
                rgba(248,246,255,0.60) 59%,
                rgba(248,246,255,0.34) 75%,
                rgba(248,246,255,0.12) 89%,
                transparent 100%
              )
            `,
          }}
        />

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
                #0A0118 0%,
                rgba(10,1,24,0.99) 13%,
                rgba(10,1,24,0.94) 27%,
                rgba(10,1,24,0.82) 43%,
                rgba(10,1,24,0.60) 59%,
                rgba(10,1,24,0.34) 75%,
                rgba(10,1,24,0.12) 89%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Section atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-10rem]
          z-[3]
          h-[28rem]
          w-[94%]
          -translate-x-1/2
          rounded-[50%]
          bg-[#7132C8]/12
          blur-[130px]
          dark:bg-[#7132C8]/[0.10]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-10rem]
          top-[18%]
          z-[3]
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-[#F0199A]/10
          blur-[135px]
          dark:bg-[#F0199A]/[0.06]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-12rem]
          top-[34%]
          z-[3]
          h-[34rem]
          w-[34rem]
          rounded-full
          bg-[#7132C8]/12
          blur-[145px]
          dark:bg-[#7132C8]/[0.08]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
        "
      >
        {/* Section heading */}
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
            amount: 0.5,
          }}
          transition={{
            duration:
              reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-5
            max-w-3xl
            text-center
            sm:mb-6
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                hidden
                h-px
                w-14
                bg-gradient-to-r
                from-transparent
                to-[#7132C8]/30
                dark:to-white/20
                sm:block
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#7a718e]
                dark:text-white/45
                sm:text-[11px]
              "
            >
              Built for all
            </p>

            <span
              className="
                hidden
                h-px
                w-14
                bg-gradient-to-l
                from-transparent
                to-[#7132C8]/30
                dark:to-white/20
                sm:block
              "
            />
          </div>

          <ScrollFloat
            tag="h2"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            scrub
            respectReducedMotion
            containerClassName="
              text-3xl
              font-black
              leading-tight
              tracking-[-0.045em]
              text-[#17152a]
              dark:text-white
              sm:text-4xl
              lg:text-5xl
            "
            segments={[
              {
                text: "Every side of you. ",
              },
              {
                text: "One space.",
                className:
                  "bg-gradient-to-r from-[#F0199A] via-[#9E38DD] to-[#7132C8] bg-clip-text text-transparent",
              },
            ]}
          />

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
            Personal. Professional. Social.
          </p>
        </motion.div>

        {/* Free-floating orbit */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration:
              reduceMotion ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={(event) => {
            const target =
              event.target as HTMLElement;

            const orbitItem =
              target.closest(
                "[data-orbit-interactive]",
              );

            const descriptionCard =
              target.closest(
                "[data-orbit-card]",
              );

            if (
              selectedIndex !== null &&
              !orbitItem &&
              !descriptionCard
            ) {
              setSelectedIndex(null);
            }
          }}
          className="
            relative
            mx-auto
            max-w-[1050px]
            py-3
            sm:py-5
          "
        >
          {/* Subtle ambient glow, not a box */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[260px]
              w-[70%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[50%]
              bg-[#7132C8]/10
              blur-[100px]
              dark:bg-[#7132C8]/[0.10]
            "
          />

          <OrbitImages
            items={orbitFeatures.map(
              (feature) => ({
                src: feature.image,
                alt: feature.title,
              }),
            )}
            shape="ellipse"
            baseWidth={1200}
            baseHeight={500}
            aspectRatio="12 / 5"
            radiusX={455}
            radiusY={105}
            rotation={-8}
            duration={32}
            itemSize={98}
            responsive
            fill
            showPath
            pathColor="rgba(155, 92, 220, 0.28)"
            pathWidth={1.5}
            direction="normal"
            paused={
              reduceMotion ||
              selectedIndex !== null
            }
            interactive
            selectedIndex={selectedIndex}
            onItemClick={handleItemClick}
            centerContent={
              selectedFeature ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      selectedFeature.title
                    }
                    data-orbit-card="true"
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      y: -8,
                    }}
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.28,
                    }}
                    className="
                      relative
                      hidden
                      w-[330px]
                      rounded-[24px]
                      border
                      border-[#7132C8]/15
                      bg-white/90
                      p-7
                      text-center
                      shadow-[0_24px_75px_rgba(78,48,140,0.2)]
                      backdrop-blur-2xl
                      dark:border-white/10
                      dark:bg-[#120923]/92
                      dark:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                      sm:block
                    "
                  >
                    <button
                      type="button"
                      aria-label="Close description"
                      onClick={() => {
                        setSelectedIndex(null);
                      }}
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#7132C8]/10
                        bg-white/70
                        text-[#746f88]
                        transition-colors
                        hover:bg-[#7132C8]
                        hover:text-white
                        dark:border-white/10
                        dark:bg-white/[0.06]
                        dark:text-white/55
                      "
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div
                      className="
                        mx-auto
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#F0199A]
                        to-[#7132C8]
                        text-white
                        shadow-[0_10px_28px_rgba(113,50,200,0.28)]
                      "
                    >
                      <SelectedIcon className="h-5 w-5" />
                    </div>

                    <h3
                      className="
                        mt-5
                        text-xl
                        font-black
                        tracking-[-0.035em]
                        text-[#17152a]
                        dark:text-white
                      "
                    >
                      {selectedFeature.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-[#6d6a80]
                        dark:text-white/50
                      "
                    >
                      {
                        selectedFeature.description
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
              ) : null
            }
          />

          {/* Mobile description */}
          <AnimatePresence mode="wait">
            {selectedFeature && (
              <motion.div
                key={selectedFeature.title}
                data-orbit-card="true"
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration:
                    reduceMotion ? 0 : 0.3,
                }}
                className="
                  relative
                  mt-5
                  rounded-[22px]
                  border
                  border-[#7132C8]/15
                  bg-white/85
                  p-6
                  text-center
                  shadow-[0_18px_55px_rgba(78,48,140,0.15)]
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-white/[0.045]
                  sm:hidden
                "
              >
                <button
                  type="button"
                  aria-label="Close description"
                  onClick={() => {
                    setSelectedIndex(null);
                  }}
                  className="
                    absolute
                    right-4
                    top-4
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#7132C8]/10
                    bg-white/70
                    text-[#746f88]
                    dark:border-white/10
                    dark:bg-white/[0.06]
                    dark:text-white/55
                  "
                >
                  <X className="h-4 w-4" />
                </button>

                <h3
                  className="
                    pr-8
                    text-xl
                    font-black
                    tracking-[-0.035em]
                    text-[#17152a]
                    dark:text-white
                  "
                >
                  {selectedFeature.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[#6d6a80]
                    dark:text-white/50
                  "
                >
                  {
                    selectedFeature.description
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              reduceMotion ? 0 : 0.65,
            delay:
              reduceMotion ? 0 : 0.25,
          }}
          className="
            mx-auto
            mt-2
            max-w-2xl
            text-center
            text-xs
            leading-6
            text-[#8c899d]
            dark:text-white/30
            sm:text-sm
          "
        >
          Select an image to explore.
        </motion.p>
      </div>
    </section>
  );
}
