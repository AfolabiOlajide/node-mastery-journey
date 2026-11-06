/**
 * Used when you want to handle data peice by peice
 * you are not loading the data all at once
 * read large files
 * upload files
 * download files
 * audio/video processing
 * compression
 * stream does not give data immediately but in chunks
 */

/**
 * Stream Types:
 *      - readable stream: source of data, consumes the data
 *      - writeable stream: destination where the data is written
 *      - transform stream: read the data, change the data (modification) and then pass it forward
 */

/**
 * Note:
 *      - Each chunk of data is a byte (make reference to buffers)
 *      - Strems work with chunks
 */

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

// Readable stream
const readableStream = Readable.from([
    "Hello ",
    "from ",
    "Node.js ",
    "streams (readable)",
]);

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const text = chunk.toString();

        callback(null, text.toUpperCase());
    },
});

// writeable is going to write data to a particular file or send data to an http server or upload data to the cloud
const writableStream = new Writable({
    write(chunk, encoding, callback) {
        console.log("received chunk", chunk.toString());

        // what this callback does is that it tells node that it is done with handling this particular chunk
        // and it should move it unto the next
        callback();
    },
});

// A pipeline is what is used to connect all these streams together
async function main(): Promise<void> {
    try {
        // you need the source and destination as part of the pipeline
        // the transform is just there to handle side effects of the chunks
        await pipeline(readableStream, uppercaseTransform, writableStream);
        console.log("Stream completed.");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown";
        console.error("Stream failed: ", message);
    }
}

main();
