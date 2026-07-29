import {
  useEffect,
  useRef,
} from "react";

import {
  CloseIcon,
} from "./icons";

import "./NewHubSideMenu.css";
import "./NewHubSideMenuVisibilityFix.css";

interface NewHubSideMenuProps {
  onClose: () => void;
  onAbout: () => void;
  onBuiltAroundYou: () => void;
  onLogin: () => void;
}

export default function NewHubSideMenu({
  onClose,
  onAbout,
  onBuiltAroundYou,
  onLogin,
}: NewHubSideMenuProps) {
  const closeButtonRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const menuItems = [
    {
      number: "01",
      label: "About",
      action: onAbout,
    },
    {
      number: "02",
      label: "Built Around You",
      action: onBuiltAroundYou,
    },
    {
      number: "03",
      label: "Sign / Login",
      action: onLogin,
    },
  ];

  return (
    <div
      className="nh-side-menu"
      role="dialog"
      aria-modal="true"
      aria-label="NewHub navigation menu"
    >
      <button
        type="button"
        className="nh-side-menu__backdrop"
        onClick={onClose}
        aria-label="Close navigation menu"
      />

      <aside
        className="nh-side-menu__panel"
        data-lenis-prevent
      >
        <div className="nh-side-menu__top">
          <button
            ref={closeButtonRef}
            type="button"
            className="nh-side-menu__close"
            onClick={onClose}
          >
            <span>Close</span>
            <CloseIcon />
          </button>
        </div>

        <nav
          className="nh-side-menu__navigation"
          aria-label="Menu links"
        >
          <ul>
            {menuItems.map((item) => (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={item.action}
                >
                  <span className="nh-side-menu__label">
                    {item.label}
                  </span>

                  <span className="nh-side-menu__number">
                    {item.number}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="nh-side-menu__accent"
          aria-hidden="true"
        />
      </aside>
    </div>
  );
}
