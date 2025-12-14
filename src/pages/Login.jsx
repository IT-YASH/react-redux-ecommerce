import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </form>
    </div>
  );
}
