import { Router } from "express";
import { addMessageController, deleteMessageController, getAllMessagesController, updateMessageController } from "../../controllers/message";
import { authenticateToken } from "../../middlewares/authToken";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define message routes <---*/
export const messageRoutes: Router = Router();

messageRoutes.get("/messages/:conversationId", authenticateToken, getAllMessagesController);
messageRoutes.post("/message", authenticateToken, validateBody(["text"]), addMessageController);
messageRoutes.put("/message/:id", authenticateToken, validateBody(["text"]), updateMessageController);
messageRoutes.delete("/message/:id", authenticateToken, deleteMessageController);


/**
 * @swagger
 * /api/messages/{conversationId}:
 *   get:
 *     tags:
 *       - Message
 *     summary: Get all messages of a conversation
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the conversation
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Messages fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef91"
 *                       conversation:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef90"
 *                       sender:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Ahmed Hariri"
 *                           profilePic:
 *                             type: string
 *                             example: "https://example.com/avatar.jpg"
 *                       text:
 *                         type: string
 *                         example: "Hello, how are you?"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-11T10:00:00Z"
 *       400:
 *         description: Missing conversation ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/message:
 *   post:
 *     tags:
 *       - Message
 *     summary: Send a new message to a conversation
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - text
 *             properties:
 *               conversationId:
 *                 type: string
 *                 example: "64c23a0e1234abcd5678ef90"
 *               text:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c23a0e1234abcd5678ef91"
 *                     text:
 *                       type: string
 *                       example: "Hello, how are you?"
 *                     sender:
 *                       type: string
 *                       example: "64c23a0e1234abcd5678ef92"
 *                     conversation:
 *                       type: string
 *                       example: "64c23a0e1234abcd5678ef90"
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/message/{id}:
 *   put:
 *     tags:
 *       - Message
 *     summary: Update a message text
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated message text"
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       400:
 *         description: Missing messageId, userId or invalid request
 *       401:
 *         description: Unauthorized (not owner)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/message/{id}:
 *   delete:
 *     tags:
 *       - Message
 *     summary: Delete a message by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to delete
 *     responses:
 *       200:
 *         description: Message deleted successfully or not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message deleted successfully."
 *                 data:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Missing messageId or userId
 *       401:
 *         description: Unauthorized (not owner)
 *       500:
 *         description: Server error
 */