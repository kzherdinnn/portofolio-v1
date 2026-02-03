const ProjectType = require('../models/ProjectType');

exports.getProjectTypes = async (req, res) => {
  try {
    const types = await ProjectType.find().sort({ createdAt: 1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProjectType = async (req, res) => {
  try {
    const newType = new ProjectType(req.body);
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProjectType = async (req, res) => {
  try {
    const { id } = req.params;
    await ProjectType.findByIdAndDelete(id);
    res.json({ message: 'Project Type deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProjectType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedType = await ProjectType.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
