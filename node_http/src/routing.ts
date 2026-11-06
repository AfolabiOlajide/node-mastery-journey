import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 8080;

const sever = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    // req.url only returns the path
    // localhost:8080/users --> /users
    // localhost:8080/users?id=1 --> /users?id=1
    const url = new URL(req.url ?? "/", `http:${req.headers.host}`); // turn the url into a URL object
    const pathName = url.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
        res.statusCode = 200;
        res.end("Server is healthy");
        return;
    }

    if (method === "GET" && pathName === "/users") {
        res.statusCode = 200;
        res.end("List of users: []");
        return;
    }

    if (method === "POST" && pathName === "/users") {
        res.statusCode = 201;
        res.end("User Created Successfully");
        return;
    }

    if (method === "DELETE" && pathName === "/users") {
        res.statusCode = 201;
        res.end("User Deleted");
        return;
    }

    res.statusCode = 404;
    // 404 -> not found
    res.end("Route not found");
});

sever.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
