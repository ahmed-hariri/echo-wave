import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    isGroup: { type: Boolean, default: false },
    name: {
        type: String, required: function (this: any) {
            return this.isGroup
        }
    },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

const ConversationModel = mongoose.model("Conversation", conversationSchema);
export default ConversationModel;
