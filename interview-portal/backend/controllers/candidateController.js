const Candidate = require("../models/Candidate");
const Notification = require("../models/Notification");

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    const candidate = await Candidate.findById(
      req.user.id
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    candidate.resume = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: candidate.resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};

// Get Candidate Profile
exports.getProfile = async (req, res) => {
  try {
    const candidate =
      await Candidate.findById(
        req.user.id
      ).select("-password");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch profile",
    });
  }
};

// Update Candidate Profile
exports.updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phone,
      location,
    } = req.body;

    const candidate =
      await Candidate.findById(
        req.user.id
      );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    candidate.name =
      name || candidate.name;

    candidate.email =
      email || candidate.email;

    candidate.phone =
      phone || candidate.phone;

    candidate.location =
      location ||
      candidate.location;

    await candidate.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      candidate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to update profile",
    });
  }
};

// Get Notifications
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

      res.status(200).json(
        notifications
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch notifications",
      });
    }
  };

// Mark Notification As Read
exports.markAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true,
          },
          {
            new: true,
          }
        );

      if (!notification) {
        return res.status(404).json({
          message:
            "Notification not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Notification marked as read",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update notification",
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
          "Notification deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to delete notification",
      });
    }
  };