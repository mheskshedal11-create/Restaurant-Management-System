import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SuccessHandler from "../utils/success.handler.js";
import ErrorHandler from "../utils/error.handler.js";
import fs from "fs";
import { registerValidation } from "../validations/auth.validation.js";

// ------------------- Register Controller -------------------
export const registerController = async (req, res, next) => {
    try {
        // Validate request body using Joi
        const { error } = registerValidation.validate(req.body);
        if (error) {
            if (req.file) fs.unlinkSync(req.file.path); // delete uploaded image if validation fails
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const { fullName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (req.file) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler('Email already registered', 400));
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Save profile image filename if uploaded
        const profilePath = req.file ? req.file.filename : null;

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            profileImage: profilePath,
            role: "user",
        });

        await newUser.save();

        // Exclude password from response
        const { password: _, ...userData } = newUser.toObject();

        // Send success response
        return new SuccessHandler('User Registered Successfully', { user: userData }, 201).send(res);

    } catch (error) {
        // Delete uploaded image on unexpected error
        if (req.file) fs.unlinkSync(req.file.path);
        next(new ErrorHandler(error.message, 500));
    }
};

// ------------------- Login Controller -------------------
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Simple validation
        if (!email || !password) {
            return next(new ErrorHandler('Both fields are required', 400));
        }

        // Find user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return next(new ErrorHandler('Invalid email', 404));
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return next(new ErrorHandler('Invalid password', 401));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );

        // Exclude password from response
        const { password: _, ...userData } = existingUser.toObject();

        // Send success response
        return new SuccessHandler('Login successful', { user: userData, token }, 200).send(res);

    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};
