import { Router } from "express";
import { deleteMessageController, getAllMessagesController, updateMessageController } from "../../controllers/message";
import { authenticateToken } from "../../middlewares/authToken";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define message routes <---*/
export const messageRoutes: Router = Router();

messageRoutes.get("/messages/:conversationId", authenticateToken, getAllMessagesController);
messageRoutes.put("/message/:id", authenticateToken, validateBody(["text"]), updateMessageController);
messageRoutes.delete("/message/:id", authenticateToken, deleteMessageController);
