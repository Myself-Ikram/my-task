import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import rolesRouter from "./routers/roles/rolesRouter.js";
import usersRouter from "./routers/roles/userRouter.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
const mongoURI = "mongodb://localhost:27017/mytask";

app.use("/roles", rolesRouter);
app.use("/users", usersRouter);

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("-------------------------");
      console.log(`=>Connected to Database`);
      console.log(`=>Server listening on port ${PORT}`);
      console.log("-------------------------");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
