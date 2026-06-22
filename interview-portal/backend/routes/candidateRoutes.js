const express = require("express");

const router = express.Router();

const auth = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  uploadResume,
  getProfile,
  getNotifications,
  markAsRead,
  deleteResume
} = require(
  "../controllers/candidateController"
);

// Profile
router.get(
  "/profile",
  auth,
  getProfile
);

// Upload Resume
router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  uploadResume
);

// Delete Resume
router.delete(
  "/resume",
  auth,
  deleteResume
);

// Notifications
router.get(
  "/notifications",
  auth,
  getNotifications
);

router.put(
  "/notifications/:id",
  auth,
  markAsRead
);

module.exports = router;