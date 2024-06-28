import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import "./Page.css";
import userService from "../services/userService";

const Verify = () => {
  const { authString } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState();
  const [error, setError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hasNumber = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  useEffect(() => {
    userService
      .verify(authString)
      .then((response) => {
        if (response.status === 200) {
          setEmail(response.data.email);
          setShowForm(true);
        }
      })
      .catch((error) => {
        console.warn(error.response.data.message);
        setShowForm(false);
      });
  }, []);

  const isValidPassword = (password) => {
    if (password.length < 8 || password.length > 20) {
      setError("Password must be between 8 and 20 characters long");
      return false;
    } else if (!hasNumber.test(password)) {
      setError("Password must contain at least one number");
      return false;
    } else if (!hasLowercase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    } else if (!hasUppercase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    } else if (!hasSpecialChar.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    isValidPassword(password);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirm = () => {
    if (error) {
      alert(error);
      return;
    }
    setLoading(true);

    userService
      .reset(email, password)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="wrapper">
      {showForm ? (
        <div className="form-container">
          <h1>Reset Your Password</h1>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              placeholder="Password"
              id="password"
            />
            {showPassword ? (
              <IoMdEye className="eye-icon" onClick={togglePassword} />
            ) : (
              <IoMdEyeOff className="eye-icon" onClick={togglePassword} />
            )}
          </div>
          {error ? (
            <div className="error">
              <p className="error-message">{error}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              placeholder="Confirm Password"
              id="confirm-password"
            />
            {showConfirmPassword ? (
              <IoMdEye className="eye-icon" onClick={toggleConfirmPassword} />
            ) : (
              <IoMdEyeOff
                className="eye-icon"
                onClick={toggleConfirmPassword}
              />
            )}
          </div>
          {confirmPasswordError ? (
            <div className="error">
              <p className="error-message">{confirmPasswordError}</p>
            </div>
          ) : (
            <></>
          )}
          <button
            onClick={handleConfirm}
            className={error || loading ? "button-error" : "button"}
            disabled={error || loading ? true : false}
          >
            {loading ? "Loading..." : "SUBMIT"}
          </button>
        </div>
      ) : (
        <div className="not-found-wrapper">
          <div className="error-title">
            <MdError className="error-icon" />
            <h1>The Link you have entered is not valid</h1>
          </div>
          <div>
            <h2>Kindly verify the link again!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
