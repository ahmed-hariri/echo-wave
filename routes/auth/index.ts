import { Router } from "express";
import { loginUserController, registerUserController } from "../../controllers/auth";
import { validateBody } from "../../middlewares/validateBody";

/*---> Define authentication routes <---*/
export const authRoutes: Router = Router();

authRoutes.post("/register", validateBody(["name", "phone", "password"]), registerUserController);
authRoutes.post("/login", validateBody(["phone", "password"]), loginUserController);