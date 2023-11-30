import app, { close, init } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { prisma } from "@/config";
import { insertParticipant } from "../factories/participants-factory";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

afterAll(async () => {
    await close();
});

const server = supertest(app);

describe("POST /participants/insert", () => {
    it("should create a participant and return status 201", async () => {
        const beforeCount = await prisma.participants.count();

        const response = await server.post("/participants/insert");

        const afterCount = await prisma.participants.count();

        expect(response.status).toBe(httpStatus.CREATED);
        expect(beforeCount).not.toBe(afterCount);
    });
});

describe("GET /participants", () => {
    it("should return a array with all participants and correct body with status 200", async () => {
        const participant = await insertParticipant();

        const response = await server.get("/participants");
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([
            {
                id: participant.id,
                name: participant.name,
                logoUrl: participant.logoUrl,
                discoveryUrl: participant.discoveryUrl,
                createdAt: participant.createdAt.toISOString(),
                updatedAt: participant.updatedAt.toISOString()
            }
        ]);
    });
});
