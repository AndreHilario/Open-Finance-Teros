import { insertDataIntoDB, listAllParticipantsFromDB } from "../controllers/participants-controller";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter
    .post("/insert", insertDataIntoDB)
    .get("", listAllParticipantsFromDB)

export { participantsRouter };