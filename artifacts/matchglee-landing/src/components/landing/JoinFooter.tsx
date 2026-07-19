import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Sparkles } from "lucide-react";
import Logo from "./navbar/Logo";
import { BRAND_GRADIENT } from "@/lib/brand";

/*
  EDIT YOUR SOCIAL MEDIA LINKS HERE
*/
const SOCIAL_LINKS = {
  x: "https://x.com/YOUR_X_HANDLE",

  linkedin: "https://www.linkedin.com/company/matchglee/",

  instagram: "https://www.instagram.com/matchglee?igsh=OWN5ZXF3YjE3eXAy",
};

const avatarColors = [
  "from-[#F0199A] to-[#7132C8]",
  "from-blue-400 to-[#7132C8]",
  "from-emerald-400 to-blue-400",
  "from-orange-400 to-[#F0199A]",
  "from-indigo-400 to-[#7132C8]",
];

interface JoinFooterProps {
  onJoin: () => void;
}

const linkClassName = `
  w-fit
  text-sm
  text-[#777386]
  transition-all
  duration-300
  hover:translate-x-1
  hover:text-[#7132C8]
  dark:text-white/40
  dark:hover:text-white
`;

const socialClassName = `
  flex
  h-10
  w-10
  items-center
  justify-center
  rounded-full
  border
  border-[#7132C8]/15
  bg-white/65
  text-[#6e6980]
  shadow-[0_8px_25px_rgba(78,48,140,0.07)]
  backdrop-blur-xl
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-[#7132C8]/30
  hover:bg-[#7132C8]
  hover:text-white
  hover:shadow-[0_12px_30px_rgba(113,50,200,0.2)]
  dark:border-white/10
  dark:bg-white/[0.04]
  dark:text-white/50
  dark:shadow-none
  dark:hover:border-white/20
  dark:hover:bg-white
  dark:hover:text-[#7132C8]
`;

