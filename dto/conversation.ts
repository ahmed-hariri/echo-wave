import { UserTypes } from "./user";

/**
 * Represents a conversation object.
 * - members: list of users participating in the conversation
 * - isGroup: optional flag indicating if the conversation is a group chat
 * - name: optional name of the group conversation
 * - lastMessage: details of the last message sent in this conversation
 */
export interface conversationTypes {
    members: UserTypes[];
    isGroup?: boolean;
    name?: string;
    lastMessage: {
        conversation: conversationTypes;
        sender: UserTypes;
        text: string;
        attachments: string;
        seenBy: UserTypes[];  // Assuming multiple users can see the message
    };
}
