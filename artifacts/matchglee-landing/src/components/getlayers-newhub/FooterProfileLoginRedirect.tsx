import {
  useEffect,
  useRef,
} from "react";

interface FooterProfileLoginRedirectProps {
  onLogin: () => void;
}

const profileLinks = [
  "Personal Profile",
  "Professional Profile",
];

function normaliseText(
  value: string | null,
) {
  return (
    value
      ?.replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

export default function FooterProfileLoginRedirect({
  onLogin,
}: FooterProfileLoginRedirectProps) {
  const loginCallbackRef =
    useRef(onLogin);

  useEffect(() => {
    loginCallbackRef.current =
      onLogin;
  }, [onLogin]);

  useEffect(() => {
    const registeredElements =
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
          ariaLabel: string | null;
          href: string | null;
        }
      >();

    const registerFooterLinks =
      () => {
        const footer =
          document.querySelector(
            "footer",
          );

        if (!footer) {
          return;
        }

        const elements =
          footer.querySelectorAll<HTMLElement>(
            "a, button, span, p, li, div",
          );

        elements.forEach(
          (element) => {
            const text =
              normaliseText(
                element.textContent,
              );

            if (
              !profileLinks.includes(
                text,
              )
            ) {
              return;
            }

            const interactiveElement =
              element.closest<HTMLElement>(
                "a, button",
              ) ?? element;

            if (
              !footer.contains(
                interactiveElement,
              ) ||
              registeredElements.has(
                interactiveElement,
              )
            ) {
              return;
            }

            const profileName =
              profileLinks.find(
                (name) =>
                  normaliseText(
                    interactiveElement.textContent,
                  ) === name ||
                  normaliseText(
                    element.textContent,
                  ) === name,
              ) ?? "profile";

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

            registeredElements.set(
              interactiveElement,
              {
                click,
                keydown,
                role:
                  interactiveElement.getAttribute(
                    "role",
                  ),
                tabIndex:
                  interactiveElement.getAttribute(
                    "tabindex",
                  ),
                ariaLabel:
                  interactiveElement.getAttribute(
                    "aria-label",
                  ),
                href:
                  interactiveElement.getAttribute(
                    "href",
                  ),
              },
            );

            interactiveElement.classList.add(
              "nh-footer-profile-login-link",
            );

            interactiveElement.setAttribute(
              "role",
              "button",
            );

            interactiveElement.setAttribute(
              "tabindex",
              "0",
            );

            interactiveElement.setAttribute(
              "aria-label",
              `Sign in to access ${profileName}`,
            );

            interactiveElement.addEventListener(
              "click",
              click,
            );

            interactiveElement.addEventListener(
              "keydown",
              keydown,
            );
          },
        );
      };

    registerFooterLinks();

    const observer =
      new MutationObserver(
        registerFooterLinks,
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true,
      },
    );

    return () => {
      observer.disconnect();

      registeredElements.forEach(
        (
          settings,
          element,
        ) => {
          element.removeEventListener(
            "click",
            settings.click,
          );

          element.removeEventListener(
            "keydown",
            settings.keydown,
          );

          element.classList.remove(
            "nh-footer-profile-login-link",
          );

          if (
            settings.role === null
          ) {
            element.removeAttribute(
              "role",
            );
          } else {
            element.setAttribute(
              "role",
              settings.role,
            );
          }

          if (
            settings.tabIndex ===
            null
          ) {
            element.removeAttribute(
              "tabindex",
            );
          } else {
            element.setAttribute(
              "tabindex",
              settings.tabIndex,
            );
          }

          if (
            settings.ariaLabel ===
            null
          ) {
            element.removeAttribute(
              "aria-label",
            );
          } else {
            element.setAttribute(
              "aria-label",
              settings.ariaLabel,
            );
          }

          if (
            settings.href !== null
          ) {
            element.setAttribute(
              "href",
              settings.href,
            );
          }
        },
      );

      registeredElements.clear();
    };
  }, []);

  return null;
}
