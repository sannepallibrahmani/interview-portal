const Candidate = require(
  "../models/Candidate"
);
const Notification = require(
  "../models/Notification"
);
// Upload Resume
exports.uploadResume = async (
  req,
  res
) => {
  try {
    const candidate =
      await Candidate.findById(
        req.user.id
      );

    if (!candidate) {
      return res.status(404).json({
        message:
          "Candidate not found"
      });
    }

    candidate.resume =
      req.file.filename;

    await candidate.save();

    res.json({
      message:
        "Resume uploaded successfully",
      resume:
        candidate.resume
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Candidate Profile
exports.getProfile = async (
  req,
  res
) => {
  try {
    const candidate =
      await Candidate.findById(
        req.user.id
      ).select("-password");

    res.json(candidate);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          candidateId:
            req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        notifications
      );
    } catch (error) {
      res.status(500).json(
        error
      );
    }
  };

exports.markAsRead =
  async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        }
      );

      res.json({
        message:
          "Notification marked as read",
      });
    } catch (error) {
      res.status(500).json(
        error
      );
    }
  };