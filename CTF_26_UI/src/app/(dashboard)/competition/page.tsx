"use client";
import { useSearchParams } from "next/navigation";

export default function CompetitionStatusPage() {
  const params = useSearchParams();
  const notStarted = params.get("notstarted");
  const ended = params.get("ended");

  let title = "";
  let description = "";

  if (notStarted) {
    title = "Competition Not Started";
    description =
      "The competition hasn't started yet. Please check back at the start time!";
  } else if (ended) {
    title = "Competition Ended";
    description = "The competition has ended. Thanks for participating!";
  } else {
    title = "Competition";
    description = "Competition page.";
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#ffd700" }}>
        {title}
      </h1>
      <div style={{ fontSize: "1.15rem", color: "#eee" }}>{description}</div>
    </div>
  );
}
