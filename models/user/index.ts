import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String, default: "" },
    phone: { type: String, required: true, unique: true, match: /^[0-9]{8,15}$/ },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isOnline: { type: Boolean, required: true, default: false },
    lastSeen: { type: Date, required: true, default: Date.now },
    contacts: { type: [String], default: [] }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;