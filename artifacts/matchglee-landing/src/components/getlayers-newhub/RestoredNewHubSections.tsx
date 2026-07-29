import BuiltForAllSection from "@/components/landing/BuiltForAllSection";
import WhatIsNewHubSection from "@/components/landing/WhatIsNewHubSection";
import WhyNewHubSection from "@/components/landing/WhyNewHubSection";

import MolecularBackground from "./MolecularBackground";

export function RestoredDiscoverySections() {
  return (
    <div
      id="works"
      className="dark nh-restored-discovery"
    >
      <MolecularBackground
        variant="dark"
      />

      <div className="nh-restored-flow__content">
        <BuiltForAllSection />

        <WhatIsNewHubSection />
      </div>
    </div>
  );
}

export function RestoredWhySection() {
  return (
    <div className="nh-built-around-continuation">
      <MolecularBackground
        variant="light"
      />

      <div className="nh-built-around-continuation__content">
        <WhyNewHubSection />
      </div>
    </div>
  );
}
