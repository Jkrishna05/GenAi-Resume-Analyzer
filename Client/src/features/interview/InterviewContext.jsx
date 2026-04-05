import { createContext, useState, useEffect } from 'react';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportsList, setReportsList] = useState([]);
 

    return (
        <InterviewContext.Provider value={{ report, setReport, loading, setLoading, reportsList, setReportsList }}>
            {children}
        </InterviewContext.Provider>
    );
}