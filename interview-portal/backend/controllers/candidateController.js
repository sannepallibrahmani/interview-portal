const Candidate = require("../models/Candidate");
const Notification = require("../models/Notification");

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
        success: false,
        message:
          "Candidate not found"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a resume"
      });
    }

    candidate.resume =
      req.file.path;

    await candidate.save();

    res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resume:
        candidate.resume
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Resume upload failed"
    });
  }
};

// Delete Resume
exports.deleteResume = async (
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
        success: false,
        message:
          "Candidate not found"
      });
    }

    candidate.resume = "";

    await candidate.save();

    res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete resume"
    });
  }
};

// Get Profile
exports.getProfile = async (
  req,
  res
) => {
  try {
    const candidate =
      await Candidate.findById(
        req.user.id
      ).select("-password");

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message:
          "Candidate not found"
      });
    }

    res.status(200).json(
      candidate
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch profile"
    });
  }
};

// Notifications
exports.getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          candidateId:
            req.user.id
        }).sort({
          createdAt: -1
        });

      res.status(200).json(
        notifications
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch notifications"
      });
    }
  };

// Mark Read
exports.markAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true
          },
          {
            new: true
          }
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Notification marked as read"
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update notification"
      });
    }
  };

// Delete Notification
exports.deleteNotification =
  async (req, res) => {
    try {
      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Notification deleted"
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete notification"
      });
    }
  };