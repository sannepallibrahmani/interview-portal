const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Static folder for uploaded resumes
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Home Route (for browser testing)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Interview Portal Backend is Running!",
    serverTime: new Date(),
    endpoints: {
      candidateRegister:
        "/api/auth/candidate/register",

      candidateLogin:
        "/api/auth/candidate/login",

      recruiterRegister:
        "/api/auth/recruiter/register",

      recruiterLogin:
        "/api/auth/recruiter/login",

      candidateProfile:
        "/api/candidate/profile",

      uploadResume:
        "/api/candidate/upload-resume",

      getCandidates:
        "/api/recruiter/candidates"
    }
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );
  })
  .catch((err) => {
    console.error(
      "MongoDB Connection Error:",
      err
    );
  });

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// Global Error Handler
app.use(
  (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error"
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});