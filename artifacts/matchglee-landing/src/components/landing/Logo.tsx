import { BRAND_GRADIENT_TEXT, LOGO_SRC } from "@/lib/brand";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const imgSize = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-11 h-11" : "w-8 h-8";
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-center gap-2">
      <img src={LOGO_SRC} alt="NewHub logo" className={`${imgSize} object-contain`} />
      <span className={`${textSize} font-black tracking-tight ${BRAND_GRADIENT_TEXT}`}>
        NewHub
      </span>
    </div>
  );
}
