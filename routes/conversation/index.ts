import { Router } from "express";
import { addConversationController, getAllConversationsController, removeConversationController } from "../../controllers/conversation";
import { authenticateToken } from "../../middlewares/authToken";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define conversation routes <---*/
export const convRoutes: Router = Router();

convRoutes.get("/conversations", authenticateToken, getAllConversationsController);
convRoutes.post("/conversation", authenticateToken, validateBody(["members"]), addConversationController);
convRoutes.delete("/conversation/:id", authenticateToken, removeConversationController);

/**
 * @swagger
 * /api/conversations:
 *   get:
 *     tags:
 *       - Conversation
 *     summary: Get all conversations of the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All conversations fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef90"
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Ahmed Hariri"
 *                           profilePic:
 *                             type: string
 *                             example: "https://example.com/avatar.jpg"
 *                           isOnline:
 *                             type: boolean
 *                             example: true
 *                           lastSeen:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-11T09:30:00Z"
 *                           phone:
 *                             type: string
 *                             example: "+212600000000"
 *                       lastMessage:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *                             example: "Hello, how are you?"
 *                           sender:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Ahmed Hariri"
 *                               profilePic:
 *                                 type: string
 *                                 example: "https://example.com/avatar.jpg"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-11T10:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-11T10:01:00Z"
 *       400:
 *         description: UserId missing or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have userId!"
 */

/**
 * @swagger
 * /api/conversation:
 *   post:
 *     tags:
 *       - Conversation
 *     summary: Create a new conversation
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: Conversation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - members
 *             properties:
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["userId1", "userId2"]
 *               isGroup:
 *                 type: boolean
 *                 example: false
 *               name:
 *                 type: string
 *                 example: "Friends Group"
 *               lastMessage:
 *                 type: object
 *                 description: Last message data (optional)
 *     responses:
 *       200:
 *         description: Conversation created or error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conversation created successfully."
 *                 data:
 *                   type: object
 *                   description: The created conversation object
 *       400:
 *         description: Validation error or unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/conversation/{id}:
 *   delete:
 *     tags:
 *       - Conversation
 *     summary: Delete a conversation by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID to delete
 *     responses:
 *       200:
 *         description: Conversation deleted or not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conversation deleted successfully."
 *                 data:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Missing conversationId or userId
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
