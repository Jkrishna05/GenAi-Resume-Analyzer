import { useInterview } from "../hooks/InterviewHook";

const PreparationPlan = () => {
const { report } = useInterview();
report.preparationPlan.map((p,index)=>(
  <div key={index}>
    <h3>Day {p.day}</h3>
    <p>Focus: {p.focus}</p>
    <p>Task: {p.task}</p>
  </div>
))
};

export default PreparationPlan;