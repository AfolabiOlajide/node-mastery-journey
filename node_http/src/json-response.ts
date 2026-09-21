import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 8080;
type User = {
    id: number;
    name: string;
    email: string;
};

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
};

const users: User[] = [
    { id: 1, name: "John", email: "johndoe@gmail.com" },
    { id: 3, name: "Jane", email: "janedoe@gmail.com" },
];

function sendJson<T>(
    res: ServerResponse,
    statusCode: number,
    body: ApiResponse<T>,
): void {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = statusCode;
    res.end(JSON.stringify(body));
}

// Server
const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        const method = req.method ?? "GET";

        const url = new URL(req.url ?? "/", `http:${req.headers.host}`);
        const pathName = url.pathname;

        if (method === "GET" && pathName === "/") {
            sendJson(res, 200, {
                success: true,
                message: "Server is running",
                data: {
                    routes: ["GET/users"],
                },
            });

            return;
        }

        if (method === "GET" && pathName === "/users") {
            const response: ApiResponse<User[]> = {
                message: "Get user successful",
                success: true,
                data: users,
            };
            sendJson<User[]>(res, 200, response);

            return;
        }

        sendJson<null>(res, 404, {
            success: false,
            message: "Route not found",
            error: `${method} ${pathName} does not exist`,
        });
        return;
    },
);

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
