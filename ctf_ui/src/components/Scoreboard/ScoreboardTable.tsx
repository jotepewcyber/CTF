import ScoreboardRow from "./ScoreboardRow";

type Props = {
  users: { username: string; total_points: number }[];
};

export default function ScoreboardTable({ users }: Props) {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 1px 6px #ddd",
        margin: "24px 0",
      }}
    >
      <thead style={{ background: "#f7f7f7" }}>
        <tr>
          <th style={{ padding: 8 }}>#</th>
          <th style={{ padding: 8, textAlign: "left" }}>Username</th>
          <th style={{ padding: 8 }}>Points</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <ScoreboardRow
            key={user.username}
            position={idx + 1}
            username={user.username}
            total_points={user.total_points}
          />
        ))}
      </tbody>
    </table>
  );
}
