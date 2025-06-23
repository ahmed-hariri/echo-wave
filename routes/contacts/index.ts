import { Router } from "express";
import { authenticateToken } from "../../middlewares/authToken";
import { validateBody } from "../../middlewares/validateBody";
import { addContactController, deleteContactController, getAllContactsController } from "../../controllers/contacts";

/*---> Define contacts routes <---*/
export const contactsRoutes: Router = Router();

contactsRoutes.get("/contacts", authenticateToken, getAllContactsController);
contactsRoutes.post("/contacts", authenticateToken, validateBody(["phone"]), addContactController);
contactsRoutes.delete("/contacts/:id", authenticateToken, deleteContactController);
