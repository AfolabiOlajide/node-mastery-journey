// build and read file path
import path from "node:path";

// const filePath = projectRoot + "/uploads" + filename ---> this is bad practice

// path.join : uses the correct separator for the current OS
// CREATES a path string, but does not create the file or directory
const filePath = path.join(
    __dirname,
    "uploads",
    "images",
    "user-id",
    "water-photo.jpg",
);

console.log("File path: ", filePath);

// Returns the final part of the path
const fileName = path.basename(filePath);

const extName = path.extname(filePath);
const parentFolder = path.dirname(filePath);

console.log("File name: ", fileName);
console.log("Extension name: ", extName);
console.log("Parent directory: ", parentFolder);

const projectRoot = process.cwd();
console.log("Project root:", projectRoot);
