import { Project } from "../../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(data);
    if (!project) {
      return res.status(400).json({ message: "something went wrong" });
    }
    res.status(201).json({ message: "project created successfully", project });
  } catch (e) {
    res.status(500).json({ message: "interval server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json({ message: `List of Projects`, allProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectid,
    });
    if (!project) {
      return res.status(404).json({ message: `Project Not Found` });
    }
    res.status(200).json({ message: `project`, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectid, ...data } = req.body;
    const project = await Project.findOneAndUpdate({
      _id: projectid,
      data,
    });
    if (!project) {
      res.status(404).json({ message: `Project not Found` });
    }
    res.status(200).json({ message: `updated project`, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  const { projectid } = req.body;
  try {
    const response = await Project.findOneAndDelete({ projectid });
    if (response)
      res.status(200).json({ message: `project deleted succesfully` });
    else res.status(404).json({ message: `project not found` });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
