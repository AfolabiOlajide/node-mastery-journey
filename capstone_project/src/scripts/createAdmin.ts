import bcrypt from "bcryptjs";
import { MIN_PASSWORD_LENGTH, PASSWORD_HASH_SALT } from "../constants";
import { pool } from "../lib/db";
import { findUserByEmail } from "../repositories/user.repository";
import { DBUserRow, User } from "../types/user";

async function createAdminUser(email: string, password: string): Promise<User> {
    // check if admin user exists
    const exist = await findUserByEmail(email);
    if (exist) {
        throw new Error("Admin user already exists.");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error("Password length must be more than 6");
    }
    const hashedPassword = hashPassword(password);

    const result = await pool.query<DBUserRow>(
        `
            INSERT INTO users (email, password_hash, role)
            VALUES ($1, $2, 'ADMIN')
            RETURNING id, email, role, created_at
        `,
        [email, hashedPassword],
    );

    return result.rows[0];
}

async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);

    return hashedPassword;
}

// createAdminUser("", "")
//     .then((adminUser) => {
//         console.log("Admin user created successfully: ", adminUser);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
