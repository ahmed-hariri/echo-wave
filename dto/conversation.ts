import { UserTypes } from "./user";

export interface conversationTypes {
    members: UserTypes[];
    isGroup?: boolean;
    name?: string;
    lastMessage: {
        conversation: conversationTypes;
        sender: UserTypes;
        text: string;
        attachments: string;
        seenBy: UserTypes;
    }
}