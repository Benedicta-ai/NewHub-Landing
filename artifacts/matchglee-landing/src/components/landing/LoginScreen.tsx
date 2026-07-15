import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./navbar/Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

type SocialProvider = "google" | "linkedin" | "apple";

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginScreenProps {
  onClose: () => void;
  onSubmit?: (credentials: LoginCredentials) => Promise<void> | void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
  onSocialLogin?: (provider: SocialProvider) => void;
}

interface FloatingObjectProps {
  className: string;
  delay?: number;
  rotate?: number;
}

function FloatingObject({
  className,
  delay = 0,
  rotate = 0,
}: FloatingObjectProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{
        opacity: 0,
        scale: 0.92,
        rotate,
      }}
      animate={
        reduceMotion
          ? {
              opacity: 0.32,
              scale: 1,
              rotate,
            }
          : {
              opacity: 0.32,
              scale: [1, 1.025, 1],
              y: [0, -7, 0],
              rotate: [rotate, rotate + 2, rotate],
            }
      }
      transition={{
        opacity: {
          duration: 0.8,
          delay,
        },
        scale: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        y: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`
        pointer-events-none
        absolute
        ${className}
      `}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: "48% 52% 58% 42% / 45% 40% 60% 55%",
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.14) 7%, rgba(217,70,239,0.32) 21%, rgba(126,34,206,0.54) 48%, rgba(28,4,52,0.74) 76%, rgba(4,1,12,0.92) 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "inset 10px 10px 24px rgba(255,255,255,0.09), inset -16px -18px 28px rgba(20,2,40,0.7), 0 0 24px rgba(192,38,211,0.09)",
        }}
      >
        <div
          className="
            absolute
            left-[18%]
            top-[13%]
            h-[12%]
            w-[25%]
            rotate-[-20deg]
            rounded-full
            bg-white/25
            blur-md
          "
        />
      </div>
    </motion.div>
  );
}

function CentralInfinity() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -4, 0],
              rotate: [-5, -2, -5],
            }
      }
      transition={{
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-[51%]
        z-30
        -translate-x-1/2
        -translate-y-1/2
        font-black
        leading-none
      "
      style={{
        fontSize: "clamp(6rem, 19cqw, 10rem)",
        filter:
          "drop-shadow(0 14px 18px rgba(0,0,0,0.52)) drop-shadow(0 0 14px rgba(168,85,247,0.28))",
      }}
    >
      <span
        className="
          bg-[linear-gradient(145deg,#ffffff_0%,#f0abfc_10%,#a855f7_30%,#6d28d9_54%,#2e1065_72%,#d946ef_90%,#ffffff_100%)]
          bg-clip-text
          text-transparent
        "
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.12)",
        }}
      >
        ∞
      </span>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.77-5.61-4.14H3.05v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.85A6 6 0 0 1 6.08 12c0-.64.11-1.27.31-1.85V7.53H3.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.47l3.34-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.01c1.47 0 2.78.5 3.82 1.49l2.86-2.86C16.97 3.04 14.7 2 12 2a10 10 0 0 0-8.95 5.53l3.34 2.62C7.18 7.78 9.39 6.01 12 6.01Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <span
      aria-hidden="true"
      className="
        flex
        h-7
        w-7
        items-center
        justify-center
        rounded-[4px]
        bg-[#0A66C2]
        text-[14px]
        font-black
        text-white
      "
    >
      in
    </span>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-white">
      <path d="M16.69 12.67c.02-2.02 1.65-2.99 1.73-3.04-.94-1.38-2.41-1.57-2.93-1.59-1.25-.13-2.44.74-3.07.74-.63 0-1.6-.72-2.63-.7-1.35.02-2.6.79-3.29 2-1.4 2.43-.36 6.03 1.01 8 .67.97 1.47 2.06 2.52 2.02 1.01-.04 1.4-.65 2.63-.65 1.23 0 1.58.65 2.65.63 1.1-.02 1.79-.99 2.45-1.96.77-1.12 1.09-2.2 1.11-2.26-.02-.01-2.16-.83-2.18-3.19ZM14.67 6.72c.55-.67.92-1.6.82-2.52-.79.03-1.75.53-2.32 1.19-.51.59-.96 1.53-.84 2.43.88.07 1.78-.45 2.34-1.1Z" />
    </svg>
  );
}

