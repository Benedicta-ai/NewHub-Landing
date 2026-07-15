import Logo from "./navbar/Logo";
import { BRAND_GRADIENT } from "@/lib/brand";
import { Instagram, Linkedin } from "lucide-react";

/*
  EDIT YOUR SOCIAL MEDIA LINKS HERE
*/
const SOCIAL_LINKS = {
  x: "https://x.com/YOUR_X_HANDLE",

  // Personal LinkedIn:
  linkedin: "https://www.linkedin.com/company/matchglee/",

  // Instagram:
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

export default function JoinFooter({ onJoin }: JoinFooterProps) {
  return (
    <>
      {/* Join section */}
      <section
        className="
          relative
          border-t
          border-white/5
          px-6
          py-16
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-6
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
            md:flex-row
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              text-center
              sm:flex-row
              sm:text-left
            "
          >
            <div className="flex -space-x-3">
              {avatarColors.map((color, index) => (
                <div
                  key={color}
                  aria-hidden="true"
                  className={`
                    h-9
                    w-9
                    rounded-full
                    border-2
                    border-[#0A0118]
                    bg-gradient-to-br
                    ${color}
                  `}
                  style={{
                    zIndex: avatarColors.length - index,
                  }}
                />
              ))}
            </div>

            <p className="max-w-xl text-sm leading-6 text-white/60">
              Join thousands of professionals and individuals building real
              connections.
            </p>
          </div>

          <button
            type="button"
            onClick={onJoin}
            className={`
              whitespace-nowrap
              rounded-full
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              ${BRAND_GRADIENT}
              shadow-[0_0_24px_rgba(240,25,154,0.3)]
              transition-transform
              hover:scale-105
            `}
          >
            Join NewHub
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="
          relative
          border-t
          border-white/5
          px-6
          py-14
        "
      >
        <div
          className="
            mx-auto
            mb-10
            grid
            max-w-7xl
            gap-10
            md:grid-cols-3
          "
        >
          {/* Brand */}
          <div>
            <Logo size="sm" />

            <p
              className="
                mt-4
                max-w-xs
                text-sm
                leading-6
                text-white/30
              "
            >
              Where Professional Meets Personal — Seamlessly.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="
                mb-4
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-white/40
              "
            >
              Quick Links
            </div>

            <div
              className="
                flex
                flex-col
                gap-2
                text-sm
                text-white/40
              "
            >
              <a
                href="#built-for-all"
                className="
                  w-fit
                  transition-colors
                  hover:text-white
                "
              >
                About
              </a>

              <a
                href="#quiz"
                className="
                  w-fit
                  transition-colors
                  hover:text-white
                "
              >
                Feedback
              </a>

              <a
                href="#privacy"
                className="
                  w-fit
                  transition-colors
                  hover:text-white
                "
              >
                Privacy
              </a>

              <a
                href="#terms"
                className="
                  w-fit
                  transition-colors
                  hover:text-white
                "
              >
                Terms
              </a>
            </div>
          </div>

          {/* Social links */}
          <div>
            <div
              className="
                mb-4
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-white/40
              "
            >
              Connect
            </div>

            <div className="flex gap-3">
              {/* X */}
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on X"
                title="X"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-sm
                  font-medium
                  text-white/50
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                𝕏
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on LinkedIn"
                title="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/50
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit NewHub on Instagram"
                title="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/50
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="
            mx-auto
            max-w-7xl
            border-t
            border-white/5
            pt-6
            text-center
            text-xs
            text-white/20
          "
        >
          © 2026 NewHub. All rights reserved.
        </div>
      </footer>
    </>
  );
}
