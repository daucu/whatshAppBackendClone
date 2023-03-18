const user = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const router = require("express").Router();

router.get("/users", async (req, res) => {
  try {
    const getAllUsers = await user.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phonenumber
  ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  //   code to check the length of the phone number
  // const checkNumber = JSON.stringify(req.body.phonenumber).length;
  // if (checkNumber !== 10) {
  //   return res.json({ message: "Phone number should be of 10 digits" });
  // }

  //   if phone number already exists
  if (await user.findOne({ phonenumber: req.body.phonenumber })) {
    return res.status(400).json({
      message: "Phone number already exists",
    });
  }
  //    if email already exists
  if (await user.findOne({ email: req.body.email })) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phonenumber: req.body.phonenumber,
    status:
      "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/whatsapp-fake-660_013119094758.jpg?size=1200:675",
  });
  try {
    const saveUser = await newUser.save();
    res.json({
      message: "User Registered Successfully",
      user: saveUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
