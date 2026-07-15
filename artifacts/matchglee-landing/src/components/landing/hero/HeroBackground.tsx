import MeshGradient from "./effects/MeshGradient";
import FloatingDust from "./effects/FloatingDust";
import MoleculeNetwork from "./effects/MoleculeNetwork";
import Noise from "./effects/Noise";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 bg-[#070112]" />

      {/* Animated Mesh */}
      <MeshGradient />

      {/* Floating Dust */}
      <FloatingDust />

      {/* AI Molecules */}
      <MoleculeNetwork />

      {/* Noise */}
      <Noise />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,.65) 100%)",
        }}
      />
    </div>
  );
}
