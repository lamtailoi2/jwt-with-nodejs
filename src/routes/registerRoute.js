import registerController from "../controllers/registerController.js";
import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import loginController from "../controllers/loginController.js";
import jwtService from "../services/jwtService.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import logoutController from "../controllers/logoutController.js";
const router = Router()

router.post("/register", asyncHandler(registerController)) 
router.post("/login", asyncHandler(loginController))
router.post("/refresh",jwtService.requestRefreshToken)
router.get("/home", authMiddleware.tokenVerify, (req, res) => {
    res.json("Hello")
})
router.post("/logout", authMiddleware.tokenVerify,logoutController)

export default router