const Intern = require("../models/internSchema");

// Get all interns
exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new intern
exports.addIntern = async (req, res) => {
  try {
    const newIntern = new Intern(req.body);
    await newIntern.save();
    res.status(201).json(newIntern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an intern by ID
exports.updateIntern = async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIntern) return res.status(404).json({ message: "Intern not found" });
    res.status(200).json(updatedIntern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an intern by ID
exports.deleteIntern = async (req, res) => {
  try {
    const deletedIntern = await Intern.findByIdAndDelete(req.params.id);
    if (!deletedIntern) return res.status(404).json({ message: "Intern not found" });
    res.status(200).json({ message: "Intern deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
