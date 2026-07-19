import { motion } from "framer-motion";
import {
  ArrowUpRight,
  HeartHandshake,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import authenticNetworkingImage from "@/assets/newhub_carousel_assets/02_authentic_networking.png";
import dualPersonalitiesImage from "@/assets/newhub_carousel_assets/01_dual_personalities.png";
import meaningfulRelationshipsImage from "@/assets/newhub_carousel_assets/08_meaningful_relationships.png";

import ImageTrail, { type ImageTrailItem } from "./effects/ImageTrail";

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

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  label: string;
  featured?: boolean;
  initialX?: number;
  className?: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  image,
  label,
  featured = false,
  initialX = 0,
  className = "",
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: initialX,
        y: 35,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className={`
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[30px]
        border
        border-[#7132C8]/15
        bg-white/75
        shadow-[0_22px_70px_rgba(78,48,140,0.11)]
        backdrop-blur-xl
        transition-[border-color,background-color,box-shadow]
        duration-500
        hover:border-[#7132C8]/30
        hover:bg-white/95
        hover:shadow-[0_30px_90px_rgba(78,48,140,0.18)]
        dark:border-white/10
        dark:bg-white/[0.045]
        dark:shadow-[0_24px_80px_rgba(0,0,0,0.3)]
        dark:hover:border-white/20
        dark:hover:bg-white/[0.07]
        ${
          featured
            ? "min-h-[480px] lg:min-h-[540px]"
            : "min-h-[400px] lg:min-h-[460px]"
        }
        ${className}
      `}
    >
      <div
        className={`
          relative
          overflow-hidden
          ${featured ? "h-[300px] lg:h-[350px]" : "h-[235px] lg:h-[270px]"}
        `}
      >
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          whileHover={{
            scale: 1.045,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover"
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#16101f]/75
            via-transparent
            to-white/5
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-[#F0199A]/10
            via-transparent
            to-[#7132C8]/15
          "
        />

        <div
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-black/25
            px-3
            py-1.5
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/85
            backdrop-blur-xl
          "
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>

        {featured && (
          <div
            className="
              absolute
              right-5
              top-5
              flex
              items-center
              gap-1.5
              rounded-full
              bg-gradient-to-r
              from-[#F0199A]
              to-[#7132C8]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              shadow-[0_8px_24px_rgba(240,25,154,0.28)]
            "
          >
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        )}
      </div>

      <div
        className={`
          flex
          flex-1
          flex-col
          ${featured ? "p-7 sm:p-8" : "p-6"}
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className={`
                font-black
                tracking-[-0.035em]
                text-[#17152a]
                dark:text-white
                ${featured ? "text-2xl sm:text-3xl" : "text-xl"}
              `}
            >
              {title}
            </h3>

            <p
              className={`
                mt-3
                max-w-xl
                leading-7
                text-[#6d6a80]
                dark:text-white/50
                ${featured ? "text-sm sm:text-base" : "text-sm"}
              `}
            >
              {description}
            </p>
          </div>

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#7132C8]/15
              bg-[#f5f0ff]
              text-[#7132C8]
              transition-all
              duration-300
              group-hover:rotate-[-8deg]
              group-hover:border-[#7132C8]/30
              group-hover:bg-[#7132C8]
              group-hover:text-white
              dark:border-white/10
              dark:bg-white/[0.06]
              dark:text-white/60
              dark:group-hover:bg-white
              dark:group-hover:text-[#7132C8]
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div
            className="
              h-px
              w-full
              bg-gradient-to-r
              from-[#7132C8]/20
              via-[#F0199A]/15
              to-transparent
              dark:from-white/15
              dark:via-white/5
            "
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function BuiltForAllSection() {
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
        pb-24
        pt-24
        sm:px-7
        sm:pb-28
        sm:pt-28
        lg:px-10
        lg:pb-36
        lg:pt-32
      "
    >
      <ImageTrail items={imageTrailItems} threshold={80} />

      {/* Gradually reveal particles and section atmosphere */}
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
        {/* Light theme */}
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

        {/* Dark theme */}
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

      {/* Cinematic glow extending from hero */}
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
          left-[26%]
          top-[-5rem]
          z-[3]
          h-64
          w-[48%]
          rounded-[50%]
          bg-[#F0199A]/[0.07]
          blur-[110px]
          dark:bg-[#F0199A]/[0.06]
        "
      />

      {/* Existing section glows */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-10rem]
          top-[15%]
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
          top-[35%]
          z-[3]
          h-[34rem]
          w-[34rem]
          rounded-full
          bg-[#7132C8]/12
          blur-[145px]
          dark:bg-[#7132C8]/[0.08]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-14
            max-w-3xl
            text-center
            sm:mb-16
          "
        >
          <div className="mb-5 flex items-center justify-center gap-4">
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
              Built for all of you
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

          <h2
            className="
              text-3xl
              font-black
              leading-tight
              tracking-[-0.045em]
              text-[#17152a]
              dark:text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            One space for{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#F0199A]
                via-[#9E38DD]
                to-[#7132C8]
                bg-clip-text
                text-transparent
              "
            >
              every side
            </span>{" "}
            of you.
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
            Build your career, express your personality and create relationships
            that feel genuine—all without splitting yourself across different
            platforms.
          </p>
        </motion.div>

        <div
          className="
            grid
            gap-5
            sm:gap-6
            lg:grid-cols-12
            lg:items-stretch
          "
        >
          <FeatureCard
            icon={HeartHandshake}
            title="Meaningful Relationships"
            description="Create deeper relationships built around shared values, interests and real conversations."
            image={meaningfulRelationshipsImage}
            label="Relationships"
            initialX={-60}
            className="order-2 lg:order-1 lg:col-span-3"
          />

          <FeatureCard
            icon={Sparkles}
            title="Dual Personalities"
            description="Show your professional ambition and your personal identity together. NewHub gives both sides of you equal space without forcing you to choose."
            image={dualPersonalitiesImage}
            label="Your complete identity"
            featured
            initialX={0}
            className="order-1 lg:order-2 lg:col-span-6"
          />

          <FeatureCard
            icon={Network}
            title="Authentic Networking"
            description="Build genuine connections without transactional conversations or unnecessary professional pressure."
            image={authenticNetworkingImage}
            label="Connections"
            initialX={60}
            className="order-3 lg:col-span-3"
          />
        </div>

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
            duration: 0.65,
            delay: 0.25,
          }}
          className="
            mx-auto
            mt-10
            max-w-2xl
            text-center
            text-xs
            leading-6
            text-[#8c899d]
            dark:text-white/30
            sm:text-sm
          "
        >
          Personal, professional and social growth—designed to exist together.
        </motion.p>
      </div>
    </section>
  );
}
