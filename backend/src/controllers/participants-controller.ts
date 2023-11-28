import { ListParticipant, Participant } from "@/protocols";
import participantsService from "../services/participants-service";
import axios from "axios";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function insertDataIntoDB(_req: Request, res: Response) {
    try {
        const data = await acessToOpenBankingParticipants();
        const response = await participantsService.insertIntoDB(data);
        return res.status(httpStatus.CREATED).send(response);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    
}

export async function listAllFromDB(_req: Request, res: Response) {

}

async function acessToOpenBankingParticipants() {
    const baseURL = process.env.OPEN_BANKING;

    try {
        const data: Participant = await axios.get(`${baseURL}/participants`);    

        const response = await participantsService.returnCorrectJson(data);
        return response;
    } catch (error) {
        return error;
    }
}