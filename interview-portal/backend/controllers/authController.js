const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Candidate = require("../models/Candidate");
const Recruiter = require("../models/Recruiter");

// Register Candidate
exports.registerCandidate = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let candidate = await Candidate.findOne({ email });

    if (candidate) {
      return res.status(400).json({
        message: "Candidate already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    candidate = new Candidate({
      name,
      email,
      password: hashedPassword
    });

    await candidate.save();

    res.status(201).json({
      message: "Candidate Registered Successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login Candidate
exports.loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate =
      await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(400).json({
        message: "Candidate not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        candidate.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: candidate._id,
        role: "candidate"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      role: "candidate"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Register Recruiter
exports.registerRecruiter = async (
  req,
  res
) => {
  try {
    const { name, email, password } =
      req.body;

    let recruiter =
      await Recruiter.findOne({ email });

    if (recruiter) {
      return res.status(400).json({
        message: "Recruiter already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    recruiter = new Recruiter({
      name,
      email,
      password: hashedPassword
    });

    await recruiter.save();

    res.status(201).json({
      message: "Recruiter Registered"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login Recruiter
exports.loginRecruiter = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const recruiter =
      await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(400).json({
        message: "Recruiter not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        recruiter.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: recruiter._id,
        role: "recruiter"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      role: "recruiter"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};