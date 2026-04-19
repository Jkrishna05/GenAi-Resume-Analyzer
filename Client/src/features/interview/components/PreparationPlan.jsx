import { useInterview } from "../hooks/InterviewHook";

const PreparationPlan = () => {
  const { report } = useInterview();

  if (!report?.preparationPlan?.length) {
    return (
      <div className="text-slate-400">
        No preparation plan is available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {report.preparationPlan.map((p, index) => (
        <article
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-violet-300 mb-2">
            Day {p.day}
          </h3>
          <p className="text-sm text-slate-300 mb-1">Focus: {p.focus}</p>
          <p className="text-slate-200 whitespace-pre-line">Task: {p.task}</p>
        </article>
      ))}
    </div>
  );
};

export default PreparationPlan;