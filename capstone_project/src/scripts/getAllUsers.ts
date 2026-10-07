import { pool } from "../lib/db";

async function getAllUsers(): Promise<void> {
    const result = await pool.query(`
        SELECT * FROM users;
        `);

    console.log(result.rows);
}

getAllUsers();
