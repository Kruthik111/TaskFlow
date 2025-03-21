import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
import "dotenv/config";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`,
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance}`);
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
