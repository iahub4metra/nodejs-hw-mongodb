import { Router } from "express";
import { loginUserSchema, registerUserSchema, resetPwdSchema, sendResetEmailSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, resetPwdController, sendResetEmailController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js"
import {ctrlWrapper} from "../utils/ctrlWrapper.js"


const router = Router()

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController))

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/send-reset-email", validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController))

router.post("/reset-pwd", validateBody(resetPwdSchema), ctrlWrapper(resetPwdController))

export default router