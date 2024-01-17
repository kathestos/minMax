import React, { useState } from "react";

function Ai() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = (e) => {
    const count = input.length;
    setOutput(count + input + input);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const fieldStyle = {
    width: "80%",
    margin: "10px",
    padding: "10px",
    fontSize: "20px",
    border: "1px solid black",
    height: "auto",
    rows: "1",
    resize: "none",
  };

  const buttonStyle = {
    width: "20%",
    height: "60px",
    margin: "10px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid black",
  };

  return (
    <div style={containerStyle}>
      <textarea
        value={input}
        onChange={handleChange}
        style={fieldStyle}
      />
      <button onClick={handleClick} style={buttonStyle}>
        Go
      </button>
      <textarea
        type="text"
        value={output}
        readOnly
        style={fieldStyle}
      />
      <input
        type="text"
        value={localStorage.getItem("token")}
        readOnly
        style={fieldStyle}
      />
    </div>
  );
}

export default Ai;
