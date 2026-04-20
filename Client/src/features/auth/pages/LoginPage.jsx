import React, { useState } from "react";
import { useAuth } from "../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  // const [bio, setBio] = useState("");

   const { handleLogin, handleRegister ,loading } = useAuth();
   const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault(); 


    const data = { email, password, fullname };
    console.log(data);
     
    if(currState==="Sign up"){
        await handleRegister({ name: fullname, email, password });
    }else{
      await handleLogin({ email, password });
    }
    setFullname("");
    setEmail("");
    setPassword("");
      navigate("/");
  };

  if(loading){
    return <LoadingPage/>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-950 text-white">

      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-16">
        <h1 className="text-5xl font-bold leading-tight">
          Build AI Powered <br /> Resumes ⚡
        </h1>

        <p className="text-gray-400 mt-6 text-lg max-w-md">
          Generate ATS optimized resumes using AI and match them with
          job descriptions instantly.
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-[90%] sm:w-105 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-semibold mb-6 text-center">
          {currState}
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col">

          {/* {currState === "Sign up" && step === 1 && ( */}
              {currState === "Sign up" && (
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          )}

          {/* {step === 1 && ( */}
            <>
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          {/* )} */}

          {/* {currState === "Sign up" && step === 2 && (
            <textarea
              placeholder="Tell us about yourself"
              className="input h-28 resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          )} */}

          <button
            type="submit"
            className="mt-4 bg-linear-to-r from-blue-500 to-pink-500 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {currState === "Sign up"
              ? step === 2
                ? "Complete Signup"
                : "Continue"
              : "Login"}
          </button>

          <div className="flex items-center text-sm text-gray-400 mt-4">
            <input type="checkbox" required className="mr-2" />
            Agree to terms & privacy policy
          </div>

          {currState === "Sign up" ? (
            <p className="text-gray-400 text-sm mt-4 text-center">
              Already have an account?{" "}
              <span
                className="text-purple-400 cursor-pointer"
                onClick={() => {
                  setCurrState("Login");
                  setStep(1);
                }}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-sm mt-4 text-center">
              New here?{" "}
              <span
                className="text-purple-400 cursor-pointer"
                onClick={() => {
                  setCurrState("Sign up");
                  setStep(1);
                }}
              >
                Create account
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;