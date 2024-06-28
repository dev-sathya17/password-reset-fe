import { useState } from "react";
import "./Page.css";
import { MdOutlineMail } from "react-icons/md";
import userService from "../services/userService";
const Home = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);

    userService
      .forgot(email)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setEmail("");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message);
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
          className={error || loading ? "button-error" : "button"}
          disabled={error || loading ? true : false}
        >
          {loading ? "Loading..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default Home;
