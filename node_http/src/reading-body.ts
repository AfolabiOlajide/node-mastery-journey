import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 8080;
type CreateUserBody = {
    name?: string;
    email?: string;
};

const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        const method = req.method ?? "GET";

        const url = new URL(req.url ?? "/", `http:${req.headers.host}`);
        const pathName = url.pathname;

        res.setHeader("Content-Type", "text/plain");

        if (method === "POST" && pathName === "/users") {
            const chunks: Buffer[] = [];

            // data event is going time node receives a new body chunk
            req.on("data", (chunk: Buffer) => {
                chunks.push(chunk);
            });

            // end event runs when the full request body has arrived
            req.on("end", () => {
                try {
                    const rawBody = Buffer.concat(chunks).toString("utf-8");

                    if (!rawBody) {
                        res.statusCode = 400;
                        res.end("req body required");
                        return;
                    }

                    const body = JSON.parse(rawBody) as CreateUserBody;

                    if (!body.name || !body.email) {
                        res.statusCode = 400;
                        res.end("name and email required");
                        return;
                    }

                    res.statusCode = 201;
                    res.end(
                        `User created name: ${body.name}, email: ${body.email}`,
                    );
                } catch (error) {
                    res.statusCode = 400;
                    res.end("Invalid JSON body");
                }
            });

            req.on("error", () => {
                res.statusCode = 500;
                res.end("Failed to read request body");
            });
            return;
        }

        res.statusCode = 404;
        res.end("Route not found");
    },
);

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
