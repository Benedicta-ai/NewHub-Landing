export default function Noise() {
  return (
    <div
      className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none"
      style={{
        backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
