import OpenAI from "openai";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Zod Schema
const interviewReportSchema = z.object({
  title: z.string(),

  matchPercentage: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillsGapAnalysis: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["Low", "Medium", "High"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      task: z.string(),
    })
  ),
});

export async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {

  const prompt = `
Analyze the candidate profile and job description and generate an interview preparation report.

Return ONLY valid JSON in this EXACT format:

{
"title":"string",
"matchPercentage":number,

"technicalQuestions":[
 {
  "question":"string",
  "intention":"string",
  "answer":"string"
 }
],

"behavioralQuestions":[
 {
  "question":"string",
  "intention":"string",
  "answer":"string"
 }
],

"skillsGapAnalysis":[
 {
  "skill":"string",
  "severity":"Low|Medium|High"
 }
],

"preparationPlan":[
 {
  "day":number,
  "focus":"string",
  "task":"string"
 }
]
}

Job Description:
${jobDescription}

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Rules:
- Return ONLY JSON
- Do NOT skip any field
- Ensure severity values are exactly Low, Medium, or High
`;

  try {

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert technical recruiter generating structured interview reports.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    // Safe JSON parse
    let result;

    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch {
      throw new Error("Invalid JSON returned from AI");
    }

    // Normalize severity (AI sometimes returns lowercase)
    if (result.skillsGapAnalysis) {
      result.skillsGapAnalysis = result.skillsGapAnalysis.map((s) => ({
        ...s,
        severity:
          s.severity?.charAt(0).toUpperCase() +
          s.severity?.slice(1).toLowerCase(),
      }));
    }

    // Validate with Zod
    return interviewReportSchema.parse(result);

  } catch (error) {

    console.log("Groq API failed → returning demo report");
    console.log(error.message);

    // Demo fallback
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
          intention: "To check understanding of React internals.",
          answer:
            "Virtual DOM is a lightweight copy of the real DOM used to optimize rendering.",
        },
      ],

      behavioralQuestions: [
        {
          question: "Tell me about a time you solved a difficult problem.",
          intention: "To evaluate problem solving ability.",
          answer:
            "Explain a real situation using the STAR method (Situation, Task, Action, Result).",
        },
      ],

      skillsGapAnalysis: [
        {
          skill: "System Design",
          severity: "High",
        },
        {
          skill: "Testing",
          severity: "Medium",
        },
      ],

      preparationPlan: [
        {
          day: 1,
          focus: "DSA",
          task: "Practice arrays and hashing problems.",
        },
        {
          day: 2,
          focus: "React",
          task: "Revise hooks and component lifecycle.",
        },
        {
          day: 3,
          focus: "Backend",
          task: "Review REST API design and authentication.",
        },
      ],
    };
  }
}