import { getInterviewReport,generateInterviewReport,getInterviewReportList } from "../services/interviewApi";
import { useContext } from "react";
import {InterviewContext} from "../Interviewcontext";
import { useNavigate } from "react-router-dom";

export const useInterview = () => {
    const { report, setReport, loading, setLoading, reportsList, setReportsList } = useContext(InterviewContext);
      const navigate = useNavigate();
    const handleGenerateReport = async (formData) => {
        try {
            setLoading(true);
            const response = await generateInterviewReport(formData);
            setReport(response.data.newReport);
             navigate(`/report/${response.data.newReport._id}`);
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
            setReport(response.data.report);
           
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
            setReportsList(response.data.reports);
        } catch (error) {
            console.log("Error fetching interview report list: ", error);
        } finally {
            setLoading(false);
        }
    }

    return { report, loading, reportsList, handleGenerateReport, handleGetReport, handleGetReportList };
    
};