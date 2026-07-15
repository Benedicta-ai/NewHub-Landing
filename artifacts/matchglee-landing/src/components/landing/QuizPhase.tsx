import { useState } from "react";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import Logo from "./navbar/Logo";
import { BRAND_GRADIENT, BRAND_GRADIENT_TEXT } from "@/lib/brand";

interface QuizPhaseProps {
  onComplete: () => void;
  onExit: () => void;
}

export default function QuizPhase({ onComplete, onExit }: QuizPhaseProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    focus: "",
    hurdle: "",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);

    window.setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 600);
  };

  const personalizedMessage = (() => {
    if (
      answers.focus === "Both, honestly" &&
      answers.hurdle === "I have to pick one version of myself"
    ) {
      return "That's exactly why NewHub exists. You shouldn't have to choose.";
    }

    if (answers.hurdle === "It feels too transactional") {
      return "We're over the transaction, too. Let's build real connections.";
    }

    if (answers.hurdle === "It's overwhelming and noisy") {
      return "Cut through the noise. Find your people, on your terms.";
    }

    return "Ready for a space that actually gets you?";
  })();

  const card =
    "bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 rounded-3xl relative group overflow-hidden cursor-pointer";

  const glow = `absolute inset-0 ${BRAND_GRADIENT} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`;

  const ProgressDots = () => (
    <div className="mb-10 flex items-center justify-center gap-2">
      {[0, 1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            dot === step
              ? `w-8 ${BRAND_GRADIENT}`
              : dot < step
                ? "w-2 bg-white/40"
                : "w-2 bg-white/10"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-hidden
        bg-[#0A0118]
        font-sans
        text-white
      "
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="
            absolute
            -left-20
            top-[-20%]
            h-[60rem]
            w-[60rem]
            rounded-full
            bg-purple-600/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -right-20
            bottom-[-20%]
            h-[60rem]
            w-[60rem]
            rounded-full
            bg-pink-600/[0.08]
            blur-[120px]
          "
        />
      </div>

      <div
        className={`
          fixed
          inset-0
          z-50
          ${BRAND_GRADIENT}
          transition-transform
          duration-700
          ease-in-out
          ${isTransitioning ? "translate-x-0" : "translate-x-full"}
        `}
      />

      <header
        className="
          relative
          z-[60]
          mx-auto
          flex
          w-full
          max-w-7xl
          items-center
          justify-between
          p-6
        "
      >
        <Logo />

        <button
          type="button"
          onClick={onExit}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/25
            px-4
            py-2.5
            text-sm
            font-medium
            text-white/70
            backdrop-blur-xl
            transition-all
            hover:border-white/25
            hover:bg-white/10
            hover:text-white
          "
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Exit Quiz</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </header>

      <main
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-4xl
          flex-1
          flex-col
          px-6
          pb-12
          pt-4
        "
      >
        {/* Step 1 */}
        <div
          className={`flex flex-1 flex-col justify-center transition-all duration-500 ${
            step === 0 && !isTransitioning
              ? "translate-y-0 opacity-100"
              : "pointer-events-none absolute translate-y-8 opacity-0"
          }`}
        >
          <ProgressDots />

          <p className="mb-4 text-center text-lg font-medium text-white/50">
            Before we talk about NewHub...
          </p>

          <h2
            className="
              mb-14
              text-center
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              md:text-5xl
            "
          >
            What describes you <span className={BRAND_GRADIENT_TEXT}>best</span>{" "}
            right now?
          </h2>

          <div
            className="
              mx-auto
              grid
              w-full
              max-w-3xl
              gap-4
              md:grid-cols-3
              md:gap-6
            "
          >
            {[
              {
                id: "Building my career",
                icon: "🎯",
                label: "Professional focus",
              },
              {
                id: "Exploring my passions",
                icon: "🌟",
                label: "Personal focus",
              },
              {
                id: "Both, honestly",
                icon: "⚡",
                label: "Dual focus",
              },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setAnswers((previous) => ({
                    ...previous,
                    focus: option.id,
                  }));

                  triggerTransition(() => setStep(1));
                }}
                className={`p-8 ${card} flex flex-col items-center gap-4 text-center`}
              >
                <div className={glow} />

                <span className="relative z-10 text-4xl">{option.icon}</span>

                <span className="relative z-10 text-xl font-bold">
                  {option.id}
                </span>

                <span className="relative z-10 text-sm font-medium text-white/50">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div
          className={`flex flex-1 flex-col justify-center transition-all duration-500 ${
            step === 1 && !isTransitioning
              ? "translate-y-0 opacity-100"
              : "pointer-events-none absolute translate-y-8 opacity-0"
          }`}
        >
          <ProgressDots />

          <h2
            className="
              mx-auto
              mb-12
              max-w-2xl
              text-center
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              md:text-5xl
            "
          >
            What's hardest about connecting online?
          </h2>

          <div className="mx-auto grid w-full max-w-xl gap-4">
            {[
              "It feels too transactional",
              "I have to pick one version of myself",
              "It's overwhelming and noisy",
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setAnswers((previous) => ({
                    ...previous,
                    hurdle: option,
                  }));

                  triggerTransition(() => setStep(2));
                }}
                className={`p-6 md:p-8 ${card} flex items-center justify-between`}
              >
                <div className={glow} />

                <span
                  className="
                    relative
                    z-10
                    text-left
                    text-xl
                    font-medium
                  "
                >
                  {option}
                </span>

                <ArrowRight
                  className="
                    relative
                    z-10
                    h-5
                    w-5
                    text-white/20
                    transition-all
                    group-hover:translate-x-1
                    group-hover:text-pink-400
                  "
                />
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div
          className={`flex flex-1 flex-col justify-center transition-all duration-500 ${
            step === 2 && !isTransitioning
              ? "translate-y-0 opacity-100"
              : "pointer-events-none absolute translate-y-8 opacity-0"
          }`}
        >
          <ProgressDots />

          <div className="mx-auto w-full max-w-3xl text-center">
            <h2
              className="
                mb-10
                text-center
                text-3xl
                font-bold
                leading-tight
                md:text-5xl
              "
            >
              {personalizedMessage}
            </h2>

            <div className="mb-14 flex flex-wrap justify-center gap-3">
              <span
                className="
                  rounded-full
                  border
                  border-[#F0199A]/30
                  bg-[#F0199A]/20
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-pink-300
                "
              >
                {answers.focus || "Dual Focus"}
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-purple-500/30
                  bg-purple-500/20
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-purple-300
                "
              >
                Values Authenticity
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-blue-500/30
                  bg-blue-500/20
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-blue-300
                "
              >
                Anti-Noise
              </span>
            </div>

            <button
              type="button"
              onClick={() => triggerTransition(() => setStep(3))}
              className="
                mx-auto
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-4
                text-lg
                font-bold
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(240,25,154,0.3)]
              "
            >
              See how it unfolds
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Step 4 */}
        <div
          className={`flex flex-1 flex-col justify-center transition-all duration-500 ${
            step === 3 && !isTransitioning
              ? "translate-y-0 opacity-100"
              : "pointer-events-none absolute translate-y-8 opacity-0"
          }`}
        >
          <ProgressDots />

          <div className="mx-auto w-full max-w-xl text-center">
            <div className="mb-8 animate-pulse text-7xl">✨</div>

            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              Your story <span className={BRAND_GRADIENT_TEXT}>begins</span>
            </h2>

            <p className="mb-12 text-xl leading-relaxed text-white/60">
              We've built a space tailored for someone exactly like you.
            </p>

            <button
              type="button"
              onClick={onComplete}
              className={`
                mx-auto
                flex
                items-center
                gap-3
                rounded-full
                px-10
                py-5
                text-xl
                font-bold
                text-white
                ${BRAND_GRADIENT}
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_40px_rgba(240,25,154,0.5)]
              `}
            >
              Continue
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
