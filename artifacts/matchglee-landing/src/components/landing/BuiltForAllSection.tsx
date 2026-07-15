import { motion } from "framer-motion";
import Carousel from "./Carousel";

import dualPersonalitiesImage from "@/assets/newhub_carousel_assets/01_dual_personalities.png";
import authenticNetworkingImage from "@/assets/newhub_carousel_assets/02_authentic_networking.png";
import communitiesImage from "@/assets/newhub_carousel_assets/03_communities.png";
import professionalIdentityImage from "@/assets/newhub_carousel_assets/04_professional_identity.png";
import personalIdentityImage from "@/assets/newhub_carousel_assets/05_personal_identity.png";
import creatorEconomyImage from "@/assets/newhub_carousel_assets/06_creator_economy.png";
import careerGrowthImage from "@/assets/newhub_carousel_assets/07_career_growth.png";
import meaningfulRelationshipsImage from "@/assets/newhub_carousel_assets/08_meaningful_relationships.png";

const items = [
  {
    icon: "∞",
    title: "Dual Personalities",
    desc: "Be your professional best while staying true to yourself.",
    image: dualPersonalitiesImage,
  },
  {
    icon: "◎",
    title: "Authentic Networking",
    desc: "Build real connections without transactional small talk.",
    image: authenticNetworkingImage,
  },
  {
    icon: "✦",
    title: "Communities",
    desc: "Discover focused spaces where your people already are.",
    image: communitiesImage,
  },
  {
    icon: "↗",
    title: "Professional Identity",
    desc: "Present your career, skills and ambitions with greater context.",
    image: professionalIdentityImage,
  },
  {
    icon: "◇",
    title: "Personal Identity",
    desc: "Bring your passions, interests and personality into the frame.",
    image: personalIdentityImage,
  },
  {
    icon: "⌁",
    title: "Creator Economy",
    desc: "Turn creative projects and original ideas into opportunities.",
    image: creatorEconomyImage,
  },
  {
    icon: "↑",
    title: "Career Growth",
    desc: "Find mentorship, momentum and meaningful professional progress.",
    image: careerGrowthImage,
  },
  {
    icon: "∞",
    title: "Meaningful Relationships",
    desc: "Create deeper relationships built around shared values.",
    image: meaningfulRelationshipsImage,
  },
];

export default function BuiltForAllSection() {
  return (
    <section
      id="built-for-all"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#05040a]
        px-4
        pb-24
        pt-20
        sm:px-6
        sm:pb-28
        sm:pt-24
        lg:px-8
      "
    >
      {/* Transition from hero */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          bg-gradient-to-b
          from-[#05070C]
          to-transparent
        "
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[500px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-25
          blur-[150px]
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
            y: 16,
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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-4
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
              to-white/20
              sm:block
            "
          />

          <p
            className="
              text-center
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white/50
              sm:text-[11px]
            "
          >
            Built for all of you
          </p>

          <span
            className="
              hidden
              h-px
              w-14
              bg-gradient-to-l
              from-transparent
              to-white/20
              sm:block
            "
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
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
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Carousel items={items} ariaLabel="Built for all of you features" />
        </motion.div>
      </div>
    </section>
  );
}
