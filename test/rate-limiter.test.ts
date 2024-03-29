import { rateLimit, reset } from "../src/rate-limiter";
import { faker } from '@faker-js/faker';

jest.setTimeout(60_000);

const EMPTY_INTERVAL_SECONDS = 3;

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

describe("rateLimiter", () => {
    let timer: NodeJS.Timer;

    beforeAll(() => {
        timer = setInterval(reset, EMPTY_INTERVAL_SECONDS * 1_000);
    });

    afterAll(() => {
        clearInterval(timer);
    })

    it("rateLimit", () => {
        const customerId = faker.number.int();
        let allowed: boolean;
        for (let i = 0; i < 20; i++) {
            allowed = rateLimit(customerId);
            expect(allowed).toBe(true);
        }
        allowed = rateLimit(customerId);
        expect(allowed).toBe(false);
    });

    it("rateLimit allowed after one interval (accumulated)", async () => {
        const customerId = faker.number.int();
        let allowed: boolean;
        console.log("making 20 requests");
        for (let i = 0; i < 20; i++) {
            allowed = rateLimit(customerId);
            expect(allowed).toBe(true);
        }
        allowed = rateLimit(customerId);
        expect(allowed).toBe(false);
        // Wait for 1 minute
        console.log("waiting for 3 seconds");
        await sleep(3 * 1_000);
        console.log("now, make round of requests");
        console.log("making 5 requests");
        for (let i = 0; i < 5; i++) {
            allowed = rateLimit(customerId);
            expect(allowed).toBe(true);
        }
        console.log("waiting for 3 seconds");
        await sleep(3 * 1_000);
        console.log("now, make round of requests");
        console.log("making 15 requests");
        for (let i = 0; i < 15; i++) {
            allowed = rateLimit(customerId);
            expect(allowed).toBe(true);
        }
        console.log("making another request");
        allowed = rateLimit(customerId);
        expect(allowed).toBe(false);
    });
});