export default function LoginScreen({
  onClose,
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  onSocialLogin,
}: LoginScreenProps) {
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          email: cleanEmail,
          password,
          remember,
        });
      } else {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 850);
        });

        setMessage("Login authentication will be connected next.");
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setError("");

    if (onForgotPassword) {
      onForgotPassword();
      return;
    }

    setMessage("Password recovery will be connected next.");
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setError("");

    if (onSocialLogin) {
      onSocialLogin(provider);
      return;
    }

    setMessage(
      `${provider[0].toUpperCase()}${provider.slice(
        1,
      )} login will be connected next.`,
    );
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to NewHub"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-[150]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-black/75
        p-3
        backdrop-blur-md
        sm:p-5
      "
    >
      <motion.section
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.95,
                y: 22,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseDown={(event) => event.stopPropagation()}
        className="
          relative
          isolate
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          text-white
          shadow-[0_45px_140px_rgba(0,0,0,0.78)]
        "
        style={{
          width: "min(96vw, calc(94vh * 0.8333), 760px)",
          aspectRatio: "5 / 6",
          maxHeight: "94vh",
          containerType: "inline-size",
          background:
            "radial-gradient(circle at 50% 20%, rgba(88,28,135,0.27), transparent 36%), radial-gradient(circle at 50% 72%, rgba(240,25,154,0.07), transparent 44%), linear-gradient(180deg, #080313 0%, #040109 55%, #010105 100%)",
        }}
      >
        {/* Subtle texture */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.022]
          "
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Restrained floating objects */}
        <FloatingObject
          className="
            -left-[10cqw]
            top-[36%]
            z-0
            h-[19cqw]
            w-[19cqw]
          "
          rotate={15}
        />

        <FloatingObject
          className="
            -right-[9cqw]
            top-[13%]
            z-0
            h-[18cqw]
            w-[18cqw]
          "
          delay={0.8}
          rotate={-15}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close login"
          className="
            absolute
            right-4
            top-4
            z-50
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/30
            text-white/50
            backdrop-blur-xl
            transition-all
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="
            login-scrollbar
            relative
            z-10
            flex
            h-full
            flex-col
            items-center
            overflow-y-auto
            overscroll-contain
          "
          style={{
            padding: "clamp(18px, 3.4cqw, 30px) clamp(24px, 7cqw, 56px)",
          }}
        >
          {/* Original NewHub logo */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <Logo size="lg" />
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                    filter: "blur(8px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mt-[4cqw]
              w-full
              shrink-0
              text-center
            "
          >
            <p
              className="
                mb-[1.5cqw]
                font-semibold
                tracking-[-0.035em]
                text-white/80
              "
              style={{
                fontSize: "clamp(1rem, 3.7cqw, 1.55rem)",
              }}
            >
              Welcome Back
            </p>

            <div className="relative mx-auto w-full">
              <h1
                className="
                  relative
                  z-10
                  whitespace-nowrap
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.075em]
                  text-white
                "
                style={{
                  fontSize: "clamp(3.5rem, 16cqw, 7.2rem)",
                  fontFamily:
                    "'Arial Narrow', 'Roboto Condensed', 'Helvetica Neue', sans-serif",
                  transform: "scaleX(0.86)",
                }}
              >
                Connect
              </h1>

              <CentralInfinity />

              <h2
                className={`
                  relative
                  z-20
                  mt-[4cqw]
                  whitespace-nowrap
                  font-black
                  uppercase
                  leading-[0.82]
                  tracking-[-0.072em]
                  ${BRAND_GRADIENT_TEXT}
                `}
                style={{
                  fontSize: "clamp(2.25rem, 10.2cqw, 4.6rem)",
                  fontFamily:
                    "'Arial Narrow', 'Roboto Condensed', 'Helvetica Neue', sans-serif",
                  transform: "scaleX(0.91)",
                }}
              >
                Meaningfully
              </h2>
            </div>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.24,
            }}
            className="
              mt-[4cqw]
              shrink-0
              text-center
              leading-[1.35]
              text-white/65
            "
            style={{
              maxWidth: "70%",
              fontSize: "clamp(0.72rem, 2.5cqw, 0.95rem)",
            }}
          >
            Sign in to continue building
            <br />
            real connections on{" "}
            <span
              className={`
                font-semibold
                ${BRAND_GRADIENT_TEXT}
              `}
            >
              NewHub.
            </span>
          </motion.p>

          {/* Login form */}
          <motion.form
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.32,
            }}
            onSubmit={handleSubmit}
            noValidate
            className="
              mt-[4cqw]
              w-[82%]
              max-w-[500px]
              shrink-0
            "
          >
            <div className="space-y-[1.7cqw]">
              <div className="relative">
                <Mail
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-white/70
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setMessage("");
                  }}
                  autoComplete="email"
                  placeholder="Email address"
                  disabled={isSubmitting}
                  className="
                    w-full
                    rounded-[14px]
                    border
                    border-white/10
                    bg-white/[0.045]
                    pl-11
                    pr-4
                    text-white
                    outline-none
                    backdrop-blur-xl
                    transition-all
                    placeholder:text-white/40
                    focus:border-fuchsia-400/55
                    focus:bg-white/[0.065]
                    disabled:opacity-60
                  "
                  style={{
                    height: "clamp(47px, 8cqw, 58px)",
                    fontSize: "clamp(0.75rem, 2.35cqw, 0.93rem)",
                  }}
                />
              </div>

              <div className="relative">
                <LockKeyhole
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-white/70
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                    setMessage("");
                  }}
                  autoComplete="current-password"
                  placeholder="Password"
                  disabled={isSubmitting}
                  className="
                    w-full
                    rounded-[14px]
                    border
                    border-white/10
                    bg-white/[0.045]
                    pl-11
                    pr-12
                    text-white
                    outline-none
                    backdrop-blur-xl
                    transition-all
                    placeholder:text-white/40
                    focus:border-fuchsia-400/55
                    focus:bg-white/[0.065]
                    disabled:opacity-60
                  "
                  style={{
                    height: "clamp(47px, 8cqw, 58px)",
                    fontSize: "clamp(0.75rem, 2.35cqw, 0.93rem)",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-white/60
                    transition-colors
                    hover:text-white
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div
              className="
                mt-[2cqw]
                flex
                items-center
                justify-between
                gap-3
                text-white/55
              "
              style={{
                fontSize: "clamp(0.63rem, 2cqw, 0.8rem)",
              }}
            >
              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                "
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`
                    flex
                    h-[18px]
                    w-[18px]
                    items-center
                    justify-center
                    rounded-[4px]
                    border
                    transition-all
                    ${
                      remember
                        ? "border-fuchsia-400 bg-gradient-to-br from-[#F0199A] to-[#7132C8]"
                        : "border-white/20 bg-white/[0.03]"
                    }
                  `}
                >
                  {remember && <Check className="h-3 w-3 text-white" />}
                </span>
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="
                  font-medium
                  text-fuchsia-400
                  transition-colors
                  hover:text-fuchsia-300
                "
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="
                  mt-3
                  text-center
                  text-xs
                  text-red-400
                "
              >
                {error}
              </p>
            )}

            {message && (
              <p
                className="
                  mt-3
                  text-center
                  text-xs
                  text-white/45
                "
              >
                {message}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={
                isSubmitting
                  ? undefined
                  : {
                      scale: 1.012,
                      y: -2,
                    }
              }
              whileTap={
                isSubmitting
                  ? undefined
                  : {
                      scale: 0.985,
                    }
              }
              className={`
                group
                mt-[2.7cqw]
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-[14px]
                font-bold
                text-white
                ${BRAND_GRADIENT}
                shadow-[0_16px_40px_rgba(240,25,154,0.22)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              `}
              style={{
                height: "clamp(49px, 8cqw, 58px)",
                fontSize: "clamp(0.78rem, 2.35cqw, 0.96rem)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div
              className="
                my-[3cqw]
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px flex-1 bg-white/12" />

              <span
                className="
                  whitespace-nowrap
                  text-white/42
                "
                style={{
                  fontSize: "clamp(0.62rem, 1.9cqw, 0.78rem)",
                }}
              >
                or continue with
              </span>

              <span className="h-px flex-1 bg-white/12" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-3 gap-[1.7cqw]">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                aria-label="Continue with Google"
                className="
                  flex
                  items-center
                  justify-center
                  rounded-[13px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  transition-all
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/[0.075]
                "
                style={{
                  height: "clamp(46px, 7cqw, 55px)",
                }}
              >
                <GoogleIcon />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("linkedin")}
                aria-label="Continue with LinkedIn"
                className="
                  flex
                  items-center
                  justify-center
                  rounded-[13px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  transition-all
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/[0.075]
                "
                style={{
                  height: "clamp(46px, 7cqw, 55px)",
                }}
              >
                <LinkedInIcon />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                aria-label="Continue with Apple"
                className="
                  flex
                  items-center
                  justify-center
                  rounded-[13px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  transition-all
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/[0.075]
                "
                style={{
                  height: "clamp(46px, 7cqw, 55px)",
                }}
              >
                <AppleIcon />
              </button>
            </div>

            <p
              className="
                mt-[3cqw]
                text-center
                text-white/42
              "
              style={{
                fontSize: "clamp(0.64rem, 1.95cqw, 0.82rem)",
              }}
            >
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onCreateAccount}
                className={`
                  ml-1
                  inline-flex
                  items-center
                  gap-1
                  font-semibold
                  ${BRAND_GRADIENT_TEXT}
                `}
              >
                Create NewHub account
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </p>
          </motion.form>
        </div>

        <style>{`
          .login-scrollbar {
            scrollbar-width: none;
          }

          .login-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.section>
    </motion.div>
  );
}
