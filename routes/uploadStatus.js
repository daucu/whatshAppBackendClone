const express = require("express");
const router = express.Router();
const upload = require("../config/statusUpload");
const userschema = require("../schema/userSchema");
const jwt = require("jsonwebtoken");

// code to post image and video and save status in userSchema status array
router.post("/", upload.single("status"), async (req, res) => {
  // code to get token and upload status in userSchema status array
  const token = req.headers["x-auth-token"] || req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userschema.findOne({ _id: decoded.id });
  const url = req.protocol + "://" + req.get("host");
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  // code to update the status in userSchema status field
  user.status = url + "/" + req.file.filename;
  const updateStatus = await user.updateOne({
    status: user.status,
    // remove status after 1 minute automatically
  });
  if (!updateStatus) {
    return res.status(400).json({
      message: "Status not updated",
    });
  }
  res.status(200).json({
    message: "Status updated",
    status: user.status,
  });
});

// code to delete status from userSchema status
router.delete("/", async (req, res) => {
  // code to get token and delete status from userSchema status array
  const token = req.headers["x-auth-token"] || req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userschema.findOne({ _id: decoded.id });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  // code to update the status in userSchema status field
  user.status = "";
  const updateStatus = await user.updateOne({ status: user.status });
  if (!updateStatus) {
    return res.status(400).json({
      message: "Status not updated",
    });
  }
  res.status(200).json({
    message: "Status updated",
    status: user.status,
  });
});

module.exports = router;
