const Project = require('../models/Project');
const Experience = require('../models/Experience');

// --- Projects ---
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const lastProject = await Project.findOne().sort({ displayOrder: -1 });
    const nextOrder = lastProject ? (lastProject.displayOrder || 0) + 1 : 0;
    const project = new Project({ ...req.body, displayOrder: nextOrder });
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

exports.reorderProjects = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Orders array is required' });
    }
    const updates = orders.map(item =>
      Project.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    );
    await Promise.all(updates);
    res.json({ message: 'Projects reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Experience ---
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const lastExp = await Experience.findOne().sort({ displayOrder: -1 });
    const nextOrder = lastExp ? (lastExp.displayOrder || 0) + 1 : 0;
    const experience = new Experience({ ...req.body, displayOrder: nextOrder });
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

exports.reorderExperience = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Orders array is required' });
    }
    const updates = orders.map(item =>
      Experience.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    );
    await Promise.all(updates);
    res.json({ message: 'Experience reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
