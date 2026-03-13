export default function AddCategoryButton({ isAdmin }: { isAdmin: boolean }) {
  if (!isAdmin) return null;
  return (
    <button
      style={{
        fontSize: 15,
        padding: "5px 12px",
        borderRadius: 7,
        border: "1px solid #888",
        background: "#f9f9ff",
        float: "right",
        marginBottom: 14,
        cursor: "pointer",
      }}
      // onClick={...}
    >
      + Add Category
    </button>
  );
}
