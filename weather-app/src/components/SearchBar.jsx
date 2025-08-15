import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Search</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", justifyContent: "center", margin: "20px" },
  input: { padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid gray" },
  button: { padding: "8px 15px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }
};

export default SearchBar;
