import React, { useState } from "react";
import SecretsDataService from "../Services/secrets";
import OpenAI from "openai";
import TextareaAutosize from "react-textarea-autosize";
import "./Styles.css";

function Ai() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversation, setConversation] = useState([]);
  let messages = [];

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = async (e) => {
    messages = conversation;
    messages.push({ role: "user", content: input });
    setConversation(messages);
    const user = localStorage.user;
    const token = localStorage.token;
    const secretName = "api key";
    const query = `?user=${user}&token=${token}&name=${secretName}`;
    const secret = await SecretsDataService.get(query);
    let text = "";
    if (secret.data !== 0) {
      const openai = new OpenAI({
        apiKey: secret.data,
        dangerouslyAllowBrowser: true,
      });
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        // model: "gpt-4-1106-preview",
        messages: conversation,
        stream: true,
      });
      for await (const chunk of stream) {
        let part = chunk.choices[0]?.delta?.content || "";
        text += part;
        setOutput(text);
      }
    } else {
      setOutput("Wrong user");
    }
    messages.push({ role: "assistant", content: text });
    setConversation(messages);
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

  return (
    <div className="containerStyle">
      <TextareaAutosize
        value={input}
        onChange={handleChange}
        style={fieldStyle}
      />
      <button onClick={handleClick} className="buttonStyle">
        Go
      </button>
      <TextareaAutosize
        type="text"
        value={output}
        readOnly
        style={fieldStyle}
      />
    </div>
  );
}

export default Ai;
