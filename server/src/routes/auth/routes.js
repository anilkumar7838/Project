import express from "express";
import {
  ForgetPassword,
  GenerateAccessToken,
  SignIn,
  SignUp,
  isAuthorised,
  isLoggedIn,
} from "../../controllers/auth/controller.js";

export const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.post("/forgetpassword", ForgetPassword);
router.get("/refresh", GenerateAccessToken);
router.get("/isloggedin", isAuthorised, isLoggedIn);
