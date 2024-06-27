import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { authString } = useParams();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    verify();
  }, []);

  const verify = async () => {
    const response = await axios.get(
      `https://password-reset-j80k.onrender.com/users/verify/${authString}`
    );

    if (response.status === 200) {
      setEmail(response.data.email);
      setShowForm(true);
    }
    setLoading(false);
  };

  const handleConfirm = () => {
    if (password === confirmPassword) {
      axios
        .post("https://password-reset-j80k.onrender.com/users/reset", {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            setPassword("");
            setEmail("");
            setConfirmPassword("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div>
      {loading ? (
        <></>
      ) : showForm ? (
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button onClick={handleConfirm}>CONFIRM</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Verify;
