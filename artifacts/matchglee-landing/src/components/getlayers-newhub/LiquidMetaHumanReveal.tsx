import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const DESKTOP_VIDEO =
  "/metal-human-cinema/metal-human-scroll-desktop.mp4";

const MOBILE_VIDEO =
  "/metal-human-cinema/metal-human-scroll-mobile.mp4";

const POSTER =
  "/metal-human-cinema/metal-human-poster.webp";

const DESKTOP_FPS = 18;
const MOBILE_FPS = 12;

function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

export default function LiquidMetaHumanReveal() {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const animationFrameRef =
    useRef<number | null>(
      null,
    );

  const durationRef =
    useRef(10);

  const targetTimeRef =
    useRef(0);

  const seekInProgressRef =
    useRef(false);

  const metadataReadyRef =
    useRef(false);

  const releasedRef =
    useRef(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const [isReady, setIsReady] =
    useState(false);

  const videoSource = isMobile
    ? MOBILE_VIDEO
    : DESKTOP_VIDEO;

  const fps = isMobile
    ? MOBILE_FPS
    : DESKTOP_FPS;

  const seekToLatestTarget =
    useCallback(() => {
      const video =
        videoRef.current;

      if (
        !video ||
        !metadataReadyRef.current ||
        releasedRef.current
      ) {
        return;
      }

      if (
        seekInProgressRef.current ||
        video.seeking
      ) {
        return;
      }

      const maximumTime =
        Math.max(
          0,
          durationRef.current -
            0.03,
        );

      /*
       * Quantise the requested time to the
       * actual encoded video frame rate.
       */
      const requestedFrame =
        Math.round(
          clamp(
            targetTimeRef.current,
            0,
            maximumTime,
          ) * fps,
        );

      const requestedTime =
        Math.min(
          requestedFrame / fps,
          maximumTime,
        );

      const currentFrame =
        Math.round(
          video.currentTime * fps,
        );

      if (
        requestedFrame ===
        currentFrame
      ) {
        return;
      }

      seekInProgressRef.current =
        true;

      try {
        video.currentTime =
          requestedTime;
      } catch {
        seekInProgressRef.current =
          false;
      }
    }, [fps]);

  const updateFromScroll =
    useCallback(() => {
      const container =
        containerRef.current;

      const hero =
        document.getElementById(
          "home",
        );

      const platform =
        document.getElementById(
          "built-for-all",
        ) ??
        document.getElementById(
          "works",
        );

      if (
        !container ||
        !hero ||
        !platform
      ) {
        return;
      }

      const scrollPosition =
        window.scrollY ||
        document.documentElement
          .scrollTop;

      const heroTop =
        hero.getBoundingClientRect()
          .top +
        scrollPosition;

      const platformTop =
        platform.getBoundingClientRect()
          .top +
        scrollPosition;

      const scrollDistance =
        Math.max(
          1,
          platformTop - heroTop,
        );

      const progress =
        clamp(
          (scrollPosition -
            heroTop) /
            scrollDistance,
          0,
          1,
        );

      const released =
        scrollPosition >=
        platformTop;

      releasedRef.current =
        released;

      container.classList.toggle(
        "is-active",
        !released,
      );

      container.classList.toggle(
        "is-released",
        released,
      );

      if (released) {
        return;
      }

      const maximumTime =
        Math.max(
          0,
          durationRef.current -
            0.03,
        );

      targetTimeRef.current =
        progress * maximumTime;

      seekToLatestTarget();
    }, [seekToLatestTarget]);

  const scheduleUpdate =
    useCallback(() => {
      if (
        animationFrameRef.current !==
        null
      ) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          () => {
            animationFrameRef.current =
              null;

            updateFromScroll();
          },
        );
    }, [updateFromScroll]);

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        "(max-width: 767px)",
      );

    const updateViewport =
      () => {
        setIsMobile(
          mobileQuery.matches,
        );
      };

    updateViewport();

    mobileQuery.addEventListener(
      "change",
      updateViewport,
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        updateViewport,
      );
    };
  }, []);

  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    metadataReadyRef.current =
      false;

    seekInProgressRef.current =
      false;

    durationRef.current = 10;
    targetTimeRef.current = 0;

    setIsReady(false);

    video.pause();
    video.load();

    const markReady = () => {
      video.pause();

      setIsReady(true);

      scheduleUpdate();
    };

    const handleMetadata = () => {
      if (
        Number.isFinite(
          video.duration,
        ) &&
        video.duration > 0
      ) {
        durationRef.current =
          video.duration;
      }

      metadataReadyRef.current =
        true;

      /*
       * Decode the first actual video frame.
       * This is a paused seek, not autoplay.
       */
      targetTimeRef.current =
        0.001;

      try {
        video.currentTime =
          0.001;
      } catch {
        markReady();
      }
    };

    const handleLoadedData = () => {
      markReady();
    };

    const handleCanPlay = () => {
      markReady();
    };

    const handleSeeked = () => {
      seekInProgressRef.current =
        false;

      setIsReady(true);

      /*
       * Scrolling may continue during a seek.
       * Immediately seek to the newest target.
       */
      seekToLatestTarget();
    };

    const handleError = () => {
      const mediaError =
        video.error;

      console.error(
        "Metal Human video failed to load.",
        {
          code:
            mediaError?.code,
          message:
            mediaError?.message,
          source:
            video.currentSrc,
        },
      );

      metadataReadyRef.current =
        false;

      setIsReady(false);
    };

    video.addEventListener(
      "loadedmetadata",
      handleMetadata,
    );

    video.addEventListener(
      "loadeddata",
      handleLoadedData,
    );

    video.addEventListener(
      "canplay",
      handleCanPlay,
    );

    video.addEventListener(
      "seeked",
      handleSeeked,
    );

    video.addEventListener(
      "error",
      handleError,
    );

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleMetadata,
      );

      video.removeEventListener(
        "loadeddata",
        handleLoadedData,
      );

      video.removeEventListener(
        "canplay",
        handleCanPlay,
      );

      video.removeEventListener(
        "seeked",
        handleSeeked,
      );

      video.removeEventListener(
        "error",
        handleError,
      );

      video.pause();
    };
  }, [
    scheduleUpdate,
    seekToLatestTarget,
    videoSource,
  ]);

  useEffect(() => {
    scheduleUpdate();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    const delayedUpdates = [
      window.setTimeout(
        scheduleUpdate,
        100,
      ),
      window.setTimeout(
        scheduleUpdate,
        500,
      ),
      window.setTimeout(
        scheduleUpdate,
        1200,
      ),
    ];

    void document.fonts?.ready.then(
      scheduleUpdate,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );

      delayedUpdates.forEach(
        (timer) => {
          window.clearTimeout(
            timer,
          );
        },
      );

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [scheduleUpdate]);

  return (
    <div
      ref={containerRef}
      className="
        nh-scroll-cinema-media
        is-active
      "
      aria-hidden="true"
    >
      <img
        src={POSTER}
        alt=""
        draggable={false}
        loading="eager"
        fetchPriority="high"
        className="nh-scroll-cinema-media__poster"
      />

      <video
        key={videoSource}
        ref={videoRef}
        src={videoSource}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
        className={[
          "nh-scroll-cinema-media__video",
          isReady
            ? "is-ready"
            : "",
        ].join(" ")}
      />

      <div
        className="nh-scroll-cinema-media__colour"
      />

      <div
        className="nh-scroll-cinema-media__shade"
      />
    </div>
  );
}
