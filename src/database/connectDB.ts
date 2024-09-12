import { connect } from "mongoose";

const connectDB = async (db: string) => {
    await connect(db);
    console.log('connected to database');
};

export default connectDB;