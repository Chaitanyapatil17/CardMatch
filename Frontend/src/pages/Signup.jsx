import { useState } from "react";
import { signupUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSignup}>
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>

          <div className="form-container">
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Sign up</button>
        </form>

        <div className="form-section">
          <p>
            Have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(168, 85, 247, 0.1)
  );

  .form-box {
    width: 350px;
    background: #f1f7fe;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 0.95rem;
    color: #666;
  }

  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 0.5rem;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 45px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .input:last-child {
    border-bottom: none;
  }

  .form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #e0ecfb;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: 0.3s;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .form button:hover {
    background-color: #005ce6;
  }
`;