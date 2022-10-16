import "./Styles.css";
import React, { useState } from "react";
import UsersDataService from "../Services/users";

function Register() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading");
    setError("");
    const res = await UsersDataService.register(
      `?username=${data.username}&password=${data.password}`
    );
    if (res.data.status !== 201) {
      setError(res.data.message);
      setLoading("");
    } else {
      window.location = "/minMax/login";
    }
  };

  return (
    <div className="login_container">
      <form className="form_container" onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={data.username}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className="input"
        />
        <button type="submit" className="submit" disabled>
          register
        </button>
        {error && <div className="error_msg">{error}</div>}
        {!error && <div className="error_msg op0">{"ERROR"}</div>}
        {loading && <div className="loading">{loading}</div>}
        {!loading && <div className="loading op0">{"LOADING"}</div>}
      </form>
    </div>
  );
}

export default Register;
