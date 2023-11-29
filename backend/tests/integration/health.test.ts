import supertest from "supertest";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import httpStatus from "http-status";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("GET /health", () => {
    it("should return status 200 and a message OK", async () => {
        const response = await server.get("/health");

        expect(response.status).toBe(httpStatus.OK);
        expect(response.text).toEqual("OK");
    });
});
