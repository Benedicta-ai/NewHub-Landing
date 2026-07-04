import { useState } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import MainPage from "@/components/landing/MainPage";
import QuizPhase from "@/components/landing/QuizPhase";
import CinematicIntro from "@/components/landing/CinematicIntro";
import GetEarlyAccessPhase from "@/components/landing/GetEarlyAccessPhase";
import LoginScreen from "@/components/landing/LoginScreen";

type Phase = "splash" | "main" | "quiz" | "cinematic" | "getAccess";

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [showLogin, setShowLogin] = useState(false);

  if (phase === "splash") return <SplashScreen onFinish={() => setPhase("main")} />;

  return (
    <>
      {showLogin && <LoginScreen onClose={() => setShowLogin(false)} />}
      {phase === "main" && <MainPage onStartQuiz={() => setPhase("quiz")} onLogin={() => setShowLogin(true)} />}
      {phase === "quiz" && <QuizPhase onComplete={() => setPhase("cinematic")} />}
      {phase === "cinematic" && <CinematicIntro onComplete={() => setPhase("getAccess")} />}
      {phase === "getAccess" && <GetEarlyAccessPhase onDone={() => setPhase("main")} />}
    </>
  );
}
