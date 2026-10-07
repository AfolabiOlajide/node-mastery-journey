import { pool } from "../lib/db";

async function deleteUser(email: string): Promise<void> {
    const result = await pool.query(
        `
        DELETE FROM users
        WHERE email = $1
        `,
        [email],
    );

    console.log(result.rows);
}

deleteUser("admin@capstone.app");
