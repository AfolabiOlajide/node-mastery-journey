import { MAX_TITLE_LENGTH } from "../constants";
import { AppError } from "../errors/AppErrors";
import {
    createTask,
    fetchTaskByTaskIdUserId,
    fetchTaskByUserId,
} from "../repositories/user.task.repository";
import { Task } from "../types/tasks";

function validateTitle(title: unknown): string {
    if (typeof title !== "string" || !title.trim()) {
        throw new AppError(400, "Title is required");
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
        throw new AppError(400, `Title must be ${MAX_TITLE_LENGTH} or less.`);
    }

    return trimmedTitle;
}

export async function createUserTasks(
    userId: string,
    title: unknown,
): Promise<Task> {
    const validTitle = validateTitle(title);
    return createTask(userId, validTitle);
}

export async function getAllUserTasks(userId: string): Promise<Task[]> {
    return fetchTaskByUserId(userId);
}

export async function getUserTaskById(
    userId: string,
    taskId: string,
): Promise<Task> {
    const task = await fetchTaskByTaskIdUserId(userId, taskId);
    if (!task) {
        throw new AppError(404, "Task not found");
    }

    return task;
}
