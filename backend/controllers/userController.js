
import User from "../model/user.model.js"
import bcrypt from 'bcrypt'
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

export const updateController = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone

        await user.save()

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Update profile failed'
        })
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).json({
                success: false,
                message: 'please provide all filed '
            })

        }
        const user = await User.findOne({ email, answer })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword
        await user.save()
        res.status(200).json({
            success: true,
            message: 'password Reset Successfully'
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'resetpassword failed'
        })
    }
}