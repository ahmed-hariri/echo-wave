import { Server, Socket } from "socket.io";
import UserModel from "../models/user";
import MessageModel from "../models/message";

export const socketHandler = (io: Server) => {
    io.on("connection", (socket) => {
        
        socket.on("user-connected", async (userId: string) => {
            socket.userId = userId;
            await UserModel.findByIdAndUpdate(userId, { isOnline: true });
        });

        socket.on("mark-as-seen", async ({ conversationId, userId }) => {
            await MessageModel.updateMany(
                {
                    conversation: conversationId,
                    seenBy: { $ne: userId },
                },
                {
                    $push: { seenBy: userId },
                }
            );
        });

        socket.on("disconnect", async () => {
            if (socket.userId) {
                await UserModel.findByIdAndUpdate(socket.userId, {
                    isOnline: false,
                    lastSeen: new Date(),
                });
            }
        });
    });
};
