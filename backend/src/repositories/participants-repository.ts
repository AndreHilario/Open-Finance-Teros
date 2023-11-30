import { prisma } from "../config";
import { ListParticipant } from "@/protocols";


async function postParticipantsIntoDB(data: ListParticipant) {
    const participantsArray = [];
    for (const participants of data) {
        const newParticipant = await prisma.participants.create({
            data: {
                name: participants.name,
                logoUrl: participants.logoUrl,
                discoveryUrl: participants.discoveryUrl
            },
        });
        participantsArray.push(newParticipant);
    }
    return participantsArray;
}

async function getParticipantsFromDB() {
    return await prisma.participants.findMany();
}

const participantsRepository = {
    postParticipantsIntoDB,
    getParticipantsFromDB
};

export default participantsRepository;