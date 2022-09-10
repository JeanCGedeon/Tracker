import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";
const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new","/habits",'/habits/:id',"/habits/:id&myLogs",
"/habits/:id&logPost","/logs/:id&myLogs","/logs/:id","/logs/:id&logPost","/graphs","/graphs/:id",
"/allusers"];

const authedClientRoutes = ["/profile"];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});


router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new")
  }
});



export default router;
