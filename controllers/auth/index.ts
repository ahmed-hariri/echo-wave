import { AuthTypes } from "../../dto/user";
import { functionControllers } from "../../dto/controllers";
import { SignInRepository, SignUpRepository } from "../../repositories/auth";

/*---> Register User Controller <---*/
export const registerUserController: functionControllers = async (req, res, next) => {
    const { name, phone, password } = req.body as AuthTypes;
    if (!name || !phone || !password) {
        return res.status(400).json({
            message: `You don't have: ${!name ? "name" : ""} ${!phone ? "phone" : ""} ${!password ? "password" : ""}`,
        });
    }

    try {
        const userData: AuthTypes = { name, phone, password };
        const { token, message, data } = await SignUpRepository(userData);

        if (token && data) {
            return res.status(200).json({ token, message, data });
        }

        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};

/*---> Login User Controller <---*/
export const loginUserController: functionControllers = async (req, res, next) => {
    const { phone, password } = req.body as Partial<AuthTypes>;
    if (!phone || !password) {
        return res.status(400).json({
            message: `You don't have: ${!phone ? "phone" : ""} ${!password ? "password" : ""}`,
        });
    }

    try {
        const userData: { phone: string; password: string } = { phone, password };
        const { token, message, data } = await SignInRepository(userData);

        if (token && data) {
            return res.status(200).json({ token, message, data });
        }

        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};
