import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 8080;

// http.createServer --> creates a low level http server
// the callback is going to run for every incoming http request

/**
 * req -> request object
 * methods -> get, post, put, options, delete
 * req.url -> /users, /
 *  headers --> these are metadata sent by the client
 * */

/**
 * res -> respose object
 * sends status code, response headers, response body
 */

const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        const method = req.method;

        // get -> read data
        // post -> creating data
        // put -> replace data (update)
        // patch -> update partial data
        // delete -> deleting data

        const url = req.url;
        // which path is the client requesting

        // headers are metatdata, they are extra information you send along with your request
        const userAgent = req.headers["user-agent"];

        res.statusCode = 200;
        // sets the http status code

        res.setHeader("Content-Type", "text/plain");

        // what this does is to finish this particular request/response after all operations are complete
        // if you do not end, the browser/client will wait thinking you are still sending something from the server
        res.end(
            `Basic HTTP sever: \n\t\t Method: ${method}, URL: ${url}, User Agent: ${userAgent}`,
        );
    },
);

server.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});
