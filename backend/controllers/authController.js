import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;    

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Account created successfully. You can now log in.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed. Please try again later.",
    });
  }
};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      name: user.name,
      email: user.email,
    };

    res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};


