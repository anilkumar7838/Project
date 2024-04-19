import express from "express";
import {
  deleteUser,
  getAllusers,
  getUser,
  updateUser,
} from "../../controllers/user";

export const router = express.Router();

// router.post("/create", GenerateRefreshToken);
router.get("/getall", getAllusers);
router.get("/getone", getUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
