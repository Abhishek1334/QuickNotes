import Log from "../models/logs.js";

export const logger = async (req, res, next) => {
    res.on("finish", async () => {
        try{
            const newLog = new Log({
                method: req.method,
                url: req.url,
                status: res.statusCode,
                ip: req.ip,
                userAgent: req.headers["user-agent"],
            });

            await newLog.save();
            
        } catch(error){
            console.error("Error logging request:", error.message);
        }
    });

    next();
};
