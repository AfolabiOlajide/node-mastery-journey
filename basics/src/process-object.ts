import process from "node:process";

// console.log(process.cwd()); // current working directory
// console.log(process.execPath); // path to node
// console.log(process.version); // node version

// console.log(process.memoryUsage()); // memory usage

// console.log(process.argv); // command line arguments

const command = process.argv[2] ?? "start";

const shouldFail = process.argv.includes("--fail");
const shouldExit = process.argv.includes("--exit");
const shouldThrow = process.argv.includes("--throw");
const shouldCrash = process.argv.includes("--crash");

process.on("exit", (code) => {
    console.log(`Process exited with code ${code}`);
});

function runAp(): void {
    console.log({
        command,
    });

    if (shouldFail) {
        console.error("Manual failure triggered with --fail flag");
        process.exit(1);
    }

    if (shouldCrash) {
        console.log("Manual crash triggered with --crash flag");
        process.exit(1);
    }
}

runAp();
