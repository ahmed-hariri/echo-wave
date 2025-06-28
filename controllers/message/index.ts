import { functionControllers } from "../../dto/controllers";
import { addMessageRepository, deleteMessageRepository, getAllMessagesRepository, updateMessageRepository } from "../../repositories/message";

/* ---> Get all messages for a conversation Controller <--- */
export const getAllMessagesController: functionControllers = async (req, res, next) => {
    try {
        const conversationId = req.params.conversationId;
        if (!conversationId) {
            return res.status(400).json({ message: "Conversation ID is required." });
        }
        const { message, data, error } = await getAllMessagesRepository(conversationId);
        if (data) {
            return res.status(200).json({ message, data });
        }
        return res.status(500).json({ message, error });
    } catch (error) {
        next(error);
    }
};

/* ---> Add a new message to a conversation Controller <--- */
export const addMessageController: functionControllers = async (req, res, next) => {
    const { conversationId, text } = req.body;
    const senderId = req.data?.id;

    if (!conversationId || !text || !senderId) {
        return res.status(400).json({
            message: `Missing required fields: ${!conversationId ? 'conversationId' : ''} ${!text ? 'text' : ''} ${!senderId ? 'senderId' : ''}`.trim()
        });
    }

    try {
        const { data, message } = await addMessageRepository(conversationId, senderId, text);
        if (data) {
            return res.status(201).json({ data, message });
        }
        return res.status(400).json({ message: message || "Failed to send message" });
    } catch (error) {
        next(error);
    }
};

/* ---> Update an existing message Controller <--- */
export const updateMessageController: functionControllers = async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const userId = req.data.id;
        const { text } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "You don't have userId!" });
        } else if (!messageId) {
            return res.status(400).json({ message: "You don't have messageId!" });
        }

        const { message, data, error } = await updateMessageRepository(messageId, text, userId);
        if (data) {
            return res.status(200).json({ message, data });
        }
        return res.status(400).json({ message, error });
    } catch (error) {
        next(error);
    }
};

/* ---> Delete a message Controller <--- */
export const deleteMessageController: functionControllers = async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const userId = req.data.id;

        if (!userId) {
            return res.status(400).json({ message: "You don't have userId!" });
        } else if (!messageId) {
            return res.status(400).json({ message: "You don't have messageId!" });
        }

        const { message, data, error } = await deleteMessageRepository(messageId, userId);
        if (data) {
            return res.status(200).json({ message, data });
        }
        return res.status(400).json({ message, error });
    } catch (error) {
        next(error);
    }
};