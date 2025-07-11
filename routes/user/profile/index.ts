import { Router } from "express";
import { authenticateToken } from "../../../middlewares/authToken";
import { getUserInfoController, updateUserInfoController } from "../../../controllers/user/profile";

/*---> Define profile routes <---*/
export const profileRoutes: Router = Router();

profileRoutes.get("/profile/:id", authenticateToken, getUserInfoController);
profileRoutes.put("/profile/:id", authenticateToken, updateUserInfoController);


/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: User profile management
 */

/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get user profile information by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to fetch profile for
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c23a0e1234abcd5678ef90"
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User info fetched successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c23a0e1234abcd5678ef90"
 *                     name:
 *                       type: string
 *                       example: "Ahmed Hariri"
 *                     phone:
 *                       type: string
 *                       example: "+212600000000"
 *                     bio:
 *                       type: string
 *                       example: "I am a front-end developer."
 *                     profilePic:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     isOnline:
 *                       type: boolean
 *                       example: true
 *                     lastSeen:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-11T09:30:00Z"
 *       400:
 *         description: User ID not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID not provided."
 *       500:
 *         description: Server error or user not found
 */

/**
 * @swagger
 * /api/profile/{id}:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update user profile information by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to update profile for
 *         required: true
 *         schema:
 *           type: string
 *           example: "64c23a0e1234abcd5678ef90"
 *     requestBody:
 *       description: Profile fields to update (at least one)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: "I love coding and coffee."
 *               profilePic:
 *                 type: string
 *                 example: "https://example.com/new-avatar.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User information updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c23a0e1234abcd5678ef90"
 *                     bio:
 *                       type: string
 *                       example: "I love coding and coffee."
 *                     profilePic:
 *                       type: string
 *                       example: "https://example.com/new-avatar.jpg"
 *       400:
 *         description: User ID not found in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID not found in request."
 *       500:
 *         description: Server error or user not found
 */