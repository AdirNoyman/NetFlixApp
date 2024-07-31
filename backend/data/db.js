import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

export const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);

        console.log(`Database Connected 🚀😎🤘`);
    } catch (error) {
        console.error(`Error connecting to DB 😫: ${error.message}`);
        process.exit(1);
    }
} 