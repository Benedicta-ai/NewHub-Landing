import { motion } from "framer-motion";
import Logo from "./Logo";

interface NavbarProps {
  onLogin?: () => void;
  onFeedback?: () => void;
}

export default function Navbar({ onLogin, onFeedback }: NavbarProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFeedback = () => {
    if (onFeedback) {
      onFeedback();
      return;
    }

    scrollToSection("feedback");
  };

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-x-0 top-0 z-50"
    >
      <div
        className="
          relative
          mx-auto
          flex
          h-[76px]
          w-full
          max-w-[1500px]
          items-center
          justify-between
          px-6
          sm:px-8
          lg:px-12
        "
      >
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          aria-label="Go to NewHub homepage"
          className="
            flex
            items-center
            border-0
            bg-transparent
            p-0
            transition-transform
            duration-300
            hover:scale-[1.03]
          "
        >
          <Logo />
        </button>

        <nav
          aria-label="Main navigation"
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            h-[42px]
            w-[320px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            rounded-full
            border
            border-white/[0.14]
            bg-black/30
            px-2
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
            sm:flex
          "
        >
          <button
            type="button"
            onClick={() => scrollToSection("built-for-all")}
            className="
              flex
              h-8
              flex-1
              items-center
              justify-center
              rounded-full
              text-[11px]
              font-medium
              text-white/75
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            About
          </button>

          <button
            type="button"
            onClick={handleFeedback}
            className="
              flex
              h-8
              flex-1
              items-center
              justify-center
              rounded-full
              text-[11px]
              font-medium
              text-white/75
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Feedback
          </button>

          <button
            type="button"
            onClick={onLogin}
            className="
              flex
              h-8
              flex-1
              items-center
              justify-center
              whitespace-nowrap
              rounded-full
              text-[11px]
              font-medium
              text-white/85
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Sign / Login
          </button>
        </nav>

        <button
          type="button"
          onClick={onLogin}
          className="
            rounded-full
            border
            border-white/[0.14]
            bg-black/30
            px-4
            py-2
            text-[11px]
            font-medium
            text-white/80
            backdrop-blur-xl
            sm:hidden
          "
        >
          Sign / Login
        </button>
      </div>
    </motion.header>
  );
}
