import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import habitsRouter from "./api/v1/HabitsRouter.js";
import logHabitsRouter from "./api/v1/logHabitsRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/habits", habitsRouter)
rootRouter.use("/api/v1/logs",logHabitsRouter )
export default rootRouter;
