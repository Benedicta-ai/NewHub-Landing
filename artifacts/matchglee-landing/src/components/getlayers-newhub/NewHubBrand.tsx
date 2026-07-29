interface NewHubBrandProps {
  className?: string;
}

const LOGO_SRC =
  "/images/matchglee-logo-new.png";

export default function NewHubBrand({
  className = "",
}: NewHubBrandProps) {
  return (
    <span
      className={[
        "nh-original-brand",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={LOGO_SRC}
        alt="NewHub logo"
        draggable={false}
      />

      <span>NewHub</span>
    </span>
  );
}
