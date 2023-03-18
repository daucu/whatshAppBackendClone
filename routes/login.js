const express = require("express");
const router = express.Router();
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { email, phonenumber, password } = req.body;
    if (!email || !phonenumber || !password) {
      return res.json({ message: "Please fill all the fields" });
    }
    const checkUser = await userSchema.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // check phone number
    if (checkUser.phonenumber !== phonenumber) {
      return res.status(400).json({
        message: "Invalid Phone Number",
      });
    }

    const hashPassword = await bcrypt.compare(password, checkUser.password);
    if (!hashPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        phonenumber: checkUser.phonenumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 300,

      sameSite: "none",
      secure: true,
    });
    res.setHeader("x-auth-token", token);
    res.json({
      message: "User Logged In Successfully",
      token: token,
      user: checkUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
