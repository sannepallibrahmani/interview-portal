const Candidate = require(
  "../models/Candidate"
);
const Notification = require(
  "../models/Notification"
);
// Get all candidates
exports.getCandidates =
  async (req, res) => {
    try {
      const candidates =
        await Candidate.find().select(
          "-password"
        );

      res.json(candidates);
    } catch (error) {
      res.status(500).json(error);
    }
  };

exports.updateStatus =
  async (req, res) => {
    try {
      const candidate =
        await Candidate.findById(
          req.params.id
        );

      if (!candidate) {
        return res
          .status(404)
          .json({
            message:
              "Candidate not found",
          });
      }

      candidate.status =
        req.body.status;

      candidate.interviewDate =
        req.body.interviewDate ||
        candidate.interviewDate;

      await candidate.save();

      let message = "";

      if (
        req.body.status ===
        "Interview Scheduled"
      ) {
        message = `Your interview has been scheduled for ${candidate.interviewDate}`;
      } else if (
        req.body.status ===
        "Selected"
      ) {
        message =
          "Congratulations! You have been selected.";
      } else if (
        req.body.status ===
        "Rejected"
      ) {
        message =
          "Your application status has been updated to Rejected.";
      }

      if (message) {
        await Notification.create({
          candidateId:
            candidate._id,
          message,
        });
      }

      res.json({
        message:
          "Status updated successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
    const Recruiter =
  require(
    "../models/Recruiter"
  );

exports.getProfile =
  async(req,res)=>{

    try{

      const recruiter =
        await Recruiter.findById(
          req.user.id
        ).select("-password");

      res.json(
        recruiter
      );

    }catch(error){

      res.status(500).json(
        error
      );

    }

  };
  };