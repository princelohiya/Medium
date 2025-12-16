import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupType } from "@princelohia/medium-common";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function sendRequest() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );

      const token = response.data.token || response.data.jwt;

      if (!token) {
        throw new Error("Authentication failed");
      }

      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (e: any) {
      const message =
        e.response?.data?.msg ||
        e.response?.data?.error ||
        "Invalid credentials or server error";

      setError(message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
            <p className="mt-4 text-sm text-gray-700 font-medium">
              {type === "signup" ? "Creating account..." : "Signing in..."}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          {type === "signup" ? "Create an account" : "Sign in to your account"}
        </h1>

        <p className="text-slate-500 mt-2">
          {type === "signin"
            ? "Welcome back. Please enter your details."
            : "Start writing and sharing your thoughts."}
        </p>

        {/* Form */}
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) sendRequest();
          }}
        >
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Prince lohia"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="you@example.com"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, password: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 text-white font-medium rounded-lg text-sm px-5 py-2.5
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300"
              }`}
          >
            {loading
              ? "Please wait..."
              : type === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-slate-500 text-center">
          {type === "signin"
            ? "Don’t have an account?"
            : "Already have an account?"}

          <Link
            to={type === "signin" ? "/" : "/signin"}
            className="ml-1 font-medium text-gray-900 hover:underline"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
