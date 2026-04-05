import { useInterview } from "../hooks/InterviewHook";

const SkillGapPanel = () => {
const { report } = useInterview();
report.skillGaps.map((q,index)=>(
  <div key={index}>
    <h3>{q.skill}</h3>
    <p>{q.severity}</p>
  </div>
))
};

export default SkillGapPanel;