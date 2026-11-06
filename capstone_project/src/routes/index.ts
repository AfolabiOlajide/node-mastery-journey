// this is where you combine all the routes in your application
// plugging all routes in one place

import { Router } from "express";
import { adminTaskRouter } from "./admin.task.route";
import { authRouter } from "./auth.routes";
import { healtRouter } from "./health.routes";
import { userTaskRouter } from "./user.task.routes";

export const apiV1Router = Router();

apiV1Router.use(healtRouter);
apiV1Router.use("/auth", authRouter);
apiV1Router.use("/tasks", userTaskRouter);
apiV1Router.use("/admin/tasks", adminTaskRouter);
