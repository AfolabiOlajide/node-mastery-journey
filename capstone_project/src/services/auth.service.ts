import bcrypt from "bcryptjs";
import { MIN_PASSWORD_LENGTH, PASSWORD_HASH_SALT } from "../constants";
import { AppError } from "../errors/AppErrors";
import { createUser, findUserByEmail } from "../repositories/user.repository";

export async function registerUser(
    email: string,
    password: string,
): Promise<void> {
    if (!email || !password) {
        throw new AppError(400, "Email and password required.");
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new AppError(400, "Password must be atleast 6 characters long");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // find if user is already present
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
        throw new AppError(409, "User with this email already exist");
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_HASH_SALT);

    await createUser(normalizedEmail, passwordHash);
}
