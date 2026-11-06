// Uses:
/*
    run code after some delay
    run code repeatedly after some interval

    methods:
    set timeout
    set interval
    clear time out
    clear interval
    set immediate
*/

import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeout(): void {
    console.log("1. Set timeout example started");

    // (callback, delay)
    setTimeout(() => {
        console.log("2. This runs after 3 seconds");
    }, 3000); // time in milliseconds

    console.log(
        "3. This runs immediately, node does not wait for the callback to finish",
    );
}

function runClearTimeout(): void {
    const timerID = setTimeout(() => {
        console.log("This will not run");
    }, 2000);

    clearTimeout(timerID);
    console.log("4. Cleared the new 2 seconds timeout call");
}

// runSetTimeout();
// runClearTimeout();

// Set Interval --> runs the same callback function again and again

function runSetInterval(): void {
    let counter: number = 0;
    const intervalID = setInterval(() => {
        counter++;
        console.log("This will run every 2 seconds");

        if (counter === 5) {
            console.log("Interval is done");
            clearInterval(intervalID);
        }
    }, 2000);
}

// runSetInterval();

// Set Immediate --> runs immediately after the I/O polling phase finishes
// runs after your current sychronous code finishes execution
function runSetImmediate(): void {
    setImmediate(() => {
        console.log("This will run immediately");
    });
    console.log("synchronous code after set immediate");
}

// runSetImmediate();

async function runPromiseTimer(): Promise<void> {
    console.log("Waiting for promise timer");
    await sleep(3000).then(() => {
        throw new Error("Promise timer failed");
    });
    console.log("This will run after 3 seconds");
}

runPromiseTimer().catch((error: Error) => {
    console.error("Promise timer failed", error);
});
