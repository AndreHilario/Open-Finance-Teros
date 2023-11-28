import { insertDataIntoDB } from "../controllers/participants-controller";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter
    .post("/insert", insertDataIntoDB)
    .get("/")

export { participantsRouter };