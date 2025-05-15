const express = require('express');
const {
  createCandidate,
  getAllCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate
} = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route for creating candidates (application form submission)
router.post('/', createCandidate);

// Protected routes for admin/HR operations
router.get('/', protect, getAllCandidates);
router.get('/:id', protect, getCandidate);
router.put('/:id', protect, updateCandidate);
router.delete('/:id', protect, deleteCandidate);

module.exports = router;