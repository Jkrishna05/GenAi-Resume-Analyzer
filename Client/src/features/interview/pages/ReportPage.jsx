import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  Code,
  Users,
  CalendarCheck
} from "lucide-react";

import TechnicalQuestions from "../components/TechnicalQuestions";
import BehavioralQuestions from "../components/BehavioralQuestions";
import PreparationPlan from "../components/PreparationPlan";
import SkillGapPanel from "../components/SkillGapPanel";
import MatchScoreCard from "../components/MatchScoreCard";
import Header from "../components/Header";
import { useEffect } from "react";
import { useInterview } from "../hooks/InterviewHook";
import LoadingPage from "../components/Loader";
const ReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetReport, loading, report } = useInterview();

  const [active, setActive] = useState("technical");

  const renderContent = () => {
    if (active === "technical") return <TechnicalQuestions />;
    if (active === "behavioral") return <BehavioralQuestions />;
    if (active === "preparation") return <PreparationPlan />;
  };
  useEffect(() => {
    const fetchReport = async () => {
      if (id) {
        await handleGetReport(id);
      }
    };

    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300 bg-[#0f1113]">
        <p>No report found. Please generate a report or check the URL.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-slate-200">
      <Header />
      
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/10 backdrop-blur-xl bg-white/5 p-5 md:p-6 flex flex-col">
          <h1 className="text-xl font-bold text-violet-400 mb-6 md:mb-10">
            Report Details
          </h1>

        <nav className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          <button
            onClick={() => setActive("technical")}
            className={`flex items-center gap-3 p-3 rounded-xl transition whitespace-nowrap ${active === "technical"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
              }`}
          >
            <Code size={18} />
            Technical
          </button>

          <button
            onClick={() => setActive("behavioral")}
            className={`flex items-center gap-3 p-3 rounded-xl transition whitespace-nowrap ${active === "behavioral"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
              }`}
          >
            <Users size={18} />
            Behavioral
          </button>

          <button
            onClick={() => setActive("preparation")}
            className={`flex items-center gap-3 p-3 rounded-xl transition whitespace-nowrap ${active === "preparation"
                ? "bg-violet-600/20 text-violet-400"
                : "hover:bg-white/5"
              }`}
          >
            <CalendarCheck size={18} />
            Preparation
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          
          <MatchScoreCard />
          <SkillGapPanel />
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
          {renderContent()}
        </div>
      </main>
      </div>
    </div>
  );
};


export default ReportPage;