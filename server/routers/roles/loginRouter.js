import express from "express";
import { UserModal } from "../../models/User.js";
import { RoleModel } from "../../models/Role.js";
import { generateToken } from "../../Auth/security.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggedIn = await UserModal.findOne({ email });
    if (userLoggedIn && !userLoggedIn?.status)
      return res.status(200).json({ msg: "Please register first" });
    const user = await UserModal.findOne({ email, password });
    if (!user) {
      return res.status(200).json({ msg: "Email or password is wrong" });
    }
    const roles = await RoleModel.find({ _id: { $in: user?.roles } }).select(
      "roleName"
    );
    res.status(201).json({ roles, userId: user?._id });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

//User with role
loginRouter.post("/select_role", async (req, res) => {
  try {
    const { role, userId } = req.body;
    console.log(role);
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(200).json({ msg: "Try Again!" });
    }
    const token = generateToken(user, role);
    const roleData = await RoleModel.findById(role?._id).select(
      "roleName menusAccess status"
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 9000000),
      })
      .status(201)
      .json({ msg: "Successfully set the token", role: roleData });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

//set password
loginRouter.post("/set_password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(200).json({ msg: "User not found" });
    }
    if (user?.status) {
      return res.status(200).json({ msg: "User already signed in!" });
    }
    const updateUser = await UserModal.findByIdAndUpdate(user?._id, {
      $set: {
        password,
        status: true,
      },
    });
    if (!updateUser) {
      res.status(501).json({ msg: "Got some error while setting password!" });
    }
    res.status(201).json({ msg: "The password has been set" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

//Logout role
loginRouter.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ msg: "Logged Out!" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

export default loginRouter;
