import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

import "./StaggeredMenu.css";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link?: string;
  onSelect?: () => void;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items: StaggeredMenuItem[];
  displayItemNumbering?: boolean;
  logoContent: ReactNode;
  headerActions?: ReactNode;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  theme?: "light" | "dark";
  onLogoClick?: () => void;
}

export default function StaggeredMenu({
  position = "right",
  colors = ["#F0199A", "#9E38DD", "#7132C8"],
  items,
  displayItemNumbering = true,
  logoContent,
  headerActions,
  menuButtonColor = "#ffffff",
  openMenuButtonColor = "#ffffff",
  accentColor = "#F0199A",
  theme = "dark",
  onLogoClick,
}: StaggeredMenuProps) {
  const panelId = useId().replace(/:/g, "");

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(false);

  const offscreen = position === "left" ? -100 : 100;

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const panel = panelRef.current;

      const layers = layersRef.current
        ? Array.from(
            layersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"),
          )
        : [];

      if (!panel) {
        return;
      }

      gsap.set([panel, ...layers], {
        xPercent: offscreen,
        opacity: 1,
      });

      if (toggleRef.current) {
        gsap.set(toggleRef.current, {
          color: menuButtonColor,
        });
      }
    }, wrapperRef);

    return () => {
      context.revert();
    };
  }, [menuButtonColor, offscreen]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) {
      return;
    }

    openRef.current = false;
    setOpen(false);

    timelineRef.current?.kill();

    const panel = panelRef.current;

    const layers = layersRef.current
      ? Array.from(
          layersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"),
        )
      : [];

    if (panel) {
      closeTweenRef.current?.kill();

      closeTweenRef.current = gsap.to([...layers, panel], {
        xPercent: offscreen,
        duration: 0.34,
        ease: "power3.in",
        overwrite: "auto",
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.35,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        color: menuButtonColor,
        duration: 0.25,
        overwrite: "auto",
      });
    }
  }, [menuButtonColor, offscreen]);

  const openMenu = useCallback(() => {
    if (openRef.current) {
      return;
    }

    openRef.current = true;
    setOpen(true);

    const panel = panelRef.current;

    const layers = layersRef.current
      ? Array.from(
          layersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"),
        )
      : [];

    if (!panel) {
      return;
    }

    timelineRef.current?.kill();
    closeTweenRef.current?.kill();

    const labels = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
    );

    const numberedItems = Array.from(
      panel.querySelectorAll<HTMLElement>(
        ".sm-panel-list[data-numbering] .sm-panel-item",
      ),
    );

    gsap.set(labels, {
      yPercent: 140,
      rotate: 8,
    });

    gsap.set(numberedItems, {
      "--sm-num-opacity": 0,
    });

    const timeline = gsap.timeline();

    layers.forEach((layer, index) => {
      timeline.fromTo(
        layer,
        {
          xPercent: offscreen,
        },
        {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        index * 0.07,
      );
    });

    const panelStart = Math.max(0.08, layers.length * 0.07);

    timeline
      .fromTo(
        panel,
        {
          xPercent: offscreen,
        },
        {
          xPercent: 0,
          duration: 0.65,
          ease: "power4.out",
        },
        panelStart,
      )
      .to(
        labels,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: {
            each: 0.075,
            from: "start",
          },
        },
        panelStart + 0.12,
      )
      .to(
        numberedItems,
        {
          "--sm-num-opacity": 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: {
            each: 0.06,
            from: "start",
          },
        },
        panelStart + 0.2,
      );

    timelineRef.current = timeline;

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 225,
        duration: 0.8,
        ease: "power4.out",
        overwrite: "auto",
      });
    }

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        yPercent: -50,
        duration: 0.65,
        ease: "power4.out",
        overwrite: "auto",
      });
    }

    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        color: openMenuButtonColor,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, [offscreen, openMenuButtonColor]);

  const toggleMenu = () => {
    if (openRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      closeTweenRef.current?.kill();
    };
  }, []);

  const wrapperStyle = {
    "--sm-accent": accentColor,
  } as CSSProperties;

  return (
    <div
      ref={wrapperRef}
      className="staggered-menu-wrapper"
      style={wrapperStyle}
      data-open={open || undefined}
      data-position={position}
      data-theme={theme}
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        className="sm-backdrop"
        onClick={closeMenu}
        tabIndex={open ? 0 : -1}
      />

      <div ref={layersRef} className="sm-prelayers" aria-hidden="true">
        {colors.slice(0, 3).map((color, index) => (
          <div
            key={`${color}-${index}`}
            className="sm-prelayer"
            style={{
              background: color,
            }}
          />
        ))}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation">
        <button
          type="button"
          onClick={onLogoClick}
          className="sm-logo"
          aria-label="Go to NewHub homepage"
        >
          {logoContent}
        </button>

        <div className="sm-header-actions">
          {headerActions}

          <button
            ref={toggleRef}
            type="button"
            className="sm-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={toggleMenu}
          >
            <span className="sm-toggle-label-window" aria-hidden="true">
              <span ref={labelRef} className="sm-toggle-labels">
                <span>Menu</span>
                <span>Close</span>
              </span>
            </span>

            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <aside
        ref={panelRef}
        id={panelId}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <ul
          className="sm-panel-list"
          role="list"
          data-numbering={displayItemNumbering || undefined}
        >
          {items.map((item) => (
            <li className="sm-panel-itemWrap" key={item.label}>
              {item.link ? (
                <a
                  className="sm-panel-item"
                  href={item.link}
                  aria-label={item.ariaLabel}
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="sm-panel-item"
                  aria-label={item.ariaLabel}
                  onClick={() => {
                    item.onSelect?.();
                    closeMenu();
                  }}
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
