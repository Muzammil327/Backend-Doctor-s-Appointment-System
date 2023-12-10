import mongoose from "mongoose";
import colors from "colors";
import { MONGO_URL } from "../config.js";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb error`.bgRed.white);
  }
};

export default connectDB;