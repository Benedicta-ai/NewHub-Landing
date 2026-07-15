import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTAButtonProps {
  onClick: () => void;
}

export default function CTAButton({ onClick }: CTAButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        y: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-full
        px-7
        py-4
        sm:px-8
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#F0199A]
          via-[#C13CFF]
          to-[#7B4DFF]
        "
      />

      <motion.div
        className="
          absolute
          left-[-120%]
          top-0
          h-full
          w-1/2
          skew-x-[-20deg]
          bg-white/20
        "
        whileHover={{
          left: "140%",
        }}
        transition={{
          duration: 0.8,
        }}
      />

      <div
        className="
          relative
          flex
          items-center
          gap-3
          text-sm
          font-semibold
          tracking-wide
          text-white
          sm:text-base
        "
      >
        <span>Get Early Access to the App</span>

        <ArrowRight
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </motion.button>
  );
}
