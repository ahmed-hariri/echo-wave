import UserModel from "../../../models/user";

/* ---> Get all contacts of a user repository function <--- */
export const getAllContactsRepository = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate({ path: "contacts", select: "name phone profilePic" });

        if (user?.contacts && user.contacts.length > 0) {
            return { data: user.contacts, message: "All contacts fetched successfully." };
        }
        return { data: [], message: 'Not found any contacts' };

    } catch (error) {
        console.error("Error fetching contacts:", error);
        return { message: "Error fetching contacts:", error };
    }
};

/* ---> Add a contact to user contacts repository function <--- */
export const addContactRepository = async (userId: string, contactPhone: string) => {
    try {
        const contactUser = await UserModel.findOne({ phone: contactPhone });
        if (!contactUser) {
            return { message: "Contact phone number not found." };
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return { message: "User not found." };
        }

        if (user.contacts.some((contact) => contact === contactUser._id.toString())) {
            return { message: "Contact already exists." };
        }

        user.contacts.push(contactUser._id.toString());
        await user.save();
        return { message: "Contact added successfully." };

    } catch (error) {
        console.error("Error adding contact by phone:", error);
        return { message: "Error adding contact.", error };
    }
};

/* ---> Remove a contact from user contacts repository function <--- */
export const deleteContactRepository = async (userId: string, contactPhone: string) => {
    try {
        const contactUser = await UserModel.findOne({ phone: contactPhone });
        if (!contactUser) {
            return { message: "Contact phone number not found." };
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return { message: "User not found." };
        }

        const contactIndex = user.contacts.findIndex(c => c.toString() === contactUser._id.toString());
        if (contactIndex === -1) {
            return { message: "Contact not found in your contacts." };
        }

        user.contacts.splice(contactIndex, 1);
        await user.save();
        return { message: "Contact removed successfully." };

    } catch (error) {
        console.error("Error removing contact by phone:", error);
        return { message: "Error removing contact.", error };
    }
};