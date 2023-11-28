import { ListParticipant, Participant } from "@/protocols";
import participantsService from "@/services/participants-service";
import axios from "axios";
import { Request, Response } from "express";

export async function insertDataIntoDB(_req: Request, res: Response) {
    
}

export async function listAllFromDB(_req: Request, res: Response) {

}

async function acessToOpenBankingParticipants() {
    const baseURL = process.env.OPEN_BANKING;

    try {
        const data: Participant[] = await axios.get(`${baseURL}/participants`);
        const response: ListParticipant[] = await participantsService.returnCorrectJson(data);
        return response;
    } catch (error) {
        return error;
    }
}