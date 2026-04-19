import { useInterview } from "../hooks/InterviewHook";

const SkillGapPanel = () => {
  const { report } = useInterview();

  if (!report?.skillsGapAnalysis?.length) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-400">
        No skills gap analysis is available yet.
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-violet-300">Skills Gap Analysis</h2>
      {report.skillsGapAnalysis.map((q, index) => (
        <div key={index} className="rounded-2xl bg-slate-900/40 p-4">
          <h3 className="font-semibold text-slate-100">{q.skill}</h3>
          <p className="text-sm text-slate-300">Severity: {q.severity}</p>
        </div>
      ))}
    </div>
  );
};

export default SkillGapPanel;