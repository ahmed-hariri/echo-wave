import mongoose, { Schema } from "mongoose";

/* ---> Mongoose schema and model for messages <--- */
const messageSchema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    seenBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;