export default function JoinFooter({ onJoin }: JoinFooterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Early-access invitation */}
      <section
        className="
          relative
          isolate
          overflow-hidden
          border-t
          border-[#7132C8]/10
          bg-transparent
          px-5
          py-20
          dark:border-white/[0.06]
          sm:px-7
          lg:px-10
          lg:py-24
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[420px]
            w-[min(900px,110vw)]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#7132C8]/12
            blur-[145px]
            dark:bg-[#7132C8]/[0.08]
          "
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            max-w-[1180px]
            overflow-hidden
            rounded-[34px]
            border
            border-[#7132C8]/15
            bg-white/70
            px-6
            py-10
            shadow-[0_28px_90px_rgba(78,48,140,0.13)]
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-white/[0.045]
            dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]
            sm:px-9
            sm:py-12
            lg:px-12
          "
        >
          {/* Decorative lighting */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#F0199A]/15
              blur-[90px]
              dark:bg-[#F0199A]/10
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-28
              right-[-3rem]
              h-72
              w-72
              rounded-full
              bg-blue-400/15
              blur-[100px]
              dark:bg-blue-500/[0.08]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
              justify-between
              gap-9
              text-center
              lg:flex-row
              lg:text-left
            "
          >
            <div
              className="
                flex
                max-w-3xl
                flex-col
                items-center
                gap-6
                lg:flex-row
                lg:items-start
              "
            >
              {/* Community avatars */}
              <div className="flex shrink-0 -space-x-3">
                {avatarColors.map((color, index) => (
                  <motion.div
                    key={color}
                    aria-hidden="true"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: [0, index % 2 === 0 ? -4 : 4, 0],
                          }
                    }
                    transition={{
                      duration: 4.5 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    }}
                    className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border-[3px]
                        border-[#fbfaff]
                        bg-gradient-to-br
                        shadow-[0_6px_18px_rgba(78,48,140,0.16)]
                        dark:border-[#0A0118]
                        ${color}
                      `}
                    style={{
                      zIndex: avatarColors.length - index,
                    }}
                  >
                    <span
                      className="
                          h-2
                          w-2
                          rounded-full
                          bg-white/75
                          shadow-[0_0_10px_rgba(255,255,255,0.8)]
                        "
                    />
                  </motion.div>
                ))}
              </div>

              <div>
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#7132C8]/15
                    bg-white/60
                    px-4
                    py-2
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#F0199A]" />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#746f88]
                      dark:text-white/45
                    "
                  >
                    Join the beginning
                  </span>
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
                  "
                >
                  Be one of the first to experience{" "}
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
                    NewHub.
                  </span>
                </h2>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-7
                    text-[#6d6a80]
                    dark:text-white/48
                    sm:text-base
                  "
                >
                  Join people who want stronger professional opportunities,
                  authentic personal expression and meaningful connections in
                  one place.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onJoin}
              className={`
                group
                inline-flex
                min-h-14
                shrink-0
                items-center
                justify-center
                gap-3
                whitespace-nowrap
                rounded-full
                px-8
                py-4
                text-sm
                font-bold
                text-white
                shadow-[0_16px_40px_rgba(240,25,154,0.25)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                hover:shadow-[0_22px_55px_rgba(240,25,154,0.38)]
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#F0199A]/20
                ${BRAND_GRADIENT}
              `}
            >
              Join NewHub
              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main footer */}
      <footer
        className="
          relative
          overflow-hidden
          border-t
          border-[#7132C8]/10
          bg-white/30
          px-5
          pb-8
          pt-16
          backdrop-blur-xl
          dark:border-white/[0.06]
          dark:bg-black/10
          sm:px-7
          lg:px-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[-12rem]
            left-1/2
            h-80
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-[#7132C8]/10
            blur-[140px]
            dark:bg-[#7132C8]/[0.07]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            mb-12
            grid
            max-w-[1280px]
            gap-12
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_0.8fr_0.8fr]
          "
        >
          {/* Brand */}
          <div>
            <Logo size="sm" />

            <p
              className="
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-[#777386]
                dark:text-white/35
              "
            >
              Where Professional Meets Personal — Seamlessly.
            </p>

            <p
              className="
                mt-3
                max-w-sm
                text-xs
                leading-6
                text-[#9995a6]
                dark:text-white/22
              "
            >
              One connected identity for your career, personality and
              communities.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="
                mb-5
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#4e4a60]
                dark:text-white/50
              "
            >
              Quick links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="
                flex
                flex-col
                gap-3
              "
            >
              <a href="#built-for-all" className={linkClassName}>
                About
              </a>

              <a href="#quiz" className={linkClassName}>
                Feedback
              </a>

              <a href="#why-newhub" className={linkClassName}>
                Why NewHub
              </a>

              <a href="#privacy" className={linkClassName}>
                Privacy
              </a>

              <a href="#terms" className={linkClassName}>
                Terms
              </a>
            </nav>
          </div>

          {/* Social links */}
          <div>
            <h3
              className="
                mb-5
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#4e4a60]
                dark:text-white/50
              "
            >
              Connect
            </h3>

            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on X"
                title="X"
                className={socialClassName}
              >
                <span
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  𝕏
                </span>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on LinkedIn"
                title="LinkedIn"
                className={socialClassName}
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on Instagram"
                title="Instagram"
                className={socialClassName}
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            <p
              className="
                mt-5
                max-w-xs
                text-xs
                leading-6
                text-[#9894a5]
                dark:text-white/25
              "
            >
              Follow the NewHub journey and upcoming early-access announcements.
            </p>
          </div>
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            max-w-[1280px]
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-[#7132C8]/10
            pt-7
            text-center
            text-xs
            text-[#9995a6]
            dark:border-white/[0.06]
            dark:text-white/20
            sm:flex-row
            sm:text-left
          "
        >
          <p>© 2026 NewHub. All rights reserved.</p>

          <p>Built for meaningful human connection.</p>
        </div>
      </footer>
    </>
  );
}
