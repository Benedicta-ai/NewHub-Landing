import { motion } from "framer-motion";
import Carousel from "./Carousel";
import { BRAND_GRADIENT_TEXT } from "@/lib/brand";

import personalImage from "@/assets/newhub_carousel_assets/09_personal.png";
import professionalImage from "@/assets/newhub_carousel_assets/10_professional.png";
import communitiesImage from "@/assets/newhub_carousel_assets/11_communities_alt.png";

const items = [
  {
    icon: "◇",
    title: "Personal",
    desc: "Connect with people beyond work and express what matters to you.",
    image: personalImage,
  },
  {
    icon: "↗",
    title: "Professional",
    desc: "Grow your network, present your skills and discover opportunities.",
    image: professionalImage,
  },
  {
    icon: "✦",
    title: "Communities",
    desc: "Find your people, exchange ideas and share what you love.",
    image: communitiesImage,
  },
];

export default function WhatIsNewHubSection() {
  return (
    <section
      id="what-is-newhub"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#080313]
        px-4
        py-24
        sm:px-6
        sm:py-28
        lg:px-8
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[55%]
          h-[600px]
          w-[950px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-30
          blur-[150px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(113,50,200,0.18), rgba(240,25,154,0.05) 45%, transparent 72%)",
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
              What is NewHub?
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
            Three sides. <span className={BRAND_GRADIENT_TEXT}>One you.</span>
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
          <Carousel items={items} ariaLabel="What is NewHub" />
        </motion.div>
      </div>
    </section>
  );
}
