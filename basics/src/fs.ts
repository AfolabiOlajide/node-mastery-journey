// fs - file system
// allows you to work with files and folders
// create folders, read, write, deletes files, check file information

import fsPromise from "fs/promises";
import fs from "node:fs";
import path from "node:path";

// sync apis: fs.readfilesync
//      - used for small scripts
//      - used to build scripts
//      - used for local demo
//      - do not use in http req handlers
//      - do not use in high traffic apis
//      - do not use in background jobs
// callback apis
// promise apis

const DEMO_FOLDER_PATH = path.join(__dirname, "demo-folder");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "new_file.txt");

const LOGS_FOLDER_PATH = path.join(
    __dirname,
    "demo-callback-folder",
    "main-folder",
);
const CALLBACK_FILE_PATH = path.join(LOGS_FOLDER_PATH, "callback-logs.log");
const PROMISE_FILE_PATH = path.join(LOGS_FOLDER_PATH, "promise-logs.log");

type FileResult = {
    style: string;
    fileName: string;
    content: string;
    sizeInByte: number;
};

function runSyncExample(): FileResult {
    // write content to a file
    // if the file does not exist, node will create the file
    // if the file exist, node will replace the content
    fs.writeFileSync(SYNC_FILE_PATH, "Hello World", "utf-8");

    fs.appendFileSync(SYNC_FILE_PATH, " appended using file sync", "utf-8");

    const content = fs.readFileSync(SYNC_FILE_PATH, { encoding: "utf-8" });

    const fileStats = fs.statSync(SYNC_FILE_PATH);

    return {
        style: "sync",
        fileName: path.basename(SYNC_FILE_PATH),
        content,
        sizeInByte: fileStats.size,
    };
}

function writeLog(): void {
    const content = "\nLog 12-04-2027 Warn: this is a bad operation";
    fs.appendFileSync(SYNC_FILE_PATH, content, "utf-8");
}

async function logMain(): Promise<void> {
    try {
        ensureFolderExists(DEMO_FOLDER_PATH);
        writeLog();
        console.log("Write to log success");
    } catch (error) {
        // const message = error instanceof Error ? error.message : "Unknown error";
        console.error("File system error", error);
    }
}

// logMain();

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// using callback api
const ERROR_MESSAGE = `Error \t"Error in page.tsx" \t02:12:2028 \t20:15\n`;
const WARNING_MESSAGE = `Warn \t"Package puny-web is deprecated" \t02:12:2028 \t02:23\n`;
const INFO_MESSAGE = `Info \t"Update outdated packages" \t02:12:2028 \t12:45\n`;

type Message = "Error" | "Warn" | "Info";
function runCallbackFileApi(logMessage: Message): Promise<FileResult> {
    const content = getLogContent(logMessage);

    // trade off of the callback method is that it results to callback hell
    return new Promise((resolve, reject) => {
        // write file
        fs.writeFile(CALLBACK_FILE_PATH, content, "utf-8", (writeError) => {
            if (writeError) {
                reject(writeError);
                return;
            }

            // append file
            fs.appendFile(
                CALLBACK_FILE_PATH,
                getLogContent("Error"),
                "utf-8",
                (appendError) => {
                    if (appendError) {
                        reject(appendError);
                        return;
                    }

                    // read file
                    fs.readFile(
                        CALLBACK_FILE_PATH,
                        "utf-8",
                        (readError, fileContent) => {
                            if (readError) {
                                reject(readError);
                                return;
                            }

                            // get file stat
                            fs.stat(
                                CALLBACK_FILE_PATH,
                                (fileStatError, stats) => {
                                    if (fileStatError) {
                                        reject(fileStatError);
                                        return;
                                    }

                                    resolve({
                                        style: "Callback",
                                        content: fileContent,
                                        fileName:
                                            path.basename(CALLBACK_FILE_PATH),
                                        sizeInByte: stats.size,
                                    });
                                },
                            );
                        },
                    );
                },
            );
        });
    });
}

function getLogContent(messageType: Message): string {
    if (messageType === "Error") return ERROR_MESSAGE;
    if (messageType === "Warn") return WARNING_MESSAGE;

    return INFO_MESSAGE;
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// using file system promise
async function runFsPromise(logMessageType: Message): Promise<FileResult> {
    await fsPromise.writeFile(
        PROMISE_FILE_PATH,
        getLogContent(logMessageType),
        "utf-8",
    );

    await fsPromise.appendFile(
        PROMISE_FILE_PATH,
        getLogContent("Warn"),
        "utf-8",
    );

    const content = await fsPromise.readFile(PROMISE_FILE_PATH, {
        encoding: "utf-8",
    });
    const fileStats = await fsPromise.stat(PROMISE_FILE_PATH);

    return {
        content,
        fileName: path.basename(PROMISE_FILE_PATH),
        sizeInByte: fileStats.size,
        style: "Promise",
    };
}

// ------------------------------------------------------------
// ------------------------------------------------------------
// main function
function ensureFolderExists(folderPath: string): void {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

async function main(): Promise<void> {
    try {
        ensureFolderExists(DEMO_FOLDER_PATH);
        const syncResult = runSyncExample();

        ensureFolderExists(LOGS_FOLDER_PATH);
        const callBackResult = await runCallbackFileApi("Info");
        const promiseResult = await runFsPromise("Error");

        console.log("Sync Result: ", syncResult);
        console.log("Callback Result: ", callBackResult);
        console.log("Promise Result: ", promiseResult);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error("File system error", message);
    }
}

main();
