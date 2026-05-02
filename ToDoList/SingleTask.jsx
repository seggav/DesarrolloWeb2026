function SingleTask({ texto, colorFondo, estaCompletada, onCompletar }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={estaCompletada}
        onChange={onCompletar}
        style={{ width: "18px", height: "18px", cursor: "pointer" }}
      />
      <span
        style={{
          backgroundColor: colorFondo,
          color: "#fff",
          padding: "6px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          textDecoration: estaCompletada ? "line-through" : "none",
          opacity: estaCompletada ? 0.6 : 1,
        }}
      >
        {texto}
      </span>
    </div>
  );
}

export default SingleTask;