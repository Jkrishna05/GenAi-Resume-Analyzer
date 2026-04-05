import mongoose from 'mongoose';

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
},{_id: false});
const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
},{_id: false});

const skillsGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },severity:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    }
},{_id: false});

const prepareTionSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    task:{
        type: String,
        required: true
    }
},{_id: false});

const interViewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        // required: true
    },selfDescription: {
        type: String,
        // required: true 
    },matchPercentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillsGapAnalysis: [skillsGapSchema],
    preparationPlan: [prepareTionSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required:true,
    }
}, { timestamps: true });

const InterViewReportModel = mongoose.model('InterViewReport', interViewReportSchema);

export default InterViewReportModel;