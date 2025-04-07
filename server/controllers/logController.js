import Log from "../models/Log.js";

export const getLogs = async(req,res) => {
    try {
		const logs = await Log.find().sort({ timestamp: -1 });
		res.json(logs);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch logs" });
	}
}