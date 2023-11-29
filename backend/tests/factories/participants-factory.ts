import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function insertParticipant() {

    return await prisma.participants.create({
        data: {
            name: faker.internet.userName(),
            logoUrl: faker.image.url(),
            discoveryUrl: faker.internet.url()
        },
    });
}
