import React, { useState } from "react";
import { useInterview } from "../hooks/InterviewHook";
import Header from "../components/Header";


const HomePage = () => {

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");
    const { handleGenerateReport } = useInterview();
    const handleFileUpload = (e) => {

        const file = e.target.files[0];

        if (!file) {
            console.log("📁 No file selected");
            return;
        }

        console.log("📁 File selected:", {
            name: file.name,
            size: file.size,
            type: file.type
        });

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only PDF or DOCX files are allowed");
            console.error("❌ Invalid file type:", file.type);
            return;
        }

        console.log("✅ File accepted:", file.name);
        setError("");
        setResume(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobDescription || (!selfDescription && !resume)) {
            setError("All fields are required");
            return;
        }

        console.log("📝 Form submitted with:", {
            hasJobDescription: !!jobDescription,
            hasSelfDescription: !!selfDescription,
            hasResume: !!resume,
            resumeName: resume?.name
        });

        const res = await handleGenerateReport({ jobDescription, selfDescription, resume });

        console.log("📊 Report generated:", res);

        setError("");
    };
    // if(Loader){
    //     return <LoadingPage />
    // }
    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f1113] via-[#121417] to-[#0f1113] text-slate-200">
            <Header />

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
                                name="jobDescription"
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                                placeholder="Paste job description..."
                                className="w-full h-80 lg:h-90 bg-slate-950/70 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                                        PDF or DOCX, max 5MB
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
                                <hr className="grow border-t border-slate-700" />
                                <span className="px-4 text-violet-400 font-semibold text-2xl">
                                    or
                                </span>
                                <hr className="grow border-t border-slate-700" />
                            </div>

                            {/* Self Description */}

                            <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

                                <h2 className="font-bold text-lg mb-4">
                                    Self Description *
                                </h2>

                                <textarea
                                    name="selfDescription"
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
                                className="w-full bg-linear-to-r from-violet-600 to-indigo-700 py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition shadow-lg disabled:opacity-50"
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