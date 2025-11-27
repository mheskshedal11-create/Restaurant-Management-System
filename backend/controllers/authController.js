import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { userName, email, password, address, phone, answer } = req.body;

        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            password: hashPassword,
            address,
            phone,
            answer
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Register",
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid email",
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: existingUser._id,
                name: existingUser.userName,
                email: existingUser.email,
                phone: existingUser.phone,
            },
            token,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};
