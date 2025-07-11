import { Router } from "express";
import { authenticateToken } from "../../../middlewares/authToken";
import { validateBody } from "../../../middlewares/validateBody";
import { addContactController, deleteContactController, getAllContactsController } from "../../../controllers/user/contacts";

/*---> Define contacts routes <---*/
export const contactsRoutes: Router = Router();

contactsRoutes.get("/contacts", authenticateToken, getAllContactsController);
contactsRoutes.post("/contacts", authenticateToken, validateBody(["phone"]), addContactController);
contactsRoutes.delete("/contacts/:id", authenticateToken, deleteContactController);

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: User contacts management
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contacts of the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All contacts fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef90"
 *                       name:
 *                         type: string
 *                         example: "Ahmed Hariri"
 *                       phone:
 *                         type: string
 *                         example: "+212600000000"
 *                       profilePic:
 *                         type: string
 *                         example: "https://example.com/avatar.jpg"
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID is required."
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Add a new contact by phone number
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: Phone number of the contact to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+212600000001"
 *     responses:
 *       200:
 *         description: Contact added successfully or error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact added successfully."
 *       400:
 *         description: Missing user ID or phone
 *       500:
 *         description: Server error or contact not found
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact by contact ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully or error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact removed successfully."
 *       400:
 *         description: Missing userId or contactId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have userId!"
 *       500:
 *         description: Server error
 */