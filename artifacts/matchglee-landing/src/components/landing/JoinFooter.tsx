import {
  Instagram,
  Linkedin,
} from "lucide-react";

import Logo from "./navbar/Logo";

const SOCIAL_LINKS = {
  x: "https://x.com/YOUR_X_HANDLE",

  linkedin:
    "https://www.linkedin.com/company/matchglee/",

  instagram:
    "https://www.instagram.com/matchglee?igsh=OWN5ZXF3YjE3eXAy",
};

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
  focus-visible:outline-none
  focus-visible:ring-4
  focus-visible:ring-[#7132C8]/20
  dark:border-white/10
  dark:bg-white/[0.04]
  dark:text-white/50
  dark:shadow-none
  dark:hover:border-white/20
  dark:hover:bg-white
  dark:hover:text-[#7132C8]
`;

export default function JoinFooter() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="
        relative
        overflow-hidden
        border-t
        border-[#7132C8]/10
        bg-white/30
        px-5
        pb-8
        pt-14
        backdrop-blur-xl
        dark:border-white/[0.06]
        dark:bg-black/10
        sm:px-7
        sm:pt-16
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
          w-[min(800px,110vw)]
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
            Where Professional Meets Personal
            — Seamlessly.
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
            One connected identity for your
            career, personality and communities.
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
            <a
              href="#built-for-all"
              className={linkClassName}
            >
              About
            </a>

            <a
              href="#quiz"
              className={linkClassName}
            >
              Feedback
            </a>

            <a
              href="#why-newhub"
              className={linkClassName}
            >
              Why NewHub
            </a>

            <a
              href="#privacy"
              className={linkClassName}
            >
              Privacy
            </a>

            <a
              href="#terms"
              className={linkClassName}
            >
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
            Follow NewHub
          </h3>

          <p
            className="
              mb-5
              max-w-xs
              text-sm
              leading-6
              text-[#777386]
              dark:text-white/35
            "
          >
            Follow the journey and stay updated
            as NewHub grows.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow NewHub on X"
              className={socialClassName}
            >
              <span
                aria-hidden="true"
                className="
                  text-sm
                  font-black
                "
              >
                X
              </span>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow NewHub on LinkedIn"
              className={socialClassName}
            >
              <Linkedin
                aria-hidden="true"
                className="h-4 w-4"
              />
            </a>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow NewHub on Instagram"
              className={socialClassName}
            >
              <Instagram
                aria-hidden="true"
                className="h-4 w-4"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[1280px]
          flex-col
          gap-4
          border-t
          border-[#7132C8]/10
          pt-7
          text-center
          dark:border-white/[0.06]
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:text-left
        "
      >
        <p
          className="
            text-xs
            text-[#9995a6]
            dark:text-white/25
          "
        >
          © {currentYear} NewHub. All rights
          reserved.
        </p>

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            sm:justify-end
          "
        >
          <a
            href="#privacy"
            className="
              text-xs
              text-[#8b8798]
              transition-colors
              hover:text-[#7132C8]
              dark:text-white/30
              dark:hover:text-white
            "
          >
            Privacy policy
          </a>

          <a
            href="#terms"
            className="
              text-xs
              text-[#8b8798]
              transition-colors
              hover:text-[#7132C8]
              dark:text-white/30
              dark:hover:text-white
            "
          >
            Terms of use
          </a>

          <a
            href="mailto:hello@newhub.com"
            className="
              text-xs
              text-[#8b8798]
              transition-colors
              hover:text-[#7132C8]
              dark:text-white/30
              dark:hover:text-white
            "
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
