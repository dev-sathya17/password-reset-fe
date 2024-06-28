import axios from "axios";
import { useState } from "react";
import "./Page.css";
import { MdOutlineMail } from "react-icons/md";
const Home = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Please enter a valid email");
      return;
    }

    axios
      .post("https://password-reset-j80k.onrender.com/users/forgot", {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setEmail("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setError("Email is required");
    } else {
      setError("");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <h1>Forgot Password</h1>
        <div className="input-container">
          <MdOutlineMail className="icon" />
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="abcd@email.com:"
            id="email"
            className={error ? "input-error" : ""}
          />
        </div>
        {error ? (
          <div className="error">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={handleSubmit}
          className={error ? "button-error" : "button"}
          disabled={error ? true : false}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Home;
