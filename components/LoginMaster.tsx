import { CONSTANTS } from "@/utils/config/app-config";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function LoginMaster() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${CONSTANTS?.API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        {error && <div className="text-danger mt-2">{error}</div>}
        <p className="text-center m-0 mt-3">
          Don&apos;t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginMaster;
