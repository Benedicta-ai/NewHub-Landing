import {
  useEffect,
  useRef,
} from "react";

import "./BuiltAroundLoginRedirect.css";

interface BuiltAroundLoginRedirectProps {
  onLogin: () => void;
}

const featureTitles = [
  "Unified Profile",
  "Authentic Connections",
  "Content Sharing",
  "Privacy Control",
];

function findFeatureRow(
  titleElement: HTMLElement,
  section: HTMLElement,
) {
  let current =
    titleElement.parentElement;

  while (
    current &&
    current !== section
  ) {
    const text =
      current.textContent
        ?.replace(/\s+/g, " ")
        .trim() ?? "";

    const containsTitle =
      featureTitles.some(
        (title) =>
          text.includes(title),
      );

    const bounds =
      current.getBoundingClientRect();

    const suitableSize =
      bounds.height >= 60 &&
      bounds.height <= 240 &&
      bounds.width >=
        section.clientWidth * 0.55;

    if (
      containsTitle &&
      suitableSize
    ) {
      return current;
    }

    current =
      current.parentElement;
  }

  return null;
}

export default function BuiltAroundLoginRedirect({
  onLogin,
}: BuiltAroundLoginRedirectProps) {
  const loginCallbackRef =
    useRef(onLogin);

  useEffect(() => {
    loginCallbackRef.current =
      onLogin;
  }, [onLogin]);

  useEffect(() => {
    const registeredRows =
      new Map<
        HTMLElement,
        {
          click: (
            event: MouseEvent,
          ) => void;
          keydown: (
            event: KeyboardEvent,
          ) => void;
          role: string | null;
          tabIndex: string | null;
          ariaLabel:
            | string
            | null;
        }
      >();

    const registerRows =
      () => {
        const section =
          document.getElementById(
            "services",
          );

        if (!section) {
          return;
        }

        const rows =
          new Set<HTMLElement>();

        /*
         * Prefer the existing row classes.
         */
        const directRows =
          section.querySelectorAll<HTMLElement>(
            [
              ".nh-service-row",
              "[data-service-row]",
              '[class*="service-row"]',
              '[class*="feature-row"]',
            ].join(","),
          );

        directRows.forEach(
          (row) => rows.add(row),
        );

        /*
         * Fallback: identify each block through
         * its visible feature heading.
         */
        const possibleTitles =
          section.querySelectorAll<HTMLElement>(
            "h2, h3, h4, p, span, div",
          );

        possibleTitles.forEach(
          (element) => {
            const text =
              element.textContent
                ?.replace(
                  /\s+/g,
                  " ",
                )
                .trim();

            if (
              !text ||
              !featureTitles.includes(
                text,
              )
            ) {
              return;
            }

            const row =
              findFeatureRow(
                element,
                section,
              );

            if (row) {
              rows.add(row);
            }
          },
        );

        rows.forEach((row) => {
          if (
            registeredRows.has(
              row,
            )
          ) {
            return;
          }

          const title =
            featureTitles.find(
              (featureTitle) =>
                row.textContent?.includes(
                  featureTitle,
                ),
            ) ??
            "this feature";

          const click = (
            event: MouseEvent,
          ) => {
            event.preventDefault();
            event.stopPropagation();

            loginCallbackRef.current();
          };

          const keydown = (
            event: KeyboardEvent,
          ) => {
            if (
              event.key !==
                "Enter" &&
              event.key !== " "
            ) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            loginCallbackRef.current();
          };

          registeredRows.set(
            row,
            {
              click,
              keydown,
              role:
                row.getAttribute(
                  "role",
                ),
              tabIndex:
                row.getAttribute(
                  "tabindex",
                ),
              ariaLabel:
                row.getAttribute(
                  "aria-label",
                ),
            },
          );

          row.classList.add(
            "nh-built-around-login-target",
          );

          row.setAttribute(
            "role",
            "button",
          );

          row.setAttribute(
            "tabindex",
            "0",
          );

          row.setAttribute(
            "aria-label",
            `Sign in to access ${title}`,
          );

          row.addEventListener(
            "click",
            click,
          );

          row.addEventListener(
            "keydown",
            keydown,
          );
        });
      };

    registerRows();

    const observer =
      new MutationObserver(
        registerRows,
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true,
      },
    );

    window.addEventListener(
      "resize",
      registerRows,
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        registerRows,
      );

      registeredRows.forEach(
        (settings, row) => {
          row.removeEventListener(
            "click",
            settings.click,
          );

          row.removeEventListener(
            "keydown",
            settings.keydown,
          );

          row.classList.remove(
            "nh-built-around-login-target",
          );

          if (
            settings.role === null
          ) {
            row.removeAttribute(
              "role",
            );
          } else {
            row.setAttribute(
              "role",
              settings.role,
            );
          }

          if (
            settings.tabIndex ===
            null
          ) {
            row.removeAttribute(
              "tabindex",
            );
          } else {
            row.setAttribute(
              "tabindex",
              settings.tabIndex,
            );
          }

          if (
            settings.ariaLabel ===
            null
          ) {
            row.removeAttribute(
              "aria-label",
            );
          } else {
            row.setAttribute(
              "aria-label",
              settings.ariaLabel,
            );
          }
        },
      );

      registeredRows.clear();
    };
  }, []);

  return null;
}
