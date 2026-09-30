// this is where you combine all the routes in your application
// plugging all routes in one place

import { Router } from "express";
import { healtRouter } from "./health.routes";

export const apiV1Router = Router();

apiV1Router.use(healtRouter);
