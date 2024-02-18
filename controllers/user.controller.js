const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function signup(userDetails) {
  try {
    const { email, password, profilePictureUrl, username } = userDetails;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      profilePictureUrl,
      username,
    });
    const signedUser = await newUser.save();

    if (signedUser) {
      console.log(`${signedUser.username} signed up successfully`);
      return signedUser;
    } else {
      console.error("Error while signing up");
      return null;
    }
  } catch (error) {
    console.error("Error while signing up user:", error.message);
    throw new Error("Error while signing up user: " + error.message);
  }
}

async function login({ email, password }) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error("User not found. Invalid email.");
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log(`${user.username} logged in successfully`);
      return user;
    } else {
      console.error("Invalid password. Login failed.");
      return null;
    }
  } catch (error) {
    console.error("Failed to log in:", error.message);
    throw new Error("Failed to log in: " + error.message);
  }
}

async function changePassword({ email, currentPassword, newPassword }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with "${email}" not found`);
      throw new Error(`User with "${email}" not found`);
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (passwordMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      const updatedUser = await user.save();
      console.log(`${updatedUser.username}'s password changed succesfully`);
      return updatedUser;
    } else {
      console.log("Current password did not match with user's password");
      throw new Error("Current password did not match with user's password");
    }
  } catch (error) {
    console.log("Error while changing password:", error.message);
    throw new Error("Error while changing password:" + error.message);
  }
}

async function updateProfilePicture({ email, newProfilePictureUrl }) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profilePictureUrl: newProfilePictureUrl },
      { new: true },
    );

    if (!updatedUser) {
      console.error(`User with "${email}" not found`);
      throw new Error(`User with "${email}" not found`);
    }

    console.log(
      `${updatedUser.username}'s profile picture updated successfully`,
    );
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile picture:", error.message);
    throw new Error("Error updating profile picture: " + error.message);
  }
}

async function updateContactDetails(email, updatedContactDetails) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updatedContactDetails,
      { new: true },
    );

    if (!updatedUser) {
      console.error(`User with "${email}" not found`);
      throw new Error(`User with "${email}" not found`);
    }

    console.log(
      `${updatedUser.username}'s contact details updated successfully`,
    );
    return updatedUser;
  } catch (error) {
    console.error("Error updating contact details:", error.message);
    throw new Error("Error updating contact details: " + error.message);
  }
}
async function findUserByPhoneNumber(phoneNumber) {
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      console.error(`User with phone number "${phoneNumber}" not found`);
      throw new Error(`User with phone number "${phoneNumber}" not found`);
    }

    console.log(`User with phone number "${phoneNumber}" : ${user.username} `);
    return user;
  } catch (error) {
    console.error("Error finding user by phone number:", error.message);
    throw new Error("Error finding user by phone number: " + error.message);
  }
}

module.exports = {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
};
