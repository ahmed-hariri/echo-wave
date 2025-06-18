import { Router } from "express";
import { loginUserController, registerUserController } from "../../controllers/auth";

/*---> Define authentication routes <---*/
export const authRoutes: Router = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginUserController);