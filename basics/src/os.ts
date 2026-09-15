// os => operating system
// cpu information
// memory information
// home/temp directory

import * as os from "node:os";

function runOSDemo(): void {
    console.log("platform: ", os.platform());
    console.log("architecture: ", os.arch());
    console.log("available parallelism: ", os.availableParallelism());
    console.log("CPUs: ", os.cpus());
    console.log("OS type: ", os.type());
}

runOSDemo();
