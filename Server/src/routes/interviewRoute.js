import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { interviewController,interviewReportFind,interviewReportList} from '../controllers/interviewControllers.js';
import upload from '../middleware/multer.js';

const interviewRouter = express.Router();

interviewRouter.post("/generate",authMiddleware,upload.single('resume'),interviewController);
interviewRouter.get("/report/:id",authMiddleware,interviewReportFind);
interviewRouter.get("/reports",authMiddleware,interviewReportList);

export default interviewRouter;