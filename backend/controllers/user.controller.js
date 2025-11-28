
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import fs from 'fs'
import ErrorHandler from "../utils/error.handler.js"
import SuccessHandler from "../utils/success.handler.js"
import { updateProfileValidation } from "../validations/auth.validation.js"

// to fetch the profile
export const getUserController = async (req, res) => {
    try {

        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        user.password = undefined

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}
//for update profile
export const updateController = async (req, res, next) => {
    try {
        const { error } = updateProfileValidation.validate(req.body);
        if (error) {
            if (req.file) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const user = await User.findById(req.userId);
        if (!user) {
            if (req.file) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler('User not found', 404));
        }

        const { fullName, email } = req.body;
        const updates = { fullName, email };

        if (req.file) {
            updates.ProfileImage = req.file.filename;
            if (user.profileImage) {
                const oldPath = `public/user/${req.userId}/${user.profileImage}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            updates,
            { new: true }
        );

        updatedUser.password = undefined;

        new SuccessHandler('User updated successfully', { user: updatedUser }, 200).send(res);

    } catch (error) {
        console.error(error);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({
            success: false,
            message: 'Update profile failed'
        });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Your account has been deleted"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}