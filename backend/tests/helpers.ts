import { prisma } from "@/config";

export async function cleanDb() {
    await prisma.participants.deleteMany({});
}

