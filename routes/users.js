const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Using express validator
const { check, validationResult } = require("express-validator");

// User Model
const User = require("../models/User");

// @route   POST api/users
// @desc    Register an User and generate JWT token
// @access  Public

router.post(
  "/",
  [
    check("name", "Please enter a valid name").not().isEmpty(),
    check("email", "Please enter a valid Email Id!").isEmail(),
    check(
      "password",
      "Please enter a valid password with atleast 5 or more characters!"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Checking Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array()[0] });

    // If no validation errors, proceed
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ msg: "User with that email already exists!" });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Generateing salt using bcrypt
      const salt = await bcrypt.genSalt(10);

      // Hashing password with salt
      user.password = await bcrypt.hash(password, salt);

      // Saving User
      await user.save();

      // Generate JWT Token
      // Create Payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign JWT token with Secret
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "60" },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!");
    }
  }
);

module.exports = router;
