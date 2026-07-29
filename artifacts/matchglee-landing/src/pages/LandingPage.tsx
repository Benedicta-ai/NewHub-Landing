import {
  useState,
} from "react";

import NewHubLayersPage from "@/components/getlayers-newhub/NewHubLayersPage";
import SplashScreen from "@/components/landing/SplashScreen";

type Phase =
  | "splash"
  | "main";

export default function LandingPage() {
  const [phase, setPhase] =
    useState<Phase>(
      "splash",
    );

  if (phase === "splash") {
    return (
      <SplashScreen
        onFinish={() =>
          setPhase("main")
        }
      />
    );
  }

  return <NewHubLayersPage />;
}
