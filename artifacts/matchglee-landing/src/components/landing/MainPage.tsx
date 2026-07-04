import ParticleBackground from "./ParticleBackground";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import BuiltForAllSection from "./BuiltForAllSection";
import WhatIsNewHubSection from "./WhatIsNewHubSection";
import TakeUpAQuizSection from "./TakeUpAQuizSection";
import WhyNewHubSection from "./WhyNewHubSection";
import JoinFooter from "./JoinFooter";

export default function MainPage({ onStartQuiz, onLogin }: { onStartQuiz: () => void; onLogin: () => void }) {
  return (
    <div className="relative min-h-screen font-sans bg-[#0A0118] overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar onFeedback={onStartQuiz} onLogin={onLogin} />
        <HeroSection />
        <BuiltForAllSection />
        <WhatIsNewHubSection />
        <TakeUpAQuizSection onStart={onStartQuiz} />
        <WhyNewHubSection />
        <JoinFooter onJoin={onStartQuiz} />
      </div>
    </div>
  );
}
