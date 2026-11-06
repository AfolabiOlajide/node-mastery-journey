import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    createUserTasks,
    getAllUserTasks,
    getUserTaskById,
} from "../services/user.task.service";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post("/", async (req, res, next) => {
    try {
        const task = await createUserTasks(req.user!.userId, req.body.title);
        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
});

userTaskRouter.get("/", async (req, res, next) => {
    try {
        const tasks = await getAllUserTasks(req.user!.userId);
        res.status(200).json({
            success: true,
            data: { tasks },
        });
    } catch (error) {
        next(error);
    }
});

userTaskRouter.get("/:taskId", async (req, res, next) => {
    try {
        const task = await getUserTaskById(req.user!.userId, req.params.taskId);
        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
});
