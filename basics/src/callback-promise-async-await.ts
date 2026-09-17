type User = {
    id: number;
    name: string;
    role: "user" | "super-admin";
};

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        role: "user",
    },
    {
        id: 2,
        name: "Jane Doe",
        role: "super-admin",
    },
    {
        id: 3,
        name: "Bob Doe",
        role: "user",
    },
];

// Callback is a function that you pass into another function as a parameter
// callback(error, result) -> *** classic nodejs callback pattern
function findUserWithId(
    userId: number,
    callback: (error: Error | null, user?: User) => void,
): void {
    setTimeout(() => {
        // model api call
        const user = users.find((currentUser) => currentUser.id === userId);

        if (!user) {
            callback(new Error(`User with id:${userId} not found.`));
            return;
        }

        callback(null, user);
    }, 500);
}

// findUserWithId(5, (error, user) => {
//     if (error) {
//         console.error("Calback error: ", error);
//         return;
//     }

//     console.log(`User Found:`, user);
// });

// Promise implementation
function findUserWithPromise(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        // timeout models api call
        setTimeout(() => {
            const user = users.find((currentUser) => currentUser.id === userId);
            if (!user) {
                reject(new Error(`User with id ${userId} not found`));
                return;
            }

            resolve(user);
        }, 1000);
    });
}

// findUserWithPromise(5)
//     .then((user) => {
//         console.log("User found: ", user);
//     })
//     .catch((error) => {
//         console.error("Error in promise: ", error);
//     });

// async await
async function findUserWithAsync(userId: number): Promise<void> {
    try {
        const user = await findUserWithPromise(userId);
        console.log("Async response: ", user);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown";
        console.error("Error from async: ", message);
    }
}

findUserWithAsync(100);
