import React, {
  useState
} from "react";

import api from "../services/api";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {
  const navigate =
    useNavigate();

  const [role, setRole] =
    useState("candidate");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const login = async () => {
    try {
      const res =
        await api.post(
          `/auth/${role}/login`,
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      navigate(
        res.data.role ===
          "candidate"
          ? "/candidate"
          : "/recruiter"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">

      <div className="card-dark p-10 w-full max-w-md">

        <h1 className="text-5xl font-bold mb-3">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-8">
          Login to continue
        </p>

        <select
          className="input-dark mb-4"
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
        >
          <option value="candidate">
            Candidate
          </option>

          <option value="recruiter">
            Recruiter
          </option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="input-dark mb-4"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="input-dark mb-6"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="primary-btn w-full orange-glow"
          onClick={login}
        >
          Login
        </button>

        <p className="mt-6 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-orange-500 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;