import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = path.join("public");

        if (req.baseUrl.includes("category")) {
            dir = path.join("public", "category");
        }

        if (req.baseUrl.includes("menu")) {
            dir = path.join("public", "items");
        }

        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

export default multer({ storage, fileFilter });
