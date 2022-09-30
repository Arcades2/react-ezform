const TextField = ({ error, label, ...props }) => {
  return (
    <label
      style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}
    >
      <span>{label}</span>
      <input type="text" {...props} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </label>
  );
};

export default TextField;
