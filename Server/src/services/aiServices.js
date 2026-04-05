import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from 'dotenv';
dotenv.config();

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
console.log("MONGODB_URI:", process.env.MONGODB_URI);


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

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});


export async function generateInterviewReport({ jobDescription, resume, selfDescription }) {

    const prompt = `Generate a comprehensive interview report based on the following information:
job Description:
${jobDescription}
Candidate's Resume:
${resume}
Candidate's Self Description:
${selfDescription}
 `;
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
   

  return JSON.parse(response.text);
}

