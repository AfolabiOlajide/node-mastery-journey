// when a user registers you might need to:
//      - send a welcome email
//      - write a log
//      - notify some other service

// emit one event --> listeners listen to this event and do something

import EventEmitter from "node:events";

// .on() - register one listener
// .once() - register one listener that will be called only once
// .emit() - trigger an event and send the event to the listeners

const appEvents = new EventEmitter();

const USER_REGISTERED_EVENT = "user:registered";
const APP_STARTED_EVENT = "app:start";

type UserRegisterPayload = {
    id: number;
    email: string;
};

appEvents.on(USER_REGISTERED_EVENT, (user: UserRegisterPayload) => {
    console.log(`Email listener: Welcome email has been sent to ${user.email}`);
});
// you can have multiple listeners for the same event
appEvents.on(USER_REGISTERED_EVENT, (user: UserRegisterPayload) => {
    console.log(
        `Log listener: User ${user.id} has been registered ${user.email}`,
    );
});

// register event that will be called once
appEvents.once(APP_STARTED_EVENT, () => {
    console.log("App started");
});

function registerUser(): void {
    const user = {
        id: 1,
        email: "d4d4I@example.com",
    };

    console.log("user registered and saved");

    appEvents.emit(USER_REGISTERED_EVENT, user);

    console.log("Register user: Event listener completed");
}

appEvents.emit(APP_STARTED_EVENT);

registerUser();

appEvents.emit(APP_STARTED_EVENT); // this event will be ignored since it has been called once
