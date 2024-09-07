const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect("mongodb://127.0.0.1:27017/Bank")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username, password });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const DataSchema = new mongoose.Schema({
  name: String,
  contact: String,
  image: String,
  address: String,
});
const Data = mongoose.model("Data", DataSchema, "Data");

app.get("/", async (req, res) => {
  try {
    const Alldata = await Data.find({});
    res.json({ data: Alldata });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/details/:name", async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Requested name:", req.params.name);
    const detail = await Data.findOne({ name: name });
    if (!detail) {
      return res.status(404).json({ error: "Data not found." });
    }
    res.json({ data: detail });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
