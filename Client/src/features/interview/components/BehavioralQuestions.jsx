import { useInterview } from "../hooks/InterviewHook";

const BehavioralQuestions = () => {
const { report } = useInterview();
report.behavioralQuestions.map((q,index)=>(
  <div key={index}>
    <h3>{q.question}</h3>
    <p>{q.intention}</p>
    <p>{q.answer}</p>
  </div>
))
};

export default BehavioralQuestions;