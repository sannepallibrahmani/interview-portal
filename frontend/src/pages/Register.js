import React, {
  useState
} from "react";

import api from "../services/api";
import {
  useNavigate
} from "react-router-dom";

function Register() {
  const navigate =
    useNavigate();

  const [role, setRole] =
    useState("candidate");

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const register =
    async () => {
      try {
        await api.post(
          `/auth/${role}/register`,
          form
        );

        alert(
          "Registration Successful"
        );

        navigate("/");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">

      <div className="card-dark p-10 w-full max-w-md">

        <h1 className="text-5xl font-bold mb-3">
          Create Account
        </h1>

        <p className="text-zinc-400 mb-8">
          Join Interview Portal
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
          className="input-dark mb-4"
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value
            })
          }
        />

        <input
          className="input-dark mb-4"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value
            })
          }
        />

        <input
          type="password"
          className="input-dark mb-6"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value
            })
          }
        />

        <button
          className="primary-btn w-full orange-glow"
          onClick={register}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;