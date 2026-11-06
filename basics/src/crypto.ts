import crypto from "node:crypto";

// used for security related tasks
// creating random UUIDs, IDs
// creating secure tokens
// Hashing Data
// to verify if the data was not changed
// encrypt/descrypt

// UUID - Universally Unique Identifier
const randomUUID = crypto.randomUUID();
console.log("random uuid: ", randomUUID);

// password reset token
// email verification token
// session secret, api key
const randomByte = crypto.randomBytes(15).toString("base64url");
console.log("random byte:", randomByte);
const token = crypto.randomBytes(32).toString("hex"); // in hex format one byte becomes 2 characters
console.log("random byte:", token);

// crypto.createHash --> hash converts your data into a fixed length string (one way encryption)
// data => hash
const userInput = "hello world";
const hash = crypto.createHash("sha256").update(userInput).digest("hex"); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
console.log("hash: ", hash);

// crypto.createHmac --> hash converts your data into a fixed length string (one way encryption)
// HMAC = Hash-based Message Authentication Code
// data + secret => signed hash
// webhooks related functionality
// signed tokens
const adminSecret = "admin-secret";
const signature = crypto
    .createHmac("sha256", adminSecret)
    .update(userInput)
    .digest("hex"); // 185222ec1a783500287bfb1669469e7be0eee1b83c0b7f97502dd916d4ef7d27
console.log("hmac signature: ", signature);

const newUserInput = "hello world";
const signatureVerify = crypto
    .createHmac("sha256", adminSecret)
    .update(newUserInput)
    .digest("hex");
console.log("is verified: ", signature === signatureVerify);
