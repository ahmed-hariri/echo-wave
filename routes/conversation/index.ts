import { Router } from "express";
import { addConversationController, getAllConversationsController, removeConversationController } from "../../controllers/conversation";
import { authenticateToken } from "../../middlewares/authToken";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define converstation routes <---*/
export const convRoutes: Router = Router();

convRoutes.get("/conversations", authenticateToken, getAllConversationsController);
convRoutes.post("/conversation", authenticateToken, validateBody(["members"]), addConversationController);
convRoutes.delete("/conversation/:id", authenticateToken, removeConversationController);