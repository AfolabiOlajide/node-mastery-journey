import { pool } from "../lib/db";
import { Task } from "../types/tasks";

type TaskRow = Task;

export async function createTask(userId: string, title: string): Promise<Task> {
    const result = await pool.query<TaskRow>(
        `
            INSERT INTO support_tasks (title, user_id)
            VALUES ($1, $2)
            RETURNING id, title, status, user_id, created_at, updated_at;
        `,
        [title, userId],
    );

    return result.rows[0];
}

export async function fetchTaskByUserId(userId: string): Promise<Task[]> {
    const result = await pool.query<TaskRow>(
        `
        SELECT id, title, status, user_id, created_at, updated_at
        FROM support_tasks 
        WHERE user_id = $1
        ORDER BY created_at DESC;
        `,
        [userId],
    );

    return result.rows;
}
