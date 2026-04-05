import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/InterviewHook";

const HomePage = () => {

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");
    const{ handleGenerateReport} = useInterview()
    const navigate = useNavigate();
    const handleFileUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only PDF or DOCX files are allowed");
            return;
        }

        setError("");
        setResume(file);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!jobDescription || (!selfDescription && !resume)) {
            setError("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resume", resume);
          
        const res=await handleGenerateReport(formData);
        
       
        console.log("Submitted:", {
            jobDescription,
            selfDescription,
            resume
        });
      

        setError("");
    };
    // if(Loader){
    //     return <LoadingPage />
    // }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f1113] via-[#121417] to-[#0f1113] text-slate-200">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-slate-800">

                <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">

                    <h1 className="text-xl font-bold text-violet-400 tracking-wide">
                        SkillSync AI
                    </h1>

                    <div className="hidden md:flex gap-6 text-sm">

                        <Link
                            to="/"
                            className="text-violet-400 font-semibold border-b-2 border-violet-400 pb-1"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/history"
                            className="text-slate-400 hover:text-violet-300"
                        >
                            History
                        </Link>

                        <Link
                            to="/insights"
                            className="text-slate-400 hover:text-violet-300"
                        >
                            Insights
                        </Link>

                    </div>

                </nav>

            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Title */}

                <div className="mb-10">

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Match Your Profile to
                        <span className="text-violet-400 italic">
                            {" "}Any Opportunity
                        </span>
                    </h1>

                    <p className="text-slate-400 max-w-xl">
                        Our AI analyzes your resume and job description to generate
                        personalized insights and interview strategies.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* Job Description */}

                        <div className="lg:col-span-7 backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

                            <div className="flex justify-between mb-4">
                                <h2 className="font-bold text-lg">
                                    Job Description *
                                </h2>

                                <span className="text-xs text-slate-400">
                                    CHARS: {jobDescription.length}
                                </span>

                            </div>

                            <textarea
                                
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                                placeholder="Paste job description..."
                                className="w-full h-[320px] lg:h-[360px] bg-slate-950/70 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />

                        </div>

                        {/* Right Section */}

                        <div className="lg:col-span-5 flex flex-col gap-6">

                            {/* Resume Upload */}

                            <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

                                <h2 className="font-bold text-lg mb-4">
                                    Resume Upload *
                                </h2>

                                <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-violet-500 transition">

                                    <div className="text-3xl text-violet-400">
                                        📄
                                    </div>

                                    <p className="font-semibold">
                                        Upload Resume
                                    </p>

                                    <p className="text-sm text-slate-400">
                                        PDF or DOCX
                                    </p>

                                    <input
                                        
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />

                                </label>

                                {resume && (
                                    <p className="text-sm text-green-400 mt-3">
                                        Uploaded: {resume.name}
                                    </p>
                                )}

                            </div>
                            <div className="flex items-center my-3">
                                <hr className="flex-grow border-t border-slate-700" />
                                <span className="px-4 text-violet-400 font-semibold text-2xl">
                                    or
                                </span>
                                <hr className="flex-grow border-t border-slate-700" />
                            </div>

                            {/* Self Description */}

                            <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

                                <h2 className="font-bold text-lg mb-4">
                                    Self Description *
                                </h2>

                                <textarea
                                    required
                                    value={selfDescription}
                                    onChange={(e) =>
                                        setSelfDescription(e.target.value)
                                    }
                                    placeholder="Tell AI something unique about yourself..."
                                    className="w-full h-28 bg-slate-950/70 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />

                            </div>

                            {/* Error */}

                            {error && (
                                <p className="text-red-400 text-sm">
                                    {error}
                                </p>
                            )}

                            {/* Submit Button */}

                            <button
                                disabled={!jobDescription || !selfDescription && !resume}
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition shadow-lg disabled:opacity-50"
                            >
                                Analyze Job Match →
                            </button>

                        </div>

                    </div>

                </form>

            </main>

        </div>
    );
};

export default HomePage;