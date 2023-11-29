import { prisma } from "../config";
import { ListParticipant } from "@/protocols";


async function postParticipantsIntoDB(data: ListParticipant) {
    for (const participants of data) {
        await prisma.participants.create({
            data: {
                name: participants.name,
                logoUrl: participants.logoUrl,
                discoveryUrl: participants.discoveryUrl
            },
        });
    }
}

async function getParticipantsFromDB() {
    return await prisma.participants.findMany();
}

const participantsRepository = {
    postParticipantsIntoDB,
    getParticipantsFromDB
};

export default participantsRepository;