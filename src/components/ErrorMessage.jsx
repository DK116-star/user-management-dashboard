function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
      {message}
    </div>
  );
}

export default ErrorMessage;