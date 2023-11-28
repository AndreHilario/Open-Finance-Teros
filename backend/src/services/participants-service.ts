import { Participant } from "@/protocols";


async function returnCorrectJson(data: Participant[]) {
    try {
        const formattedData = data.map(participant => {
            // Extrair as informações necessárias de cada Authorization Server
            const authorizationServers = participant.AuthorisationServers.map(server => {
                return {
                    name: server.CustomerFriendlyName,
                    logoUri: server.CustomerFriendlyLogoUri,
                    openId: server.OpenIDDiscoveryDocument,
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
    returnCorrectJson
}

export default participantsService;