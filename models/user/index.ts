import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String, default: "" },
    phone: { type: String, required: true, unique: true, match: /^[0-9]{8,15}$/ },
    profilePic: { type: String, default: "" },
    isOnline: { type: Boolean, required: true, default: false },
    lastSeen: { type: Date, required: true, default: Date.now },
    contacts: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;