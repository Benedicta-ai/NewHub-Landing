import ParticleBackground from "./ParticleBackground";
import Navbar from "./navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import BuiltForAllSection from "./BuiltForAllSection";
import WhatIsNewHubSection from "./WhatIsNewHubSection";
import TakeUpAQuizSection from "./TakeUpAQuizSection";
import WhyNewHubSection from "./WhyNewHubSection";
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
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#0A0118]
        text-white
      "
    >
      {/* Continuous molecule/network background */}
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar onFeedback={onStartQuiz} onLogin={onLogin} />

        <HeroSection onGetAccess={onGetAccess} />

        {/* One continuous transparent area after the hero */}
        <div className="relative bg-transparent">
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-0
              h-40
              bg-gradient-to-b
              from-[#05070C]
              via-[#0A0118]/70
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[20%]
              z-0
              h-[800px]
              w-[1000px]
              -translate-x-1/2
              rounded-full
              opacity-20
              blur-[180px]
            "
            style={{
              background:
                "radial-gradient(circle, rgba(113,50,200,0.18) 0%, rgba(240,25,154,0.06) 44%, transparent 72%)",
            }}
          />

          <div
            className="
              relative
              z-10
              [&>section]:!bg-transparent
              [&>footer]:!bg-transparent
            "
          >
            <BuiltForAllSection />

            <WhatIsNewHubSection />

            <TakeUpAQuizSection onStart={onStartQuiz} />

            <WhyNewHubSection />

            <JoinFooter onJoin={onGetAccess} />
          </div>
        </div>
      </div>
    </main>
  );
}
