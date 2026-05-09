import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../model/user.model.js";
import Profile from "./../model/profile.model.js";
import pdfDocument from "pdfkit";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import ConnectionRequest from "../model/connections.model.js";
import mongoose from "mongoose";

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const convertUserDataToPdf = async (userData) => {
  const doc = new pdfDocument();
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);
  doc.pipe(stream);
  const imageName = userData?.userId?.profilePicture || "default.png";
  const imagePath = path.join(process.cwd(), "public", "uploads", imageName);

  if (fs.existsSync(imagePath)) {
    doc.image(imagePath, { width: 100, align: "center" });
  }
  doc.fontSize(14).text(`Name : ${userData.userId.name}`);
  doc.fontSize(14).text(`username : ${userData.userId.username}`);
  doc.fontSize(14).text(`email : ${userData.userId.email}`);
  doc.fontSize(14).text(`bio: ${userData.userId.bio}`);
  doc.fontSize(14).text(`Current Positions: ${userData.currentPositions}`);

  doc.fontSize(14).text(`Past Work : "`);
  if (Array.isArray(userData.pastWork)) {
    userData.pastWork.forEach((work) => {
      doc.fontSize(14).text(`Company Name: ${work.companyName}`);
      doc.fontSize(14).text(`Positions: ${work.positions}`);
      doc.fontSize(14).text(`Years: ${work.years}`);
    });
  }

  doc.end();
  return outputPath;
};

const signup = async (req, res) => {
  try {
    console.log("signup route is hitting..");
    const { name, email, password, username, profilePicture } = req.body;
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required.." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const newUser = new User({ name, email, password, username });
    const registeredUser = await newUser.save();

    const token = jwtToken(registeredUser.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({
      message: "User created successfully",
      token,
      registeredUser,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and passwords.." });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User don't exists.." });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ message: "Password or email doesn't match" });
    }
    const token = jwtToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    });
    res.status(200).json({
      message: "User logged in successfully..",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const me = async (req, res) => {
  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      username: req.user.username,
    },
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "You logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const uploadProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const allowUpdates = ["email", "username"];
    const newUserData = {};
    allowUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        newUserData[field] = req.body[field];
      }
    });
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found.." });
    }
    //duplicate check
    if (newUserData.email || newUserData.username) {
      const existingUser = await User.findOne({
        id: { $ne: user._id },
        $or: [
          newUserData.username ? { username: newUserData.username } : null,
          newUserData.email ? { email: newUserData.email } : null,
        ].filter(Boolean),
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or Email already exists" });
      }
    }
    Object.assign(user, newUserData);
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found.." });
    }
    const profile = await Profile.findOne({ userId });
    res.status(200).json({
      user,
      profile: profile || { education: [], postWork: [], bio: "" },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOtherUserProfile = async (req, res) => {
  try {
    console.log("this is running");
    const userId = req.params.userId;
    console.log("userId:", userId); // exact value dekho
    console.log("type:", typeof userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found.." });
    }
    console.log("this is a user", user);
    const profile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "username  name  profilePicture",
    );

    console.log("this is a profile", profile);
    res.status(200).json({
      user,
      profile: profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messgae: error.message });
  }
};
const updateProfileData = async (req, res) => {
  try {
    const userId = req.user._id;
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }
    const allowFields = ["bio", "currentPost", "postWork", "education"];
    allowFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });
    await profile.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProfileData = async (req, res) => {
  try {
    const userId = req.user._id;
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      res.status(404).json({ message: "This profile doesn't exist.." });
    }
    const updateItem = req.body;
    profile.education = profile.education.map((item) => {
      return item._id.toString() === updateItem._id ? updateItem : item;
    });
    profile.postWork = profile.postWork.map((item) => {
      return item._id.toString() === updateItem._id ? updateItem : item;
    });
    profile.markModified("education");
    profile.markModified("postWork");
    await profile.save();
    res.status(200).json({
      message: "You updated successfully...",
      profile,
      updateItem,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const profiles = await Profile.find({ userId: { $ne: userId } }).populate(
      "userId",
      "username  name  profilePicture",
    );
    res.status(200).json({
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId }).populate(
      "userId",
      "username  name profilePicture",
    );
    let outputPath = await convertUserDataToPdf(profile);
    return res.json({ message: outputPath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    if (senderId.toString() === receiverId) {
      return res
        .status(400)
        .json({ message: "You can't connect with yourself.." });
    }
    const existing = await ConnectionRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: `Connection already ${existing.status}` });
    }
    const request = await ConnectionRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    res.status(201).json({ message: "Request Sent", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId } = req.params;
    const { status } = req.body;
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }
    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found.." });
    }
    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to respond.." });
    }

    request.status = status;
    await request.save();
    res
      .status(200)
      .json({ message: `Request ${status} successfully..`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const pendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const requests = await ConnectionRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "username  name  profilePicture");
    res.status(200).json({
      counts: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    const connections = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ receiver: userId }, { sender: userId }],
    }).populate("sender receiver", "username name profilePicture");
    const formattedConnections = connections.map((connection) => {
      if (connection.sender._id.toString() === userId.toString()) {
        return connection.receiver;
      } else {
        return connection.sender;
      }
    });
    res.status(200).json({
      message: "All connections",
      count: formattedConnections.length,
      connections: formattedConnections,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const findUser = req.query.searchUser;
    const user = await User.find({
      $or: [
        { name: { $regex: findUser, $options: "i" } },
        { username: { $regex: findUser, $options: "i" } },
      ],
    }).limit(10);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found.." });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default {
  signup,
  login,
  me,
  logout,
  uploadProfile,
  userUpdate,
  getUserProfile,
  getOtherUserProfile,
  updateProfileData,
  editProfileData,
  getAllUsers,
  downloadProfile,
  sendConnectionRequest,
  respondToRequest,
  getAllConnections,
  pendingRequests,
  searchUser,
};
