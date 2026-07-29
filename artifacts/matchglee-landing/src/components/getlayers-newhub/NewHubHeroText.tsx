import {
  ArrowRight,
} from "./icons";

import "./NewHubHeroText.css";
import "./NewHubHeroCtaFix.css";

interface NewHubHeroTextProps {
  onGetAccess: () => void;
}

export default function NewHubHeroText({
  onGetAccess,
}: NewHubHeroTextProps) {
  return (
    <div className="nh-hero__left nh-hero-copy">
      <p className="nh-hero-copy__eyebrow">
        They blend in.
      </p>

      <h1 className="nh-hero-copy__title">
        <span>One stands</span>
        <span>out.</span>
      </h1>

      <p className="nh-hero-copy__supporting">
        <span>
          Personal. Professional.
        </span>

        <span>
          One profile.
        </span>
      </p>

      <button
        type="button"
        className="nh-hero-copy__button"
        onClick={onGetAccess}
      >
        <span>
          Get Early Access to the App
        </span>

        <ArrowRight />
      </button>
    </div>
  );
}
