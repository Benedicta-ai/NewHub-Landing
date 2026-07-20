import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

import StaggeredMenu, {
  type StaggeredMenuItem,
} from "../effects/StaggeredMenu";
import Logo from "./Logo";

interface NavbarProps {
  onLogin?: () => void;
  onFeedback?: () => void;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        relative
        h-[30px]
        w-[52px]
        shrink-0
        rounded-full
        border
        border-[#7132C8]/15
        bg-[#ece8f8]/90
        shadow-inner
        transition-all
        duration-300
        hover:border-[#7132C8]/30
        dark:border-white/10
        dark:bg-white/[0.07]
      "
    >
      <motion.span
        animate={{
          x: isDark ? 22 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 430,
          damping: 30,
        }}
        className="
          absolute
          left-0
          top-[2px]
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#7132C8]
          shadow-[0_4px_14px_rgba(83,51,144,0.22)]
          dark:bg-gradient-to-br
          dark:from-[#F0199A]
          dark:to-[#7132C8]
          dark:text-white
        "
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </motion.span>
    </button>
  );
}

export default function Navbar({ onLogin, onFeedback }: NavbarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openFeedback = () => {
    if (onFeedback) {
      onFeedback();
      return;
    }

    scrollToSection("feedback");
  };

  const menuItems: StaggeredMenuItem[] = [
    {
      label: "About",
      ariaLabel: "Go to the About section",
      onSelect: () => scrollToSection("about"),
    },
    {
      label: "Feedback",
      ariaLabel: "Share feedback about NewHub",
      onSelect: openFeedback,
    },
    {
      label: "Sign / Login",
      ariaLabel: "Open the NewHub login form",
      onSelect: onLogin,
    },
  ];

  return (
    <motion.div
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
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        displayItemNumbering
        colors={["#F0199A", "#9E38DD", "#7132C8"]}
        accentColor="#F0199A"
        menuButtonColor={isDark ? "#ffffff" : "#17152a"}
        openMenuButtonColor="#ffffff"
        theme={theme}
        logoContent={<Logo />}
        headerActions={<ThemeToggle />}
        onLogoClick={() => scrollToSection("about")}
      />
    </motion.div>
  );
}
