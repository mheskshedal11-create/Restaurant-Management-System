import jwt from "jsonwebtoken";

export const authMiddle = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) return res.status(401).json({ success: false, message: "Invalid or expired token" });
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Authentication error" });
    }
};