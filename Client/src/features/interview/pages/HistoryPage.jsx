import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../InterviewContext";
import { useInterview } from "../hooks/InterviewHook";
import { X } from "lucide-react";
const HistoryPage = () => {

  const navigate = useNavigate();
  const { reportsList, setReportsList, loading, setLoading } = useContext(InterviewContext);

  const { handleGetReportList } = useInterview();

  useEffect(() => {

    const fetchReports = async () => {
      const data = await handleGetReportList();
      setReportsList(data);
    };
    fetchReports();

  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading reports...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#0f1113] text-white p-10">

      <h1 className="text-3xl font-bold mb-8 text-violet-400 flex justify-between">
        Interview History
        <div>
           <button
              className="group relative p-3 md:p-4 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() => navigate("/")}
              aria-label="Close and go to history"
            >
            <X size={20}     className="text-slate-400 group-hover:text-red-400 transition-colors duration-200" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Go to Home
              </span>
          </button>
        </div>
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {reportsList?.map((report) => (

          <div
            key={report._id}
            onClick={() => navigate(`/report/${report._id}`)}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer hover:bg-violet-600/10 transition"
          >

            <h2 className="text-lg font-semibold mb-2">
              {report.title || "Interview title"}
            </h2>

            <p className="text-sm text-slate-400">
              Match Score: {report.matchPercentage || "N/A"}%
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Created: {new Date(report.createdAt).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default HistoryPage;