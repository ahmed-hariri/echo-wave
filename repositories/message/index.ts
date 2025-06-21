import MessageModel from "../../models/message"

export const getAllMessagesRepository = async (conversationId: string) => {
    try {
        const messages = await MessageModel.find({ conversation: conversationId })
            .populate({
                path: "sender",
                select: "name profilePic"
            })
            .sort({ createdAt: 1 });
            
        if (messages.length > 0) {
            return { data: messages, message: "All Messages fetched successfully." };
        }

        return { data: [], message: "Not found any message" };
    } catch (error) {
        console.error("Error fetching messages :", error);
        return { message: "Error fetching messages :", error };
    }
}

export const updateMessageRepository = async (messageId: string, newText: string, userId: string) => {
    try {
        const message = await MessageModel.findById(messageId);
        if (!message) {
            return { success: false, message: "Message not found" };
        } else if (message.sender.toString() !== userId) {
            return { message: "Not authorized to edit this message" };
        }

        message.text = newText;
        const updated = await message.save();

        return { data: updated, message: "Message updated successfully" };
    } catch (error) {
        console.error("Error updating message :", error);
        return { message: "Error updating message :", error };
    }
}

export const deleteMessageRepository = async (messageId: string, userId: string) => {
    try {
        const message = await MessageModel.findById(messageId);

        if (!message) {
            return { success: false, message: "Message not found" };
        } else if (message.sender.toString() !== userId) {
            return { success: false, message: "Not authorized to delete this message" };
        }

        const messageDeleted = await MessageModel.deleteOne({ _id: messageId });
        if (messageDeleted?.deletedCount === 1) {
            return { message: "Message deleted successfully" };
        }

        return { data: null, message: 'Message not found!' };
    } catch (error) {
        console.error("Error deleting message :", error);
        return { message: "Error deleting message :", error };
    }
};
