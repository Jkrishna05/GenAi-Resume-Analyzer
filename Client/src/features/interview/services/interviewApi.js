import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

export const generateInterviewReport = async ({ jobDescription, resume, selfDescription }) => {
    try {
        const formData = new FormData();

        console.log("📤 Building FormData for API request:", {
            hasJobDescription: !!jobDescription,
            hasSelfDescription: !!selfDescription,
            hasResume: !!resume,
            resumeInfo: resume ? {
                name: resume.name,
                size: resume.size,
                type: resume.type
            } : null
        });

        formData.append("jobDescription", jobDescription);

        if (selfDescription) {
            formData.append("selfDescription", selfDescription);
        }

        if (resume) {
            console.log("📎 Appending resume file:", resume.name);
            formData.append("resume", resume);
        }

        console.log("🚀 Sending POST request to /interview/generate");
        
        const response = await api.post('/interview/generate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log("✅ API Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error generating interview report:", error);
        throw error;
    }
}
export const getInterviewReport = async (id) => {
    try {
        const response = await api.get(`/interview/report/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }
}
export const getInterviewReportList = async () => {
    try {
        const response = await api.get('/interview/reports');
        return response.data;
    } catch (error) {
        console.error("Error fetching interview reports:", error);
        throw error;
    }
}