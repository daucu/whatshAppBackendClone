const express = require("express");
const router = express.Router();
const UserSchema = require("../schema/userSchema");
const bcrypt = require("bcryptjs");

router.get("/:id", async (req, res) => {
  try {
    const getUser = await UserSchema.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, phonenumber, status } = req.body;
  console.log(req.body);
  try {
    const updateUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phonenumber,
        status,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
    // save the user
    updateUser.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
