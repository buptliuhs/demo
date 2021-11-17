import {rateLimit} from "../src/demo1";
import * as faker from "faker";

jest.setTimeout(60_000);

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

describe("rateLimit", () => {
    it("rateLimit", () => {
        const customerId = faker.datatype.number();
        let allowed: boolean;
        for (let i = 0; i < 20; i++) {
            allowed = rateLimit(customerId);
            expect(allowed).toBe(true);
        }
        allowed = rateLimit(customerId);
        expect(allowed).toBe(false);
    });

    // it("rateLimit allowed after one interval", async () => {
    //     const customerId = faker.datatype.number();
    //     let allowed: boolean;
    //     for (let i = 0; i < 10; i++) {
    //         allowed = rateLimit(customerId);
    //         expect(allowed).toBe(true);
    //     }
    //     allowed = rateLimit(customerId);
    //     expect(allowed).toBe(false);
    //
    //     // Wait for 1 minute
    //     console.log("waiting for 3 seconds");
    //     await sleep(3 * 1_000);
    //     console.log("now, make another request");
    //
    //     allowed = rateLimit(customerId);
    //     expect(allowed).toBe(true);
    // });

    it("rateLimit allowed after one interval (accumulated)", async () => {
        const customerId = faker.datatype.number();
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
