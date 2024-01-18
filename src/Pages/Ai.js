import React, { useState } from "react";
import SecretsDataService from "../Services/secrets";

function Ai() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = async (e) => {
    console.log(localStorage.token);
    console.log(localStorage.user);
    const secretName = "api key";
    const secret = await SecretsDataService.get(`?name=${secretName}`);
    setOutput(secret.data);
    console.log(secret.data);
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
      <textarea value={input} onChange={handleChange} style={fieldStyle} />
      <button onClick={handleClick} style={buttonStyle}>
        Go
      </button>
      <textarea type="text" value={output} readOnly style={fieldStyle} />
    </div>
  );
}

export default Ai;
