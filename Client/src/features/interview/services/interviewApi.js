import axios from 'axios';

const api=axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export const generateInterviewReport = async ({ jobDescription, resume, selfDescription }) => {
      try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        const blob = new Blob([resume], { type: 'text/plain' });
        formData.append('resume', blob, 'resume.txt');
        const response = await api.post('/interview/generate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
      } catch (error) {
        console.error("Error generating interview report:", error);
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