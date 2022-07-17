import  express  from "express";
import { ValidationError } from "objection";
import { Log, Habit } from "../../../models/index.js";
import tablesLogsRouter from "./tablesLogsRouter.js";

const logHabitsRouter = new express.Router();
logHabitsRouter.use('/:habitId/tables', tablesLogsRouter)
export default logHabitsRouter