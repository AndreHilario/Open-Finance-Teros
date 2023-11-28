import { prisma } from "../config";
import { ListParticipant } from "@/protocols";


async function postParticipantsIntoDB(data: ListParticipant) {
    for (const participants of data) {
        await prisma.partitcipants.create({
            data: {
                name: participants.name,
                logoUrl: participants.logoUrl,
                discoveryUrl: participants.discoveryUrl
            },
        });
    }
}

async function getParticipantsFromDB() {
    return await prisma.partitcipants.findMany();
}

const participantsRepository = {
    postParticipantsIntoDB,
    getParticipantsFromDB
};

export default participantsRepository;