import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddle = (requiredRole = null) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required"
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // ⭐ Changed from user.userType to user.role
            if (requiredRole && user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: `${requiredRole} access required`
                });
            }

            req.user = user;
            req.userId = user._id;

            next();
        } catch (error) {
            console.error("Auth middleware error:", error.message);
            res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    };
};