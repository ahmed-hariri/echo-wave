import { Router } from "express";
import { addConversationController, getAllConversationsController, removeConversationController } from "../../controllers/conversation";
import { authenticateToken } from "../../middlewares/authToken";

/*---> Define converstation routes <---*/
export const convRoutes: Router = Router();

convRoutes.get("/conversations", authenticateToken, getAllConversationsController);
convRoutes.post("/conversation", authenticateToken, addConversationController);
convRoutes.delete("/conversation/:id", authenticateToken, removeConversationController);