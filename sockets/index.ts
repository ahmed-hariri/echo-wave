import { Server, Socket } from "socket.io";
import UserModel from "../models/user";
import MessageModel from "../models/message";

/* ---> Socket.IO event handlers setup function <--- */
export const socketHandler = (io: Server) => {
    io.on("connection", (socket) => {

        /* ---> Handle user connection and set user online status <--- */
        socket.on("user-connected", async (userId: string) => {
            socket.userId = userId;
            await UserModel.findByIdAndUpdate(userId, { isOnline: true });
        });

        /* ---> Mark messages as seen by the user in a conversation <--- */
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

        /* ---> Handle socket disconnect and update user online status <--- */
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