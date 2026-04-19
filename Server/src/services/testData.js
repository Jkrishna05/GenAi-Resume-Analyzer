const resume = ` Name: Rahul Sharma
Role: Full Stack Developer

Skills

JavaScript
React.js
Node.js
Express.js
MongoDB
REST APIs
HTML
CSS
Tailwind CSS
Git
Data Structures and Algorithms

Projects

1. Real - Time Chat Application

Built a real - time messaging platform using React and Node.js.
    Implemented user authentication using JWT.
    Designed REST APIs for sending and receiving messages.
Used MongoDB to store user data and chat history.

2. Task Management System

Developed a task management web app to manage daily tasks.
Implemented CRUD operations using Express and MongoDB.
    Built responsive UI using React and Tailwind CSS.

    Education

B.Tech in Computer Science
XYZ Institute of Technology
2024 - 2028`;
const selfDescription=`I am a passionate full stack developer with strong interest in building scalable web applications. I enjoy working with modern JavaScript technologies like React and Node.js. I have experience building projects such as a real-time chat application and a task management system. I am comfortable working with REST APIs, MongoDB, and Git. I enjoy solving problems using data structures and continuously improving my development skills. I am eager to contribute to a collaborative engineering team and build impactful software products.
`;
const JobDescription=`We are looking for a Junior Full Stack Developer to join our engineering team.

Responsibilities:

* Build responsive web applications using React.js
* Develop RESTful APIs using Node.js and Express
* Work with MongoDB or SQL databases
* Collaborate with frontend and backend developers
* Write clean, maintainable, and scalable code

Required Skills:

* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* REST APIs
* Git
* Understanding of Data Structures and Algorithms

Preferred Skills:

* Experience with JWT authentication
* Familiarity with cloud platforms like AWS
* Knowledge of Docker and CI/CD
`;


export {JobDescription,selfDescription,resume};


const interviewReportSchema = z.object({
    matchPercentage: z.number().describe("The percentage match between the candidate's profile and the job description."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview."),
        intention: z.string().describe("The intention behind the technical question."),
        answer: z.string().describe("The answer provided by the candidate or the aproach followed to ans that question")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview."),
        intention: z.string().describe("The intention behind the behavioral question."),
        answer: z.string().describe("The answer provided by the candidate or the aproach followed to ans that question")
    })),
    skillsGapAnalysis: z.array(z.object({
        skill: z.string().describe("The specific skill that has a gap."),
        severity: z.enum(['Low', 'Medium', 'High']).describe("The severity level of the skill gap."),
    })),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan."),
        focus: z.string().describe("The main focus or topic for that day."),
        task: z.string().describe("The specific task or activity to be completed on that day.")
    })),
    title: z.string().describe("The title of the interview report.")

});



 return {
      title: "Demo AI Interview Report",
      matchPercentage: 65,

      technicalQuestions: [
        {
          question: "Explain the difference between REST and GraphQL.",
          intention: "To test backend API knowledge.",
          answer:
            "REST uses multiple endpoints while GraphQL allows fetching specific data through a single endpoint.",
        },
        {
          question: "What is React Virtual DOM?",
          intention: "To evaluate React internals understanding.",
          answer:
            "Virtual DOM is a lightweight representation of the real DOM used by React to optimize UI updates.",
        },
      ],

      behavioralQuestions: [
        {
          question: "Tell me about a time you solved a difficult problem.",
          intention: "To assess problem-solving ability.",
          answer:
            "Candidate explained solving a complex debugging issue in a web application.",
        },
        {
          question: "How do you handle tight deadlines?",
          intention: "To test time management and stress handling.",
          answer:
            "Candidate prioritizes tasks, breaks them into smaller goals, and communicates progress with the team.",
        },
      ],

      skillsGapAnalysis: [
        {
          skill: "System Design",
          severity: "High",
        },
        {
          skill: "Advanced Data Structures",
          severity: "Medium",
        },
        {
          skill: "Testing (Jest / Unit Testing)",
          severity: "Low",
        },
      ],

      preparationPlan: [
        {
          day: 1,
          focus: "Data Structures",
          task: "Practice arrays, hashing, and two-pointer problems.",
        },
        {
          day: 2,
          focus: "React Concepts",
          task: "Revise hooks, lifecycle, and component optimization.",
        },
        {
          day: 3,
          focus: "System Design",
          task: "Study basics of scalable web architecture.",
        },
        {
          day: 4,
          focus: "Mock Interview",
          task: "Solve 3 DSA problems and practice behavioral answers.",
        },
        {
          day: 5,
          focus: "Revision",
          task: "Review mistakes and improve weak topics.",
        },
      ],
    };