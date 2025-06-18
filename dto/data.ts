import { UserTypes } from "./user";

export { };

declare global {
    namespace Express {
        interface Request {
            data?: UserTypes;
        }
    }
}