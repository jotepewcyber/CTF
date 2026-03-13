type Props = {
  name: string;
  level: string;
  points: number;
};
export default function ChallengeCard({ name, level, points }: Props) {
  return (
    <div
      style={{
        border: "2px solid #333",
        borderRadius: 12,
        padding: 14,
        margin: 8,
        width: 180,
        minHeight: 95,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <b>{level}</b> | <b>{points} pts</b>
      </div>
      <div style={{ marginTop: 8, fontWeight: "bold", fontSize: "1.05em" }}>
        {name}
      </div>
    </div>
  );
}
