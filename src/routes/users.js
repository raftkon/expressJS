import e from "express";

import {
  signIn,
  getCurrentUser,
  signOut,
  signUp,
} from "../controllers/users.js";
import { validateRequest } from "../middlewares/validate-request.js";
import { isAuthenticated } from "../middlewares/is-authenticated.js";
import { users as validators } from "../middlewares/validators.js";

const router = e.Router();

router.get("/current-user", isAuthenticated, getCurrentUser);
router.post("/sign-in", validators.signIn, validateRequest, signIn);
router.post("/sign-out", signOut);
router.post("/sign-up", validators.signUp, validateRequest, signUp);

export { router as authRouter };
