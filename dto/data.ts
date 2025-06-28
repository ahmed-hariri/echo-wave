import { UserTypes } from "./user";

export { };

/**
 * Extend Express Request interface to include an optional 'data' property
 * of type UserTypes, allowing user data to be attached to the request object.
 */
declare global {
    namespace Express {
        interface Request {
            data?: UserTypes;
        }
    }
}

/**
 * Extend Socket.IO Socket interface to include an optional 'userId' property,
 * to associate a connected socket with a specific user ID.
 */
declare module "socket.io" {
    interface Socket {
        userId?: string;
    }
}
