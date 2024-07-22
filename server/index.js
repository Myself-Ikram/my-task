import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ success: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
