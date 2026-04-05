import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Code,
  Users,
  CalendarCheck
} from "lucide-react";

import TechnicalQuestions from "../components/TechnicalQuestions";
import BehavioralQuestions from "../components/BehavioralQuestions";
import PreparationPlan from "../components/PreparationPlan";
import SkillGapPanel from "../components/SkillGapPanel";
import MatchScoreCard from "../components/MatchScoreCard";
import { useEffect } from "react";
import { useInterview } from "../hooks/InterviewHook";
import LoadingPage from "../components/Loader";
const ReportPage = () => {
    const { id } = useParams();
    const { handleGetReport,loading } = useInterview();

  const [active, setActive] = useState("technical");

  const renderContent = () => {
    if (active === "technical") return <TechnicalQuestions />;
    if (active === "behavioral") return <BehavioralQuestions />;
    if (active === "preparation") return <PreparationPlan />;
  };
    useEffect(() => {
  
          if (id) {
              handleGetReport(id);
          }
  
      }, [id]);


  if (loading) {
    return (
      // <div className="h-screen flex items-center justify-center text-white">
      //   Loading reports...
      // </div>
      <LoadingPage/>
    );
  }


  return (

    <div className="min-h-screen flex bg-gradient-to-br from-[#0f1113] via-[#121417] to-[#0f1113] text-slate-200">

      {/* SIDEBAR */}

      <aside className="w-72 border-r border-white/10 backdrop-blur-xl bg-white/5 p-6 flex flex-col">

        <h1 className="text-xl font-bold text-violet-400 mb-10">
          SkillSync AI
        </h1>

        <nav className="flex flex-col gap-3">

          <button
            onClick={() => setActive("technical")}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              active === "technical"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
            }`}
          >
            <Code size={18} />
            Technical Questions
          </button>

          <button
            onClick={() => setActive("behavioral")}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              active === "behavioral"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
            }`}
          >
            <Users size={18} />
            Behavioral Questions
          </button>

          <button
            onClick={() => setActive("preparation")}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              active === "preparation"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
            }`}
          >
            <CalendarCheck size={18} />
            Preparation Plan
          </button>

        </nav>

      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-10">

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <MatchScoreCard />

          <SkillGapPanel />

        </div>

        {/* CONTENT PANEL */}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">

          {renderContent()}

        </div>

      </main>

    </div>
  );
};

export default ReportPage;