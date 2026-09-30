// entry file for express
// express related logic

import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiV1Router } from "./routes";

export function createApp() {
    const app = express();

    // express built in middlewares
    app.use(cors());
    app.use(express.json()); // body parser
    app.use(express.urlencoded({ extended: true })); // body parser

    app.use("/api/v1", apiV1Router);

    // created middlewares
    app.use(notFound);
    app.use(errorHandler);

    return app;
}
