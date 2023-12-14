import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const dbConfig = async () => {
  try {
    const res = await mongoose.connect(MONGODB_URL);
    console.log(`DB connected : ${res.connection.host}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default dbConfig;
