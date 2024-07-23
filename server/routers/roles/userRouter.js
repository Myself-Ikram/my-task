import express from "express";
import { RoleModel } from "../../models/Role.js";
import { UserModal } from "../../models/User.js";

const usersRouter = express.Router();
//Add User
usersRouter.post("/add_new", async (req, res) => {
  try {
    const newUser = await new UserModal({
      ...req.body,
    }).save();
    if (newUser) {
      res.status(201).json({ msg: "Successfully added the new user!" });
    } else {
      res.status(501).json({ msg: "User was not created!" });
    }
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});
// Get Users
usersRouter.get("/", async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(501).json({ msg: message.error.message });
  }
});
//Update Role
usersRouter.put("/update/:id", async (req, res) => {
  try {
    const updateModel = await UserModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateModel) {
      return res.status(404).json({ msg: "Role not found" });
    }
    res.status(201).json({ msg: "Successfully updated the user" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

//Delete Role
usersRouter.delete("/delete/:id", async (req, res) => {
  try {
    const role = await UserModal.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});
export default usersRouter;
