const Project = require('../models/Project');
const Expertise = require('../models/Expertise');
const Experience = require('../models/Experience');

// --- Projects ---
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Expertise ---
exports.getExpertise = async (req, res) => {
  try {
    const expertise = await Expertise.find().sort({ displayOrder: 1 });
    res.json(expertise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExpertise = async (req, res) => {
  try {
    const expertise = new Expertise(req.body);
    const newExpertise = await expertise.save();
    res.status(201).json(newExpertise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExpertise = async (req, res) => {
  try {
    const expertise = await Expertise.findById(req.params.id);
    if (!expertise) return res.status(404).json({ message: 'Expertise not found' });
    
    Object.assign(expertise, req.body);
    const updatedExpertise = await expertise.save();
    res.json(updatedExpertise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExpertise = async (req, res) => {
  try {
    const expertise = await Expertise.findById(req.params.id);
    if (!expertise) return res.status(404).json({ message: 'Expertise not found' });
    
    await expertise.deleteOne();
    res.json({ message: 'Expertise deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Experience ---
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    
    Object.assign(experience, req.body);
    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    
    await experience.deleteOne();
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
