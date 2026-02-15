import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password
    });

    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #ff758c, #ff7eb3)"
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center text-danger mb-4">
          📝 Sign Up
        </h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Create Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-danger w-100"
          onClick={handleRegister}
        >
          Signup
        </button>

        <p className="text-center mt-3">
          Already have account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
