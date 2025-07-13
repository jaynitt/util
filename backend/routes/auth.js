import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js"; 

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashed });
//     await newUser.save();
//     res.json({ msg: "Registered successfully" });
//   } catch (err) {
//     res.json({ msg: "Error registering user" });
//   }
// });


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
});


export default router;
