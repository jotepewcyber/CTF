export default function AddCategoryButton({
  isAdmin,
  onClick,
}: {
  isAdmin: boolean;
  onClick?: () => void;
}) {
  if (!isAdmin) return null;
  return (
    <button
      style={{
        background: "#2f3dec",
        color: "#fff",
        borderRadius: 6,
        padding: "8px 16px",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 15,
      }}
      onClick={onClick}
    >
      + Add Category
    </button>
  );
}
