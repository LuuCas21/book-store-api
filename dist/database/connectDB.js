import { connect } from "mongoose";
const connectDB = async (db) => {
    await connect(db);
    console.log('connected to database');
};
export default connectDB;
