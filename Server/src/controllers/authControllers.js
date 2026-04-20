import userModel from "../models/userModel.js";
import blacklistTokenModel from "../models/blackListToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const userExist = await userModel.findOne({
        $or: [{ name }, { email }]
    });
    if (userExist) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        name, email, password: hashedPassword
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email

        }
    });
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}
export const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    await blacklistTokenModel.create({ token });
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}
export const getUserProfile = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        user
    });

}