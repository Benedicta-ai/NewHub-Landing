import ParticleBackground from "./ParticleBackground";
import Navbar from "./navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import BuiltForAllSection from "./BuiltForAllSection";
import WhatIsNewHubSection from "./WhatIsNewHubSection";
import TakeUpAQuizSection from "./TakeUpAQuizSection";
import WhyNewHubSection from "./WhyNewHubSection";
import RotatingIdentitySection from "./RotatingIdentitySection";
import JoinFooter from "./JoinFooter";

interface MainPageProps {
  onStartQuiz: () => void;
  onGetAccess: () => void;
  onLogin: () => void;
}

export default function MainPage({
  onStartQuiz,
  onGetAccess,
  onLogin,
}: MainPageProps) {
  return (
    <main
      className="
        theme-page
        theme-transition
        relative
        min-h-screen
        overflow-x-clip
      "
    >
      {/* Continuous ambient page lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-[18rem]
            top-[12%]
            h-[42rem]
            w-[42rem]
            rounded-full
            bg-[#F0199A]/10
            blur-[150px]
            transition-opacity
            duration-500
            dark:bg-[#F0199A]/[0.07]
          "
        />

        <div
          className="
            absolute
            -right-[18rem]
            top-[30%]
            h-[44rem]
            w-[44rem]
            rounded-full
            bg-[#7132C8]/12
            blur-[160px]
            transition-opacity
            duration-500
            dark:bg-[#7132C8]/[0.09]
          "
        />

        <div
          className="
            absolute
            bottom-[-20rem]
            left-[30%]
            h-[42rem]
            w-[42rem]
            rounded-full
            bg-blue-400/[0.08]
            blur-[170px]
            transition-opacity
            duration-500
            dark:bg-blue-500/[0.05]
          "
        />
      </div>

      {/* Continuous molecule/network background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          transition-opacity
          duration-500
        "
        style={{
          opacity:
            "var(--particle-opacity)",
        }}
      >
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Navbar
          onFeedback={
            onStartQuiz
          }
          onLogin={onLogin}
        />

        <HeroSection
          onGetAccess={
            onGetAccess
          }
        />

        {/* All remaining sections share one page atmosphere */}
        <div
          className="
            theme-transition
            relative
            -mt-px
          "
        >
          {/* Adaptive central glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[12%]
              z-0
              h-[800px]
              w-[min(1000px,110vw)]
              -translate-x-1/2
              rounded-full
              blur-[180px]
            "
            style={{
              background:
                "radial-gradient(circle, var(--glow-purple) 0%, var(--glow-pink) 44%, transparent 72%)",
            }}
          />

          <div className="relative z-10">
            <BuiltForAllSection />

            <WhatIsNewHubSection />

            <TakeUpAQuizSection
              onStart={
                onStartQuiz
              }
            />

            <WhyNewHubSection />

            <RotatingIdentitySection />

            <JoinFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
