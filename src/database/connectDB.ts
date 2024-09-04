import mongoose from "mongoose";

const connectDB = async (db: string) => {
    await mongoose.connect(db);
    console.log('connected to database');
};

export default connectDB;