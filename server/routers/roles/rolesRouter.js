import express from "express";
import { RoleModel } from "../../models/Role.js";

const rolesRouter = express.Router();

// Add Role
rolesRouter.post("/add_new", async (req, res) => {
  try {
    const newRole = await new RoleModel({
      ...req.body,
    }).save();
    if (newRole) {
      res.status(201).json({ msg: "Successfully added the new role!" });
    } else {
      res.status(501).json({ msg: "Role was not created!" });
    }
  } catch (error) {
    res.status(501).json({ msg: message.error.message });
  }
});

// Get Roles
rolesRouter.get("/", async (req, res) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(501).json({ msg: message.error.message });
  }
});

//Update Role
rolesRouter.put("/update/:id", async (req, res) => {
  try {
    const updateModel = await RoleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateModel) {
      return res.status(404).json({ msg: "Role not found" });
    }
    res.status(201).json({ msg: "Successfully updated the role" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

//Delete Role
rolesRouter.delete("/delete/:id", async (req, res) => {
  try {
    const role = await RoleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

export default rolesRouter;
