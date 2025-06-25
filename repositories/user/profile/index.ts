import { UserTypes } from "../../../dto/user";
import UserModel from "../../../models/user";

export const getUserInfoRepository = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).select("name phone bio profilePic isOnline lastSeen");
        if (!user) {
            return { success: false, message: "User not found." };
        }

        return { message: "User info fetched successfully.", data: user };
    } catch (error) {
        console.error("Error fetching user info:", error);
        return { message: "Failed to fetch user info:", error };
    }
};

export const updateUserInfoRepository = async (userId: string, information: Partial<UserTypes>) => {
    const { name, bio, profilePic, phone } = information;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        user.name = name ?? user.name;
        user.bio = bio ?? user.bio;
        user.profilePic = profilePic ?? user.profilePic;
        user.phone = phone ?? user.phone;
        const updated = await user.save();

        return { message: "User information updated successfully.", data: updated };
    } catch (error) {
        console.error("Error updating user information:", error);
        return { message: "Failed to update user information:", error };
    }
};