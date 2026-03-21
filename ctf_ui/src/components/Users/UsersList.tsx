type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  course?: string;
  branch?: string;
  year?: number | null;
  role?: string;
};

export default function UsersList({ users }: { users: User[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 24 }}>
      <thead>
        <tr style={{ background: "#fafafa" }}>
          <th>Avatar</th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Branch</th>
          <th>Year</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} style={{ textAlign: "center" }}>
            <td>
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "#eee",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              )}
            </td>
            <td>{user.username}</td>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.email}</td>
            <td>{user.course}</td>
            <td>{user.branch}</td>
            <td>{user.year}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
