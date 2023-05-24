import { PriorityQueue } from "../src/priority-queue";

describe("priority-queue", () => {
    it("enqueue & dequeue", () => {
        const pq = new PriorityQueue();
        expect(pq.isEmpty()).toBe(true);
        pq.enqueue('a', 2);
        pq.enqueue('b');
        pq.enqueue('c', 3);
        pq.enqueue('d', 1);
        pq.enqueue('e', 1);
        expect(pq.isEmpty()).toBe(false);
        expect(pq.dequeue()).toEqual('d');
        expect(pq.dequeue()).toEqual('e');
        expect(pq.dequeue()).toEqual('a');
        expect(pq.dequeue()).toEqual('c');
        expect(pq.dequeue()).toEqual('b');
        expect(pq.isEmpty()).toBe(true);
        expect(pq.dequeue()).toBeNull();
    });

    it("invalid priority", () => {
        const pq = new PriorityQueue();
        expect(() => {
            pq.enqueue('a', 0);
        }).toThrow("Invalid priority: 0. Must be [1, 10].");
    });

    it("limit exceeded", () => {
        const pq = new PriorityQueue();
        for (let i = 0; i < 10; i++) {
            pq.enqueue(i, 1);
        }
        for (let i = 0; i < 10; i++) {
            pq.enqueue(i, 2);
        }
        expect(() => {
            pq.enqueue(10, 1);
        }).toThrow("Limit exceeded for priority: 1.");
    });

});
