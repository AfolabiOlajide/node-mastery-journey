const API_URL = "https://jsonplaceholder.typicode.com/users/1";

type PlaceholderUser = {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
};

type PublicUser = {
    id: number;
    name: string;
    email: string;
    company: string;
};

function transformUser(rawData: PlaceholderUser): PublicUser {
    return {
        id: rawData.id,
        name: rawData.name,
        email: rawData.email,
        company: rawData.company.name,
    };
}

async function fetchExternalUser(): Promise<void> {
    // AbortController --> helps with the functionlity of canceling an inprogress fetchrequest
    const controller = new AbortController();

    const requestTimeout = setTimeout(() => {
        controller.abort();
    }, 300); // 300ms timer is to force the abort of the request (request actually fetches fast)

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            signal: controller.signal, // signal connects the controller to the fetch request
        });

        if (!response.ok) {
            console.error(`Upstream api failed with http ${response.status}`);
            return;
        }

        const rawUser = (await response.json()) as PlaceholderUser;
        const user = transformUser(rawUser);
        console.log(user);
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            console.log("Request was aborted, upstream api took too long");
            return;
        }
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error("Error fetching user: ", message);
    } finally {
        clearTimeout(requestTimeout);
    }
}

fetchExternalUser();
