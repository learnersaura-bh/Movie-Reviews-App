const express = require("express");
const {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const signedUser = await signup(req.body);
    res.status(201).json(signedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/change-password", async (req, res) => {
  try {
    const updatedUser = await changePassword(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/update-profile-picture", async (req, res) => {
  try {
    const updatedUser = await updateProfilePicture(req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/update-contact-details", async (req, res) => {
  try {
    const updatedUser = await updateContactDetails(
      req.body.email,
      req.body.updatedContactDetails,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/find-by-phone-number/:phoneNumber", async (req, res) => {
  try {
    const user = await findUserByPhoneNumber(req.params.phoneNumber);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
