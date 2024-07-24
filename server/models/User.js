import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
    roles: {
      type: [String],
      required: true,
    },
    password: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModal = mongoose.model("User", userSchema);
