const Intern = require('../models/internSchema')

// Add Intern
exports.addIntern = async (req, res) => {
    try {
      const {
        empID,
        empName,
        designation,
        description,
        socialMediaLinks,
        emptype,
      } = req.body;
  
      // Get the uploaded photo if it exists
      const photo = req.file ? `/uploads/interns/${req.file.filename}` : null;
  
      // Create a new Intern document
      const intern = new Intern({
        empID,
        empName,
        designation,
        photo,
        description,
        socialMediaLinks: JSON.parse(socialMediaLinks || '{}'), // Parse JSON for socialMediaLinks
        emptype,
      });
  
      await intern.save();
      res.status(201).json({ message: "Intern added successfully", intern });
    } catch (error) {
      res.status(500).json({ error: "Error adding intern", details: error.message });
    }
  };
  
  // Update Intern by ID
  exports.updateInternById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Get the uploaded photo if it exists
      const photo = req.file ? `/uploads/interns/${req.file.filename}` : undefined;
  
      const updatedData = {
        ...req.body,
        ...(photo && { photo }),
        socialMediaLinks: req.body.socialMediaLinks
          ? JSON.parse(req.body.socialMediaLinks)
          : undefined,
      };
  
      const updatedIntern = await Intern.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedIntern) {
        return res.status(404).json({ error: "Intern not found" });
      }
  
      res.status(200).json({ message: "Intern updated successfully", updatedIntern });
    } catch (error) {
      res.status(400).json({ error: "Error updating intern", details: error.message });
    }
  };
  
  // Get All Interns
  exports.getAllInterns = async (req, res) => {
    try {
      const interns = await Intern.find();
      res.status(200).json(interns);
    } catch (error) {
      res.status(500).json({ error: "Error fetching interns", details: error.message });
    }
  };
  
  // Delete Intern by ID
  exports.deleteInternById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIntern = await Intern.findByIdAndDelete(id);
  
      if (!deletedIntern) {
        return res.status(404).json({ error: "Intern not found" });
      }
  
      res.status(200).json({ message: "Intern deleted successfully", deletedIntern });
    } catch (error) {
      res.status(500).json({ error: "Error deleting intern", details: error.message });
    }
  };