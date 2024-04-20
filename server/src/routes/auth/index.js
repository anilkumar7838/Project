import express from "express";
import {
  ForgetPassword,
  GenerateRefreshToken,
  SignIn,
  SignUp,
} from "../../controllers/auth/index.js";

export const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.post("/forgetpassword", ForgetPassword);
router.get("/refresh", GenerateRefreshToken);
