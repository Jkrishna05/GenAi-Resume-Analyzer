import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../InterviewContext";
import { useInterview } from "../hooks/InterviewHook";
import Header from "../components/Header";
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
    <div className="min-h-screen bg-[#0f1113] text-white flex flex-col">
      <Header />
      
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-violet-400">
          Interview History
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
      </main>
    </div>
  );
};

export default HistoryPage;