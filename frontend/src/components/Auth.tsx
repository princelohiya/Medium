import { Link } from "react-router-dom";
import { useState } from "react";
import { type SignupType } from "@princelohia/medium-common";
import { LabelledInput } from "./LabelledInput";

export const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="text-3xl font-extrabold">
          {type === "Signup" ? "Join Medium" : "Welcome back."}
        </div>
      </div>
      <div className="flex justify-center text-slate-400">
        {type === "Signup" ? "Already have an account?" : "Don't have account?"}
        <Link
          className="pl-1 underline"
          to={type === "Signup" ? "/signin" : "/signup"}
        >
          {type === "Signin" ? "Sign up" : "Login"}
        </Link>
      </div>

      <div className="flex flex-col items-center pt-3">
        <div className=" w-2/3 m-6 ">
          {type === "Signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
            />
          ) : null}
          <LabelledInput
            label="Email"
            placeholder="Email Address"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              })
            }
          />
          <LabelledInput
            label="Password"
            placeholder="*******"
            type="password"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />

          <div className="flex flex-col m-5">
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "Signin" ? "Login" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
