import { Router } from "express";
import { registerUser } from "../services/auth.service";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // do not write business logic here, it should be in the service folder
        await registerUser(email, password);

        res.status(201).json({
            success: true,
            message: "Registeration successful. Please login to continue",
        });
    } catch (error) {
        next(error);
    }
});
