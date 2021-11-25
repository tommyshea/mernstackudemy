import mongoose from 'mongoose'

const connection = {}

async function connectDb() {
    if (connection.isConnected) {
        console.log("Using existing connection")
        return
    }
    // use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {})
    console.log("DB Connected")
    connection.isConnected = db.connections[0].readyState
}

export default connectDb