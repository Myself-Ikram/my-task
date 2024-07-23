import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  children: [
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    menusAccess: [menuSchema],
  },
  { timestamps: true }
);

export const RoleModel = mongoose.model("Role", roleSchema);
