import jwt from 'jsonwebtoken'

export const authMiddle = (req, res, next) => {
    try {
        const header = req.headers['authorization']
        if (!header) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            })
        }

        const token = header.split(' ')[1]
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user"
                })
            }

            req.userId = decoded.id
            next()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}