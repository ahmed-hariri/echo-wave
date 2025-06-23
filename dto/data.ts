import { UserTypes } from "./user";

export { };

declare global {
    namespace Express {
        interface Request {
            data?: UserTypes;
        }
    }
}

// Extend the Socket interface to include userId
declare module "socket.io" {
    interface Socket {
        userId?: string;
    }
}