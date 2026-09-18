// buffers are needed when you need to work with raw binary data
// binary data - data stored in bytes

// reading files
// receiving http req bodies
// working with streams
// handling images, pdf files, videos
// encrypt and hashing

// string - human readable text
// buffers - raw bytes

const textBuffer = Buffer.from("Jude");

console.log("Text to buffer", textBuffer);
console.log("Buffer length", textBuffer.length);
console.log("Buffer to text", textBuffer.toString("utf-8"));

// .alloc
// creates a buffer with a fixed number of bytes
const fixedPrefilledBuffer = Buffer.alloc(5, "idiomatic", "utf-8");
console.log("fixed buffer with options: ", fixedPrefilledBuffer);

const fixedEmptyBuffer = Buffer.alloc(5);
console.log("fixed empty buffer: ", fixedEmptyBuffer);

fixedEmptyBuffer.write("hey"); // .write writes data into a buffer
console.log("fixed empty buffer after write method: ", fixedEmptyBuffer);

// chunks
const bufferChunks: Buffer<ArrayBuffer>[] = [
    Buffer.from("Hello "),
    Buffer.from("Node, "),
    Buffer.from("How "),
    Buffer.from("are "),
    Buffer.from("you."),
];

const combinedBuffer = Buffer.concat(bufferChunks);
console.log("combined Buffer with concat: ", combinedBuffer.toString("utf-8"));
