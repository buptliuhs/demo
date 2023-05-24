export const HIGHEST_PRIORITY = 1;
export const LOWEST_PRIORITY = 10;
export const DEFAULT_PRIORITY = 5;

export class PriorityQueue {
    private map: Map<number, Array<any>>;
    private readonly max: number;

    constructor(max: number = 10) {
        this.map = new Map();
        this.max = max;
    }

    public enqueue(element: any, priority: number = DEFAULT_PRIORITY) {
        if (priority > LOWEST_PRIORITY || priority < HIGHEST_PRIORITY) {
            throw new Error(`Invalid priority: ${priority}. Must be [1, 10].`);
        }
        if (!this.map.has(priority)) {
            this.map.set(priority, []);
        }
        const q: Array<any> = this.map.get(priority)!;
        if (q.length >= this.max) {
            throw new Error(`Limit exceeded for priority: ${priority}.`);
        }
        q.push(element);
    }

    public dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        // Get the lowest priority level
        const lowestPriority = Math.min(...this.map.keys());
        const q = this.map.get(lowestPriority);
        // Remove and return the first element from the array
        const element = q!.shift();
        // If the array is empty, remove the priority level from the Map
        if (q!.length === 0) {
            this.map.delete(lowestPriority);
        }
        return element;
    }

    public isEmpty() {
        return this.map.size === 0;
    }
}
