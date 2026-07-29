import {
  useEffect,
  useRef,
} from "react";

interface FooterProfileLoginRedirectProps {
  onLogin: () => void;
}

const INSTAGRAM_URL =
  "https://www.instagram.com/matchglee?igsh=OWN5ZXF3YjE3eXAy";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/matchglee/";

function normaliseText(
  value: string | null,
) {
  return (
    value
      ?.replace(/\s+/g, " ")
      .trim()
      .toLowerCase() ?? ""
  );
}

function scrollToSection(
  sectionIds: string[],
) {
  const section =
    sectionIds
      .map((id) =>
        document.getElementById(id),
      )
      .find(Boolean);

  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const sectionId =
    section.getAttribute("id");

  if (sectionId) {
    window.history.replaceState(
      null,
      "",
      `#${sectionId}`,
    );
  }
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
    const cleanups: Array<
      () => void
    > = [];

    const initialiseFooter =
      () => {
        const footer =
          document.querySelector(
            "footer",
          );

        if (!footer) {
          return;
        }

        /*
         * Remove Early Access from the
         * Platform footer column.
         */
        footer
          .querySelectorAll<HTMLElement>(
            "a, button, span, p, li, div",
          )
          .forEach((element) => {
            const text =
              normaliseText(
                element.textContent,
              );

            if (
              text !==
              "early access"
            ) {
              return;
            }

            const removable =
              element.closest("li") ??
              element.closest("a") ??
              element.closest(
                "button",
              ) ??
              element;

            removable.remove();
          });

        const linkActions: Record<
          string,
          () => void
        > = {
          about: () =>
            scrollToSection([
              "about",
            ]),

          features: () =>
            scrollToSection([
              "services",
              "built-around-you",
              "why-newhub",
            ]),

          community: () =>
            scrollToSection([
              "built-for-all",
              "works",
            ]),

          "personal profile":
            () =>
              loginCallbackRef.current(),

          "professional profile":
            () =>
              loginCallbackRef.current(),

          privacy: () =>
            loginCallbackRef.current(),

          discovery: () =>
            scrollToSection([
              "built-for-all",
              "works",
            ]),

          instagram: () => {
            window.open(
              INSTAGRAM_URL,
              "_blank",
              "noopener,noreferrer",
            );
          },

          linkedin: () => {
            window.open(
              LINKEDIN_URL,
              "_blank",
              "noopener,noreferrer",
            );
          },
        };

        const candidates =
          footer.querySelectorAll<HTMLElement>(
            "a, button, li, span, p",
          );

        const registered =
          new Set<HTMLElement>();

        candidates.forEach(
          (candidate) => {
            const text =
              normaliseText(
                candidate.textContent,
              );

            const action =
              linkActions[text];

            if (!action) {
              return;
            }

            const interactiveElement =
              candidate.closest<HTMLElement>(
                "a, button",
              ) ?? candidate;

            if (
              registered.has(
                interactiveElement,
              )
            ) {
              return;
            }

            registered.add(
              interactiveElement,
            );

            const originalRole =
              interactiveElement.getAttribute(
                "role",
              );

            const originalTabIndex =
              interactiveElement.getAttribute(
                "tabindex",
              );

            const originalHref =
              interactiveElement.getAttribute(
                "href",
              );

            const originalTarget =
              interactiveElement.getAttribute(
                "target",
              );

            const originalRel =
              interactiveElement.getAttribute(
                "rel",
              );

            const handleClick = (
              event: MouseEvent,
            ) => {
              event.preventDefault();
              event.stopPropagation();

              action();
            };

            const handleKeyDown = (
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

              action();
            };

            interactiveElement.classList.add(
              "nh-footer-action-link",
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
              text,
            );

            interactiveElement.addEventListener(
              "click",
              handleClick,
            );

            interactiveElement.addEventListener(
              "keydown",
              handleKeyDown,
            );

            cleanups.push(() => {
              interactiveElement.removeEventListener(
                "click",
                handleClick,
              );

              interactiveElement.removeEventListener(
                "keydown",
                handleKeyDown,
              );

              interactiveElement.classList.remove(
                "nh-footer-action-link",
              );

              if (
                originalRole === null
              ) {
                interactiveElement.removeAttribute(
                  "role",
                );
              } else {
                interactiveElement.setAttribute(
                  "role",
                  originalRole,
                );
              }

              if (
                originalTabIndex ===
                null
              ) {
                interactiveElement.removeAttribute(
                  "tabindex",
                );
              } else {
                interactiveElement.setAttribute(
                  "tabindex",
                  originalTabIndex,
                );
              }

              if (
                originalHref === null
              ) {
                interactiveElement.removeAttribute(
                  "href",
                );
              } else {
                interactiveElement.setAttribute(
                  "href",
                  originalHref,
                );
              }

              if (
                originalTarget === null
              ) {
                interactiveElement.removeAttribute(
                  "target",
                );
              } else {
                interactiveElement.setAttribute(
                  "target",
                  originalTarget,
                );
              }

              if (
                originalRel === null
              ) {
                interactiveElement.removeAttribute(
                  "rel",
                );
              } else {
                interactiveElement.setAttribute(
                  "rel",
                  originalRel,
                );
              }
            });
          },
        );
      };

    const timeout =
      window.setTimeout(
        initialiseFooter,
        100,
      );

    return () => {
      window.clearTimeout(timeout);

      cleanups.forEach(
        (cleanup) => cleanup(),
      );
    };
  }, []);

  return null;
}
