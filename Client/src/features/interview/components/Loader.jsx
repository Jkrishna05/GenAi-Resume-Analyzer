import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f1113] flex items-center justify-center text-white">

      <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-slate-800 text-center w-[420px]">

        {/* Animated Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">

            <div className="absolute inset-0 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>

            <div className="absolute inset-4 border-4 border-purple-400 border-b-transparent rounded-full animate-spin [animation-duration:2s]"></div>

            <div className="absolute inset-8 bg-violet-500 rounded-full animate-pulse"></div>

          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Profile</h2>

        <p className="text-slate-400 text-sm mb-6">
          Our AI is matching your resume with the job description.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-full w-full animate-[loading_3s_linear_infinite]"></div>
        </div>

        <p className="text-xs text-slate-500">
          This usually takes 3-5 seconds
        </p>

      </div>

      {/* Tailwind animation */}
      <style>
        {`
        @keyframes loading {
          0% {transform: translateX(-100%)}
          100% {transform: translateX(100%)}
        }
        `}
      </style>

    </div>
  );
};

export default LoadingPage;