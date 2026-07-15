import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Logo from "./navbar/Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

interface GetEarlyAccessPhaseProps {
  onDone: () => void;
}

type Status = "idle" | "loading" | "error" | "success";

export default function GetEarlyAccessPhase({
  onDone,
}: GetEarlyAccessPhaseProps) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    const value = input.trim();

    if (!value) {
      setStatus("error");
      setErrorMessage("Enter your Gmail address or phone number.");
      return;
    }

    const isGmail = /^[^\s@]+@gmail\.com$/i.test(value);

    const normalizedPhone = value.replace(/[\s()-]/g, "");

    const isPhone = /^\+?[0-9]{10,15}$/.test(normalizedPhone);

    if (!isGmail && !isPhone) {
      setStatus("error");
      setErrorMessage("Enter a valid Gmail address or phone number.");
      return;
    }

    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-[#0A0118]
        px-6
        font-sans
        text-white
      "
    >
      {/* Original subtle background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div
          className="
            absolute
            left-[10%]
            top-[-10%]
            h-[40rem]
            w-[40rem]
            rounded-full
            bg-[#F0199A]/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-10%]
            right-[10%]
            h-[40rem]
            w-[40rem]
            rounded-full
            bg-[#7132C8]/10
            blur-[120px]
          "
        />
      </div>

      {/* Original logo */}
      <div className="relative z-10 mb-10">
        <Logo size="lg" />
      </div>

      <div
        className="
          relative
          z-10
          w-full
          max-w-lg
          text-center
        "
      >
        {status === "success" ? (
          <div className="space-y-6">
            <CheckCircle2
              className="
                mx-auto
                h-16
                w-16
                text-green-400
              "
            />

            <h2
              className="
                text-3xl
                font-black
                md:text-4xl
              "
            >
              You&apos;re in! 🚀
            </h2>

            <p className="text-white/50">
              We&apos;ll let you know the moment NewHub opens up.
            </p>

            <button
              type="button"
              onClick={onDone}
              className={`
                rounded-full
                px-8
                py-4
                font-bold
                text-white
                ${BRAND_GRADIENT}
                transition-transform
                hover:scale-105
              `}
            >
              Back to NewHub
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-5xl">✨</div>

            <h2
              className="
                mb-3
                text-3xl
                font-black
                md:text-4xl
              "
            >
              Get Early <span className={BRAND_GRADIENT_TEXT}>Access</span>
            </h2>

            <p className="mb-10 text-white/45">
              You&apos;re all set. Be the first to experience NewHub.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Restored original pill UI */}
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  rounded-[28px]
                  border
                  border-white/15
                  bg-white/5
                  p-2
                  sm:flex-row
                  sm:rounded-full
                "
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);

                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  autoComplete="email"
                  placeholder="Gmail or phone number"
                  disabled={status === "loading"}
                  className={`
                    min-w-0
                    flex-1
                    rounded-full
                    border-none
                    bg-transparent
                    px-6
                    py-4
                    text-sm
                    outline-none
                    placeholder:text-white/25
                    ${status === "error" ? "text-red-300" : "text-white"}
                  `}
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`
                    flex
                    min-w-[150px]
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    rounded-full
                    px-7
                    py-4
                    text-sm
                    font-bold
                    text-white
                    ${BRAND_GRADIENT}
                    transition-transform
                    hover:scale-[1.03]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  `}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />
                      Joining...
                    </>
                  ) : (
                    <>
                      Get Access
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="
                    mt-3
                    text-sm
                    text-red-400
                  "
                >
                  {errorMessage}
                </p>
              )}
            </form>

            <button
              type="button"
              onClick={onDone}
              className="
                mt-8
                text-sm
                text-white/30
                transition-colors
                hover:text-white/60
              "
            >
              Skip for now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
