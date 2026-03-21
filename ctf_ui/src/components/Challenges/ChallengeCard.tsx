type Props = {
  name: string;
  level: string;
  points: number;
  onClick?: () => void;
};
export default function ChallengeCard({ name, level, points, onClick }: Props) {
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
      onClick={onClick}
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
