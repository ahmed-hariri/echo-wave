import { Router } from "express";
import { authenticateToken } from "../../../middlewares/authToken";
import { getUserInfoController, updateUserInfoController } from "../../../controllers/user/profile";

/*---> Define profile routes <---*/
export const profileRoutes: Router = Router();

profileRoutes.get("/profile/:id", authenticateToken, getUserInfoController);
profileRoutes.put("/profile/:id", authenticateToken, updateUserInfoController);
