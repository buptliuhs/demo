/**
 * per customer bucket
 * * per timeRange bucket (depends on # of seconds)
 */

const EMPTY_INTERVAL_SECONDS = 3;  // 1 minutes
const MAX_NUMBER_OF_REQUESTS = 10; // 1 million requests
const CARRY_OVER_MAX_NUMBER_OF_REQUESTS = 2 * MAX_NUMBER_OF_REQUESTS;

let carryOverBuckets: { [key: number]: number } = {}

/**
 * Customer can make # requests every # seconds
 * @param customerId
 * @return true if the request is allowed, otherwise false
 */
export function rateLimit(customerId: number): boolean {
    if (carryOverBuckets[customerId] === undefined) {
        carryOverBuckets[customerId] = CARRY_OVER_MAX_NUMBER_OF_REQUESTS;
    }
    if (carryOverBuckets[customerId] > 0) {
        // allow when there are carry over
        carryOverBuckets[customerId]--;
        return true;
    }
    return false;
}

/**
 * Empty bucket
 */
function emptyBucket(): void {
    for (const customerId of Object.keys(carryOverBuckets)) {
        const id = Number.parseInt(customerId);
        const sum = carryOverBuckets[id] + MAX_NUMBER_OF_REQUESTS
        carryOverBuckets[id] = sum > CARRY_OVER_MAX_NUMBER_OF_REQUESTS ? CARRY_OVER_MAX_NUMBER_OF_REQUESTS : sum;
    }
}

// Empty bucket per # of minutes
setInterval(emptyBucket, EMPTY_INTERVAL_SECONDS * 1_000);

