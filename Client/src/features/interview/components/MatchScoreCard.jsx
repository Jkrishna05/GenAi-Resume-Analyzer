import React from "react";
import { useInterview } from "../hooks/InterviewHook";

const MatchScoreCard = () => {
    const { report } = useInterview();
  const score = report ? Math.round(report.matchPercentage) : 0;

  return (

    <div className="col-span-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">

      <h3 className="text-lg font-semibold mb-4">
        Job Match Score
      </h3>

      <div className="relative w-32 h-32">

        <svg className="w-full h-full">

          <circle
            cx="64"
            cy="64"
            r="55"
            stroke="rgb(51 65 85)"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="64"
            cy="64"
            r="55"
            stroke="rgb(139 92 246)"
            strokeWidth="10"
            fill="none"
            strokeDasharray="345"
            strokeDashoffset={345 - (345 * score) / 100}
            strokeLinecap="round"
            transform="rotate(-90 64 64)"
          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">

          {score}%

        </div>

      </div>

    </div>
  );
};

export default MatchScoreCard;