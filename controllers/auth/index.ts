import { LoginTypes, RegisterTypes } from "../../dto/user";
import { functionControllers } from "../../dto/controllers";
import { SignInRepository, SignUpRepository } from "../../repositories/auth";

/*---> Register User Controller <---*/
export const registerUserController: functionControllers = async (req, res, next) => {
    const { name, phone, password } = req.body as RegisterTypes;

    try {
        const { token, message, data } = await SignUpRepository({ name, phone, password });
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
    const { phone, password } = req.body as LoginTypes;

    try {
        const { token, message, data } = await SignInRepository({ phone, password });
        if (token && data) {
            return res.status(200).json({ token, message, data });
        }

        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};
