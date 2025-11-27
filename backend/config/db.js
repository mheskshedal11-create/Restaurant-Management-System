import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('database connect successfylly')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection