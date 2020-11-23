const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Using Express Validator to validate incoming request data on server side
const { check, validationResult } = require("express-validator");

// Middlewares
const auth = require("../middlewares/auth");

// User Model
const User = require("../models/User");

// @route   GET api/auth
// @desc    Get details of a Logged In user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
});

// @route   POST api/auth
// @desc    Authenticate User and Get Token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid Email id!").isEmail(),
    check("password", "Password is Required!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Checking Validation Errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no validation errors, proceed
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Checking invalid email
      if (!user) {
        return res
          .status(400)
          .json({ msg: "No account was found with this email id!" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      // Checking invalid password
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Wrong Password!" });
      }

      // If Email + Password is okay then Generate JWT Token
      // Creating Payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign and Create
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
      //
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

module.exports = router;
