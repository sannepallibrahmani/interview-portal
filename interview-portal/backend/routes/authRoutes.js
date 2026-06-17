const express = require("express");

const router = express.Router();

const {
  registerCandidate,
  loginCandidate,
  registerRecruiter,
  loginRecruiter
} = require(
  "../controllers/authController"
);

router.post(
  "/candidate/register",
  registerCandidate
);

router.post(
  "/candidate/login",
  loginCandidate
);

router.post(
  "/recruiter/register",
  registerRecruiter
);

router.post(
  "/recruiter/login",
  loginRecruiter
);

module.exports = router;