import User from "../models/user.model.js";

export const adminMiddle = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || user.userType !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required" });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};