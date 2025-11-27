import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: 'client',
        emum: ['Client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    answer: {
        type: String,
        required: [true, 'Anser is required']
    }


}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User