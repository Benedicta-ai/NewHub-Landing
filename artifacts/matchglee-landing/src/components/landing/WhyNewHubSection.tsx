import { motion } from "framer-motion";
import Carousel from "./Carousel";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";

import privacyImage from "@/assets/newhub_carousel_assets/12_secure_private.png";
import meaningfulConnectionsImage from "@/assets/newhub_carousel_assets/13_meaningful_connections.png";
import everythingInOnePlaceImage from "@/assets/newhub_carousel_assets/14_all_in_one_place.png";
import growthImage from "@/assets/newhub_carousel_assets/15_growth.png";
import identityImage from "@/assets/newhub_carousel_assets/16_privacy_alt.png";

const items = [
  {
    icon: "⌁",
    title: "Privacy",
    desc: "Control what you share, who can view it and how people connect with you.",
    image: privacyImage,
  },
  {
    icon: "∞",
    title: "Meaningful Connections",
    desc: "Build quality relationships that support personal and professional growth.",
    image: meaningfulConnectionsImage,
  },
  {
    icon: "◎",
    title: "Everything in One Place",
    desc: "Bring your personal, professional and community life into one seamless platform.",
    image: everythingInOnePlaceImage,
  },
  {
    icon: "↑",
    title: "Growth",
    desc: "Create momentum for your career, creativity and meaningful relationships.",
    image: growthImage,
  },
  {
    icon: "◇",
    title: "Identity",
    desc: "Express every side of who you are without losing context or authenticity.",
    image: identityImage,
  },
];

export default function WhyNewHubSection() {
  return (
    <section
      id="why-newhub"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#05040a]
        px-4
        py-24
        sm:px-6
        sm:py-28
        lg:px-8
      "
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[55%]
          h-[620px]
          w-[980px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-25
          blur-[155px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(113,50,200,0.18), rgba(240,25,154,0.04) 45%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-5 text-center"
        >
          <div
            className="
              mb-5
              inline-flex
              items-center
              rounded-full
              border
              border-white/10
              bg-white/[0.035]
              px-5
              py-2.5
              backdrop-blur-xl
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/50
                sm:text-[11px]
              "
            >
              Why NewHub?
            </span>
          </div>

          <h2
            className="
              text-[34px]
              font-black
              leading-tight
              tracking-[-0.04em]
              text-white
              sm:text-[42px]
              md:text-[50px]
            "
          >
            Designed for{" "}
            <span className={BRAND_GRADIENT_TEXT}>meaningful growth.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Carousel items={items} ariaLabel="Why choose NewHub" />
        </motion.div>
      </div>
    </section>
  );
}
