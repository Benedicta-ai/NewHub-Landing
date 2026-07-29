import {
  useEffect,
  useState,
} from "react";

interface ClockValue {
  time: string;
  date: string;
}

function formatClock(
  currentDate: Date,
): ClockValue {
  const hours =
    currentDate.getHours();

  const minutes = String(
    currentDate.getMinutes(),
  ).padStart(2, "0");

  const displayHour =
    hours % 12 || 12;

  const meridiem =
    hours >= 12
      ? "pm"
      : "am";

  const date =
    currentDate.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );

  return {
    time:
      `${displayHour}:` +
      `${minutes}${meridiem}`,
    date,
  };
}

export default function useLiveClock() {
  const [clock, setClock] =
    useState<ClockValue>({
      time: "9:41am",
      date: "12 March, 2025",
    });

  useEffect(() => {
    const updateClock = () => {
      setClock(
        formatClock(
          new Date(),
        ),
      );
    };

    updateClock();

    const timer =
      window.setInterval(
        updateClock,
        1000,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, []);

  return clock;
}
