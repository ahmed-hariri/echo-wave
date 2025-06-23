import { addContactRepository, deleteContactRepository } from './../../repositories/contacts/index';
import { functionControllers } from "../../dto/controllers";
import { getAllContactsRepository } from "../../repositories/contacts";

export const getAllContactsController: functionControllers = async (req, res, next) => {
    try {
        const userId = req.data.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const { message, data, error } = await getAllContactsRepository(userId);
        if (data) {
            return res.status(500).json({ message, data });
        }
        return res.status(200).json({ message, error });
    } catch (error) {
        next(error);
    }
};

export const addContactController: functionControllers = async (req, res, next) => {
    try {
        const userId = req.data.id;
        const { phone } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        } else if (!phone) {
            return res.status(400).json({ message: "Contact phone number is required." });
        }

        const { message, error } = await addContactRepository(userId, phone);
        if (error) {
            return res.status(500).json({ message, error });
        }
        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};

export const deleteContactController: functionControllers = async (req, res, next) => {
    try {
        const contactId = req.params.id;
        const userId = req.data.id;

        if (!userId) {
            return res.status(400).type("json").json({ message: "You don't have userId!" })
        } else if (!contactId) {
            return res.status(400).type("json").json({ message: "You don't have contactId!" })
        }

        const { message, error } = await deleteContactRepository(contactId, userId);
        if (error) {
            return res.status(500).json({ message, error });
        }
        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};