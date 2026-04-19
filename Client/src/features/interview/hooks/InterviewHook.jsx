import { getInterviewReport, generateInterviewReport, getInterviewReportList } from "../services/interviewApi";
import { useContext } from "react";
import { InterviewContext } from "../InterviewContext";
import { useNavigate } from "react-router-dom";

export const useInterview = () => {
    const { report, setReport, loading, setLoading, reportsList, setReportsList } = useContext(InterviewContext);
    const navigate = useNavigate();
    const handleGenerateReport = async ({jobDescription, selfDescription, resume}) => {
        try {
            setLoading(true);
            const response = await generateInterviewReport({jobDescription, selfDescription, resume});
            setReport(response.newReport);
            navigate(`/report/${response.newReport._id}`);
        } catch (error) {
            console.log("Error generating interview report: ", error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetReport = async (id) => {
        try {
            setLoading(true);
            const response = await getInterviewReport(id);
            setReport(response.report);

        } catch (error) {
            console.log("Error fetching interview report: ", error);
        } finally {
            setLoading(false);
        }
    }
    const handleGetReportList = async () => {
        try {
            setLoading(true);
            const response = await getInterviewReportList();
            setReportsList(response.reports);
            return response.reports;
        } catch (error) {
            console.log("Error fetching interview report list: ", error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    return { report, loading, reportsList, handleGenerateReport, handleGetReport, handleGetReportList };

};