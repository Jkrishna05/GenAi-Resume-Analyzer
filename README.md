# 🤖 GenAI Resume Analyzer

An AI-powered interview preparation tool that analyzes a candidate’s **resume or self-description** against a **job description** and generates a structured interview preparation report.

The system uses **Generative AI** to evaluate the alignment between the candidate profile and the target role, then produces a detailed report including:

* 📊 Match Score with the job role
* 💻 Technical interview questions
* 🧠 Behavioral interview questions
* 📚 Personalized preparation plan
* 📉 Skill gap analysis
* 📜 History of previously generated reports

This project helps candidates **understand their readiness for a role and prepare for interviews more effectively.**

---

# 🚀 Features

## 1️⃣ AI Resume / Profile Analysis

Users can either:

* Upload their **resume**, or
* Provide a **self description** of their skills and experience.

They also enter the **job description** for the role they want to apply for.

The AI model analyzes both inputs and generates an interview readiness report.

---

## 2️⃣ AI Generated Interview Report

The system produces a **structured report** that includes:

### 📊 Match Score

A calculated score representing how well the candidate’s profile matches the job description.

### 💻 Technical Questions

AI generates role-specific technical questions based on:

* Required technologies
* Skills mentioned in the job description
* Candidate experience level

Example:

* React performance optimization
* REST API design
* Database indexing strategies

---

### 🧠 Behavioral Questions

Behavioral interview questions based on common hiring patterns.

Example:

* Describe a challenging project you worked on.
* How do you handle tight deadlines?
* Tell me about a time you resolved a team conflict.

---

### 📚 Preparation Plan

A personalized preparation roadmap that may include:

* Key concepts to revise
* Technologies to focus on
* Interview topics to practice
* Suggested learning path

---

### 📉 Skill Gap Insights

The AI highlights **missing or weak skills** relative to the job description so the user knows where improvement is needed.

---

## 3️⃣ Interview Report History

Users can access a **history dashboard** where all previously generated reports are stored.

Features:

* View all past reports
* Click any report to reopen the full analysis
* Track improvement across multiple job roles

---

# 🧭 Application Workflow

1. User enters:

   * Resume / self description
   * Job description

2. The application calls the **AI generation API**.

3. The system:

   * Analyzes both inputs
   * Generates a structured interview report
   * Stores the report in the database.

4. The user is redirected to the **report page**.

5. The report displays:

   * Match score
   * Technical questions
   * Behavioral questions
   * Preparation plan
   * Skill gap analysis.

6. The report is saved and available later in the **history page**.

---

# 🧱 System Architecture

Frontend → API → AI Model → Database → Report UI

**Flow**

User Input
↓
Generate Report API
↓
AI Processing (LLM)
↓
Structured Report Generation
↓
Save Report in Database
↓
Display Report to User
↓
Store in History Dashboard

---

# 🛠 Tech Stack

### Frontend

* React
* React Router
* Context API
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Generative AI / LLM API

### Database

* MongoDB

---

# 📂 Core Pages

### Home Page

* Submit resume / self description
* Provide job description
* Generate AI report

### Report Page

Displays structured AI output:

* Match score
* Technical questions
* Behavioral questions
* Preparation plan
* Skill gap analysis

### History Page

* Shows previously generated reports
* Click to reopen any report

---

# 🎯 Use Cases

This tool helps:

* Students preparing for technical interviews
* Developers targeting specific roles
* Candidates analyzing job-fit before applying
* Professionals identifying skill gaps

---

# 🔮 Future Improvements

* Resume PDF parsing
* AI follow-up interview simulation
* Skill radar chart visualization
* Real-time AI streaming responses
* Interview question practice mode

---

# 📜 License

This project is intended for **learning and portfolio demonstration purposes**.

---

# 👨‍💻 Author

Developed as a **Generative AI interview preparation tool** to demonstrate full-stack development and AI integration capabilities.
