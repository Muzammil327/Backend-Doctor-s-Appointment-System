import app from "./app.js";
import colors from "colors";
import express from "express";
import connectDB from "./util/dbConn.js";
import { PORT,DEV_MODE } from "./config.js";
import doctorRoute from './routes/doctorRoutes.js'

// Connection String
connectDB();

app.use("/api/doctor", doctorRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server ${DEV_MODE} running on port ${PORT}`.bgCyan.white);
});


