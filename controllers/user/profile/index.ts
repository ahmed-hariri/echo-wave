import { functionControllers } from "../../../dto/controllers";
import { getUserInfoRepository, updateUserInfoRepository } from "../../../repositories/user/profile";

/* ---> Get current user info Controller <--- */
export const getUserInfoController: functionControllers = async (req, res, next) => {
    const userId = req.data?.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID not provided." });
    }

    try {
        const { data, message, error } = await getUserInfoRepository(userId);
        if (data) {
            return res.status(200).json({ data, message });
        }
        return res.status(500).json({ message, error });
    } catch (error) {
        next(error);
    }
};

/* ---> Update current user info Controller <--- */
export const updateUserInfoController: functionControllers = async (req, res, next) => {
    const userId = req.data?.id;
    const { bio, profilePic } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID not found in request." });
    }

    try {
        const { data, message, error } = await updateUserInfoRepository(userId, { bio, profilePic });
        if (data) {
            return res.status(200).json({ message, data });
        }
        return res.status(500).json({ message, error });
    } catch (error) {
        next(error);
    }
};