import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../../controllers/project/controller.js";

const varifyFaculty = (req, res, next) => {
  next();
};
const varifyStudent = (req, res, next) => {
  next();
};

export const router = express.Router();

router.post("/create", varifyFaculty, createProject);
router.get("/getall", varifyFaculty, getAllProjects);
router.post("/getone", varifyStudent, getSingleProject);
router.put("/update", varifyFaculty, updateProject);
router.delete("/delete", varifyFaculty, deleteProject);
