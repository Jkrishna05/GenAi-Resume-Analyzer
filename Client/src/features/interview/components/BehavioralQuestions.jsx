import { useInterview } from "../hooks/InterviewHook";

const BehavioralQuestions = () => {
  const { report } = useInterview();

  if (!report?.behavioralQuestions?.length) {
    return (
      <div className="text-slate-400">
        No behavioral question suggestions are available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {report.behavioralQuestions.map((q, index) => (
        <article
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-violet-300 mb-2">
            {q.question}
          </h3>
          <p className="text-sm text-slate-300 mb-2">Intent: {q.intention}</p>
          <p className="text-slate-200 whitespace-pre-line">{q.answer}</p>
        </article>
      ))}
    </div>
  );
};

export default BehavioralQuestions;