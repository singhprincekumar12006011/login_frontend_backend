const Candidate = require('../models/Candidate');

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json({ 
      success: true, 
      message: 'Candidate created successfully', 
      id: savedCandidate._id 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating candidate', 
      error: error.message 
    });
  }
};

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ 
      success: true, 
      count: candidates.length, 
      data: candidates 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error fetching candidates', 
      error: error.message 
    });
  }
};

// Get a single candidate
exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ 
        success: false, 
        message: 'Candidate not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: candidate 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error fetching candidate', 
      error: error.message 
    });
  }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return res.status(404).json({ 
        success: false, 
        message: 'Candidate not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Candidate updated successfully', 
      data: candidate 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating candidate', 
      error: error.message 
    });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ 
        success: false, 
        message: 'Candidate not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Candidate deleted successfully' 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error deleting candidate', 
      error: error.message 
    });
  }
};