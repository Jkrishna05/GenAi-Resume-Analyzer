import { parsePDFBuffer } from "../utils/pdfParser.js";
import { cleanText } from "../utils/textCleaner.js";
import { generateInterviewReport } from "../services/aiServices.js";
import InterViewReportModel from "../models/interViewReport.js";

export async function interviewController(req, res) {

  try {

    console.log("file:", req.file);

    const { jobDescription, selfDescription } = req.body;

    // 1️⃣ jobDescription required
    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required"
      });
    }

    if (req.file && req.file.mimetype !== "application/pdf") {
  return res.status(400).json({
    success: false,
    message: "Only PDF files are allowed"
  });
}
    let resumeText = "";

    // 2️⃣ Parse PDF if uploaded
    if (req.file?.buffer) {

      try {

        const pdfData = await parsePDFBuffer(req.file.buffer);

        resumeText = cleanText(pdfData.text);

      } catch (error) {

        console.warn("PDF parsing failed:", error.message);

      }

    }
    const MAX_LENGTH = 6000;
    // 3️⃣ fallback to selfDescription
    const cleanedSelfDescription = cleanText(selfDescription);

   const finalResume = resumeText ? resumeText.substring(0, MAX_LENGTH): "";

    // 4️⃣ ensure at least one exists
    

    // 5️⃣ Generate AI Report
    const interviewReport = await generateInterviewReport({
      jobDescription,
      resume: finalResume,
      selfDescription: cleanedSelfDescription
    });

    // 6️⃣ Save to DB
    const newReport = await InterViewReportModel.create({

      user: req.user.id,
      jobDescription,
      resume: finalResume,
      selfDescription: cleanedSelfDescription,

      title: interviewReport?.title || "AI Interview Report",

      matchPercentage:
        interviewReport?.matchPercentage || 60,

      ...interviewReport

    });

    return res.status(201).json({
      success: true,
      newReport
    });

  } catch (error) {

    console.error("Error generating interview report:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report"
    });

  }

}

export async function interviewReportFind(req, res) {
  try {

    const { id } = req.params;

    const report = await InterViewReportModel.findOne({
      _id: id,
      user: req.user.id
    });

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

  } catch (error) {

    console.error("Error fetching report:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}

export async function interviewReportList(req, res) {
  try {

    const reports = await InterViewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -technicalQuestions -behavioralQuestions -skillsGapAnalysis -preparationPlan -jobDescription"
      );

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

  } catch (error) {

    console.error("Error fetching reports list:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}