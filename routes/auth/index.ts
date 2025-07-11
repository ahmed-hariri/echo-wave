import { Router } from "express";
import { loginUserController, registerUserController } from "../../controllers/auth";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define authentication routes <---*/
export const authRoutes = Router();

authRoutes.post("/register", validateBody(["name", "phone", "password"]), registerUserController);
authRoutes.post("/login", validateBody(["phone", "password"]), loginUserController);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmed Hariri"
 *               phone:
 *                 type: string
 *                 example: "+212600000000"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Registration successful or failure message
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   message:
 *                     type: string
 *                     example: "Account has been created!"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef90"
 *                       name:
 *                         type: string
 *                         example: "Ahmed Hariri"
 *                       phone:
 *                         type: string
 *                         example: "+212600000000"
 *               - type: object
 *                 properties:
 *                   token:
 *                     type: "null"
 *                   message:
 *                     type: string
 *                     example: "Phone number is already in use."
*/

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token if credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+212600000000"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful or failure message
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   message:
 *                     type: string
 *                     example: "Login successful!"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64c23a0e1234abcd5678ef90"
 *                       name:
 *                         type: string
 *                         example: "Ahmed Hariri"
 *                       phone:
 *                         type: string
 *                         example: "+212600000000"
 *               - type: object
 *                 properties:
 *                   token:
 *                     type: "null"
 *                   message:
 *                     type: string
 *                     example: "Incorrect password."
 */