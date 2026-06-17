const express = require(
  "express"
);

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const {
  uploadResume,
  getProfile,
  getNotifications,
  markAsRead
} = require(
  "../controllers/candidateController"
);


// Get profile
router.get(
  "/profile",
  auth,
  getProfile
);

// Upload resume
router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  uploadResume
);

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