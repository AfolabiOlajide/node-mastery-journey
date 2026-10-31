import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { loginUser, registerUser } from "../services/auth.service";

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

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { accessToken } = await loginUser(email, password);

        res.status(200).json({
            success: true,
            data: { accessToken },
        });
    } catch (error) {
        next(error);
    }
});

authRouter.get("/me", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            user: req.user,
        },
    });
});
