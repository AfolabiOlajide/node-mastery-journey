import { Router } from "express";

export const healtRouter = Router();

healtRouter.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Application running successfully",
    });
});
