import { urlencoded } from "express";
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    method: String,
    url: String,
    status: Number,
    ip: String,
    userAgent: String,
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const Log = mongoose.model("Log", logSchema);
export default Log;