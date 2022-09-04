import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import habitsRouter from "./api/v1/habitsRouter.js";
import logHabitsRouter from "./api/v1/logHabitsRouter.js";
import graphsRouter from "./api/v1/graphRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/habits", habitsRouter)
rootRouter.use("/api/v1/logs",logHabitsRouter )
rootRouter.use("/api/v1/graphs", graphsRouter)
export default rootRouter;
