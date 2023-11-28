import { ListParticipant, Participant } from "@/protocols";
import participantsRepository from "../repositories/participants-repository";

async function insertIntoDB(data: ListParticipant) {
    const existingParticipants = await participantsRepository.getParticipantsFromDB();
    if (!existingParticipants) return await participantsRepository.postParticipantsIntoDB(data);

    const newDataToInsert = data.filter(newParticipant => {
        return !existingParticipants.some(existingParticipant =>
            existingParticipant.name === newParticipant.name &&
            existingParticipant.logoUrl === newParticipant.logoUrl &&
            existingParticipant.discoveryUrl === newParticipant.discoveryUrl
        );
    });

    return await participantsRepository.postParticipantsIntoDB(newDataToInsert);
}

async function listAllFromDB() {
    const participants = await participantsRepository.getParticipantsFromDB();
    return participants;
}

async function returnCorrectJson(data: Participant) {
    try {
        const formattedData = data.data.map(participant => {

            const authorizationServers = participant.AuthorisationServers.map(server => {
                return {
                    name: participant.OrganisationName,
                    logoUrl: server.CustomerFriendlyLogoUri,
                    discoveryUrl: server.OpenIDDiscoveryDocument,
                };
            });

            return authorizationServers;
        });

        const flattenedData = formattedData.flat();

        return flattenedData;
    } catch (error) {
        throw error;
    }
}

const participantsService = {
    returnCorrectJson,
    insertIntoDB,
    listAllFromDB
}

export default participantsService;