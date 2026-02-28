const ProjectType = require('../models/ProjectType');

exports.getProjectTypes = async (req, res) => {
  try {
    const types = await ProjectType.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProjectType = async (req, res) => {
  try {
    const last = await ProjectType.findOne().sort({ displayOrder: -1 });
    const nextOrder = last ? (last.displayOrder || 0) + 1 : 0;
    const newType = new ProjectType({ ...req.body, displayOrder: nextOrder });
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

exports.reorderProjectTypes = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Orders array is required' });
    }
    const updates = orders.map(item =>
      ProjectType.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    );
    await Promise.all(updates);
    res.json({ message: 'Categories reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
