const express = require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const {
  getCandidates,
  updateStatus,
  getProfile
} = require(
  "../controllers/recruiterController"
);

// Get all candidates
router.get(
  "/candidates",
  auth,
  getCandidates
);

// Update candidate status
router.put(
  "/status/:id",
  auth,
  updateStatus
);

// Recruiter Profile
router.get(
  "/profile",
  auth,
  getProfile
);

module.exports = router;