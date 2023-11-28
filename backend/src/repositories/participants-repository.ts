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

const participantsRepository = {
    postParticipantsIntoDB
};

export default participantsRepository;