import { functionControllers } from "../../dto/controllers";
import { addConversationRepository, getAllConversationsRepository, removeConversationRepository } from "../../repositories/conversation";

export const getAllConversationsController: functionControllers = async (req, res, next) => {
    const userId = req.data.id;
    if (!userId) {
        return res.status(400).type("json").json({ message: "You don't have userId!" })
    }
    try {
        const { data, message } = await getAllConversationsRepository({ id: userId });
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

export const addConversationController: functionControllers = async (req, res, next) => {
    try {
        const currentUserId = req?.data?.id;
        const { members, isGroup, name, lastMessage } = req.body;

        if (!currentUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        } else if (!members || !Array.isArray(members) || members.length < 2) {
            return res.status(400).json({ message: "At least 2 members are required to create a conversation." });
        } else if (isGroup && (!name || name.trim() === "")) {
            return res.status(400).json({ message: "Group name is required for group conversations." });
        }

        const { data, message } = await addConversationRepository({ members, isGroup, name, lastMessage });

        if (data) {
            return res.status(201).json({ message, data });
        }
        return res.status(500).json({ message });
    } catch (error) {
        next(error);
    }
};

export const removeConversationController: functionControllers = async (req, res, next) => {
    try {
        const conversationId = req.params.id;
        const userId = req.data.id;

        if (!conversationId || !userId) {
            return res.status(400).json({ message: "Missing conversationId or userId" });
        }

        const { data, message } = await removeConversationRepository(conversationId, userId);

        if (data) {
            return res.status(403).json({ message });
        }
        return res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};
