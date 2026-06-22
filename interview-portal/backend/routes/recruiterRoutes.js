const express = require(
  "express"
);

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const {
  getCandidates,
  updateStatus
} = require(
  "../controllers/recruiterController"
);

// Get all candidates
router.get(
  "/candidates",
  auth,
  getCandidates
);

// Update status
router.put(
  "/status/:id",
  auth,
  updateStatus
);
const {
  getCandidates,
  updateStatus,
  getProfile
} = require(
  "../controllers/recruiterController"
);

router.get(
  "/profile",
  auth,
  getProfile
);

module.exports = router;