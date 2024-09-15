import e from "express";

import * as controllers from "../controllers/users.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { isAuthenticated } from "../middlewares/is-authenticated.js";
import * as validators from "../middlewares/validators/users.js";

const router = e.Router();

router.get("/current-user", controllers.getCurrentUser);
router.post("/sign-in", validators.signIn, validateRequest, controllers.signIn);
router.post("/sign-out", isAuthenticated, controllers.signOut);
router.post("/sign-up", validators.signUp, validateRequest, controllers.signUp);

export { router as authRouter };
