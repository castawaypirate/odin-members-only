import { Router } from "express";
import { getJoinForm, join } from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/join", getJoinForm);

membershipRouter.post("/join", join);

export default membershipRouter;
