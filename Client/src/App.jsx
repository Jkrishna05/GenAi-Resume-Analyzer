import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./features/auth/AuthContext";
import { InterviewProvider } from "./features/interview/InterviewContext";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <InterviewProvider>
      <Routes/>
      </InterviewProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;