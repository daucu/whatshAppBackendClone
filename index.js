const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.static(__dirname + "/medias"));
const connectDb = require("./config/dbconfig");
connectDb();
const cors = require("cors");
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Whatsapp Backend..." });
});
// allow cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://whatsapp-clone-frontend-sage.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/register", require("./routes/UserRegister"));
app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/status", require("./routes/uploadStatus"));
app.use("/api/v1/update", require("./routes/updateUser"));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
