import pdfParser from 'pdf-parser';
import { generateInterviewReport } from '../services/aiServices.js';
import InterViewReportModel from '../models/interViewReport.js';


export async function interviewController(req, res) {
      const resume= req.file;
      const resumeText = await (new pdfParser.PDFparse(Uint8Array.from(resume.buffer))).getText();
      const { jobDescription,selfDescription } = req.body;
      const interviewReport = await generateInterviewReport({ jobDescription, resume: resumeText.text, selfDescription });
     const newReport = await InterViewReportModel.create({
        user: req.user.id,
        jobDescription,
        resume: resumeText.text,
        selfDescription,
        ...interviewReport
     });
      res.status(201).json({
        success: true,
        newReport
      });
}
export async function interviewReportFind(req,res){
    const { id } = req.params;
    const report = await InterViewReportModel.findOne({ _id: id, user: req.user.id });
    if (!report) {
        return res.status(404).json({
            success: false,
            message: "Report not found"
        });
    }
    res.status(200).json({
        success: true,
        report
    });
  }
export async function interviewReportList(req,res){
    const reports = await InterViewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -technicalQuestions -behavioralQuestions -skillsGapAnalysis -preparationPlan -jobDescription");
    if (!reports || reports.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No reports found"
        });
    }
    res.status(200).json({
        success: true,
        reports
    });
  }