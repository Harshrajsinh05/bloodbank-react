const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const { formToJSON } = require("axios");
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
app.post("/api/signupuser", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const detail_uname = await User.findOne({ username: username });
    console.log(detail_uname);
    if (detail_uname) {
      res.status(201).json({ uname_error: "Username already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User signed up successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const AdminSchema = new mongoose.Schema({
  organizationname: String,
  username: String,
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", AdminSchema);
app.post("/api/signupadmin", async (req, res) => {
  try {
    const { organizationname, username, email, password } = req.body;
    console.log(organizationname);
    const detail = await Data.findOne({ name: organizationname });
    const detail_uname = await Admin.findOne({ username: username });

    if (detail_uname) {
      return res.status(201).json({ uname_error: "Username already exists." });
    } else {
      if (detail) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
          organizationname,
          username,
          email,
          password: hashedPassword,
        });
        await newAdmin.save();
        return res
          .status(201)
          .json({ message: "User signed up successfully." });
      } else {
        return res.status(400).json({ error: "Organization not found." });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/api/loginuser", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/api/loginadmin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Admin not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({
      message: "Login successful.",
      organizationname: user.organizationname,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const DataSchema = new mongoose.Schema({
  name: String,
  contact: String,
  image: String,
  address: String,
  email: String,
  bloodgroup: JSON,
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
    const searchterm = req.params;
    const detail = await Data.findOne({ name: searchterm.name });
    if (!detail) {
      return res.status(404).json({ error: "Data not found." });
    }
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: "An error accure" });
  }
});

app.post("/api/adminupdate", async (req, res) => {
  try {
    console.log(req.body);
    const { organizationname, email, contact, address, bloodgroup } = req.body;
    console.log(organizationname);
    const data = await Data.findOne({ name: organizationname });
    console.log(data);
    if (!data) {
      return res
        .status(201)
        .json({ data_error: "Organization name not found." });
    } else {
      if (email) {
        await Data.updateOne(
          { name: organizationname },
          { $set: { email: email } }
        );
      }
      if (contact) {
        await Data.updateOne(
          { name: organizationname },
          { $set: { contact: contact } }
        );
      }
      if (address) {
        await Data.updateOne(
          { name: organizationname },
          { $set: { address: address } }
        );
      }
      if (bloodgroup) {
        const updateObj = {
          [`bloodgroup.${bloodgroup.type}`]: bloodgroup.left,
        };
        await Data.updateOne({ name: organizationname }, { $set: updateObj });
      }
      res.status(200).json({ message: "Data updated successfully." });
      if (!email && !contact && !address && !bloodgroup) {
        return res.status(200).json({ message: "No data updated." });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/admin/data", async (req, res) => {
  try {
    const organizationname = req.query.organizationname;
    console.log(organizationname);
    const detail = await Data.findOne({ name: organizationname });
    if (!detail) {
      return res.status(404).json({ error: "Data not found." });
    }
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: "An error accure" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
