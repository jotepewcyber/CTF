import { Scoreboard } from "@/types/scoreboard";

export default function ScoreboardRow({
  position,
  username,
  total_points,
}: Scoreboard) {
  return (
    <tr>
      <td style={{ padding: 8, textAlign: "center" }}>{position}</td>
      <td style={{ padding: 8 }}>{username}</td>
      <td style={{ padding: 8, textAlign: "center" }}>{total_points}</td>
    </tr>
  );
}
