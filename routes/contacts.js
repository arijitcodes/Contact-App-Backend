const express = require("express");
const router = express.Router();

// Middlewares
const auth = require("../middlewares/auth");

// @route   GET api/contacts
// @desc    Get all the contacts of Logged in User
// @access  Private
router.get("/", auth, (req, res) => {
  res.send("GET @ Contacts Works!");
});

// @route   POST api/contacts
// @desc    Add a new contact for the Logged in User
// @access  Private
router.post("/", auth, (req, res) => {
  res.send("POST @ Contacts Works!");
});

// @route   PUT api/contacts
// @desc    Update a contact of the Logged in User
// @access  Private
router.put("/", auth, (req, res) => {
  res.send("PUT @ Contacts Works!");
});

// @route   DELETE api/contacts
// @desc    Delete a contact of the Logged in User
// @access  Private
router.delete("/", auth, (req, res) => {
  res.send("DELETE @ Contacts Works!");
});

module.exports = router;
