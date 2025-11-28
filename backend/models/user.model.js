import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'delivery']
    }
}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User