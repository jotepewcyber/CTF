import { useEffect, useState } from "react";

type Props = {
  start: string;
  end: string;
  now: string;
};

function formatTime(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function CompetitionTimer({ start, end, now }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(
    new Date(end).getTime() - new Date(now).getTime(),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(new Date(end).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [end]);

  if (Date.now() < new Date(start).getTime()) {
    return <div>Competition has not started yet.</div>;
  }

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
      Time Left: <span style={{ color: "green" }}>{formatTime(timeLeft)}</span>
    </div>
  );
}
