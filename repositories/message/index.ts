import mongoose from "mongoose";
import ConversationModel from "../../models/conversation";
import MessageModel from "../../models/message"

export const getAllMessagesRepository = async (conversationId: string) => {
    try {
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return { success: false, message: "Conversation not found." };
        }

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

export const addMessageRepository = async (conversationId: string, senderId: string, text: string) => {
    try {
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return { success: false, message: "Conversation not found." };
        }

        // Convert userId to ObjectId for comparison
        const userObjectId = new mongoose.Types.ObjectId(senderId);
        if (!conversation.members.includes(userObjectId)) {
            return { message: "You are not authorized to delete this conversation." };
        }

        const newMessage = new MessageModel({ conversation: conversationId, sender: senderId, text: text });
        const savedMessage = await newMessage.save();

        // Update lastMessage in conversation
        conversation.lastMessage = savedMessage._id;
        await conversation.save();

        return { data: savedMessage, message: "Message sent successfully." };
    } catch (error) {
        console.error("Error sending message:", error);
        return { message: "Error sending message", error };
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
