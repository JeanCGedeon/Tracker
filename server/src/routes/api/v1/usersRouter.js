import express from "express";
import passport from "passport";
import Objection from "objection";
import { User, Habit } from "../../../models/index.js";
import router from "../../clientRouter.js";
const { ValidationError } = Objection

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
