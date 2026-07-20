import { motion } from "framer-motion";
import heroCrowd from "@/assets/hero-crowd.png";
import AnimatedHeadline from "./AnimatedHeadline";
import ScrollHint from "./ScrollHint";

interface HeroSectionProps {
  onGetAccess: () => void;
}

export default function HeroSection({ onGetAccess }: HeroSectionProps) {
  return (
    <section
      id="about"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#05070C]
      "
    >
      <motion.img
        src={heroCrowd}
        alt=""
        aria-hidden="true"
        initial={{
          opacity: 0,
          scale: 1.06,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          object-[64%_center]
          sm:object-[68%_center]
          md:object-[70%_center]
          lg:object-[72%_center]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(90deg,#05070C_0%,rgba(5,7,12,0.98)_24%,rgba(5,7,12,0.88)_40%,rgba(5,7,12,0.50)_58%,rgba(5,7,12,0.10)_78%,transparent_100%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(5,7,12,0.10)_0%,rgba(5,7,12,0.22)_55%,rgba(5,7,12,0.82)_100%)]
          lg:hidden
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_72%_44%,transparent_14%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.62)_100%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[18%]
          h-[420px]
          w-[420px]
          rounded-full
          opacity-20
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(113,50,200,0.55) 0%, rgba(240,25,154,0.18) 42%, transparent 72%)",
        }}
      />

      <div
        className="
          relative
          z-20
          mx-auto
          grid
          min-h-[100svh]
          max-w-[1500px]
          grid-cols-1
          items-center
          px-6
          pb-28
          pt-32
          sm:px-8
          md:px-10
          lg:grid-cols-12
          lg:px-14
          xl:px-16
        "
      >
        <div
          className="
            max-w-[680px]
            lg:col-span-6
            xl:col-span-5
          "
        >
          <AnimatedHeadline onGetAccess={onGetAccess} />
        </div>

        <div
          className="
            hidden
            lg:col-span-6
            lg:block
            xl:col-span-7
          "
          aria-hidden="true"
        />
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-52
          bg-gradient-to-b
          from-transparent
          via-[#07040f]/50
          to-[#0A0118]
        "
      />

      <div className="relative z-30">
        <ScrollHint />
      </div>
    </section>
  );
}
