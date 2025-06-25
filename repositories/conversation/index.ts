import mongoose from "mongoose";
import { conversationTypes } from "../../dto/conversation";
import { UserTypes } from "../../dto/user";
import ConversationModel from "../../models/conversation"

export const getAllConversationsRepository = async (idMember: Partial<UserTypes>) => {
    const { id } = idMember
    try {
        const conversations = await ConversationModel.find({ members: id })
            .populate({
                path: "members",
                select: "name profilePic isOnline lastSeen phone"
            })
            .populate({
                path: "lastMessage",
                select: 'text sender createdAt',
                populate: {
                    path: 'sender',
                    select: 'name profilePic'
                }
            })
            .sort({ updatedAt: -1 });
        if (conversations?.length > 0) {
            // Transformer les conversations
            const formatted = conversations.map(conv => {
                const otherUser = conv.members.find((m: any) => m._id.toString() !== id?.toString());
                return {
                    _id: conv._id,
                    user: otherUser,
                    lastMessage: conv.lastMessage,
                    updatedAt: conv.updatedAt
                };
            });

            return { data: formatted, message: "All conversations fetched successfully." };
        }
        return { data: [], message: 'Not found any conversations' }
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return { message: "Error fetching conversations:", error };
    }
}

export const addConversationRepository = async (conversationData: conversationTypes) => {
    const { members, isGroup, name, lastMessage } = conversationData;
    try {
        if (!isGroup && members.length === 2) {
            const existing = await ConversationModel.findOne({
                isGroup: false, // is not a group conversation
                members: { $all: members, $size: 2 } // exact same members
            });
            if (existing) {
                return { message: "Private conversation already exists." };
            }
        }
        const newConversation = new ConversationModel({ members, isGroup, name: isGroup ? name : undefined, lastMessage });
        const saved = await newConversation.save();
        return { message: "Conversation created successfully.", data: saved };

    } catch (error) {
        console.error("Error adding conversation:", error);
        return { message: "Error creating conversation:", error };
    }
}

export const removeConversationRepository = async (conversationId: string, userId: string) => {
    try {
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return { success: false, message: "Conversation not found." };
        }

        // Convert userId to ObjectId for comparison
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if (!conversation.members.includes(userObjectId)) {
            return { message: "You are not authorized to delete this conversation." };
        }
        const conversationDeleted = await ConversationModel.deleteOne({ _id: conversationId });
        if (conversationDeleted?.deletedCount === 1) {
            return { data: conversationDeleted?.deletedCount, message: "Conversation deleted successfully." };
        }
        return { data: null, message: 'Conversation not found!' };
    } catch (error) {
        console.error("Error deleting conversation:", error);
        return { message: "Error deleting conversation:", error };
    }
};