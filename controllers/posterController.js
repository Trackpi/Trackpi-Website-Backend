const Poster = require('../models/posterSchema'); 

// Create a new poster
exports.createPoster = async (req, res) => {
  const { postername } = req.body;
  const posterimage = req.file ? req.file.filename : null; // Uploaded file name

  try {
    const newPoster = new Poster({
      postername,
      posterimage,
    });

    await newPoster.save();
    res.status(201).json({ message: 'Poster created successfully', newPoster });
  } catch (error) {
    res.status(500).json({ message: 'Error creating poster', error });
  }
};

// Get all posters
exports.getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find();
    res.status(200).json(posters);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posters', error });
  }
};

// Get a single poster by ID
exports.getPosterById = async (req, res) => {
  const { id } = req.params;

  try {
    const poster = await Poster.findById(id);

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    res.status(200).json(poster);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving poster', error });
  }
};

// Update a poster by ID
exports.updatePoster = async (req, res) => {
  const { id } = req.params;
  const { postername } = req.body;
  const posterimage = req.file ? req.file.filename : null;

  try {
    const updatedData = { postername };
    if (posterimage) updatedData.posterimage = posterimage;

    const updatedPoster = await Poster.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPoster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    res.status(200).json({ message: 'Poster updated successfully', updatedPoster });
  } catch (error) {
    res.status(500).json({ message: 'Error updating poster', error });
  }
};

// Delete a poster by ID
exports.deletePoster = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPoster = await Poster.findByIdAndDelete(id);

    if (!deletedPoster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    res.status(200).json({ message: 'Poster deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting poster', error });
  }
};
