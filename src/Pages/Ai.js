import React, { useState, useRef } from "react";
import SecretsDataService from "../Services/secrets";
import OpenAI from "openai";
import TextareaAutosize from "react-textarea-autosize";
import "./Styles.css";

function Ai() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [selected, setSelected] = useState("gpt-3.5-turbo-1106");
  const cancel = useRef(false);

  let messages = [];
  const options = ["gpt-3.5-turbo-1106", "gpt-4-1106-preview", "gpt-5"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleModelChange = (event) => {
    setSelected(event.target.value);
  };

  const handleClick = async (e) => {
    cancel.current = false;
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
        model: selected,
        messages: conversation,
        stream: true,
      });
      for await (const chunk of stream) {
        let part = chunk.choices[0]?.delta?.content || "";
        text += part;
        setOutput(text);
        if (cancel.current) {
          stream.controller.abort();
        }
      }
    } else {
      setOutput("Wrong user");
    }
    messages.push({ role: "assistant", content: text });
    setConversation(messages);
    console.log(conversation);
  };

  const handleCancel = async (e) => {
    cancel.current = true;
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
      <div>
        <select
          id="dropdown"
          value={selected}
          onChange={handleModelChange}
          className="dropdown"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <TextareaAutosize
        value={input}
        onChange={handleInputChange}
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
      <button onClick={handleCancel} className="buttonStyle">
        X
      </button>
    </div>
  );
}

export default Ai;
