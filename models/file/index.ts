import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "audio", "document", "other"], required: true }
}, { timestamps: true });

const FileModel = mongoose.model("File", fileSchema);
export default FileModel;
