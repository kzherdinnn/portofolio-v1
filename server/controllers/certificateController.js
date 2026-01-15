const Certificate = require('../models/Certificate');

// Get all certificates
exports.getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ displayOrder: 1, issueDate: -1 });
        res.json({ success: true, data: certificates });
    } catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ success: false, message: 'Error fetching certificates' });
    }
};

// Create certificate
exports.createCertificate = async (req, res) => {
    try {
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.json({ success: true, data: certificate });
    } catch (error) {
        console.error('Error creating certificate:', error);
        res.status(500).json({ success: false, message: 'Error creating certificate' });
    }
};

// Update certificate
exports.updateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.json({ success: true, data: certificate });
    } catch (error) {
        console.error('Error updating certificate:', error);
        res.status(500).json({ success: false, message: 'Error updating certificate' });
    }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.json({ success: true, message: 'Certificate deleted successfully' });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        res.status(500).json({ success: false, message: 'Error deleting certificate' });
    }
};
