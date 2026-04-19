import express from 'express';
import userRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from './routes/interviewRoute.js';
 
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));



app.use("/auth", userRouter);
app.use("/interview", interviewRouter);


export default app;