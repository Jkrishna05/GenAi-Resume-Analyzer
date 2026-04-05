
import { useInterview } from "../hooks/InterviewHook";
const TechnicalQuestions = () => {

  const { report } = useInterview();
  
  return (

    <div>

      {report.technicalQuestions.map((q, index) => (

        <div key={index}>

          <h3>{q.question}</h3>

          <p>🎯 {q.intention}</p>

          <p>💡 {q.answer}</p>

        </div>

      ))}

    </div>

  );
};

export default TechnicalQuestions;