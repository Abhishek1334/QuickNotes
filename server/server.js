import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import noteRoutes from "./routes/noteRoutes.js"
import logRoutes from "./routes/logRoutes.js"
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

dotenv.config();

const app = express();

app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(express.json());
app.use(logger);


app.use("/api/notes", noteRoutes);
app.use("/api/logs", logRoutes);

app.get("/",(req,res)=>{
    res.send("Server is running!")
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connected successfully !!");
        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        });
	})
	.catch((error) => {
        console.error("MongoDB error", error)
        process.exit(1);
    });

