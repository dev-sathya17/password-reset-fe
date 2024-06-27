import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("clicked");
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

  return (
    <div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address:"
        />
        <button onClick={handleSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default Home;
